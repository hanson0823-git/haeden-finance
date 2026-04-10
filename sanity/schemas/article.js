import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'article',
  title: 'Article / Resource',
  type: 'document',
  fields: [
    defineField({ name: 'category', title: 'Category', type: 'string', description: 'e.g. First Home Buyers, Investing, Refinancing' }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 2 }),
    defineField({
      name: 'content',
      title: 'Full Article Content (Markdown)',
      type: 'text',
      rows: 20,
      description: 'Write in Markdown. Use ## for headings, **bold**, *italic*, - for lists.',
    }),
    defineField({ name: 'icon', title: 'Material Icon Name', type: 'string', description: 'e.g. home, trending_up, account_balance' }),
    defineField({
      name: 'bg',
      title: 'Icon Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Navy', value: 'navy' },
          { title: 'Gold', value: 'gold' },
          { title: 'Light Grey', value: 'grey' },
          { title: 'Warm Cream', value: 'cream' },
        ],
      },
      initialValue: 'navy',
    }),
    defineField({ name: 'image', title: 'Article Header Image', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'title', subtitle: 'category' } },
});
