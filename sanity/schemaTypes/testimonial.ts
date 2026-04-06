import { defineType, defineField } from 'sanity'

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Client Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'role', title: 'Role / Location', type: 'string' }),
    defineField({ name: 'initials', title: 'Initials (2-3 chars)', type: 'string' }),
    defineField({ name: 'body', title: 'Quote', type: 'text', rows: 4, validation: r => r.required() }),
    defineField({ name: 'featured', title: 'Featured (large dark card)', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
})
