import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, X } from 'lucide-react'
import SEO from '@/components/SEO'
import ProductCard from '@/components/ProductCard'
import BeadDivider from '@/components/BeadDivider'
import { Product } from '@/lib/types'
import { mockProducts } from '@/lib/mockProducts'
import { motion } from 'framer-motion'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const selectedCategory = searchParams.get('category') || 'all'
  const selectedColor = searchParams.get('color') || 'all'
  const priceRange = searchParams.get('price') || 'all'

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        // Try to fetch from backend
        const response = await fetch('http://localhost:9000/store/products?limit=50')
        if (response.ok) {
          const data = await response.json()
          const formattedProducts = data.products.map((p: any) => ({
            id: p.id || Math.random().toString(),
            title: p.title,
            description: p.description,
            handle: p.handle,
            thumbnail: p.images?.[0] || '/placeholder.svg',
            variants: p.variants || [],
            tags: p.tags || [],
          }))
          setProducts(formattedProducts)
        } else {
          throw new Error('Backend not available')
        }
      } catch (error) {
        console.log('Using mock data - backend not available')
        // Fallback to mock data
        setProducts(mockProducts)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === 'all' || 
      product.tags?.some(tag => tag.value === selectedCategory)
    
    const colorMatch = selectedColor === 'all' || 
      product.tags?.some(tag => tag.value === selectedColor)
    
    const price = product.variants[0]?.prices[0]?.amount || 0
    const priceMatch = priceRange === 'all' ||
      (priceRange === 'under-30' && price < 3000) ||
      (priceRange === '30-50' && price >= 3000 && price < 5000) ||
      (priceRange === 'over-50' && price >= 5000)

    return categoryMatch && colorMatch && priceMatch
  })

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value === 'all') {
      newParams.delete(key)
    } else {
      newParams.set(key, value)
    }
    setSearchParams(newParams)
  }

  const clearFilters = () => {
    setSearchParams({})
  }

  const hasActiveFilters = selectedCategory !== 'all' || selectedColor !== 'all' || priceRange !== 'all'

  return (
    <>
      <SEO
        title="Shop Handcrafted Jewelry"
        description="Browse our collection of handcrafted Maasai beadwork jewelry. Authentic bracelets, necklaces, and anklets in Kenyan flag colors."
        keywords="buy Maasai jewelry, handcrafted bracelets, beaded necklaces, African anklets, Kenyan beadwork"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Shop Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover authentic Maasai beadwork crafted by local artisans
          </p>
          <BeadDivider />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full btn-bead-outline flex items-center justify-center gap-2 mb-4"
              >
                <Filter size={20} />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>

              <div className={`${showFilters ? 'block' : 'hidden'} lg:block bg-white p-6 rounded-lg shadow-md space-y-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-bold text-lg">Filters</h2>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-bead-red hover:underline flex items-center gap-1"
                    >
                      <X size={16} />
                      Clear
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div>
                  <h3 className="font-semibold mb-3">Category</h3>
                  <div className="space-y-2">
                    {['all', 'bracelets', 'necklaces', 'anklets', 'tshirts', 'earrings', 'sets'].map((cat) => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat}
                          onChange={() => updateFilter('category', cat)}
                          className="accent-bead-red"
                        />
                        <span className="capitalize">{cat === 'tshirts' ? 'T-Shirts' : cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div>
                  <h3 className="font-semibold mb-3">Color</h3>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Colors', color: 'bg-gray-300' },
                      { value: 'black', label: 'Black', color: 'bg-bead-black' },
                      { value: 'red', label: 'Red', color: 'bg-bead-red' },
                      { value: 'white', label: 'White', color: 'bg-white border-2 border-gray-300' },
                      { value: 'green', label: 'Green', color: 'bg-bead-green' },
                    ].map((color) => (
                      <label key={color.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="color"
                          checked={selectedColor === color.value}
                          onChange={() => updateFilter('color', color.value)}
                          className="accent-bead-red"
                        />
                        <div className={`w-4 h-4 rounded-full ${color.color}`} />
                        <span>{color.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Prices' },
                      { value: 'under-30', label: 'Under $30' },
                      { value: '30-50', label: '$30 - $50' },
                      { value: 'over-50', label: 'Over $50' },
                    ].map((price) => (
                      <label key={price.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="price"
                          checked={priceRange === price.value}
                          onChange={() => updateFilter('price', price.value)}
                          className="accent-bead-red"
                        />
                        <span>{price.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-bead-neutral animate-pulse rounded-lg h-96" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg mb-4">No products found matching your filters</p>
                <button onClick={clearFilters} className="btn-bead-primary">
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
