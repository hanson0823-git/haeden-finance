import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import { encodeSignatureHeader, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { getWriteClient } from '../../../../lib/sanityWrite';
import { articleId, missingPostIds } from '../../../../lib/hojuSync';

// Daily Vercel cron (vercel.json, 02:00 UTC = 12pm Brisbane): finds published 호주주민 posts with no
// English article or draft yet and sends each to /api/hoju-sync, so each sync gets its own invocation.
// Edited posts are left to the webhook.
const MAX_PER_RUN = 5; // caps Claude spend if many posts are missing at once; the rest go the next day

export async function GET(request) {
  if (!process.env.CRON_SECRET || request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const secret = process.env.HOJU_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: 'HOJU_WEBHOOK_SECRET not configured' }, { status: 500 });

  const source = createClient({ projectId: 'kkawsldi', dataset: 'production', apiVersion: '2024-01-01', useCdn: false });
  const postIds = await source.fetch('*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt asc)._id');
  const ids = postIds.flatMap(p => [articleId(p), `drafts.${articleId(p)}`]);
  const existing = await getWriteClient().fetch('*[_id in $ids]._id', { ids });
  const missing = missingPostIds(postIds, existing).slice(0, MAX_PER_RUN);

  const syncUrl = new URL('/api/hoju-sync', request.url);
  const results = [];
  for (const postId of missing) {
    const body = JSON.stringify({ _id: postId });
    const res = await fetch(syncUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', [SIGNATURE_HEADER_NAME]: await encodeSignatureHeader(body, Date.now(), secret) },
      body,
    });
    results.push({ postId, status: res.status });
  }
  console.log('hoju-cron', { total: postIds.length, missing: missing.length, results });
  return NextResponse.json({ total: postIds.length, triggered: results });
}
