// One-off cleanup: removes all legacy "testimonial" documents from Sanity.
// The site now shows Google reviews instead.
// Usage: SANITY_TOKEN=your_write_token node scripts/delete-testimonials.js

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '7zclms7z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function run() {
  const ids = await client.fetch('*[_type == "testimonial"]._id');
  if (ids.length === 0) {
    console.log('No testimonial documents found.');
    return;
  }
  const tx = client.transaction();
  ids.forEach(id => tx.delete(id));
  await tx.commit();
  console.log(`✓ Deleted ${ids.length} testimonial document(s).`);
}

run().catch(err => {
  console.error('✗ Failed:', err.message);
  process.exit(1);
});
