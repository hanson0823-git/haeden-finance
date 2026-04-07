import { NextResponse } from 'next/server';
import { client, articlesQuery } from '../../../lib/sanity';

export async function GET() {
  try {
    const articles = await client.fetch(articlesQuery);
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return NextResponse.json([], { status: 500 });
  }
}
