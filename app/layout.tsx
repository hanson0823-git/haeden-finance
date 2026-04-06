import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Haeden Finance | Australia's Trusted Mortgage Partner",
  description: "Tailored mortgage solutions for your unique situation. We don't just find loans — we engineer your path to homeownership.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="bg-cream text-ink font-body">
        {children}
      </body>
    </html>
  )
}
