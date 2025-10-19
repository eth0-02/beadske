import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { client } from '../lib/sanity'
import { blogPosts as fallbackPosts } from '../data/blogPosts'

interface BlogPostData {
  _id: string
  title: string
  slug: string
  excerpt: string
  mainImage?: string
  author?: string
  publishedAt: string
  categories: string[]
  body: any
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPostData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "blogPost" && slug.current == $slug][0] {
            _id,
            title,
            "slug": slug.current,
            excerpt,
            "mainImage": mainImage.asset->url,
            author,
            publishedAt,
            categories,
            body,
            seo
          }`,
          { slug }
        )
        if (data) {
          setPost(data)
        } else {
          // Fallback to local data
          const fallbackPost = fallbackPosts.find(p => p.slug === slug)
          if (fallbackPost) {
            setPost(fallbackPost as any)
          }
        }
      } catch (error) {
        console.error('Error fetching blog post:', error)
        // Fallback to local data
        const fallbackPost = fallbackPosts.find(p => p.slug === slug)
        if (fallbackPost) {
          setPost(fallbackPost as any)
        }
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-red-600 hover:text-red-700">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{post.seo?.metaTitle || post.title} - Maasai Beadwork</title>
        <meta
          name="description"
          content={post.seo?.metaDescription || post.excerpt || ''}
        />
      </Helmet>

      <article className="min-h-screen bg-white">
        {/* Hero Image */}
        {post.mainImage && (
          <div className="w-full h-96 overflow-hidden">
            <img
              src={post.mainImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Link */}
          <Link
            to="/blog"
            className="inline-flex items-center text-red-600 hover:text-red-700 mb-8"
          >
            ← Back to Blog
          </Link>

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex gap-2 mb-4">
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded-full capitalize"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-gray-600 mb-8 pb-8 border-b">
            <span className="font-medium">{post.author || 'Maasai Beadwork'}</span>
            <span>•</span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Body */}
          <div className="prose prose-lg max-w-none">
            {post.body && (
              typeof post.body === 'string' ? (
                // Local data format (string)
                post.body.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    )
                  }
                  return (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed text-lg">
                      {paragraph}
                    </p>
                  )
                })
              ) : Array.isArray(post.body) ? (
                // Sanity format (blocks)
                post.body.map((block: any, index: number) => {
                  if (block._type === 'block') {
                    const text = block.children?.map((child: any) => child.text).join('') || ''
                    
                    if (block.style === 'h2') {
                      return (
                        <h2 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                          {text}
                        </h2>
                      )
                    }
                    
                    return (
                      <p key={index} className="mb-4 text-gray-700 leading-relaxed text-lg">
                        {text}
                      </p>
                    )
                  }
                  
                  if (block._type === 'image') {
                    return (
                      <img
                        key={index}
                        src={block.asset?.url}
                        alt={block.alt || ''}
                        className="w-full rounded-lg my-8"
                      />
                    )
                  }
                  
                  return null
                })
              ) : null
            )}
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this story</h3>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Facebook
              </button>
              <button className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600">
                Twitter
              </button>
              <button className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">
                Pinterest
              </button>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link
              to="/blog"
              className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Read More Stories
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
