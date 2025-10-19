import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useStore } from '@/lib/store'

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [sessionData, setSessionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const clearCart = useStore(state => state.clearCart)

  useEffect(() => {
    // Clear cart on successful payment
    clearCart()

    // Verify session
    if (sessionId) {
      fetch(`/api/verify-session/${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setSessionData(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Error verifying session:', err)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [sessionId, clearCart])

  return (
    <>
      <Helmet>
        <title>Order Successful - Maasai Beadwork</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Thank you for your order. Your payment has been processed successfully.
          </p>

          {/* Order Details */}
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bead-red"></div>
            </div>
          ) : sessionData ? (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Status:</span>
                  <span className="font-semibold text-green-600 capitalize">{sessionData.status}</span>
                </div>
                {sessionData.customerEmail && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-semibold">{sessionData.customerEmail}</span>
                  </div>
                )}
                {sessionData.amountTotal && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-semibold">${sessionData.amountTotal.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* Confirmation Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-blue-800">
              📧 A confirmation email has been sent to your email address with order details and tracking information.
            </p>
          </div>

          {/* What's Next */}
          <div className="text-left mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Next?</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-bead-red mt-1">✓</span>
                <span>You'll receive an order confirmation email shortly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-bead-red mt-1">✓</span>
                <span>Your order will be processed and shipped within 2-3 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-bead-red mt-1">✓</span>
                <span>You'll receive tracking information once your order ships</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="btn-bead-primary"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="btn-bead-outline"
            >
              Back to Home
            </Link>
          </div>

          {/* Support */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Need help? Contact us at{' '}
              <a href="mailto:info@maasaibeadwork.com" className="text-bead-red hover:underline">
                info@maasaibeadwork.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
