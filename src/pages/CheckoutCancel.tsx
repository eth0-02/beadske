import { Link } from 'react-router-dom'
import { XCircle, ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export default function CheckoutCancel() {
  return (
    <>
      <Helmet>
        <title>Checkout Cancelled - Maasai Beadwork</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
          {/* Cancel Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          {/* Cancel Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Checkout Cancelled
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Your payment was cancelled. No charges were made to your account.
          </p>

          {/* Information */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <p className="text-yellow-800">
              Your cart items have been saved. You can return to your cart anytime to complete your purchase.
            </p>
          </div>

          {/* Why Cancel? */}
          <div className="text-left mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Reasons for Cancellation:</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-bead-red mt-1">•</span>
                <span>Changed your mind about the purchase</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-bead-red mt-1">•</span>
                <span>Want to add more items to your cart</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-bead-red mt-1">•</span>
                <span>Need to use a different payment method</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-bead-red mt-1">•</span>
                <span>Encountered an issue during checkout</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cart"
              className="btn-bead-primary flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Return to Cart
            </Link>
            <Link
              to="/shop"
              className="btn-bead-outline"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Support */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Having trouble with checkout?
            </p>
            <p className="text-sm text-gray-600">
              Contact us at{' '}
              <a href="mailto:info@maasaibeadwork.com" className="text-bead-red hover:underline">
                info@maasaibeadwork.com
              </a>
              {' '}and we'll be happy to help!
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
