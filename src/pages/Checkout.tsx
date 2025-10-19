import { useState } from 'react'
import { CreditCard, Lock, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { useStore } from '@/lib/store'
import SEO from '@/components/SEO'
import BeadDivider from '@/components/BeadDivider'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')

function CheckoutForm() {
  const { cart, cartTotal } = useStore()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    setProcessing(true)
    setError(null)

    try {
      // Create checkout session
      let response
      try {
        response = await fetch('http://localhost:3002/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: cart.map(item => ({
              id: item.id,
              title: item.title,
              price: item.price,
              quantity: item.quantity,
              image: item.thumbnail,
            })),
          }),
        })
      } catch (fetchError) {
        throw new Error('Cannot connect to payment server. Make sure it is running on port 3002.')
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to create checkout session')
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed')
      console.error('Checkout error:', err)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Payment Info */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
          <CreditCard size={24} />
          Secure Checkout with Stripe
        </h2>
        <p className="text-gray-600 mb-4">
          Click the button below to proceed to our secure payment page powered by Stripe.
          You'll be able to enter your shipping and payment information safely.
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          <Lock size={16} />
          <span>Your payment information is secure and encrypted with Stripe</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={processing}
        className="btn-bead-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {processing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Processing...
          </>
        ) : (
          <>
            <Lock size={20} />
            Proceed to Secure Checkout (${cartTotal().toFixed(2)})
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-600">
        You will be redirected to Stripe's secure checkout page
      </p>
    </div>
  )
}

export default function Checkout() {
  const { cart, cartTotal } = useStore()

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <SEO title="Checkout" description="Complete your purchase" />
        <div className="text-center py-20">
          <h1 className="text-3xl font-heading font-bold mb-4">Your cart is empty</h1>
          <Link to="/shop" className="btn-bead-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO title="Checkout" description="Complete your purchase of handcrafted Maasai beadwork jewelry" />

      <div className="container mx-auto px-4 py-12">
        <Link to="/shop" className="inline-flex items-center gap-2 text-bead-red hover:underline mb-8">
          <ArrowLeft size={20} />
          Back to Shop
        </Link>

        <h1 className="text-4xl font-heading font-bold mb-4 text-center">Checkout</h1>
        <BeadDivider />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-bead-neutral p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-heading font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.thumbnail || '/placeholder.svg'}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-bead-red">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-300 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${cartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-bead-green">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-300">
                  <span>Total</span>
                  <span className="text-bead-red">${cartTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg text-sm text-gray-600">
                <p className="font-semibold mb-2">✓ Free shipping on all orders</p>
                <p className="font-semibold mb-2">✓ 30-day return policy</p>
                <p className="font-semibold">✓ Secure payment processing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
