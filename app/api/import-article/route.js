import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// POST https://haedenfinance.com.au/api/import-article
// Headers: { "x-import-secret": "<IMPORT_SECRET>", "Content-Type": "application/json" }
// Body: article object (see scripts/import-article.js for structure)

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

export async function POST(request) {
  // Simple secret key guard
  const secret = request.headers.get('x-import-secret');
  if (!secret || secret !== process.env.IMPORT_SECRET) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  if (!process.env.SANITY_TOKEN) {
    return NextResponse.json({ error: 'SANITY_TOKEN not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const article = { _type: 'article', ...body };
    const result = await writeClient.create(article);
    return NextResponse.json({ success: true, _id: result._id });
  } catch (err) {
    console.error('Import error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
