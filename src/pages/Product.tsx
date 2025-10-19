import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import SEO from '@/components/SEO'
import BeadDivider from '@/components/BeadDivider'
import ProductCard from '@/components/ProductCard'
import ProductReviews from '@/components/ProductReviews'
import { Product as ProductType } from '@/lib/types'
import { useStore } from '@/lib/store'
import { mockProducts } from '@/lib/mockProducts'

export default function Product() {
  const { handle } = useParams<{ handle: string }>()
  const [product, setProduct] = useState<ProductType | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(0)

  const addToCart = useStore((state) => state.addToCart)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        // Try to fetch from backend
        const response = await fetch(`http://localhost:9000/store/products?handle=${handle}`)
        if (response.ok) {
          const data = await response.json()
          if (data.products && data.products.length > 0) {
            const p = data.products[0]
            const formattedProduct = {
              id: p.id || Math.random().toString(),
              title: p.title,
              description: p.description,
              handle: p.handle,
              thumbnail: p.images?.[0] || '/placeholder.svg',
              images: p.images?.map((img: string) => ({ url: img })) || [{ url: '/placeholder.svg' }],
              variants: p.variants || [],
              tags: p.tags || [],
              metadata: p.metadata || {},
            }
            setProduct(formattedProduct)
            
            // Get related products
            const category = p.tags?.[0]?.value
            const allResponse = await fetch('http://localhost:9000/store/products?limit=50')
            if (allResponse.ok) {
              const allData = await allResponse.json()
              const related = allData.products
                .filter((prod: any) => prod.handle !== handle && prod.tags?.some((tag: any) => tag.value === category))
                .slice(0, 3)
                .map((prod: any) => ({
                  id: prod.id || Math.random().toString(),
                  title: prod.title,
                  description: prod.description,
                  handle: prod.handle,
                  thumbnail: prod.images?.[0] || '/placeholder.svg',
                  variants: prod.variants || [],
                }))
              setRelatedProducts(related)
            }
          } else {
            throw new Error('Product not found')
          }
        } else {
          throw new Error('Backend not available')
        }
      } catch (error) {
        console.log('Using mock data - backend not available')
        // Fallback to mock data
        const foundProduct = mockProducts.find(p => p.handle === handle)
        if (foundProduct) {
          setProduct(foundProduct)
          
          // Get related products from same category
          const category = foundProduct.tags?.[0]?.value
          const related = mockProducts
            .filter(p => p.id !== foundProduct.id && p.tags?.some(tag => tag.value === category))
            .slice(0, 3)
          setRelatedProducts(related)
        }
      } finally {
        setLoading(false)
      }
    }

    if (handle) {
      fetchProduct()
    }
  }, [handle])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-bead-neutral h-96 rounded-lg" />
            <div className="space-y-4">
              <div className="bg-bead-neutral h-8 w-3/4 rounded" />
              <div className="bg-bead-neutral h-6 w-1/4 rounded" />
              <div className="bg-bead-neutral h-32 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-heading font-bold mb-4">Product Not Found</h1>
        <Link to="/shop" className="btn-bead-primary">
          Back to Shop
        </Link>
      </div>
    )
  }

  const price = product.variants[selectedVariant]?.prices[0]?.amount || 0
  const formattedPrice = (price / 100).toFixed(2)
  const images = product.images || [{ url: product.thumbnail || '/placeholder.svg' }]
  const hasMultipleVariants = product.variants.length > 1

  const handleAddToCart = () => {
    const variant = product.variants[selectedVariant]
    addToCart({
      id: product.id,
      title: `${product.title} - ${variant.title}`,
      price: price / 100,
      quantity,
      thumbnail: product.thumbnail,
      variant_id: variant.id,
    })
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <SEO
        title={product.title}
        description={product.description.substring(0, 160)}
        keywords={`${product.title}, Maasai beadwork, handcrafted jewelry, buy ${product.title}`}
        image={product.thumbnail}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link to="/" className="text-gray-600 hover:text-bead-red">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/shop" className="text-gray-600 hover:text-bead-red">Shop</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-bead-black">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square bg-bead-neutral rounded-lg overflow-hidden mb-4 group"
            >
              <img
                src={images[selectedImage].url}
                alt={`${product.title} - Image ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </motion.div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-bead-red' : 'border-transparent'
                    }`}
                  >
                    <img src={img.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl font-heading font-bold mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-bead-red">${formattedPrice}</span>
                {product.variants[0]?.inventory_quantity && (
                  <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    {product.variants[0].inventory_quantity} in stock
                  </span>
                )}
              </div>

              <BeadDivider count={3} animated={false} />

              <div className="prose prose-sm max-w-none mb-8">
                {product.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700 mb-4">{paragraph}</p>
                ))}
              </div>

              {/* Metadata */}
              {product.metadata && (
                <div className="bg-bead-neutral p-4 rounded-lg mb-6 space-y-2 text-sm">
                  {product.metadata.artisan && (
                    <p><strong>Artisan:</strong> {product.metadata.artisan}</p>
                  )}
                  {product.metadata.origin && (
                    <p><strong>Origin:</strong> {product.metadata.origin}</p>
                  )}
                  {product.metadata.materials && (
                    <p><strong>Materials:</strong> {product.metadata.materials}</p>
                  )}
                </div>
              )}

              {/* Variant Selector */}
              {hasMultipleVariants && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">
                    {product.variants[0].title.match(/small|medium|large|x-large/i) ? 'Size' : 'Option'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant, idx) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(idx)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedVariant === idx
                            ? 'border-bead-red bg-bead-red text-white'
                            : 'border-gray-300 hover:border-bead-red'
                        }`}
                      >
                        {variant.title}
                      </button>
                    ))}
                  </div>
                  {product.variants[selectedVariant]?.inventory_quantity && (
                    <p className="text-sm text-gray-600 mt-2">
                      {product.variants[selectedVariant].inventory_quantity} in stock
                    </p>
                  )}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border-2 border-bead-black flex items-center justify-center hover:bg-bead-black hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border-2 border-bead-black flex items-center justify-center hover:bg-bead-black hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mb-6">
                <button
                  onClick={handleAddToCart}
                  className="btn-bead-primary w-full flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>

              {/* Trust Badges */}
              <div className="border-t pt-6 space-y-2 text-sm text-gray-600">
                <p>✓ Handcrafted by Maasai artisans</p>
                <p>✓ Authentic traditional beadwork</p>
                <p>✓ Supports local communities</p>
                <p>✓ Free shipping on orders over $50</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Product Reviews */}
        <ProductReviews productId={product.id} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-heading font-bold mb-8 text-center">You May Also Like</h2>
            <BeadDivider />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
