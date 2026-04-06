interface Testimonial {
  _id: string
  name: string
  role?: string
  initials?: string
  body: string
  featured?: boolean
}

const Stars = () => (
  <div className="flex gap-0.5 text-gold mb-5">
    {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
  </div>
)

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()
}

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials?.length) return null

  const feat = testimonials.filter(t => t.featured)
  const rest = testimonials.filter(t => !t.featured)
  const ordered = feat.length
    ? [rest[0], feat[0], rest[1]].filter(Boolean).concat(rest.slice(2)).concat(feat.slice(1))
    : [...testimonials]

  return (
    <section id="reviews" className="py-28 bg-cream">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="mb-16">
          <p className="text-gold-dark font-bold text-sm uppercase tracking-widest mb-4">Client Stories</p>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-navy">Voices of Partnership</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {ordered.map(t => {
            const ini = t.initials || getInitials(t.name)
            if (t.featured) return (
              <div key={t._id} className="bg-navy text-white p-9 rounded-xl shadow-2xl md:scale-105 relative z-10">
                <Stars />
                <p className="text-white/80 italic mb-7 leading-relaxed text-lg">"{t.body}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gold flex items-center justify-center font-bold text-navy text-sm">{ini}</div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-white/45 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            )
            return (
              <div key={t._id} className="bg-white p-8 rounded-xl shadow-sm border border-cream-dark">
                <Stars />
                <p className="text-ink-muted italic mb-7 leading-relaxed">"{t.body}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gold/20 flex items-center justify-center font-bold text-navy text-sm">{ini}</div>
                  <div>
                    <p className="font-bold text-navy text-sm">{t.name}</p>
                    <p className="text-xs text-ink-light uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
