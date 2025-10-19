const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const stripeRoutes = require('./stripe')

dotenv.config()

// Debug: Check if Stripe key is loaded
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ ERROR: STRIPE_SECRET_KEY not found in environment variables!')
  console.error('Please check your server/.env file')
  process.exit(1)
} else {
  console.log('✅ Stripe secret key loaded:', process.env.STRIPE_SECRET_KEY.substring(0, 20) + '...')
}

const app = express()
const PORT = process.env.PORT || 3002

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true)
    
    // Allow localhost and Vercel deployments
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'http://127.0.0.1:12795',
      process.env.CLIENT_URL
    ].filter(Boolean)
    
    // Check if origin is in allowed list or matches Vercel pattern
    if (allowedOrigins.includes(origin) || 
        origin.includes('eth002s-projects.vercel.app') ||
        origin.includes('maasai-beadwork-ecommerce')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Stripe webhook needs raw body
app.use('/api/webhook', express.raw({ type: 'application/json' }))

// JSON parsing for other routes
app.use(express.json())

// Routes
app.use('/api', stripeRoutes)

// Root route
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: '🚀 Maasai Beadwork Payment Server',
    endpoints: {
      health: '/health',
      createCheckout: 'POST /api/create-checkout-session',
      verifySession: 'GET /api/verify-session/:sessionId'
    }
  })
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Payment server running' })
})

app.listen(PORT, () => {
  console.log(`🚀 Payment server running on http://localhost:${PORT}`)
  console.log(`📝 Stripe integration ready`)
})
