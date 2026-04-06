import { defineType, defineField } from 'sanity'

export const serviceSchema = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'theme',
      title: 'Card Colour',
      type: 'string',
      options: { list: ['gold', 'navy', 'white'], layout: 'radio' },
      initialValue: 'white',
    }),
    defineField({
      name: 'size',
      title: 'Card Size',
      type: 'string',
      options: { list: ['large', 'small'], layout: 'radio' },
      initialValue: 'small',
    }),
    defineField({ name: 'icon', title: 'Icon (Material Symbol name)', type: 'string' }),
    defineField({ name: 'image', title: 'Card Image (optional)', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'tags',
      title: 'Tags (shown on large cards)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
