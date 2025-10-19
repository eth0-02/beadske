import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, Users, Sparkles } from 'lucide-react'
import SEO from '@/components/SEO'
import BeadDivider from '@/components/BeadDivider'
import ProductCard from '@/components/ProductCard'
import { useEffect, useState } from 'react'
import { Product } from '@/lib/types'
import { mockProducts } from '@/lib/mockProducts'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Try to fetch from backend
        const response = await fetch('http://localhost:9000/store/products?limit=50')
        if (response.ok) {
          const data = await response.json()
          const featured = data.products
            .filter((p: any) => p.tags?.some((tag: any) => tag.value === 'featured'))
            .slice(0, 4)
            .map((p: any) => ({
              id: p.id || Math.random().toString(),
              title: p.title,
              description: p.description,
              handle: p.handle,
              thumbnail: p.images?.[0] || '/placeholder.svg',
              variants: p.variants || [],
              tags: p.tags || [],
            }))
          setFeaturedProducts(featured)
        } else {
          throw new Error('Backend not available')
        }
      } catch (error) {
        console.log('Using mock data - backend not available')
        // Fallback to mock data
        const featured = mockProducts.filter(p => 
          p.tags?.some(tag => tag.value === 'featured')
        ).slice(0, 4)
        setFeaturedProducts(featured)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      <SEO
        title="Home"
        description="Handcrafted Maasai beadwork jewelry in Kenyan flag colors. Shop authentic bracelets, necklaces, and anklets supporting local artisans."
        keywords="Maasai beadwork, handcrafted jewelry, Kenyan crafts, beaded bracelets, African jewelry"
      />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bead-pattern-bg">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-bead-black">
              Crafted with Culture.
              <br />
              <span className="text-bead-red">Worn with Pride.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Authentic Maasai beadwork in the colors of the Kenyan flag — handcrafted by local artisans
            </p>

            <BeadDivider />

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/shop" className="btn-bead-primary text-lg flex items-center gap-2 justify-center">
                Shop Collection
                <ArrowRight size={20} />
              </Link>
              
              <Link to="/about" className="btn-bead-outline text-lg">
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative beads */}
        <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-bead-red opacity-20 animate-bead-pulse" />
        <div className="absolute bottom-20 right-20 w-12 h-12 rounded-full bg-bead-green opacity-20 animate-bead-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-10 w-8 h-8 rounded-full bg-bead-black opacity-10 animate-bead-pulse" style={{ animationDelay: '0.5s' }} />
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-heading font-bold mb-4">Featured Collection</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each piece tells a story of heritage, craftsmanship, and cultural pride
            </p>
            <BeadDivider />
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-bead-neutral animate-pulse rounded-lg h-96" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/shop" className="btn-bead-secondary inline-flex items-center gap-2">
              View All Products
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-bead-neutral">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-8 bg-white rounded-lg shadow-md"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bead-red flex items-center justify-center">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Handcrafted with Love</h3>
              <p className="text-gray-600">
                Every bead is carefully selected and woven by skilled Maasai artisans
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 bg-white rounded-lg shadow-md"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bead-green flex items-center justify-center">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Empowering Communities</h3>
              <p className="text-gray-600">
                Supporting local artisans and preserving traditional craftsmanship
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center p-8 bg-white rounded-lg shadow-md"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bead-black flex items-center justify-center">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Authentic Heritage</h3>
              <p className="text-gray-600">
                Traditional patterns and colors representing Kenyan culture and pride
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bead-red text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-heading font-bold mb-4">
              Wear a Piece of Culture
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join us in celebrating Maasai heritage and supporting artisan communities
            </p>
            <Link to="/shop" className="btn-bead bg-white text-bead-red hover:bg-bead-neutral">
              Start Shopping
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
