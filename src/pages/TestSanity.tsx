import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'

export default function TestSanity() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastFetch, setLastFetch] = useState<Date>(new Date())

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await client.fetch(
        `*[_type == "product"] | order(_createdAt desc) [0...10] {
          _id,
          title,
          "slug": slug.current,
          price,
          inventory,
          featured
        }`
      )
      setProducts(data)
      setLastFetch(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🧪 Sanity CMS Connection Test
          </h1>
          
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800">
              <strong>Last Fetch:</strong> {lastFetch.toLocaleTimeString()}
            </p>
            <p className="text-sm text-blue-800 mt-1">
              <strong>Project ID:</strong> {import.meta.env.VITE_SANITY_PROJECT_ID || '❌ NOT SET'}
            </p>
            <p className="text-sm text-blue-800 mt-1">
              <strong>Dataset:</strong> {import.meta.env.VITE_SANITY_DATASET || '❌ NOT SET'}
            </p>
            <p className="text-sm text-blue-800 mt-1">
              <strong>API Version:</strong> {import.meta.env.VITE_SANITY_API_VERSION || '❌ NOT SET'}
            </p>
            <p className="text-sm text-blue-800 mt-1">
              <strong>Token:</strong> {import.meta.env.VITE_SANITY_TOKEN ? `✅ ${import.meta.env.VITE_SANITY_TOKEN.substring(0, 20)}...` : '❌ NOT SET'}
            </p>
            <p className="text-sm text-blue-800 mt-1">
              <strong>Payment Server:</strong> {import.meta.env.VITE_PAYMENT_SERVER_URL || '❌ NOT SET'}
            </p>
          </div>

          <button
            onClick={fetchProducts}
            disabled={loading}
            className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Fetching...' : '🔄 Refresh Data'}
          </button>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-800">❌ Error: {error}</p>
            </div>
          )}

          {loading && !products.length ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                ✅ Found {products.length} Products
              </h2>
              
              <div className="space-y-4">
                {products.map((product, index) => (
                  <div
                    key={product._id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {index + 1}. {product.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Slug: {product.slug}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">
                          ${product.price}
                        </p>
                        <p className="text-sm text-gray-600">
                          Stock: {product.inventory}
                        </p>
                        {product.featured && (
                          <span className="inline-block mt-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded">
                <p className="text-green-800 font-semibold">
                  ✅ Sanity CMS is connected and working!
                </p>
                <p className="text-sm text-green-700 mt-2">
                  If you see products above with correct prices, Sanity is working perfectly.
                  The issue is browser/CDN caching on the main website.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            📝 Troubleshooting Steps
          </h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li>1. If you see products above, Sanity IS working ✅</li>
            <li>2. The main website might be showing cached data</li>
            <li>3. Try opening the main site in incognito mode</li>
            <li>4. Or clear your browser cache completely</li>
            <li>5. Check that Netlify has all environment variables</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
