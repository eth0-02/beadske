import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'customer',
  title: 'Customers',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
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
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        {name: 'street', title: 'Street', type: 'string'},
        {name: 'city', title: 'City', type: 'string'},
        {name: 'state', title: 'State', type: 'string'},
        {name: 'zipCode', title: 'Zip Code', type: 'string'},
        {name: 'country', title: 'Country', type: 'string'},
      ],
    }),
    defineField({
      name: 'totalOrders',
      title: 'Total Orders',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'totalSpent',
      title: 'Total Spent',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'vipCustomer',
      title: 'VIP Customer',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'notes',
      title: 'Customer Notes',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      totalOrders: 'totalOrders',
      totalSpent: 'totalSpent',
    },
    prepare(selection) {
      const {name, email, totalOrders, totalSpent} = selection
      return {
        title: name,
        subtitle: `${email} - ${totalOrders} orders - $${totalSpent?.toFixed(2)}`,
      }
    },
  },
})
