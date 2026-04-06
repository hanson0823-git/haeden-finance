import './globals.css';

export const metadata = {
  title: 'Haeden Finance | Your Home Loan Partner',
  description:
    "Australia's trusted mortgage broker. Tailored home loan solutions for first home buyers, investors, refinancers, and self-employed clients.",
  keywords: 'mortgage broker, home loan, refinancing, investment loan, first home buyer, Australia',
  openGraph: {
    title: 'Haeden Finance | Your Home Loan Partner',
    description: "Tailored mortgage solutions for your unique situation.",
    type: 'website',
  },
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
      </head>
      <body>{children}</body>
    </html>
  );
}
