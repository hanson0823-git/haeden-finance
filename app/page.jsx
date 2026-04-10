import { client, servicesQuery, testimonialsQuery, articlesQuery, settingsQuery, challengeCardsQuery } from '../lib/sanity';

export const dynamic = 'force-dynamic'; // Always fetch fresh data from Sanity
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

  if (!projectId || projectId === 'your-project-id') {
    return { services: [], testimonials: [], articles: [], settings: null, challengeCards: [] };
  }

  try {
    const fetchOpts = { cache: 'no-store' };
    const [services, testimonials, articles, settings, challengeCards] = await Promise.all([
      client.fetch(servicesQuery, {}, fetchOpts),
      client.fetch(testimonialsQuery, {}, fetchOpts),
      client.fetch(articlesQuery, {}, fetchOpts),
      client.fetch(settingsQuery, {}, fetchOpts),
      client.fetch(challengeCardsQuery, {}, fetchOpts),
    ]);
    return { services, testimonials, articles, settings, challengeCards };
  } catch (error) {
    console.error('Failed to fetch from Sanity:', error);
    return { services: [], testimonials: [], articles: [], settings: null, challengeCards: [] };
  }
}

export default async function HomePage() {
  const { services, testimonials, articles, settings, challengeCards } = await getData();

  return (
    <>
      <Navbar settings={settings} />
      <main>
        <HeroSection settings={settings} />
        <PhilosophySection settings={settings} />
        <ChallengeSection challengeCards={challengeCards} />
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
