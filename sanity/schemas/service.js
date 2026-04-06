import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'icon', title: 'Material Icon Name', type: 'string', description: 'e.g. home, apartment, business_center' }),
    defineField({
      name: 'theme',
      title: 'Card Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Gold (Gold bg, Navy text)', value: 'gold' },
          { title: 'Navy (Navy bg, White text)', value: 'navy' },
          { title: 'White (White bg, Navy text)', value: 'white' },
        ],
        layout: 'radio',
      },
      initialValue: 'white',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'image', title: 'Service Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'theme' } },
});
