import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'wrmf59p3',
  dataset: 'production',
  useCdn: false, // Disable CDN to get real-time updates
  apiVersion: '2024-01-01',
  token: import.meta.env.VITE_SANITY_TOKEN, // Optional: for draft content
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
