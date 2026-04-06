import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

const DEFAULT_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuChxP4_IbFfNDE4q3OPB8PHnTsmdI2_wEHgQuyaSr5lxqoEQYkGLHR38BliyTZmzmthvZNBy_QU090eRTz3FPpOx0KVeNEoEhe7Cjo_ESGvIfWyOz0kHbDkOlXFrrTRHt468FZuwRhRxLwLKgT5uUK1Oyl6q7XZ0thv0NVqt1eYq1b9bbtljmrYKiRLyKnW6iCaFeU5xrzwrViuJ1mHIzSLPhWgFr8otbit4S8cpA0sYVtF7chWXUZyb7W0XhmfOVXsdcaZuQ_dxZs'

interface PhilosophyProps {
  philosophyImage?: { asset: { _ref: string } }
}

export default function Philosophy({ philosophyImage }: PhilosophyProps) {
  const imgSrc = philosophyImage?.asset ? urlFor(philosophyImage).width(800).url() : DEFAULT_IMG

  return (
    <section id="philosophy" className="py-28 bg-cream">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <Image src={imgSrc} alt="Trusted mortgage consultation" width={600} height={450} className="rounded-xl shadow-2xl w-full object-cover" />
            <div className="absolute -bottom-8 -right-6 bg-navy text-white p-8 rounded-xl max-w-xs shadow-xl hidden md:block">
              <p className="font-headline text-xl font-bold leading-snug">"We don't just broker — we advocate for you."</p>
              <p className="text-gold text-sm mt-3 font-semibold">— The Haeden Promise</p>
            </div>
          </div>
          <div>
            <p className="text-gold-dark font-bold text-sm uppercase tracking-widest mb-4">Our Philosophy</p>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-navy mb-6">The Haeden Partnership</h2>
            <div className="space-y-6 text-ink-muted leading-relaxed">
              <p>We believe the home loan process should feel empowering — not overwhelming. Too often, borrowers are left confused by jargon, rushed through decisions, and handed a loan that serves the broker's commission, not their future.</p>
              <p>At Haeden Finance, we work differently. We take time to understand your complete financial picture, your goals, and your timeline. Then we engineer a solution — not just a product.</p>
              <p>Our broker's commission is paid by lenders, meaning you get expert guidance at no direct cost to you. Just clarity, strategy, and advocacy.</p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[['40+', 'Lenders'], ['98%', 'Approval Rate'], ['$2.1B+', 'Settled']].map(([val, label]) => (
                <div key={label}>
                  <p className="font-headline text-3xl font-extrabold text-navy">{val}</p>
                  <p className="text-ink-muted text-sm mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
