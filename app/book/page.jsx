import { client, settingsQuery } from '../../lib/sanity';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BookingCalendar from './BookingCalendar';

export const revalidate = 60;

export const metadata = {
  title: 'Book a Free Consultation',
  description: 'Schedule a free, no-obligation consultation with Haeden Finance. Talk to a mortgage broker about your home loan, refinancing, or investment goals.',
  alternates: { canonical: 'https://haedenfinance.com.au/book' },
  openGraph: {
    title: 'Book a Free Consultation | Haeden Finance',
    description: 'Schedule a free, no-obligation chat with our mortgage broker team.',
    url: 'https://haedenfinance.com.au/book',
    type: 'website',
  },
};

export default async function BookPage() {
  let settings = null;
  try {
    settings = await client.fetch(settingsQuery, {}, { next: { revalidate: 60 } });
  } catch {}

  return (
    <>
      <Navbar settings={settings} />
      <main>
        <section className="pt-32 pb-12" style={{ background: '#0D1B2A' }}>
          <div className="container-xl text-center">
            <span className="section-label section-label-light">Free Consultation</span>
            <h1 className="font-headline font-extrabold text-5xl md:text-6xl text-white leading-tight mb-5">
              Book a Free Consultation
            </h1>
            <p className="font-body text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Choose a time that works for you. No obligations — just a genuine conversation about your property goals.
            </p>
          </div>
        </section>

        <section style={{ background: '#FAF6EE' }}>
          <div className="container-xl py-12" style={{ maxWidth: '860px' }}>
            <BookingCalendar />
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
