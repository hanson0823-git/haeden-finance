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

const challengeCards = [
  {
    _type: 'challengeCard',
    title: 'First Home Buyers',
    description: 'Navigating your first home loan can feel overwhelming. We simplify the process, help you access government grants, and get you into your first home sooner.',
    icon: 'family_restroom',
    theme: 'dark',
    isCta: false,
    order: 1,
  },
  {
    _type: 'challengeCard',
    title: 'Self-Employed Buyers',
    description: "Complex income structures shouldn't hold you back. We know which lenders understand self-employment and how to present your financials in the best light.",
    icon: 'work',
    theme: 'dark',
    isCta: false,
    order: 2,
  },
  {
    _type: 'challengeCard',
    title: 'Property Investors',
    description: 'Building a portfolio requires smart financing. We structure your loans to maximise borrowing power, tax efficiency, and long-term growth potential.',
    icon: 'trending_up',
    theme: 'dark',
    isCta: false,
    order: 3,
  },
  {
    _type: 'challengeCard',
    title: 'Refinancers',
    description: 'Are you paying too much? We review your current loan, compare hundreds of options, and move your mortgage to a better deal — often saving thousands.',
    icon: 'refresh',
    theme: 'dark',
    isCta: false,
    order: 4,
  },
  {
    _type: 'challengeCard',
    title: 'Credit-Challenged Buyers',
    description: "A difficult credit history doesn't have to mean no. We have access to specialist lenders who assess applications on merit, not just credit scores.",
    icon: 'credit_score',
    theme: 'dark',
    isCta: false,
    order: 5,
  },
  {
    _type: 'challengeCard',
    title: 'Your Situation',
    description: "Every client is different. Whatever your circumstances, let's have a free, no-obligation conversation about your options.",
    icon: 'chat',
    theme: 'gold',
    isCta: true,
    order: 6,
  },
];

async function seed() {
  console.log('Seeding articles...');
  for (const article of articles) {
    const result = await client.create(article);
    console.log(`Created article: ${result.title} (${result._id})`);
  }

  console.log('\nSeeding Who We Help cards...');
  for (const card of challengeCards) {
    const result = await client.create(card);
    console.log(`Created card: ${result.title} (${result._id})`);
  }

  console.log('\nDone!');
}

seed().catch(console.error);
