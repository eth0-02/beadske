import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn, UserPlus } from 'lucide-react'
import SEO from '@/components/SEO'
import BeadDivider from '@/components/BeadDivider'
import { useStore } from '@/lib/store'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useStore()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      // Simulate authentication (since backend may not be available)
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (isLogin) {
        // Demo login - accept any email/password
        if (!formData.email || !formData.password) {
          throw new Error('Please enter email and password')
        }

        // Store user data
        login({
          id: 'demo-user-' + Date.now(),
          email: formData.email,
          first_name: formData.first_name || 'Guest',
          last_name: formData.last_name || 'User',
        }, 'demo-token-' + Date.now())

        setSuccess('Login successful!')
      } else {
        // Registration
        if (!formData.email || !formData.password || !formData.first_name || !formData.last_name) {
          throw new Error('Please fill in all fields')
        }

        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters')
        }

        // Store user data
        login({
          id: 'user-' + Date.now(),
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
        }, 'token-' + Date.now())

        setSuccess('Account created successfully!')
      }
      
      // Redirect to home after short delay
      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <SEO
        title={isLogin ? 'Login' : 'Register'}
        description="Login or create an account to shop Maasai beadwork"
      />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading font-bold mb-4">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600">
              {isLogin
                ? 'Login to your account to continue shopping'
                : 'Join us to start your beadwork journey'}
            </p>
          </div>

          <BeadDivider className="mb-8" />

          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Toggle between Login and Register */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => {
                  setIsLogin(true)
                  setError('')
                  setSuccess('')
                }}
                className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                  isLogin
                    ? 'bg-bead-red text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <LogIn className="inline mr-2" size={18} />
                Login
              </button>
              <button
                onClick={() => {
                  setIsLogin(false)
                  setError('')
                  setSuccess('')
                }}
                className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                  !isLogin
                    ? 'bg-bead-red text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <UserPlus className="inline mr-2" size={18} />
                Register
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-semibold mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bead-red focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block text-sm font-semibold mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bead-red focus:border-transparent"
                    />
                  </div>
                </>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bead-red focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bead-red focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-bead-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>

            {isLogin && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Demo Mode: Use any email and password to login
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-bead-red hover:underline">
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  )
}
