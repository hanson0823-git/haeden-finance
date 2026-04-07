import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'challengeCard',
  title: 'Who We Help Card',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'icon', title: 'Material Icon Name', type: 'string', description: 'e.g. home, work, trending_up, refresh, credit_score, chat' }),
    defineField({
      name: 'theme',
      title: 'Card Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Dark (Navy bg, gold icon)', value: 'dark' },
          { title: 'Gold (Gold bg, navy text) — use for CTA card', value: 'gold' },
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
    }),
    defineField({ name: 'isCta', title: 'Is CTA Card (shows "Book a Free Chat" button)', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'theme' } },
});
