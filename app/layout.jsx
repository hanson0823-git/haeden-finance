import './globals.css';

const siteUrl = 'https://haedenfinance.com.au';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Haeden Finance | Mortgage Broker Australia',
    template: '%s | Haeden Finance',
  },
  description:
    "Australia's trusted mortgage broker. Tailored home loan solutions for first home buyers, investors, refinancers, and self-employed clients.",
  keywords: 'mortgage broker, home loan, refinancing, investment loan, first home buyer, Australia, Sydney',
  authors: [{ name: 'Haeden Finance' }],
  creator: 'Haeden Finance',
  publisher: 'Haeden Finance',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Haeden Finance | Mortgage Broker Australia',
    description: "Tailored home loan solutions for first home buyers, investors, refinancers, and self-employed clients.",
    url: siteUrl,
    siteName: 'Haeden Finance',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Haeden Finance — Mortgage Broker Australia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haeden Finance | Mortgage Broker Australia',
    description: "Tailored home loan solutions for first home buyers, investors, refinancers, and self-employed clients.",
    images: ['/og-image.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'Haeden Finance',
  url: siteUrl,
  logo: `${siteUrl}/og-image.jpg`,
  description: "Australia's trusted mortgage broker. Tailored home loan solutions for first home buyers, investors, refinancers, and self-employed clients.",
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AU',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hanson@haedenfinance.com.au',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  sameAs: [],
  areaServed: {
    '@type': 'Country',
    name: 'Australia',
  },
  serviceType: ['Mortgage Broking', 'Home Loans', 'Refinancing', 'Investment Loans', 'First Home Buyer Loans'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
