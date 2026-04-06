import { defineType, defineField } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'logoImage', title: 'Logo Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'philosophyImage', title: 'Philosophy Section Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'contactAddress', title: 'Office Address', type: 'text', rows: 2 }),
    defineField({ name: 'contactEmail', title: 'Email Address', type: 'string' }),
    defineField({ name: 'contactPhone', title: 'Phone Number (optional)', type: 'string' }),
    defineField({ name: 'footerCompany', title: 'Footer Company Name', type: 'string', initialValue: 'Haeden Finance' }),
    defineField({ name: 'footerCopyright', title: 'Footer Copyright Line', type: 'string', initialValue: '© 2025 Haeden Finance. All rights reserved. Australian Credit Licence 123456.' }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'url', title: 'URL', type: 'url' }),
        ],
      }],
    }),
  ],
})
