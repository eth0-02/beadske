import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { client } from '../lib/sanity'
import { blogPosts as fallbackPosts } from '../data/blogPosts'

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  mainImage?: string
  author?: string
  publishedAt: string
  categories: string[]
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "blogPost"] | order(publishedAt desc) {
            _id,
            title,
            "slug": slug.current,
            excerpt,
            "mainImage": mainImage.asset->url,
            author,
            publishedAt,
            categories
          }`
        )
        if (data && data.length > 0) {
          setPosts(data)
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error)
        // Keep using fallback posts
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <>
      <Helmet>
        <title>Blog - Maasai Beadwork Stories & Culture</title>
        <meta name="description" content="Read stories about Maasai culture, craftsmanship, and the artisans behind our beautiful beadwork." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Stories</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the rich culture, traditions, and craftsmanship behind Maasai beadwork
            </p>
          </div>

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              <p className="mt-4 text-gray-600">Loading stories...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image */}
                  {post.mainImage ? (
                    <img
                      src={post.mainImage}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-red-500 to-green-600 flex items-center justify-center">
                      <span className="text-white text-4xl">📝</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Categories */}
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {post.categories.slice(0, 2).map((cat) => (
                          <span
                            key={cat}
                            className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full capitalize"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    )}

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.author || 'Maasai Beadwork'}</span>
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    {/* Read More */}
                    <div className="mt-4">
                      <span className="text-red-600 font-semibold hover:text-red-700">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
