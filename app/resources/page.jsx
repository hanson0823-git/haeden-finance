import { client, settingsQuery } from '../../lib/sanity';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ResourcesClient from './ResourcesClient';

export const revalidate = 60;

export const metadata = {
  title: 'Resources',
  description: 'Free guides, tips and insights on home loans, refinancing, and property investment from Haeden Finance.',
  alternates: { canonical: 'https://haedenfinance.com.au/resources' },
  openGraph: {
    title: 'Resources | Haeden Finance',
    description: 'Free guides, tips and insights on home loans, refinancing, and property investment.',
    url: 'https://haedenfinance.com.au/resources',
    type: 'website',
  },
};

export default async function ResourcesPage() {
  let settings = null;
  try {
    settings = await client.fetch(settingsQuery, {}, { next: { revalidate: 60 } });
  } catch {}

  return (
    <>
      <Navbar settings={settings} />
      <main>
        <ResourcesClient />
      </main>
      <Footer settings={settings} />
    </>
  );
}
