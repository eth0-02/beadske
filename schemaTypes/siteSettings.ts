import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {name: 'email', title: 'Email', type: 'string'},
        {name: 'phone', title: 'Phone', type: 'string'},
        {name: 'address', title: 'Address', type: 'text'},
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {name: 'facebook', title: 'Facebook URL', type: 'url'},
        {name: 'instagram', title: 'Instagram URL', type: 'url'},
        {name: 'twitter', title: 'Twitter URL', type: 'url'},
        {name: 'pinterest', title: 'Pinterest URL', type: 'url'},
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {name: 'metaTitle', title: 'Meta Title', type: 'string'},
        {name: 'metaDescription', title: 'Meta Description', type: 'text'},
        {name: 'keywords', title: 'Keywords', type: 'array', of: [{type: 'string'}]},
        {name: 'ogImage', title: 'Open Graph Image', type: 'image'},
      ],
    }),
    defineField({
      name: 'shipping',
      title: 'Shipping Settings',
      type: 'object',
      fields: [
        {name: 'freeShippingThreshold', title: 'Free Shipping Threshold ($)', type: 'number'},
        {name: 'standardShippingCost', title: 'Standard Shipping Cost ($)', type: 'number'},
        {name: 'expressShippingCost', title: 'Express Shipping Cost ($)', type: 'number'},
      ],
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          {title: 'USD ($)', value: 'USD'},
          {title: 'EUR (€)', value: 'EUR'},
          {title: 'GBP (£)', value: 'GBP'},
          {title: 'KES (KSh)', value: 'KES'},
        ],
      },
      initialValue: 'USD',
    }),
    defineField({
      name: 'maintenanceMode',
      title: 'Maintenance Mode',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
