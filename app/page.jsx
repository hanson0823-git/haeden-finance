import { client, servicesQuery, testimonialsQuery, articlesQuery, settingsQuery } from '../lib/sanity';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PhilosophySection from '../components/PhilosophySection';
import ChallengeSection from '../components/ChallengeSection';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import ReviewsSection from '../components/ReviewsSection';
import ResourcesSection from '../components/ResourcesSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

async function getData() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  // Only fetch from Sanity if project ID is configured
  if (!projectId || projectId === 'your-project-id') {
    return { services: [], testimonials: [], articles: [], settings: null };
  }

  try {
    const [services, testimonials, articles, settings] = await Promise.all([
      client.fetch(servicesQuery),
      client.fetch(testimonialsQuery),
      client.fetch(articlesQuery),
      client.fetch(settingsQuery),
    ]);
    return { services, testimonials, articles, settings };
  } catch (error) {
    console.error('Failed to fetch from Sanity:', error);
    return { services: [], testimonials: [], articles: [], settings: null };
  }
}

export default async function HomePage() {
  const { services, testimonials, articles, settings } = await getData();

  return (
    <>
      <Navbar settings={settings} />
      <main>
        <HeroSection settings={settings} />
        <PhilosophySection settings={settings} />
        <ChallengeSection />
        <ServicesSection services={services} />
        <ProcessSection />
        <ReviewsSection testimonials={testimonials} />
        <ResourcesSection articles={articles} />
        <ContactSection settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
