'use client'

import { useState } from 'react'
import Logo from './Logo'

const links = [
  { label: 'Our Philosophy', href: '#philosophy' },
  { label: 'Services',       href: '#services' },
  { label: 'How It Works',   href: '#process' },
  { label: 'Testimonials',   href: '#reviews' },
  { label: 'Resources',      href: '#resources' },
  { label: 'Contact',        href: '#contact' },
]

interface NavProps {
  logoImage?: { asset: { _ref: string } }
}

export default function Nav({ logoImage }: NavProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black shadow-lg">
        <div className="flex justify-between items-center px-8 py-3.5 max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3">
            <Logo logoImage={logoImage} />
            {!logoImage && (
              <span className="text-xl font-black tracking-tighter text-gold font-headline">Haeden Finance</span>
            )}
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-7">
            {links.map(l => (
              <a key={l.href} href={l.href} className="text-sm font-semibold text-white/60 hover:text-white transition-colors">{l.label}</a>
            ))}
            <a href="#contact" className="bg-gold text-navy px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-gold-dark transition-colors">Book a Free Chat</a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(o => !o)} className="md:hidden text-white p-1">
            <span className="material-symbols-outlined">{open ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className="md:hidden fixed z-49 w-full bg-navy shadow-2xl transition-transform duration-300"
        style={{ top: 56, transform: open ? 'translateY(0)' : 'translateY(-110%)', zIndex: 49 }}
      >
        <div className="flex flex-col py-4 px-6 space-y-1">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
               className="text-white/70 hover:text-white hover:bg-white/5 font-semibold py-3 px-4 rounded-lg transition-colors">
              {l.label}
            </a>
          ))}
          <div className="pt-2 pb-1">
            <a href="#contact" onClick={() => setOpen(false)}
               className="block bg-gold text-navy px-6 py-3 rounded-lg font-bold text-sm hover:bg-gold-dark transition-colors text-center">
              Book a Free Chat
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
