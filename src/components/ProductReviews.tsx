import { useState, useEffect } from 'react'
import { Star, ThumbsUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { client } from '@/lib/sanity'

interface Review {
  _id: string
  customerName: string
  rating: number
  title?: string
  comment: string
  verified: boolean
  helpful: number
  _createdAt: string
}

interface ProductReviewsProps {
  productId: string
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    rating: 5,
    title: '',
    comment: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    fetchReviews()
  }, [productId])

  const fetchReviews = async () => {
    try {
      const query = `*[_type == "review" && product._ref == $productId && approved == true] | order(_createdAt desc) {
        _id,
        customerName,
        rating,
        title,
        comment,
        verified,
        helpful,
        _createdAt
      }`
      const data = await client.fetch(query, { productId })
      setReviews(data)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitMessage('')

    try {
      const review = {
        _type: 'review',
        product: {
          _type: 'reference',
          _ref: productId,
        },
        customerName: formData.customerName,
        rating: formData.rating,
        title: formData.title,
        comment: formData.comment,
        verified: false,
        approved: false,
        helpful: 0,
      }

      await client.create(review)
      
      setSubmitMessage('Thank you! Your review has been submitted and is pending approval.')
      setFormData({ customerName: '', rating: 5, title: '', comment: '' })
      setShowForm(false)
    } catch (error) {
      console.error('Error submitting review:', error)
      setSubmitMessage('Failed to submit review. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 
      : 0,
  }))

  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const starSize = size === 'lg' ? 24 : 16
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={starSize}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    )
  }

  if (loading) {
    return <div className="animate-pulse bg-gray-100 h-64 rounded-lg" />
  }

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-heading font-bold mb-8">Customer Reviews</h2>

      {/* Reviews Summary */}
      <div className="grid md:grid-cols-2 gap-8 mb-12 bg-bead-neutral p-6 rounded-lg">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <span className="text-5xl font-bold">{averageRating.toFixed(1)}</span>
            <div>
              {renderStars(Math.round(averageRating), 'lg')}
              <p className="text-sm text-gray-600 mt-1">{reviews.length} reviews</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map(({ star, count, percentage }) => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-sm w-8">{star} ⭐</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="btn-bead-primary mb-8"
        >
          Write a Review
        </button>
      )}

      {/* Review Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white border-2 border-bead-red rounded-lg p-6 mb-8"
        >
          <h3 className="text-xl font-bold mb-4">Write Your Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Your Name *</label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bead-red focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Rating *</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      size={32}
                      className={star <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Review Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bead-red focus:border-transparent"
                placeholder="Sum up your experience"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Your Review *</label>
              <textarea
                required
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bead-red focus:border-transparent"
                placeholder="Tell us what you think..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="btn-bead-primary"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-bead-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {submitMessage && (
        <div className={`p-4 rounded-lg mb-8 ${submitMessage.includes('Thank you') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {submitMessage}
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No reviews yet. Be the first to review this product!</p>
        ) : (
          reviews.map((review) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-gray-200 pb-6"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{review.customerName}</span>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review._createdAt).toLocaleDateString()}
                </span>
              </div>

              {review.title && (
                <h4 className="font-semibold mb-2">{review.title}</h4>
              )}

              <p className="text-gray-700 mb-3">{review.comment}</p>

              <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-bead-red">
                <ThumbsUp size={16} />
                Helpful ({review.helpful})
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
