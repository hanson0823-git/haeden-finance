import { client } from './sanity'

export async function getServices() {
  if (!client) return []
  return client.fetch(`*[_type=="service"] | order(order asc)`)
}

export async function getArticles() {
  if (!client) return []
  return client.fetch(`*[_type=="article"] | order(publishedAt desc)`)
}

export async function getTestimonials() {
  if (!client) return []
  return client.fetch(`*[_type=="testimonial"] | order(order asc)`)
}

export async function getSiteSettings() {
  if (!client) return null
  return client.fetch(`*[_type=="siteSettings"][0]`)
}
