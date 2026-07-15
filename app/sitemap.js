export default function sitemap() {
  const base = 'https://haedenfinance.com.au';
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/credit-guide`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/disclosures`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
