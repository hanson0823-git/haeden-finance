'use client';

import { useState } from 'react';

const situationOptions = [
  'First Home Loan',
  'Investment Loan',
  'Refinancing',
  'Construction Loan',
  'Debt Consolidation',
  'Asset Finance',
  'SMSF Loan',
  'Self-Employed',
  'Other / Not Sure',
];

export default function ContactSection({ settings }) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', situation: '', message: '',
  });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  const address = settings?.address || 'Sydney, NSW, Australia';
  const email = settings?.email || 'hello@haedenfinance.com.au';
  const phone = settings?.phone || '';

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.message) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ firstName: '', lastName: '', email: '', situation: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

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

          {/* Right: Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 shadow-xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-body text-xs font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    placeholder="John"
                    className="w-full rounded-lg px-4 py-3 font-body text-sm text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                  />
                </div>
                <div>
                  <label className="block font-body text-xs font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Smith"
                    className="w-full rounded-lg px-4 py-3 font-body text-sm text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block font-body text-xs font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full rounded-lg px-4 py-3 font-body text-sm text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                />
              </div>

              <div className="mb-4">
                <label className="block font-body text-xs font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Your Situation
                </label>
                <select
                  name="situation"
                  value={form.situation}
                  onChange={handleChange}
                  className="w-full rounded-lg px-4 py-3 font-body text-sm text-white outline-none focus:ring-2 focus:ring-yellow-400 transition appearance-none"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <option value="" style={{ background: '#0D1B2A' }}>Select your situation</option>
                  {situationOptions.map(opt => (
                    <option key={opt} value={opt} style={{ background: '#0D1B2A' }}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block font-body text-xs font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Tell Us About Your Situation *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Share a bit about your property goals and current situation..."
                  className="w-full rounded-lg px-4 py-3 font-body text-sm text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-yellow-400 transition resize-none"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                />
              </div>

              {status === 'success' && (
                <div className="rounded-lg p-4 mb-4 text-sm font-body" style={{ background: 'rgba(245,194,0,0.15)', color: '#F5C200' }}>
                  Thank you! We'll be in touch within one business day.
                </div>
              )}
              {status === 'error' && (
                <div className="rounded-lg p-4 mb-4 text-sm font-body" style={{ background: 'rgba(255,80,80,0.15)', color: '#ff6060' }}>
                  Something went wrong. Please email us directly at {email}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full btn-gold justify-center text-base disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
                {status !== 'sending' && <span className="material-symbols-outlined text-xl">send</span>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
