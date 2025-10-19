import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'promotion',
  title: 'Promotions & Discounts',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Promotion Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Discount Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discountType',
      title: 'Discount Type',
      type: 'string',
      options: {
        list: [
          {title: 'Percentage', value: 'percentage'},
          {title: 'Fixed Amount', value: 'fixed'},
        ],
      },
    }),
    defineField({
      name: 'discountValue',
      title: 'Discount Value',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'minimumPurchase',
      title: 'Minimum Purchase Amount',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    }),
    defineField({
      name: 'usageLimit',
      title: 'Usage Limit',
      type: 'number',
      description: 'Maximum number of times this code can be used',
    }),
    defineField({
      name: 'timesUsed',
      title: 'Times Used',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      code: 'code',
      discountValue: 'discountValue',
      discountType: 'discountType',
      active: 'active',
    },
    prepare(selection) {
      const {title, code, discountValue, discountType, active} = selection
      const discount = discountType === 'percentage' ? `${discountValue}%` : `$${discountValue}`
      return {
        title: `${title} (${code})`,
        subtitle: `${discount} off - ${active ? '✅ Active' : '❌ Inactive'}`,
      }
    },
  },
})
