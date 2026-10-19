// scripts/send-hoju-webhook.js — sends the same signed request the Sanity webhook sends, for one post.
// Use it to test a preview deployment or to re-sync one post on demand.
//
//   HOJU_WEBHOOK_SECRET=... node scripts/send-hoju-webhook.js <site-url> <post-id>
//   e.g. node scripts/send-hoju-webhook.js https://haeden-finance-homepage-xxx.vercel.app post-e-13
//
// Preview deployments sit behind Vercel login; set VERCEL_AUTOMATION_BYPASS_SECRET
// (Project → Settings → Deployment Protection → Protection Bypass for Automation) to get through.

import { encodeSignatureHeader, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

const [site, postId] = process.argv.slice(2);
const secret = process.env.HOJU_WEBHOOK_SECRET;
if (!site || !postId || !secret) {
  console.error('Usage: HOJU_WEBHOOK_SECRET=... node scripts/send-hoju-webhook.js <site-url> <post-id>');
  process.exit(1);
}

const body = JSON.stringify({ _id: postId });
const headers = { 'Content-Type': 'application/json', [SIGNATURE_HEADER_NAME]: await encodeSignatureHeader(body, Date.now(), secret) };
if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) headers['x-vercel-protection-bypass'] = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

const res = await fetch(`${site.replace(/\/$/, '')}/api/hoju-sync`, { method: 'POST', headers, body, redirect: 'manual' });
console.log(res.status, await res.text());
if (res.status === 202) console.log('Accepted. The result arrives by email in a few minutes (also in the Vercel function logs).');
