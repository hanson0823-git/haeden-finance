import { client, settingsQuery } from '../lib/sanity';
import Navbar from './Navbar';
import Footer from './Footer';

export async function getSettings() {
  try {
    return await client.fetch(settingsQuery, {}, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}

export default function LegalPage({ settings, title, updated, children }) {
  return (
    <>
      <Navbar settings={settings} />
      <main>
        <section className="pt-32 pb-12" style={{ background: '#0D1B2A' }}>
          <div className="container-xl">
            <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-white leading-tight">
              {title}
            </h1>
            {updated && (
              <p className="font-body text-sm mt-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Last updated: {updated}
              </p>
            )}
          </div>
        </section>
        <section style={{ background: '#FAF6EE' }}>
          <div className="container-xl py-16" style={{ maxWidth: '820px' }}>
            <div className="legal-content font-body text-base leading-relaxed" style={{ color: '#3A3A4A' }}>
              {children}
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}

export function LegalHeading({ children }) {
  return (
    <h2 className="font-headline font-bold text-2xl mt-10 mb-4" style={{ color: '#0D1B2A' }}>
      {children}
    </h2>
  );
}

export function LegalParagraph({ children }) {
  return <p className="mb-4">{children}</p>;
}

export function LegalList({ items }) {
  return (
    <ul className="list-disc pl-6 mb-4 space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
