import Nav          from '@/components/Nav'
import Hero         from '@/components/Hero'
import Philosophy   from '@/components/Philosophy'
import Services     from '@/components/Services'
import Process      from '@/components/Process'
import Testimonials from '@/components/Testimonials'
import Articles     from '@/components/Articles'
import Contact      from '@/components/Contact'
import Footer       from '@/components/Footer'
import {
  getServices,
  getArticles,
  getTestimonials,
  getSiteSettings,
} from '@/lib/queries'

export const revalidate = 60 // ISR: re-fetch every 60 seconds

export default async function Home() {
  const [services, articles, testimonials, settings] = await Promise.all([
    getServices(),
    getArticles(),
    getTestimonials(),
    getSiteSettings(),
  ])

  return (
    <>
      <Nav logoImage={settings?.logoImage} />
      <main className="pt-16">
        <Hero       heroImage={settings?.heroImage} />
        <Philosophy philosophyImage={settings?.philosophyImage} />
        <Services   services={services} />
        <Process />
        <Testimonials testimonials={testimonials} />
        <Articles   articles={articles} />
        <Contact
          address={settings?.contactAddress}
          email={settings?.contactEmail}
          phone={settings?.contactPhone}
        />
      </main>
      <Footer
        logoImage={settings?.logoImage}
        company={settings?.footerCompany}
        copyright={settings?.footerCopyright}
        links={settings?.footerLinks}
      />
    </>
  )
}
