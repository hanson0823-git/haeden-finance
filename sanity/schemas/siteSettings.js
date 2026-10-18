import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['create', 'update', 'publish'],
  fields: [
    // Branding
    defineField({ name: 'siteName', title: 'Site Name', type: 'string', initialValue: 'Haeden Finance' }),
    defineField({ name: 'logoImage', title: 'Logo Image (SVG, PNG or JPG)', type: 'file', options: { accept: 'image/svg+xml,image/png,image/jpeg,image/webp' } }),

    // Hero
    defineField({ name: 'tagline', title: 'Hero Tagline (small label)', type: 'string', initialValue: "Australia's Trusted Mortgage Partner" }),
    defineField({ name: 'heroHeading', title: 'Hero Main Heading', type: 'string', initialValue: 'Your Home Loan Partner, Every Step of the Way.' }),
    defineField({ name: 'heroSubheading', title: 'Hero Subheading', type: 'text', rows: 2 }),
    defineField({ name: 'heroImage', title: 'Hero Background Image', type: 'image' }),

    // Philosophy
    defineField({ name: 'philosophyHeading', title: 'Philosophy Heading', type: 'string', initialValue: 'The Haeden Partnership' }),
    defineField({ name: 'philosophyBody', title: 'Philosophy Body', type: 'text', rows: 4 }),
    defineField({ name: 'philosophyImage', title: 'Philosophy Section Image', type: 'image', options: { hotspot: true } }),

    // Contact
    defineField({ name: 'address', title: 'Office Address', type: 'string' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),

    // Reviews
    defineField({
      name: 'googleReviewsUrl',
      title: 'Google Reviews Link',
      description: 'Link to your Google Business Profile reviews. Used for the "Read all reviews on Google" button.',
      type: 'url',
    }),

    // Licensing & compliance — shown in the footer, Credit Guide and Disclosures pages
    defineField({ name: 'legalEntityName', title: 'Legal Entity Name', type: 'string', description: 'e.g. Haeden Finance Pty Ltd' }),
    defineField({ name: 'abn', title: 'ABN', type: 'string' }),
    defineField({ name: 'creditRepNumber', title: 'Credit Representative Number (CRN)', type: 'string' }),
    defineField({ name: 'licenseeName', title: 'Licensee (Aggregator) Name', type: 'string', description: 'The company that holds the Australian Credit Licence you operate under' }),
    defineField({ name: 'aclNumber', title: 'Australian Credit Licence (ACL) Number', type: 'string' }),
    defineField({ name: 'afcaMemberNumber', title: 'AFCA Membership Number', type: 'string' }),
    defineField({
      name: 'topLenders',
      title: 'Most-Used Lenders (Credit Guide)',
      description: 'The lenders you most frequently arranged loans with over the last financial year, as required in your Credit Guide.',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // Footer
    defineField({ name: 'footerCompanyName', title: 'Footer Company Name', type: 'string' }),
    defineField({
      name: 'footerDisclaimer',
      title: 'Footer Licence Disclaimer (override)',
      description: 'Optional. Leave blank to build it automatically from the licensing fields above.',
      type: 'text',
      rows: 2,
    }),
    defineField({ name: 'footerCopyright', title: 'Footer Copyright Text', type: 'string' }),
    defineField({ name: 'footerLink1Label', title: 'Footer Link 1 Label', type: 'string', initialValue: 'Privacy Policy' }),
    defineField({ name: 'footerLink1Url', title: 'Footer Link 1 URL', type: 'string', initialValue: '#' }),
    defineField({ name: 'footerLink2Label', title: 'Footer Link 2 Label', type: 'string', initialValue: 'Terms of Service' }),
    defineField({ name: 'footerLink2Url', title: 'Footer Link 2 URL', type: 'string', initialValue: '#' }),
    defineField({ name: 'footerLink3Label', title: 'Footer Link 3 Label', type: 'string', initialValue: 'Credit Guide' }),
    defineField({ name: 'footerLink3Url', title: 'Footer Link 3 URL', type: 'string', initialValue: '#' }),
    defineField({ name: 'footerLink4Label', title: 'Footer Link 4 Label', type: 'string', initialValue: 'Disclosures' }),
    defineField({ name: 'footerLink4Url', title: 'Footer Link 4 URL', type: 'string', initialValue: '#' }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
});
