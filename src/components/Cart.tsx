import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useStore } from '@/lib/store'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { cart, isCartOpen, setCartOpen, removeFromCart, updateQuantity, cartTotal } = useStore()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                <ShoppingBag className="text-bead-red" />
                Your Cart
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-bead-neutral rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <Link
                    to="/shop"
                    onClick={() => setCartOpen(false)}
                    className="btn-bead-primary inline-block"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 bg-bead-neutral p-4 rounded-lg"
                    >
                      <img
                        src={item.thumbnail || '/placeholder.svg'}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-bead-black mb-1">
                          {item.title}
                        </h3>
                        <p className="text-bead-red font-bold mb-2">
                          ${item.price.toFixed(2)}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-white border-2 border-bead-black flex items-center justify-center hover:bg-bead-black hover:text-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-white border-2 border-bead-black flex items-center justify-center hover:bg-bead-black hover:text-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-bead-red hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-bead-red">${cartTotal().toFixed(2)}</span>
                </div>
                
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="btn-bead-primary w-full text-center block"
                >
                  Proceed to Checkout
                </Link>
                
                <button
                  onClick={() => setCartOpen(false)}
                  className="btn-bead-outline w-full"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
