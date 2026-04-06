import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Client Name', type: 'string', validation: R => R.required() }),
    defineField({ name: 'role', title: 'Role / Description', type: 'string', description: 'e.g. First Home Buyer, Property Investor' }),
    defineField({ name: 'initials', title: 'Avatar Initials', type: 'string', description: '2 letters, e.g. JD' }),
    defineField({ name: 'body', title: 'Testimonial Quote', type: 'text', rows: 4, validation: R => R.required() }),
    defineField({ name: 'featured', title: 'Featured (highlighted card)', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'name', subtitle: 'role' } },
});
