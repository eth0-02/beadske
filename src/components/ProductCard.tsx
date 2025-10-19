import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { Product } from '@/lib/types'
import { useStore } from '@/lib/store'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart)
  
  const price = product.variants[0]?.prices[0]?.amount || 0
  const formattedPrice = (price / 100).toFixed(2)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id: product.id,
      title: product.title,
      price: price / 100,
      quantity: 1,
      thumbnail: product.thumbnail,
      variant_id: product.variants[0]?.id,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="product-card group"
    >
      <Link to={`/product/${product.handle}`}>
        <div className="relative overflow-hidden aspect-square bg-bead-neutral">
          <img
            src={product.thumbnail || '/placeholder.svg'}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Bead border overlay on hover */}
          <div className="absolute inset-0 border-4 border-transparent group-hover:border-bead-red transition-all duration-300 opacity-0 group-hover:opacity-100" />
        </div>

        <div className="p-4">
          <h3 className="font-heading font-semibold text-lg mb-2 text-bead-black group-hover:text-bead-red transition-colors">
            {product.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-bead-black">
              ${formattedPrice}
            </span>

            <button
              onClick={handleAddToCart}
              className="btn-bead-primary flex items-center gap-2 text-sm"
              aria-label={`Add ${product.title} to cart`}
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
