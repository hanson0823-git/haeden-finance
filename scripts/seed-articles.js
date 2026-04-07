const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '7zclms7z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const articles = [
  {
    _type: 'article',
    category: 'First Home Buyers',
    title: 'The Complete Guide to Your First Home Loan in 2024',
    summary: 'Everything you need to know about buying your first home in Australia — from saving your deposit to getting the keys. Includes government grants and schemes.',
    icon: 'home',
    bg: 'navy',
  },
  {
    _type: 'article',
    category: 'Investing',
    title: 'How to Maximise Your Borrowing Power as a Property Investor',
    summary: 'Smart loan structuring strategies that experienced investors use to build their portfolios faster without overextending their finances.',
    icon: 'trending_up',
    bg: 'gold',
  },
  {
    _type: 'article',
    category: 'Refinancing',
    title: "5 Signs It's Time to Refinance Your Home Loan",
    summary: "Not sure if refinancing is right for you? These five indicators will help you decide whether it's time to switch lenders and start saving.",
    icon: 'refresh',
    bg: 'grey',
  },
  {
    _type: 'article',
    category: 'Self-Employed',
    title: "Getting a Mortgage When You're Self-Employed: What You Need to Know",
    summary: "Self-employment shouldn't stop you from owning property. We break down the documentation, lender preferences, and strategies that work.",
    icon: 'business_center',
    bg: 'cream',
  },
  {
    _type: 'article',
    category: 'Market Insights',
    title: 'Interest Rate Outlook: What Borrowers Need to Know in 2024',
    summary: 'A clear-eyed look at where interest rates are heading and how to position your mortgage strategy to protect yourself regardless of what the RBA does next.',
    icon: 'bar_chart',
    bg: 'navy',
  },
  {
    _type: 'article',
    category: 'Construction',
    title: 'Construction Loans Explained: Building Your Dream Home',
    summary: 'Understanding progressive drawdowns, interest-only periods, and how to manage cash flow when building a new home from the ground up.',
    icon: 'construction',
    bg: 'gold',
  },
];

async function seed() {
  console.log('Seeding articles...');
  for (const article of articles) {
    const result = await client.create(article);
    console.log(`Created: ${result.title} (${result._id})`);
  }
  console.log('Done!');
}

seed().catch(console.error);
