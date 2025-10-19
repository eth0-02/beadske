import { useState, useEffect } from 'react'
import medusaClient from '@/lib/medusa-client'
import { Product } from '@/lib/types'

export function useProducts(limit?: number) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const { products } = await medusaClient.products.list({ limit: limit || 50 })
        setProducts(products as unknown as Product[])
        setError(null)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [limit])

  return { products, loading, error }
}

export function useProduct(handle: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const { products } = await medusaClient.products.list({ handle })
        if (products && products.length > 0) {
          setProduct(products[0] as unknown as Product)
          setError(null)
        } else {
          setError('Product not found')
        }
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    if (handle) {
      fetchProduct()
    }
  }, [handle])

  return { product, loading, error }
}
