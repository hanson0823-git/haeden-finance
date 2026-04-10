import { client, settingsQuery } from '../../lib/sanity';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ResourcesClient from './ResourcesClient';

export const dynamic = 'force-dynamic';

export default async function ResourcesPage() {
  let settings = null;
  try {
    settings = await client.fetch(settingsQuery, {}, { cache: 'no-store' });
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
