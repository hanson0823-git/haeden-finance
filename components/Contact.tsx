'use client'

interface ContactProps {
  address?: string
  email?: string
  phone?: string
}

export default function Contact({ address, email, phone }: ContactProps) {
  return (
    <section id="contact" className="py-28 bg-navy text-white">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">Get In Touch</p>
            <h2 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tighter mb-6">Start Your Partnership Today</h2>
            <p className="text-xl text-white/55 mb-14 leading-relaxed">The path to homeownership begins with a single honest conversation. Reach out to our team — no obligation, just clarity.</p>
            <div className="space-y-8">
              {address && (
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 border border-white/10">
                    <span className="material-symbols-outlined text-gold">location_on</span>
                  </div>
                  <div><p className="font-bold text-lg">Our Office</p><p className="text-white/50">{address}</p></div>
                </div>
              )}
              {email && (
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 border border-white/10">
                    <span className="material-symbols-outlined text-gold">mail</span>
                  </div>
                  <div><p className="font-bold text-lg">Email Us</p><p className="text-white/50">{email}</p></div>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 border border-white/10">
                    <span className="material-symbols-outlined text-gold">phone</span>
                  </div>
                  <div><p className="font-bold text-lg">Call Us</p><p className="text-white/50">{phone}</p></div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white/5 p-10 rounded-xl border border-white/10">
            <h3 className="font-headline text-2xl font-bold mb-8">Send an Enquiry</h3>
            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/45 block mb-2">First Name</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-gold text-white py-3 px-4 outline-none" placeholder="James" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/45 block mb-2">Last Name</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-gold text-white py-3 px-4 outline-none" placeholder="Wilson" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/45 block mb-2">Email Address</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-gold text-white py-3 px-4 outline-none" placeholder="james@email.com" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/45 block mb-2">Your Situation</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-gold text-white py-3 px-4 appearance-none outline-none">
                  {['First Home Loan','Investment Loan','Refinancing','Construction Loan','Debt Consolidation','Asset Finance','SMSF Loan','Self-Employed','Other / Not Sure'].map(o => (
                    <option key={o} className="bg-navy">{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/45 block mb-2">Tell Us About Your Situation</label>
                <textarea className="w-full bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-gold text-white py-3 px-4 outline-none" rows={4} placeholder="Share any details…" />
              </div>
              <button type="submit" className="w-full bg-gold text-navy font-bold py-4 rounded-lg hover:bg-gold-dark transition-colors font-headline">Send Enquiry</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
