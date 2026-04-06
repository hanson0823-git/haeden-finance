import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface Service {
  _id: string
  title: string
  description: string
  theme: 'gold' | 'navy' | 'white'
  size: 'large' | 'small'
  icon?: string
  image?: { asset: { _ref: string } }
  tags?: string[]
}

function svcStyle(theme: string) {
  if (theme === 'gold') return { wrap: 'bg-gold', txt: 'text-navy', icon: 'text-navy', sub: 'text-navy/75' }
  if (theme === 'navy') return { wrap: 'bg-navy', txt: 'text-white', icon: 'text-gold', sub: 'text-white/60' }
  return { wrap: 'bg-white group hover:bg-navy transition-all duration-500', txt: 'text-navy group-hover:text-white', icon: 'text-navy group-hover:text-gold', sub: 'text-ink-muted group-hover:text-white/60' }
}

export default function Services({ services }: { services: Service[] }) {
  if (!services?.length) return null

  // Split into layout rows matching original: [large, small] [small, large] [small, small, small]
  const [s1, s2, s3, s4, s5, s6, s7] = services

  return (
    <section id="services" className="py-28 bg-cream-dark">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <p className="text-gold-dark font-bold text-sm uppercase tracking-widest mb-4">What We Do</p>
            <h2 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tighter text-navy mb-4">Precision Services</h2>
            <p className="text-xl text-ink-muted">Expertly engineered financial solutions tailored for every situation.</p>
          </div>
          <a href="#contact" className="font-bold text-navy border-b-2 border-gold hover:border-navy transition-all pb-1 whitespace-nowrap">Talk to us →</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Row 1: large + small */}
          {s1 && <ServiceCard service={s1} colSpan={8} />}
          {s2 && <ServiceCard service={s2} colSpan={4} />}
          {/* Row 2: small + large */}
          {s3 && <ServiceCard service={s3} colSpan={4} />}
          {s4 && <ServiceCard service={s4} colSpan={8} />}
          {/* Row 3: three equal */}
          {s5 && <ServiceCard service={s5} colSpan={4} />}
          {s6 && <ServiceCard service={s6} colSpan={4} />}
          {s7 && <ServiceCard service={s7} colSpan={4} />}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service: s, colSpan }: { service: Service; colSpan: number }) {
  const st = svcStyle(s.theme)
  const imgSrc = s.image?.asset ? urlFor(s.image).width(400).url() : null

  return (
    <div className={`md:col-span-${colSpan} ${st.wrap} p-10 rounded-xl relative cursor-pointer`}>
      {s.icon && !imgSrc && (
        <span className={`material-symbols-outlined text-4xl mb-6 ${st.icon} block`}>{s.icon}</span>
      )}
      {imgSrc && (
        <div className="mb-6 rounded-lg overflow-hidden h-40">
          <Image src={imgSrc} alt={s.title} width={400} height={160} className="w-full h-full object-cover" />
        </div>
      )}
      <h3 className={`font-headline ${colSpan === 8 ? 'text-2xl' : 'text-xl'} font-bold mb-3 ${st.txt}`}>{s.title}</h3>
      <p className={`${st.sub} leading-relaxed max-w-md`}>{s.description}</p>
      {s.tags && colSpan === 8 && (
        <div className="flex gap-3 flex-wrap mt-6">
          {s.tags.map(t => (
            <span key={t} className="px-4 py-1 rounded-full border border-current/20 text-xs font-bold uppercase tracking-widest opacity-70">{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}
