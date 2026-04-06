// Sanity seed script - run with: node scripts/seed.mjs
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '8ujjkobc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// ─── SERVICES ────────────────────────────────────────────────────────────────
const services = [
  {
    _type: 'service',
    _id: 'service-1',
    order: 1,
    title: 'First Home Loans',
    description: 'Buying your first home is one of life\'s biggest milestones. We guide you through every step — government grants, guarantees, deposit strategies, and finding the right lender to make your dream a reality sooner.',
    theme: 'gold',
    size: 'large',
    icon: 'home',
    tags: ['FHOG Eligible', 'First Home Buyer Guarantee', 'Pre-Approval Ready'],
  },
  {
    _type: 'service',
    _id: 'service-2',
    order: 2,
    title: 'Investment Property Loans',
    description: 'Grow your wealth through property. We structure your investment loan to maximise equity, manage cash flow, and optimise your tax position across your entire portfolio.',
    theme: 'white',
    size: 'small',
    icon: 'trending_up',
  },
  {
    _type: 'service',
    _id: 'service-3',
    order: 3,
    title: 'Construction & Renovation',
    description: 'Building your dream home or undertaking a major renovation? Our construction loan specialists manage progress draws, builder contracts, and lender requirements — so you can focus on the build.',
    theme: 'white',
    size: 'large',
    icon: 'architecture',
  },
  {
    _type: 'service',
    _id: 'service-4',
    order: 4,
    title: 'Refinancing',
    description: 'Your current lender may not be offering you the best deal. We analyse your existing loan, compare 40+ lenders, and handle the entire refinancing process — saving you thousands with minimal effort.',
    theme: 'navy',
    size: 'large',
    icon: 'refresh',
  },
  {
    _type: 'service',
    _id: 'service-5',
    order: 5,
    title: 'Debt Consolidation',
    description: 'Simplify your finances by merging multiple debts into a single, manageable home loan. Reduce your overall repayments and regain control of your financial future.',
    theme: 'white',
    size: 'small',
    icon: 'merge_type',
  },
  {
    _type: 'service',
    _id: 'service-6',
    order: 6,
    title: 'Asset Finance',
    description: 'From vehicles to equipment, we arrange competitive asset finance solutions for individuals and businesses — quick approvals, flexible terms, and rates that work for you.',
    theme: 'white',
    size: 'small',
    icon: 'directions_car',
  },
  {
    _type: 'service',
    _id: 'service-7',
    order: 7,
    title: 'SMSF Loans',
    description: 'Unlock the power of your self-managed super fund to invest in property. We navigate the complex SMSF lending landscape and connect you with specialist lenders who understand your strategy.',
    theme: 'white',
    size: 'small',
    icon: 'assured_workload',
  },
]

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────
const testimonials = [
  {
    _type: 'testimonial',
    _id: 'testimonial-1',
    order: 1,
    name: 'Marcus & Sarah T.',
    role: 'First Home Buyers, Sydney',
    initials: 'MS',
    body: 'We thought buying our first home was years away. Haeden Finance found us a lender who accepted our situation and walked us through every step. We settled in just 6 weeks. Absolutely incredible service.',
    featured: false,
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-2',
    order: 2,
    name: 'James W.',
    role: 'Property Investor, Melbourne',
    initials: 'JW',
    body: 'I\'ve worked with other brokers before, but Haeden Finance is on another level. They restructured my entire portfolio across three properties, reduced my repayments, and set me up perfectly for my next acquisition. This is what genuine advocacy looks like.',
    featured: true,
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-3',
    order: 3,
    name: 'Emma L.',
    role: 'Self-Employed Buyer, Brisbane',
    initials: 'EL',
    body: 'As a self-employed person with complex financials, I was knocked back by two banks. Haeden Finance knew exactly which lenders to approach and how to present my income. We got approved within two weeks.',
    featured: false,
  },
]

// ─── ARTICLES ────────────────────────────────────────────────────────────────
const articles = [
  {
    _type: 'article',
    _id: 'article-1',
    category: 'First Home Buyers',
    title: 'How to Get Pre-Approved: A Step-by-Step Guide',
    summary: 'Pre-approval gives you clarity on your budget and makes you a serious buyer in the eyes of sellers. Here\'s exactly what you need to get started.',
    content: [
      {
        _type: 'block',
        _key: 'a1b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a1s1', text: 'Getting pre-approved for a home loan is one of the smartest first steps you can take on your homeownership journey. It tells you exactly how much you can borrow, strengthens your offer with sellers, and helps you search with confidence.' }],
      },
      {
        _type: 'block',
        _key: 'a1b2',
        style: 'h2',
        children: [{ _type: 'span', _key: 'a1s2', text: 'What You\'ll Need' }],
      },
      {
        _type: 'block',
        _key: 'a1b3',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a1s3', text: 'To apply for pre-approval, lenders will typically require: proof of income (payslips or tax returns), bank statements from the last 3-6 months, identification documents, details of any existing debts or liabilities, and information about the property you\'re looking to purchase.' }],
      },
      {
        _type: 'block',
        _key: 'a1b4',
        style: 'h2',
        children: [{ _type: 'span', _key: 'a1s4', text: 'How Long Does It Take?' }],
      },
      {
        _type: 'block',
        _key: 'a1b5',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a1s5', text: 'Most lenders can provide conditional pre-approval within 1-3 business days when all documents are in order. Formal pre-approval may take slightly longer. Pre-approval is typically valid for 90 days, giving you time to find the right property.' }],
      },
      {
        _type: 'block',
        _key: 'a1b6',
        style: 'h2',
        children: [{ _type: 'span', _key: 'a1s6', text: 'Tips to Strengthen Your Application' }],
      },
      {
        _type: 'block',
        _key: 'a1b7',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a1s7', text: 'Save a genuine deposit of at least 5-10%, reduce your existing debts and credit card limits before applying, avoid applying to multiple lenders at once (it impacts your credit score), and work with a broker who can match you to the right lender first time.' }],
      },
    ],
    icon: 'account_balance',
    bg: 'navy',
    publishedAt: '2025-03-01',
  },
  {
    _type: 'article',
    _id: 'article-2',
    category: 'Property Investment',
    title: 'Understanding LVR: What It Means for Your Loan',
    summary: 'Loan-to-Value Ratio (LVR) is one of the most important numbers in property finance. Here\'s what it means and how to use it to your advantage.',
    content: [
      {
        _type: 'block',
        _key: 'a2b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a2s1', text: 'Loan-to-Value Ratio (LVR) is the percentage of a property\'s value that you\'re borrowing. For example, if you\'re buying a $700,000 property and borrowing $560,000, your LVR is 80%. This number has a significant impact on your interest rate, borrowing capacity, and whether you\'ll need to pay Lenders Mortgage Insurance (LMI).' }],
      },
      {
        _type: 'block',
        _key: 'a2b2',
        style: 'h2',
        children: [{ _type: 'span', _key: 'a2s2', text: 'Why 80% LVR Is the Magic Number' }],
      },
      {
        _type: 'block',
        _key: 'a2b3',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a2s3', text: 'Most lenders consider an LVR of 80% or below to be "safe." Above this threshold, lenders typically require you to pay Lenders Mortgage Insurance — a one-off premium that can add thousands to your loan. Staying at or below 80% LVR can save you significant money and unlock better interest rates.' }],
      },
      {
        _type: 'block',
        _key: 'a2b4',
        style: 'h2',
        children: [{ _type: 'span', _key: 'a2s4', text: 'How to Improve Your LVR' }],
      },
      {
        _type: 'block',
        _key: 'a2b5',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a2s5', text: 'You can improve your LVR by saving a larger deposit, using a guarantor arrangement, or leveraging equity in an existing property. As your property increases in value over time, your LVR naturally decreases — which can open doors to better rates and additional borrowing.' }],
      },
    ],
    icon: 'percent',
    bg: 'gold',
    publishedAt: '2025-03-10',
  },
  {
    _type: 'article',
    _id: 'article-3',
    category: 'First Home Buyers',
    title: 'First Home Buyer Grants & Schemes in Australia (2025)',
    summary: 'Australia has multiple government schemes designed to help first home buyers enter the market sooner. Find out what you may be eligible for.',
    content: [
      {
        _type: 'block',
        _key: 'a3b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a3s1', text: 'The Australian government offers a range of grants and schemes to help first home buyers get into the market. These can make a significant difference to your deposit size and borrowing costs — but eligibility criteria can be complex.' }],
      },
      {
        _type: 'block',
        _key: 'a3b2',
        style: 'h2',
        children: [{ _type: 'span', _key: 'a3s2', text: 'First Home Guarantee (FHBG)' }],
      },
      {
        _type: 'block',
        _key: 'a3b3',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a3s3', text: 'The First Home Guarantee allows eligible buyers to purchase with as little as a 5% deposit without paying LMI. The government guarantees up to 15% of the loan value. Places are limited each financial year, so timing matters.' }],
      },
      {
        _type: 'block',
        _key: 'a3b4',
        style: 'h2',
        children: [{ _type: 'span', _key: 'a3s4', text: 'First Home Owner Grant (FHOG)' }],
      },
      {
        _type: 'block',
        _key: 'a3b5',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a3s5', text: 'The FHOG is a one-off payment available when you buy or build a new home. The amount varies by state — from $10,000 in NSW and VIC to $30,000 in QLD and NT. Eligibility depends on the property value and whether you\'ve owned property before.' }],
      },
      {
        _type: 'block',
        _key: 'a3b6',
        style: 'h2',
        children: [{ _type: 'span', _key: 'a3s6', text: 'Help to Buy Scheme' }],
      },
      {
        _type: 'block',
        _key: 'a3b7',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a3s7', text: 'Under the Help to Buy scheme, the government co-purchases up to 40% of a new home or 30% of an existing home, reducing your deposit and mortgage size. You own your share outright and can buy out the government\'s share over time.' }],
      },
    ],
    icon: 'account_balance',
    bg: 'cream',
    publishedAt: '2025-03-20',
  },
  {
    _type: 'article',
    _id: 'article-4',
    category: 'Refinancing',
    title: 'When to Refinance Your Home Loan (And When to Wait)',
    summary: 'Refinancing can save you tens of thousands of dollars over the life of your loan — but timing and strategy matter enormously.',
    content: [
      {
        _type: 'block',
        _key: 'a4b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a4s1', text: 'Refinancing your home loan means replacing your existing mortgage with a new one — either with the same lender or a different one. When done at the right time, refinancing can significantly reduce your interest rate, lower your monthly repayments, and save you tens of thousands over the life of your loan.' }],
      },
      {
        _type: 'block',
        _key: 'a4b2',
        style: 'h2',
        children: [{ _type: 'span', _key: 'a4s2', text: 'Signs It\'s Time to Refinance' }],
      },
      {
        _type: 'block',
        _key: 'a4b3',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a4s3', text: 'You should consider refinancing if: your current rate is more than 0.5% above the best rates available, your fixed rate period is ending, your financial situation has improved (better income, lower debts), you want to access equity for renovations or investment, or you want to consolidate other debts.' }],
      },
      {
        _type: 'block',
        _key: 'a4b4',
        style: 'h2',
        children: [{ _type: 'span', _key: 'a4s4', text: 'Watch Out for Break Costs' }],
      },
      {
        _type: 'block',
        _key: 'a4b5',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a4s5', text: 'If you\'re on a fixed rate, breaking your loan early can result in significant fees. We always run a full break-cost analysis to ensure refinancing actually puts you ahead. Sometimes waiting until your fixed period ends is the smarter move.' }],
      },
    ],
    icon: 'refresh',
    bg: 'navy',
    publishedAt: '2025-04-01',
  },
  {
    _type: 'article',
    _id: 'article-5',
    category: 'Self-Employed',
    title: 'Getting a Home Loan When You\'re Self-Employed',
    summary: 'Self-employment shouldn\'t stop you from owning property. Learn how lenders assess self-employed income and what you can do to strengthen your application.',
    content: [
      {
        _type: 'block',
        _key: 'a5b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a5s1', text: 'Being self-employed doesn\'t disqualify you from getting a home loan — but it does mean lenders will assess your income differently. Standard payslip-based income verification doesn\'t apply, so understanding how lenders view your financials is key to a successful application.' }],
      },
      {
        _type: 'block',
        _key: 'a5b2',
        style: 'h2',
        children: [{ _type: 'span', _key: 'a5s2', text: 'What Lenders Look For' }],
      },
      {
        _type: 'block',
        _key: 'a5b3',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a5s3', text: 'Most lenders will want 2 years of personal and business tax returns, 2 years of ATO Notice of Assessments, and recent business financials. They\'ll look at your average income over two years, business stability, and the nature of your self-employment.' }],
      },
      {
        _type: 'block',
        _key: 'a5b4',
        style: 'h2',
        children: [{ _type: 'span', _key: 'a5s4', text: 'Low-Doc and Alt-Doc Options' }],
      },
      {
        _type: 'block',
        _key: 'a5b5',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a5s5', text: 'If you can\'t provide 2 years of tax returns (for example, if your business is newer), some lenders offer "low-doc" or "alt-doc" loans. These accept alternative income verification like BAS statements, accountant declarations, or bank statements. Rates are slightly higher, but they open doors that would otherwise be closed.' }],
      },
    ],
    icon: 'work',
    bg: 'light',
    publishedAt: '2025-04-05',
  },
  {
    _type: 'article',
    _id: 'article-6',
    category: 'Property Investment',
    title: 'Building a Property Portfolio: What You Need to Know',
    summary: 'Growing from one investment property to many requires careful loan structuring, equity management, and a long-term strategy. Here\'s how to approach it.',
    content: [
      {
        _type: 'block',
        _key: 'a6b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a6s1', text: 'Building a property portfolio is one of Australia\'s most reliable paths to long-term wealth — but it requires a deliberate strategy from the very first purchase. How you structure your loans today will determine how many properties you can ultimately acquire.' }],
      },
      {
        _type: 'block',
        _key: 'a6b2',
        style: 'h2',
        children: [{ _type: 'span', _key: 'a6s2', text: 'Cross-Collateralisation: A Warning' }],
      },
      {
        _type: 'block',
        _key: 'a6b3',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a6s3', text: 'Many investors unknowingly cross-collateralise their properties — linking multiple securities to a single lender. While this may seem convenient, it gives lenders excessive control over your portfolio and can severely limit your ability to sell or refinance individual properties. We always recommend standalone loan structures.' }],
      },
      {
        _type: 'block',
        _key: 'a6b4',
        style: 'h2',
        children: [{ _type: 'span', _key: 'a6s4', text: 'Using Equity to Grow' }],
      },
      {
        _type: 'block',
        _key: 'a6b5',
        style: 'normal',
        children: [{ _type: 'span', _key: 'a6s5', text: 'As your properties increase in value, you build equity — the difference between what your property is worth and what you owe. You can access this equity to fund deposits on additional properties. Strategic equity release, done correctly, allows you to grow your portfolio without needing fresh cash savings each time.' }],
      },
    ],
    icon: 'trending_up',
    bg: 'gold',
    publishedAt: '2025-04-06',
  },
]

// ─── SITE SETTINGS ────────────────────────────────────────────────────────────
const siteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  contactAddress: 'Level 10, 123 Pitt Street, Sydney NSW 2000',
  contactEmail: 'hello@haedenfinance.com.au',
  contactPhone: '+61 2 9000 0000',
  footerCompany: 'Haeden Finance',
  footerCopyright: '© 2025 Haeden Finance. All rights reserved. Australian Credit Licence 123456.',
  footerLinks: [
    { _key: 'fl1', label: 'Privacy Policy', url: '#' },
    { _key: 'fl2', label: 'Terms of Service', url: '#' },
    { _key: 'fl3', label: 'Credit Guide', url: '#' },
    { _key: 'fl4', label: 'Disclosures', url: '#' },
  ],
}

// ─── SEED ─────────────────────────────────────────────────────────────────────
async function seed() {
  console.log('🌱 Seeding Sanity with Haeden Finance content...\n')

  const docs = [...services, ...testimonials, ...articles, siteSettings]

  for (const doc of docs) {
    try {
      await client.createOrReplace(doc)
      console.log(`✓ ${doc._type}: ${doc.title || doc.name || doc._id}`)
    } catch (err) {
      console.error(`✗ Failed: ${doc._id}`, err.message)
    }
  }

  console.log('\n✅ Seeding complete!')
}

seed()
