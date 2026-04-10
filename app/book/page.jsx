'use client';

import { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function BookPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
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

        {/* Calendar embed */}
        <section style={{ background: '#FAF6EE' }}>
          <div className="container-xl py-12" style={{ maxWidth: '860px' }}>
            <iframe
              src="https://api.leadconnectorhq.com/widget/booking/xbAWRdcBrAyMV5p9i6EV"
              style={{ width: '100%', border: 'none', overflow: 'hidden' }}
              scrolling="no"
              id="xbAWRdcBrAyMV5p9i6EV_1775780505569"
              height="700"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
