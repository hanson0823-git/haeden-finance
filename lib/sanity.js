import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Queries
export const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id, title, description, icon, theme, tags,
  image { asset->{ url } }
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt asc) {
  _id, name, role, initials, body, featured
}`;

export const articlesQuery = `*[_type == "article"] | order(_createdAt desc) {
  _id, category, title, summary, content, icon, bg,
  image { asset->{ url } }
}`;

export const challengeCardsQuery = `*[_type == "challengeCard"] | order(order asc) {
  _id, title, description, icon, theme, isCta
}`;

export const settingsQuery = `*[_type == "siteSettings"][0] {
  siteName, tagline, heroHeading, heroSubheading,
  heroImage { asset->{ url } },
  philosophyImage { asset->{ url } },
  philosophyHeading, philosophyBody,
  address, email, phone,
  footerCompanyName, footerCopyright,
  footerLink1Label, footerLink1Url,
  footerLink2Label, footerLink2Url,
  footerLink3Label, footerLink3Url,
  footerLink4Label, footerLink4Url,
  logoImage { asset->{ url } }
}`;
