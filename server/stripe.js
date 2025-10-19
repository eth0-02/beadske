const express = require('express')
const Stripe = require('stripe')
const { createClient } = require('@sanity/client')
const router = express.Router()

// Initialize Sanity client
const sanityClient = createClient({
  projectId: 'wrmf59p3',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
})

// Get Stripe instance (will be initialized after dotenv loads)
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined in environment variables')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  })
}

// Create checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items in cart' })
    }

    console.log('Received items:', JSON.stringify(items, null, 2))

    // Create line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title || 'Product',
          images: [],
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity || 1,
    }))

    console.log('Line items:', JSON.stringify(lineItems, null, 2))

    // Create Stripe checkout session
    const stripe = getStripe()
    
    const sessionParams = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/checkout/cancel',
    }
    
    console.log('Creating Stripe session with params:', JSON.stringify(sessionParams, null, 2))
    
    const session = await stripe.checkout.sessions.create(sessionParams)

    console.log('Session created successfully:', session.id)
    res.json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe error details:', error)
    res.status(500).json({ error: error.message })
  }
})

// Verify payment session
router.get('/verify-session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    res.json({
      status: session.payment_status,
      customerEmail: session.customer_details?.email,
      amountTotal: session.amount_total / 100,
    })
  } catch (error) {
    console.error('Session verification error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Webhook for Stripe events (for production)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      console.log('Payment successful:', session.id)
      
      try {
        // Save order to Sanity
        const stripe = getStripe()
        const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items', 'customer_details']
        })
        
        const order = {
          _type: 'order',
          orderNumber: session.id,
          customer: {
            name: fullSession.customer_details?.name || 'Guest',
            email: fullSession.customer_details?.email || '',
            phone: fullSession.customer_details?.phone || '',
          },
          items: fullSession.line_items?.data.map(item => ({
            _type: 'object',
            _key: item.id,
            product: null, // You can add product reference if needed
            quantity: item.quantity,
            price: item.amount_total / 100,
          })) || [],
          totalAmount: fullSession.amount_total / 100,
          status: 'pending',
          shippingAddress: fullSession.customer_details?.address ? {
            street: fullSession.customer_details.address.line1 || '',
            city: fullSession.customer_details.address.city || '',
            state: fullSession.customer_details.address.state || '',
            zipCode: fullSession.customer_details.address.postal_code || '',
            country: fullSession.customer_details.address.country || '',
          } : null,
          paymentMethod: 'Stripe',
        }
        
        await sanityClient.create(order)
        console.log('✅ Order saved to Sanity:', session.id)
      } catch (error) {
        console.error('❌ Error saving order to Sanity:', error)
      }
      break

    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      console.log('PaymentIntent successful:', paymentIntent.id)
      break

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object
      console.log('Payment failed:', failedPayment.id)
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.json({ received: true })
})

module.exports = router
