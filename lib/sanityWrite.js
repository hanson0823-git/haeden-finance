import { createClient } from '@sanity/client';

// Token-authenticated client for writes to the Haeden dataset. Server-side only.
export function getWriteClient() {
  if (!process.env.SANITY_TOKEN) throw new Error('SANITY_TOKEN not configured');
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7zclms7z',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
  });
}
