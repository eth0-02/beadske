import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'customDesignRequest',
  title: 'Custom Design Requests',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'designType',
      title: 'Design Type',
      type: 'string',
      options: {
        list: [
          { title: 'Bracelet', value: 'bracelet' },
          { title: 'Necklace', value: 'necklace' },
          { title: 'Anklet', value: 'anklet' },
          { title: 'Earrings', value: 'earrings' },
          { title: 'Belt', value: 'belt' },
          { title: 'Headband', value: 'headband' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'colors',
      title: 'Preferred Colors',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Red', value: 'red' },
          { title: 'Black', value: 'black' },
          { title: 'White', value: 'white' },
          { title: 'Green', value: 'green' },
          { title: 'Blue', value: 'blue' },
          { title: 'Yellow', value: 'yellow' },
          { title: 'Orange', value: 'orange' },
          { title: 'Purple', value: 'purple' },
          { title: 'Gold', value: 'gold' },
          { title: 'Silver', value: 'silver' },
        ],
      },
    }),
    defineField({
      name: 'size',
      title: 'Size/Measurements',
      type: 'string',
      description: 'e.g., wrist circumference, neck size, etc.',
    }),
    defineField({
      name: 'description',
      title: 'Design Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().min(10).max(1000),
      description: 'Describe your custom design idea in detail',
    }),
    defineField({
      name: 'referenceImages',
      title: 'Reference Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      },
      description: 'Upload images for inspiration or reference',
    }),
    defineField({
      name: 'budget',
      title: 'Budget Range',
      type: 'string',
      options: {
        list: [
          { title: 'Under $50', value: 'under-50' },
          { title: '$50 - $100', value: '50-100' },
          { title: '$100 - $200', value: '100-200' },
          { title: '$200 - $500', value: '200-500' },
          { title: 'Over $500', value: 'over-500' },
          { title: 'Flexible', value: 'flexible' },
        ],
      },
    }),
    defineField({
      name: 'deadline',
      title: 'Desired Completion Date',
      type: 'date',
      description: 'When do you need this by?',
    }),
    defineField({
      name: 'status',
      title: 'Request Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Under Review', value: 'reviewing' },
          { title: 'Quote Sent', value: 'quoted' },
          { title: 'Approved', value: 'approved' },
          { title: 'In Production', value: 'production' },
          { title: 'Completed', value: 'completed' },
          { title: 'Declined', value: 'declined' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'adminNotes',
      title: 'Admin Notes',
      type: 'text',
      rows: 3,
      description: 'Internal notes for the design team',
    }),
    defineField({
      name: 'quotedPrice',
      title: 'Quoted Price',
      type: 'number',
      description: 'Price quote for the custom design',
    }),
    defineField({
      name: 'createdAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'designType',
      status: 'status',
      date: 'createdAt',
    },
    prepare(selection) {
      const { title, subtitle, status, date } = selection
      return {
        title: `${title} - ${subtitle}`,
        subtitle: `Status: ${status} | ${new Date(date).toLocaleDateString()}`,
      }
    },
  },
})
