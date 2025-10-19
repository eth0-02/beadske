import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'review',
  title: 'Product Review',
  type: 'document',
  fields: [
    defineField({
      name: 'productId',
      title: 'Product ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productTitle',
      title: 'Product Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      description: 'Rating from 1 to 5 stars',
    }),
    defineField({
      name: 'title',
      title: 'Review Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'comment',
      title: 'Review Comment',
      type: 'text',
      validation: (Rule) => Rule.required().min(10).max(1000),
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
      description: 'Approve this review to show it on the website',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'productTitle',
      subtitle: 'customerName',
      rating: 'rating',
      approved: 'approved',
    },
    prepare(selection) {
      const { title, subtitle, rating, approved } = selection
      const stars = '⭐'.repeat(rating || 0)
      const status = approved ? '✅' : '⏳'
      return {
        title: `${status} ${title}`,
        subtitle: `${stars} by ${subtitle}`,
      }
    },
  },
})
