'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { label: 'Our Philosophy', href: '#philosophy' },
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#process' },
  { label: 'Testimonials', href: '#reviews' },
  { label: 'Resources', href: '#resources' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ settings }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? 'rgba(0,0,0,0.97)' : 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
    >
      <div className="container-xl">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            {settings?.logoImage?.asset?.url ? (
              <Image src={settings.logoImage.asset.url} alt="Haeden Finance" width={40} height={40} className="h-10 w-auto" />
            ) : (
              <div className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: '#000', border: '1.5px solid #F5C200' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 10L10 3L17 10V17H13V13H7V17H3V10Z" stroke="#F5C200" strokeWidth="1.5" strokeLinejoin="round"/>
                  <line x1="13" y1="7" x2="18" y2="2" stroke="#F5C200" strokeWidth="1.5" strokeLinecap="round"/>
                  <polyline points="15,2 18,2 18,5" stroke="#F5C200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
            <span className="font-headline font-bold text-white text-lg tracking-tight">
              {settings?.siteName || 'Haeden Finance'}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => handleNavClick(e, link.href)}
                className="font-body text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={e => handleNavClick(e, '#contact')}
              className="hidden md:inline-flex items-center btn-gold text-sm py-2.5 px-5"
            >
              Book a Free Chat
            </a>
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 text-white"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? '400px' : '0',
          background: 'rgba(0,0,0,0.98)',
        }}
      >
        <div className="container-xl py-4 flex flex-col gap-1 border-t border-white/10">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => handleNavClick(e, link.href)}
              className="font-body text-sm font-medium text-white/80 hover:text-white py-3 border-b border-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={e => handleNavClick(e, '#contact')}
            className="btn-gold mt-4 justify-center"
          >
            Book a Free Chat
          </a>
        </div>
      </div>
    </header>
  );
}
