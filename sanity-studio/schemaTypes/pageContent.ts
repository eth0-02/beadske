import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageId',
      title: 'Page ID',
      type: 'string',
      description: 'Unique identifier for the page (e.g., "home", "about", "contact")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Heading', type: 'string'},
        {name: 'subheading', title: 'Subheading', type: 'text'},
        {name: 'buttonText', title: 'Button Text', type: 'string'},
        {name: 'buttonLink', title: 'Button Link', type: 'string'},
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'textSection',
          title: 'Text Section',
          fields: [
            {name: 'heading', title: 'Heading', type: 'string'},
            {name: 'content', title: 'Content', type: 'array', of: [{type: 'block'}]},
          ],
        },
        {
          type: 'object',
          name: 'imageTextSection',
          title: 'Image + Text Section',
          fields: [
            {name: 'heading', title: 'Heading', type: 'string'},
            {name: 'content', title: 'Content', type: 'text'},
            {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
            {
              name: 'imagePosition',
              title: 'Image Position',
              type: 'string',
              options: {
                list: [
                  {title: 'Left', value: 'left'},
                  {title: 'Right', value: 'right'},
                ],
              },
            },
          ],
        },
        {
          type: 'object',
          name: 'ctaSection',
          title: 'Call to Action',
          fields: [
            {name: 'heading', title: 'Heading', type: 'string'},
            {name: 'description', title: 'Description', type: 'text'},
            {name: 'buttonText', title: 'Button Text', type: 'string'},
            {name: 'buttonLink', title: 'Button Link', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {name: 'metaTitle', title: 'Meta Title', type: 'string'},
        {name: 'metaDescription', title: 'Meta Description', type: 'text'},
        {name: 'keywords', title: 'Keywords', type: 'array', of: [{type: 'string'}]},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pageId: 'pageId',
    },
    prepare(selection) {
      const {title, pageId} = selection
      return {
        title,
        subtitle: `Page: ${pageId}`,
      }
    },
  },
})
