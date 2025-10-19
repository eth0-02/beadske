import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'order',
  title: 'Orders',
  type: 'document',
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'object',
      fields: [
        {name: 'name', title: 'Name', type: 'string'},
        {name: 'email', title: 'Email', type: 'string'},
        {name: 'phone', title: 'Phone', type: 'string'},
      ],
    }),
    defineField({
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'product', title: 'Product', type: 'reference', to: [{type: 'product'}]},
            {name: 'quantity', title: 'Quantity', type: 'number'},
            {name: 'price', title: 'Price', type: 'number'},
          ],
        },
      ],
    }),
    defineField({
      name: 'totalAmount',
      title: 'Total Amount',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Processing', value: 'processing'},
          {title: 'Shipped', value: 'shipped'},
          {title: 'Delivered', value: 'delivered'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'shippingAddress',
      title: 'Shipping Address',
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
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: ['Credit Card', 'PayPal', 'Stripe', 'Cash on Delivery'],
      },
    }),
    defineField({
      name: 'trackingNumber',
      title: 'Tracking Number',
      type: 'string',
    }),
    defineField({
      name: 'notes',
      title: 'Order Notes',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      orderNumber: 'orderNumber',
      customerName: 'customer.name',
      total: 'totalAmount',
      status: 'status',
    },
    prepare(selection) {
      const {orderNumber, customerName, total, status} = selection
      return {
        title: `Order #${orderNumber}`,
        subtitle: `${customerName} - $${total?.toFixed(2)} - ${status}`,
      }
    },
  },
})
