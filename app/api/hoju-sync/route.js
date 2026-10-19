import { after, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { syncPost } from '../../../lib/hojuSync';

// POST from the Sanity webhook on the 호주주민 project (kkawsldi), filter `_type == "post"`, projection `{_id}`.
// Translation + review take minutes, longer than Sanity waits, so reply first and sync in after().
export const maxDuration = 300;

export async function POST(request) {
  const secret = process.env.HOJU_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: 'HOJU_WEBHOOK_SECRET not configured' }, { status: 500 });

  const { isValidSignature, body } = await parseBody(request, secret);
  if (!isValidSignature) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });

  const postId = body?._id;
  if (typeof postId !== 'string' || postId.startsWith('drafts.') || !/^[\w.-]+$/.test(postId)) {
    return NextResponse.json({ error: 'Expected a published post _id' }, { status: 400 });
  }

  after(async () => {
    try {
      console.log('hoju-sync', postId, await syncPost(postId));
    } catch (err) {
      console.error('hoju-sync failed', postId, err); // syncPost has already emailed the failure
    }
  });
  return NextResponse.json({ accepted: postId }, { status: 202 });
}
