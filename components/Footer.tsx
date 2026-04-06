import Logo from './Logo'

interface FooterLink { label: string; url?: string }
interface FooterProps {
  logoImage?: { asset: { _ref: string } }
  company?: string
  copyright?: string
  links?: FooterLink[]
}

const DEFAULT_LINKS: FooterLink[] = [
  { label: 'Privacy Policy', url: '#' },
  { label: 'Terms of Service', url: '#' },
  { label: 'Credit Guide', url: '#' },
  { label: 'Disclosures', url: '#' },
]

export default function Footer({ logoImage, company, copyright, links }: FooterProps) {
  const footerLinks = links?.length ? links : DEFAULT_LINKS

  return (
    <footer className="bg-black">
      <div className="max-w-screen-xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center border-t border-white/10 gap-6">
        <div className="flex items-center gap-3">
          <Logo logoImage={logoImage} />
          {!logoImage && (
            <div>
              <div className="text-lg font-black text-gold font-headline">{company || 'Haeden Finance'}</div>
              <p className="text-xs text-white/35">{copyright || '© 2025 Haeden Finance. All rights reserved. Australian Credit Licence 123456.'}</p>
            </div>
          )}
          {logoImage && (
            <p className="text-xs text-white/35">{copyright || '© 2025 Haeden Finance. All rights reserved. Australian Credit Licence 123456.'}</p>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {footerLinks.map(l => (
            <a key={l.label} href={l.url || '#'} className="text-xs text-white/35 hover:text-gold transition-colors">{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
