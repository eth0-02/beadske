export interface Product {
  id: string
  title: string
  description: string
  handle: string
  thumbnail?: string
  images?: { url: string }[]
  variants: ProductVariant[]
  collection_id?: string
  tags?: { value: string }[]
  metadata?: Record<string, any>
}

export interface ProductVariant {
  id: string
  title: string
  prices: {
    amount: number
    currency_code: string
  }[]
  inventory_quantity?: number
}

export interface Collection {
  id: string
  title: string
  handle: string
  products?: Product[]
}

export interface SEOProps {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
}
