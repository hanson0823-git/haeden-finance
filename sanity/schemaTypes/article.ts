import { defineType, defineField } from 'sanity'

export const articleSchema = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({ name: 'category', title: 'Category', type: 'string', validation: r => r.required() }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'summary', title: 'Summary (shown on card)', type: 'text', rows: 3 }),
    defineField({
      name: 'content',
      title: 'Full Article Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({ name: 'image', title: 'Header Image (optional)', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'icon',
      title: 'Fallback Icon (Material Symbol)',
      type: 'string',
      initialValue: 'description',
    }),
    defineField({
      name: 'bg',
      title: 'Fallback Header Colour',
      type: 'string',
      options: { list: ['navy', 'gold', 'light', 'cream'], layout: 'radio' },
      initialValue: 'navy',
    }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
  ],
  orderings: [{ title: 'Newest First', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
})
