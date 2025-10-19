import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X, LogOut } from 'lucide-react'
import { useStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const { cartCount, isCartOpen, setCartOpen, isMobileMenuOpen, setMobileMenuOpen, user, logout } = useStore()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/custom-design', label: 'Custom Design' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-bead-black" />
              <div className="w-3 h-3 rounded-full bg-bead-red" />
              <div className="w-3 h-3 rounded-full bg-bead-green" />
            </div>
            <span className="text-xl font-heading font-bold text-bead-black">
              Maasai Beadwork
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-bead-black hover:text-bead-red transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  Hello, <strong>{user.first_name || user.email}</strong>
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-bead-red hover:text-bead-black transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block text-bead-black hover:text-bead-red transition-colors">
                Login
              </Link>
            )}

            {/* Cart */}
            <button
              onClick={() => setCartOpen(!isCartOpen)}
              className="relative p-2 hover:bg-bead-neutral rounded-full transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={24} className="text-bead-black" />
              {cartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-bead-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount()}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-bead-neutral rounded-full transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-bead-black hover:text-bead-red transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">
                      Hello, <strong>{user.first_name || user.email}</strong>
                    </p>
                    <button
                      onClick={() => {
                        logout()
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-2 py-2 text-bead-red hover:text-bead-black transition-colors font-medium"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-bead-black hover:text-bead-red transition-colors font-medium"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
