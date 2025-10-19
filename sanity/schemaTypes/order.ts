import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    defineField({
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Stripe session ID or order reference',
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
      name: 'customerPhone',
      title: 'Customer Phone',
      type: 'string',
    }),
    defineField({
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        { name: 'line1', type: 'string', title: 'Address Line 1' },
        { name: 'line2', type: 'string', title: 'Address Line 2' },
        { name: 'city', type: 'string', title: 'City' },
        { name: 'state', type: 'string', title: 'State/Province' },
        { name: 'postal_code', type: 'string', title: 'Postal Code' },
        { name: 'country', type: 'string', title: 'Country' },
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
            { name: 'productId', type: 'string', title: 'Product ID' },
            { name: 'title', type: 'string', title: 'Product Title' },
            { name: 'quantity', type: 'number', title: 'Quantity' },
            { name: 'price', type: 'number', title: 'Unit Price' },
            { name: 'image', type: 'string', title: 'Product Image URL' },
          ],
        },
      ],
    }),
    defineField({
      name: 'subtotal',
      title: 'Subtotal',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'shipping',
      title: 'Shipping Cost',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'total',
      title: 'Total Amount',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Paid', value: 'paid' },
          { title: 'Failed', value: 'failed' },
          { title: 'Refunded', value: 'refunded' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'fulfillmentStatus',
      title: 'Fulfillment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Unfulfilled', value: 'unfulfilled' },
          { title: 'Processing', value: 'processing' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'unfulfilled',
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
    defineField({
      name: 'createdAt',
      title: 'Order Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      orderId: 'orderId',
      customerName: 'customerName',
      total: 'total',
      paymentStatus: 'paymentStatus',
      fulfillmentStatus: 'fulfillmentStatus',
    },
    prepare(selection) {
      const { orderId, customerName, total, paymentStatus, fulfillmentStatus } = selection
      const paymentIcon = paymentStatus === 'paid' ? '💳' : '⏳'
      const fulfillmentIcon = 
        fulfillmentStatus === 'delivered' ? '✅' : 
        fulfillmentStatus === 'shipped' ? '📦' : 
        fulfillmentStatus === 'processing' ? '⚙️' : '📋'
      
      return {
        title: `${paymentIcon} ${fulfillmentIcon} Order ${orderId?.substring(0, 8)}...`,
        subtitle: `${customerName} - $${total?.toFixed(2) || '0.00'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Order Date, New',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Order Date, Old',
      name: 'createdAtAsc',
      by: [{ field: 'createdAt', direction: 'asc' }],
    },
  ],
})
