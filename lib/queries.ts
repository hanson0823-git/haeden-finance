import { client } from './sanity'

export async function getServices() {
  if (!client) return []
  try { return await client.fetch(`*[_type=="service"] | order(order asc)`) } catch { return [] }
}

export async function getArticles() {
  if (!client) return []
  try { return await client.fetch(`*[_type=="article"] | order(publishedAt desc)`) } catch { return [] }
}

export async function getTestimonials() {
  if (!client) return []
  try { return await client.fetch(`*[_type=="testimonial"] | order(order asc)`) } catch { return [] }
}

export async function getSiteSettings() {
  if (!client) return null
  try { return await client.fetch(`*[_type=="siteSettings"][0]`) } catch { return null }
}
