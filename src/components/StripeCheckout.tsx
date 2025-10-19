import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useStore } from '@/lib/store'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')

export default function StripeCheckout() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { cart, cartTotal } = useStore()
  const items = cart
  const total = cartTotal()

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)

    try {
      // Validate cart
      if (items.length === 0) {
        throw new Error('Your cart is empty')
      }

      // Payment server URL - use environment variable or fallback to Railway production
      const serverUrl = import.meta.env.VITE_PAYMENT_SERVER_URL || 'https://maasai-payment-server-production.up.railway.app'
      
      console.log('Starting checkout with:', {
        serverUrl,
        itemsCount: items.length,
        items: items
      })
      
      // Create checkout session
      const response = await fetch(`${serverUrl}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.thumbnail,
          })),
        }),
      })
      
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Server error response:', errorText)
        throw new Error(`Payment server error: ${response.status}. Make sure it is running on port 3002.`)
      }

      const data = await response.json()
      console.log('Response data:', data)
      
      const { sessionId, error: sessionError } = data

      if (sessionError) {
        throw new Error(sessionError)
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed'
      setError(errorMessage)
      console.error('Checkout error:', err)
      console.error('Error details:', {
        message: errorMessage,
        serverUrl: import.meta.env.VITE_PAYMENT_SERVER_URL,
        itemsCount: items.length,
        total: total
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className="w-full bg-bead-red text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Processing...
          </>
        ) : (
          <>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Proceed to Checkout (${total.toFixed(2)})
          </>
        )}
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        Secure payment powered by Stripe
      </div>
    </div>
  )
}
