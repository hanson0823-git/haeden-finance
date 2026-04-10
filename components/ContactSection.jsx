'use client';

import { useEffect } from 'react';

export default function ContactSection({ settings }) {
  const address = settings?.address || 'Sydney, NSW, Australia';
  const email = settings?.email || 'hello@haedenfinance.com.au';
  const phone = settings?.phone || '';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="contact" style={{ background: '#0D1B2A' }}>
      <div className="container-xl section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div>
            <span className="section-label section-label-light">Get in Touch</span>
            <h2 className="font-headline font-extrabold text-4xl md:text-5xl text-white leading-tight mb-6">
              Start Your Partnership Today
            </h2>
            <p className="font-body text-lg leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Ready to take the next step? Book a free, no-obligation consultation and let's talk about how we can help you achieve your property goals.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(245,194,0,0.12)' }}>
                  <span className="material-symbols-outlined text-xl" style={{ color: '#F5C200' }}>location_on</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-sm text-white mb-1">Our Office</p>
                  <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(245,194,0,0.12)' }}>
                  <span className="material-symbols-outlined text-xl" style={{ color: '#F5C200' }}>mail</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-sm text-white mb-1">Email Us</p>
                  <a href={`mailto:${email}`} className="font-body text-sm hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {email}
                  </a>
                </div>
              </div>

              {phone && (
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(245,194,0,0.12)' }}>
                    <span className="material-symbols-outlined text-xl" style={{ color: '#F5C200' }}>phone</span>
                  </div>
                  <div>
                    <p className="font-headline font-bold text-sm text-white mb-1">Call Us</p>
                    <a href={`tel:${phone}`} className="font-body text-sm hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {phone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: GHL Form */}
          <div>
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/yJiEJuTZQgMsw4Pazotp"
              style={{ width: '100%', height: '495px', border: 'none', borderRadius: '25px' }}
              id="inline-yJiEJuTZQgMsw4Pazotp"
              data-layout='{"id":"INLINE"}'
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Simple Enquiry Form"
              data-height="495"
              data-layout-iframe-id="inline-yJiEJuTZQgMsw4Pazotp"
              data-form-id="yJiEJuTZQgMsw4Pazotp"
              title="Simple Enquiry Form"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
