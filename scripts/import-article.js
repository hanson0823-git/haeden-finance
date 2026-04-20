// scripts/import-article.js
// Usage: SANITY_TOKEN=your_token node scripts/import-article.js

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7zclms7z',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN, // needs write token
  useCdn: false,
});

// ── Paste your article(s) here ──────────────────────────────────────
const articles = [
  {
    _type: 'article',
    category: 'First Home Buyers',
    title: 'How to Save Your First Home Deposit Faster',
    summary: 'Practical strategies to build your deposit while managing rent, bills and life.',
    icon: 'home',
    bg: 'navy',
    // Portable Text content — use blocks for paragraphs, headings, tables
    content: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'Saving for your first home deposit can feel overwhelming...' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'h1',
        style: 'h2',
        children: [{ _type: 'span', _key: 's2', text: 'Set a Clear Target' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p2',
        style: 'normal',
        children: [{ _type: 'span', _key: 's3', text: 'Most lenders require a 20% deposit to avoid LMI...' }],
        markDefs: [],
      },
      // Example table block
      {
        _type: 'table',
        _key: 'table1',
        rows: [
          { _key: 'r0', _type: 'tableRow', cells: ['Property Price', 'Min Deposit (5%)', 'Ideal Deposit (20%)'] },
          { _key: 'r1', _type: 'tableRow', cells: ['$500,000', '$25,000', '$100,000'] },
          { _key: 'r2', _type: 'tableRow', cells: ['$750,000', '$37,500', '$150,000'] },
          { _key: 'r3', _type: 'tableRow', cells: ['$1,000,000', '$50,000', '$200,000'] },
        ],
      },
    ],
  },
];
// ────────────────────────────────────────────────────────────────────

async function importArticles() {
  for (const article of articles) {
    try {
      const result = await client.create(article);
      console.log(`✓ Created: "${article.title}" (${result._id})`);
    } catch (err) {
      console.error(`✗ Failed: "${article.title}"`, err.message);
    }
  }
  console.log('Done.');
}

importArticles();
