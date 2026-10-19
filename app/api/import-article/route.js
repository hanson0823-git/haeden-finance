import { NextResponse } from 'next/server';
import { getWriteClient } from '../../../lib/sanityWrite';

// POST https://haedenfinance.com.au/api/import-article
// Headers: { "x-import-secret": "<IMPORT_SECRET>", "Content-Type": "application/json" }
// Body: article object (see scripts/import-article.js for structure)

export async function POST(request) {
  // Simple secret key guard
  const secret = request.headers.get('x-import-secret');
  if (!secret || secret !== process.env.IMPORT_SECRET) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const writeClient = getWriteClient();
    const body = await request.json();
    const article = { _type: 'article', ...body };
    const result = await writeClient.create(article);
    return NextResponse.json({ success: true, _id: result._id });
  } catch (err) {
    console.error('Import error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
