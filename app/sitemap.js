export default function sitemap() {
  const base = 'https://haedenfinance.com.au';
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/book`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ];
}
