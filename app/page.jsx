import { client, servicesQuery, articlesQuery, settingsQuery, challengeCardsQuery } from '../lib/sanity';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PhilosophySection from '../components/PhilosophySection';
import ChallengeSection from '../components/ChallengeSection';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import ReviewsSection from '../components/ReviewsSection';
import FaqSection from '../components/FaqSection';
import ResourcesSection from '../components/ResourcesSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { getGoogleReviews, hasReviews } from '../lib/googleReviews';

export const revalidate = 60;

async function getData() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  if (!projectId || projectId === 'your-project-id') {
    return { services: [], articles: [], settings: null, challengeCards: [] };
  }

  try {
    const fetchOpts = { next: { revalidate: 60 } };
    const [services, articles, settings, challengeCards] = await Promise.all([
      client.fetch(servicesQuery, {}, fetchOpts),
      client.fetch(articlesQuery, {}, fetchOpts),
      client.fetch(settingsQuery, {}, fetchOpts),
      client.fetch(challengeCardsQuery, {}, fetchOpts),
    ]);
    return { services, articles, settings, challengeCards };
  } catch (error) {
    console.error('Failed to fetch from Sanity:', error);
    return { services: [], articles: [], settings: null, challengeCards: [] };
  }
}

export default async function HomePage() {
  const [{ services, articles, settings, challengeCards }, google] = await Promise.all([
    getData(),
    getGoogleReviews(),
  ]);

  return (
    <>
      <Navbar settings={settings} showReviews={hasReviews(google, settings)} />
      <main>
        <HeroSection settings={settings} />
        <PhilosophySection settings={settings} />
        <ChallengeSection challengeCards={challengeCards} />
        <ServicesSection services={services} />
        <ProcessSection />
        <ReviewsSection google={google} settings={settings} />
        <FaqSection />
        <ResourcesSection articles={articles} />
        <ContactSection settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
