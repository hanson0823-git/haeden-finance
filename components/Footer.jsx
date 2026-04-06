import Link from 'next/link';
import Image from 'next/image';

export default function Footer({ settings }) {
  const companyName = settings?.footerCompanyName || settings?.siteName || 'Haeden Finance';
  const copyright = settings?.footerCopyright || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`;

  const links = [
    { label: settings?.footerLink1Label || 'Privacy Policy', href: settings?.footerLink1Url || '#' },
    { label: settings?.footerLink2Label || 'Terms of Service', href: settings?.footerLink2Url || '#' },
    { label: settings?.footerLink3Label || 'Credit Guide', href: settings?.footerLink3Url || '#' },
    { label: settings?.footerLink4Label || 'Disclosures', href: settings?.footerLink4Url || '#' },
  ];

  return (
    <footer style={{ background: '#000' }}>
      <div className="container-xl py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            {settings?.logoImage?.asset?.url ? (
              <Image src={settings.logoImage.asset.url} alt={companyName} width={32} height={32} className="h-8 w-auto" />
            ) : (
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ border: '1px solid #F5C200' }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M3 10L10 3L17 10V17H13V13H7V17H3V10Z" stroke="#F5C200" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
            <div>
              <p className="font-headline font-bold text-white text-sm">{companyName}</p>
              <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{copyright}</p>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="font-body text-xs text-center max-w-sm hidden lg:block" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Haeden Finance is an authorised credit representative. Australian Credit Licence applies.
          </p>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-xs transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile disclaimer */}
        <p className="font-body text-xs text-center mt-6 lg:hidden" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Haeden Finance is an authorised credit representative. Australian Credit Licence applies.
        </p>
      </div>
    </footer>
  );
}
