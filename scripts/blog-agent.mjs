#!/usr/bin/env node
/**
 * Blog Automation Agent — Haeden Finance
 *
 * Generates and publishes articles to Sanity CMS using Claude AI.
 *
 * Usage:
 *   node --env-file=.env.local scripts/blog-agent.mjs --topic "First Home Buyers Guide"
 *   node --env-file=.env.local scripts/blog-agent.mjs --topic "SMSF Loans" --category "SMSF" --dry-run
 *
 * Options:
 *   --topic <text>      Topic to write about (required)
 *   --category <text>   Article category (defaults to topic value)
 *   --dry-run           Print generated JSON without publishing to Sanity
 *
 * Required env vars (in .env.local):
 *   ANTHROPIC_API_KEY
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   SANITY_TOKEN  (write token from sanity.io)
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Load .env.local if dotenv is available (fallback for Node < 20.6)
try {
  const dotenv = await import('dotenv');
  dotenv.config({ path: '.env.local' });
} catch {
  // Running with --env-file flag or env vars already set — fine to continue
}

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@sanity/client';
import { randomUUID } from 'crypto';

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const getArg = (flag) => {
  const i = argv.indexOf(flag);
  return i !== -1 && argv[i + 1] && !argv[i + 1].startsWith('--')
    ? argv[i + 1]
    : null;
};

const topic = getArg('--topic');
const category = getArg('--category') || topic;
const dryRun = argv.includes('--dry-run');

if (!topic) {
  console.error('Error: --topic is required.');
  console.error('Example: node --env-file=.env.local scripts/blog-agent.mjs --topic "First Home Buyers Guide"');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Clients
// ---------------------------------------------------------------------------
const anthropic = new Anthropic();

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// ---------------------------------------------------------------------------
// Portable Text helpers
// ---------------------------------------------------------------------------
const key = () => randomUUID().replace(/-/g, '').slice(0, 8);

/** Convert simplified article sections → Sanity Portable Text blocks */
function toPortableText(sections) {
  const blocks = [];

  for (const section of sections) {
    switch (section.type) {
      case 'paragraph':
        if (section.text) {
          blocks.push({
            _type: 'block',
            _key: key(),
            style: 'normal',
            children: [{ _type: 'span', _key: key(), text: section.text }],
            markDefs: [],
          });
        }
        break;

      case 'heading':
        if (section.text) {
          blocks.push({
            _type: 'block',
            _key: key(),
            style: `h${section.level || 2}`,
            children: [{ _type: 'span', _key: key(), text: section.text }],
            markDefs: [],
          });
        }
        break;

      case 'bullet_list':
        for (const item of section.items || []) {
          blocks.push({
            _type: 'block',
            _key: key(),
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            children: [{ _type: 'span', _key: key(), text: item }],
            markDefs: [],
          });
        }
        break;

      case 'table': {
        const rows = [];
        if (section.headers?.length) {
          rows.push({ _type: 'tableRow', _key: key(), cells: section.headers });
        }
        for (const row of section.rows || []) {
          rows.push({ _type: 'tableRow', _key: key(), cells: row });
        }
        if (rows.length > 0) {
          blocks.push({ _type: 'table', _key: key(), rows });
        }
        break;
      }

      default:
        break;
    }
  }

  return blocks;
}

// ---------------------------------------------------------------------------
// Tool definition — Claude uses this to return structured article data
// ---------------------------------------------------------------------------
const articleTool = {
  name: 'create_article',
  description:
    'Structure a blog article for an Australian mortgage brokerage website in the required CMS format.',
  input_schema: {
    type: 'object',
    required: ['title', 'category', 'summary', 'icon', 'bg', 'sections'],
    properties: {
      title: {
        type: 'string',
        description: 'Compelling article title (under 80 characters)',
      },
      category: {
        type: 'string',
        description:
          'Article category — e.g. First Home Buyers, Investing, Refinancing, Construction, SMSF, Debt Consolidation',
      },
      summary: {
        type: 'string',
        description:
          'Concise 1–2 sentence summary shown on article cards. Informative and enticing.',
      },
      icon: {
        type: 'string',
        description:
          'Material Design icon name — e.g. home, trending_up, account_balance, real_estate_agent, apartment, architecture, merge_type',
      },
      bg: {
        type: 'string',
        enum: ['navy', 'gold', 'grey', 'cream'],
        description: 'Icon background colour for the article card',
      },
      sections: {
        type: 'array',
        description: 'Article body as ordered content sections (aim for 600–1000 words total)',
        items: {
          type: 'object',
          required: ['type'],
          properties: {
            type: {
              type: 'string',
              enum: ['paragraph', 'heading', 'bullet_list', 'table'],
            },
            text: {
              type: 'string',
              description: 'Content for paragraph or heading blocks',
            },
            level: {
              type: 'integer',
              enum: [2, 3],
              description: 'Heading level: 2 = H2 section title, 3 = H3 sub-section',
            },
            items: {
              type: 'array',
              items: { type: 'string' },
              description: 'List items for bullet_list blocks',
            },
            headers: {
              type: 'array',
              items: { type: 'string' },
              description: 'Header row cells for table blocks',
            },
            rows: {
              type: 'array',
              items: { type: 'array', items: { type: 'string' } },
              description: 'Data rows for table blocks (each row is an array of cell strings)',
            },
          },
        },
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Cached system prompt — stable content placed before volatile user message
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `You are an expert financial content writer for Haeden Finance, a premium Australian mortgage brokerage.

Your role is to write authoritative, practical blog articles that help Australians navigate the property market and home loan landscape. Every article must deliver genuine, actionable value.

## Voice & Tone
- Professional but warm — premium advisory, not academic
- Write for intelligent adults making major financial decisions
- Confident and clear — no hedging, no filler

## Australian Context (always apply)
- Currency: AUD. Reference Australian lenders and the lending landscape.
- Regulatory bodies: APRA, ASIC, RBA, ATO
- Government schemes where relevant: First Home Guarantee (FHBG), First Home Owner Grant (FHOG), Help to Buy Scheme, Regional First Home Buyer Guarantee, SMSF borrowing rules (LRBAs)
- Australian spelling: favour, recognised, realise, neighbouring, colour, programme

## Content Standards
- 600–1000 words of substantive body content
- At least one table showing comparisons, thresholds, rates, or worked examples where relevant
- Clear H2 section headings, with H3 sub-headings where content warrants it
- Bullet points for lists of 3+ items
- Use concrete numbers and real-world scenarios (e.g. "$650,000 property", "4.89% p.a. comparison rate")
- No fluff, no padding — every sentence earns its place

## Haeden Finance Services
The firm specialises in: Home Loans for New Purchases, Refinancing and Equity Release, Investment Property Finance, Construction & Renovation Finance, Debt Consolidation, Asset Finance, and SMSF Loans.`;

// ---------------------------------------------------------------------------
// Article generation
// ---------------------------------------------------------------------------
async function generateArticle(topicArg, categoryArg) {
  console.log(`\nGenerating: "${topicArg}" (category: ${categoryArg})`);

  const response = await anthropic.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 4096,
    thinking: { type: 'adaptive' },
    system: [
      {
        type: 'text',
        text: SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' }, // cache the stable system prompt
      },
    ],
    messages: [
      {
        role: 'user',
        content: `Write a high-quality blog article on the topic: "${topicArg}" for the category "${categoryArg}".

Use the create_article tool to return the structured article. Make it genuinely useful for Australian property buyers or investors.`,
      },
    ],
    tools: [articleTool],
    tool_choice: { type: 'tool', name: 'create_article' },
  });

  const toolUse = response.content.find((b) => b.type === 'tool_use');
  if (!toolUse) {
    throw new Error('Claude did not return an article via the create_article tool.');
  }

  const { title, category: cat, summary, icon, bg, sections } = toolUse.input;
  const content = toPortableText(sections);

  const cacheHits = response.usage.cache_read_input_tokens ?? 0;
  console.log(`  Title    : ${title}`);
  console.log(`  Category : ${cat}`);
  console.log(`  Blocks   : ${content.length}`);
  console.log(`  Cache hit: ${cacheHits} tokens`);

  return {
    _type: 'article',
    title,
    category: cat || categoryArg,
    summary,
    icon: icon || 'article',
    bg: bg || 'navy',
    content,
  };
}

// ---------------------------------------------------------------------------
// Sanity publish
// ---------------------------------------------------------------------------
async function publishArticle(article) {
  const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  if (!token) {
    throw new Error(
      'SANITY_TOKEN is not set. Add it to .env.local (get a write token from sanity.io).',
    );
  }
  if (!projectId) {
    throw new Error(
      'NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Add it to .env.local.',
    );
  }

  const result = await sanityClient.create(article);
  return result._id;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('═══════════════════════════════════════');
  console.log('  Blog Automation Agent — Haeden Finance');
  console.log('═══════════════════════════════════════');
  if (dryRun) {
    console.log('  Mode: DRY RUN (article will not be published)');
  }

  const article = await generateArticle(topic, category);

  if (dryRun) {
    console.log('\n── Generated article JSON ──────────────');
    console.log(JSON.stringify(article, null, 2));
    console.log('\nDry run complete. Remove --dry-run to publish.');
    return;
  }

  console.log('\nPublishing to Sanity...');
  const id = await publishArticle(article);
  console.log(`\nPublished: ${id}`);
  console.log(`View at  : https://hojujumin.vercel.app/resources`);
}

main().catch((err) => {
  console.error('\nFatal error:', err.message);
  process.exit(1);
});
