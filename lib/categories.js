// Knowledge Hub categories: an English mirror of the 호주주민 blog's menu sections, in the same order.
export const CATEGORIES = [
  { title: 'Home Loans', icon: 'home', bg: 'navy', dot: '#2E9E73' },
  { title: 'Buying a Home', icon: 'real_estate_agent', bg: 'gold', dot: '#E0A91B' },
  { title: 'Building a New Home', icon: 'construction', bg: 'grey', dot: '#3C7DD9' },
  { title: 'Market & News', icon: 'bar_chart', bg: 'cream', dot: '#E9765B' },
];

export const CATEGORY_TITLES = CATEGORIES.map(c => c.title);

// Same rule as the blog's lib/sections.ts: the roadmap ID prefix decides the section.
const PREFIX = { H: 'Home Loans', 0: 'Home Loans', B: 'Buying a Home', N: 'Building a New Home', I: 'Market & News', E: 'Market & News' };

// The blog's legacy category slugs, for posts without a roadmap ID.
const LEGACY = {
  finance: 'Home Loans',
  'real-estate': 'Buying a Home',
  construction: 'Building a New Home',
  economy: 'Market & News',
  investment: 'Market & News',
  tax: 'Market & News',
};

export function categoryFor({ roadmapId, categorySlug }) {
  const prefix = roadmapId?.trim().charAt(0).toUpperCase();
  const title = (prefix && PREFIX[prefix]) || LEGACY[categorySlug];
  return CATEGORIES.find(c => c.title === title) || null;
}
