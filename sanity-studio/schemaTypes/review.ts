import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'review',
  title: 'Product Reviews',
  type: 'document',
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'title',
      title: 'Review Title',
      type: 'string',
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'verified',
      title: 'Verified Purchase',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'helpful',
      title: 'Helpful Count',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      customerName: 'customerName',
      rating: 'rating',
      title: 'title',
      approved: 'approved',
    },
    prepare(selection) {
      const {customerName, rating, title, approved} = selection
      const stars = '⭐'.repeat(rating || 0)
      return {
        title: `${customerName} - ${stars}`,
        subtitle: `${title || 'No title'} - ${approved ? '✅ Approved' : '⏳ Pending'}`,
      }
    },
  },
})
