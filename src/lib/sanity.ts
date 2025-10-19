import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Create Sanity client with proper configuration
const token = import.meta.env.VITE_SANITY_TOKEN || ''

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'wrmf59p3',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: false, // Disable CDN to get real-time updates
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  token: token || undefined, // Token for write operations
  perspective: 'published', // Use 'published' to see latest published content
  ignoreBrowserTokenWarning: true,
  withCredentials: false,
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
})

// Add timestamp to force fresh data
client.config({
  useCdn: false,
  perspective: 'published',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Fetch all products - always fresh data
export async function getProducts() {
  return client.fetch(
    `*[_type == "product"] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      price,
      description,
      "image": images[0].asset->url,
      "images": images[].asset->url,
      inventory,
      featured,
      category->{
        title,
        "slug": slug.current
      }
    }`
  )
}

// Fetch single product by slug
export async function getProduct(slug: string) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      price,
      description,
      "images": images[].asset->url,
      inventory,
      featured,
      category->{
        title,
        "slug": slug.current
      },
      seo
    }`,
    { slug }
  )
}

// Fetch featured products
export async function getFeaturedProducts() {
  return client.fetch(
    `*[_type == "product" && featured == true] | order(_createdAt desc) [0...6] {
      _id,
      title,
      "slug": slug.current,
      price,
      description,
      "image": images[0].asset->url,
      inventory
    }`
  )
}

// Fetch categories
export async function getCategories() {
  return client.fetch(
    `*[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description
    }`
  )
}
