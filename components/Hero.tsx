import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface HeroProps {
  heroImage?: { asset: { _ref: string } }
}

const DEFAULT_HERO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEx17VsbkEfF7R3XgwcdKFbel1AnfnEvUb_I4rqJih6iO4KUpr_zNFUe9VxCiFx36goO73sWY1Ga5DMNLE4XAtcfHHWBiORRcvA_oscf_tVVUIgQ7bJneADUx5USZahS2WsP6SR1JjqYaR3yE1rGLkfJ5GkOjHBq1JYs8Q22oLUTp6b8hwcWUQvszZeW3d5lBUmccW8qd0skKAFrQ5d7zlN1_LdbGFMS8IYdFlmr6Pqd_OKynHziSzKat_bKJf7Knp0tF9XkTE5CA'

export default function Hero({ heroImage }: HeroProps) {
  const imgSrc = heroImage?.asset ? urlFor(heroImage).width(1920).url() : DEFAULT_HERO

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-navy">
      <div className="absolute inset-0 z-0">
        <Image src={imgSrc} alt="Modern city skyline" fill className="object-cover opacity-35 grayscale" priority />
      </div>
      <div className="relative z-10 max-w-screen-xl mx-auto px-8 w-full py-28">
        <div className="max-w-3xl">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-6">Australia's Trusted Mortgage Partner</p>
          <h1 className="font-headline text-6xl md:text-8xl font-extrabold text-white leading-none tracking-tighter mb-8">
            Your Home Loan Partner,<br/><span className="text-gold">Every Step</span> of the Way.
          </h1>
          <p className="text-xl text-white/70 max-w-xl mb-12 leading-relaxed">
            Tailored mortgage solutions for your unique situation. We don't just find loans — we engineer your path to homeownership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="bg-gold text-navy px-10 py-4 rounded-lg font-bold text-lg hover:bg-gold-dark transition-colors text-center">Begin Your Journey</a>
            <a href="#services" className="border-2 border-white/30 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors text-center">Our Services</a>
          </div>
        </div>
      </div>
    </section>
  )
}
