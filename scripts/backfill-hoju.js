// scripts/backfill-hoju.js — one-off: English versions of already-published 호주주민 posts.
// Same rules as the webhook (lib/hojuSync.js): review PASS → live, ISSUES → draft + email.
//
// Usage (from the repo root, with ANTHROPIC_API_KEY, SANITY_TOKEN and RESEND_API_KEY in your shell):
//   node scripts/backfill-hoju.js --dry-run --limit 1   translate + review, write nothing, save previews to ./hoju-dry-run
//   node scripts/backfill-hoju.js                       do all posts that have no English version yet
//   node scripts/backfill-hoju.js --id post-e-13 --force  redo one post even if unchanged

import fs from 'node:fs';
import { createClient } from '@sanity/client';
import { syncPost } from '../lib/hojuSync.js';

const args = process.argv.slice(2);
const flag = name => args.includes(name);
const value = name => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const dryRun = flag('--dry-run');
const force = flag('--force');
const limit = Number(value('--limit')) || Infinity;
const onlyId = value('--id');

function toMarkdown(doc) {
  const text = b => (b.children || []).map(c => {
    const link = (b.markDefs || []).find(d => c.marks?.includes(d._key));
    return link ? `[${c.text}](${link.href})` : c.marks?.includes('strong') ? `**${c.text}**` : c.text;
  }).join('');
  const body = doc.content.map(b => {
    if (b._type === 'table') return b.rows.map((r, i) => `| ${r.cells.join(' | ')} |${i === 0 ? `\n|${r.cells.map(() => '---|').join('')}` : ''}`).join('\n');
    const prefix = { h2: '## ', h3: '### ', h4: '#### ', blockquote: '> ' }[b.style] || (b.listItem === 'bullet' ? '- ' : b.listItem === 'number' ? '1. ' : '');
    return prefix + text(b);
  }).join('\n\n');
  const issues = doc.review.issues.map(i => `- **${i.kind}**: ${i.detail}\n  - EN: ${i.english}\n  - KO: ${i.korean}`).join('\n');
  return `# ${doc.title}\n\n_${doc.category} · review: ${doc.review.verdict}_\n\n${issues ? `## Reviewer issues\n\n${issues}\n\n---\n\n` : ''}${doc.summary}\n\n${body}\n`;
}

async function main() {
  const source = createClient({ projectId: 'kkawsldi', dataset: 'production', apiVersion: '2024-01-01', useCdn: false });
  const ids = onlyId ? [onlyId] : await source.fetch('*[_type == "post"] | order(publishedAt asc)._id');
  if (dryRun) fs.mkdirSync('hoju-dry-run', { recursive: true });

  let done = 0;
  for (const id of ids) {
    if (done >= limit) break;
    try {
      const r = await syncPost(id, { dryRun, force });
      console.log(`${r.status === 'unchanged' ? '·' : '✓'} ${id}: ${r.status}${r.verdict ? ` (review ${r.verdict})` : ''}`);
      if (r.status === 'unchanged' || r.status === 'not-found') continue;
      if (dryRun) fs.writeFileSync(`hoju-dry-run/${id}.md`, toMarkdown(r.doc));
      done++;
    } catch (err) {
      console.error(`✗ ${id}: ${err.message}`);
      done++;
    }
  }
  console.log(dryRun ? 'Done. Previews are in ./hoju-dry-run' : 'Done.');
}

main().catch(err => { console.error(err); process.exit(1); });
