import { defineType, defineField } from 'sanity';
import { CATEGORY_TITLES } from '../../lib/categories';

export default defineType({
  name: 'article',
  title: 'Article / Resource',
  type: 'document',
  fields: [
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: CATEGORY_TITLES, layout: 'radio' } }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 2 }),
    defineField({
      name: 'content',
      title: 'Full Article Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'object',
          name: 'table',
          title: 'Table',
          fields: [
            {
              name: 'rows',
              title: 'Rows',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'tableRow',
                  title: 'Row',
                  fields: [
                    {
                      name: 'cells',
                      title: 'Cells',
                      type: 'array',
                      of: [{ type: 'string' }],
                    },
                  ],
                  preview: {
                    select: { cells: 'cells' },
                    prepare: ({ cells }) => ({ title: (cells || []).join(' | ') }),
                  },
                },
              ],
            },
          ],
          preview: {
            prepare: () => ({ title: 'Table' }),
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
          ],
        },
      ],
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
    // Set by the 호주주민 sync (lib/hojuSync.js); empty for articles written here.
    defineField({ name: 'sourcePostId', title: '호주주민 source post ID', type: 'string', readOnly: true }),
    defineField({ name: 'sourceSlug', title: '호주주민 source slug', type: 'string', readOnly: true }),
    defineField({ name: 'sourceHash', title: 'Source content hash', type: 'string', readOnly: true, hidden: true }),
    defineField({
      name: 'review',
      title: 'Translation review',
      type: 'object',
      readOnly: true,
      hidden: ({ document }) => !document?.review,
      fields: [
        defineField({ name: 'verdict', title: 'Verdict', type: 'string' }),
        defineField({
          name: 'issues',
          title: 'Issues flagged',
          type: 'array',
          of: [{
            type: 'object',
            name: 'reviewIssue',
            fields: [
              defineField({ name: 'kind', title: 'Kind', type: 'string' }),
              defineField({ name: 'detail', title: 'Detail', type: 'text', rows: 2 }),
              defineField({ name: 'english', title: 'English', type: 'text', rows: 2 }),
              defineField({ name: 'korean', title: 'Korean', type: 'text', rows: 2 }),
            ],
            preview: { select: { title: 'detail', subtitle: 'kind' } },
          }],
        }),
        defineField({ name: 'model', title: 'Reviewer model', type: 'string' }),
        defineField({ name: 'reviewedAt', title: 'Reviewed at', type: 'datetime' }),
      ],
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'category' } },
});
