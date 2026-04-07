const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '7zclms7z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const services = [
  { _type: 'service', order: 1, title: 'Home Loans for New Purchase', description: "Whether it's your first home or your next upgrade, we simplify the complexity of the property market — and fight for the deal that suits you.", icon: 'home', theme: 'gold' },
  { _type: 'service', order: 2, title: 'Refinancing and Equity Release', description: 'Strategic restructuring to lower your rates and unlock equity for your next chapter.', icon: 'trending_up', theme: 'white' },
  { _type: 'service', order: 3, title: 'Investment Property', description: 'Tax-efficient structures designed for high-growth investment portfolios across Australia.', icon: 'apartment', theme: 'white' },
  { _type: 'service', order: 4, title: 'Construction & Renovation', description: 'Funding for your dream build. We manage progress payments and lender requirements so you can focus entirely on the design.', icon: 'architecture', theme: 'gold' },
  { _type: 'service', order: 5, title: 'Debt Consolidation', description: 'Simplify your finances by rolling multiple debts into one manageable repayment — reducing stress and often your total interest paid.', icon: 'merge_type', theme: 'navy' },
  { _type: 'service', order: 6, title: 'Asset Finance', description: 'Equipment, vehicles, and business assets — we find the right finance structure to grow your business without straining your cash flow.', icon: 'directions_car', theme: 'white' },
  { _type: 'service', order: 7, title: 'SMSF Loans', description: 'Grow your retirement wealth through property. We specialise in SMSF lending with lenders who understand the complexities of self-managed super.', icon: 'assured_workload', theme: 'white' },
];

const testimonials = [
  { _type: 'testimonial', name: 'Marcus & Sarah T.', role: 'New Farm Homeowners', initials: 'MS', body: "The level of advocacy was something we hadn't experienced before. Haeden Finance didn't just find a loan — they fought hard when our bank was being difficult.", featured: false },
  { _type: 'testimonial', name: 'David R.', role: 'Property Investor', initials: 'DR', body: 'Absolute professionals. They managed our complex investment property finance with zero stress. Haeden is our lifelong financial architect.', featured: true },
  { _type: 'testimonial', name: 'Elena K.', role: 'First Home Buyer, Paddington', initials: 'EK', body: 'As a first home buyer I was terrified of the process. The transparency and genuine care I received made it clear that Haeden was invested in my success — not just my transaction.', featured: false },
];

const challengeCards = [
  { _type: 'challengeCard', order: 1, title: 'First Home Buyers', description: 'Overwhelmed by the process? We guide you through every step — grants, guarantees, and all the fine print.', icon: 'family_restroom', theme: 'dark', isCta: false },
  { _type: 'challengeCard', order: 2, title: 'Self-Employed Buyers', description: "Complex income shouldn't hold you back. We know exactly which lenders understand business owners.", icon: 'work', theme: 'dark', isCta: false },
  { _type: 'challengeCard', order: 3, title: 'Property Investors', description: 'Building your portfolio? We structure loans to maximise equity and minimise tax across Australia.', icon: 'trending_up', theme: 'dark', isCta: false },
  { _type: 'challengeCard', order: 4, title: 'Refinancers', description: 'Stuck on a high rate or wanting to free up equity? We find a better deal and handle the entire switch.', icon: 'refresh', theme: 'dark', isCta: false },
  { _type: 'challengeCard', order: 5, title: 'Credit-Challenged Buyers', description: "Past credit issues don't define your future. We connect you with specialist lenders and build a plan.", icon: 'credit_score', theme: 'dark', isCta: false },
  { _type: 'challengeCard', order: 6, title: 'Your Situation', description: "Every challenge is unique. Tell us your story and we'll find a way forward together.", icon: 'chat', theme: 'gold', isCta: true },
];

async function seed() {
  console.log('Seeding services...');
  for (const item of services) {
    const result = await client.create(item);
    console.log(`  ✓ ${result.title}`);
  }

  console.log('\nSeeding testimonials...');
  for (const item of testimonials) {
    const result = await client.create(item);
    console.log(`  ✓ ${result.name}`);
  }

  console.log('\nSeeding Who We Help cards...');
  for (const item of challengeCards) {
    const result = await client.create(item);
    console.log(`  ✓ ${result.title}`);
  }

  console.log('\n✅ All done!');
}

seed().catch(console.error);
