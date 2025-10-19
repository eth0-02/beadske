import {createClient} from '@sanity/client'
import seedData from '../backend/data/seed.json'

const client = createClient({
  projectId: 'wrmf59p3',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN || '', // You'll need to set this
  apiVersion: '2024-01-01',
})

async function importProducts() {
  console.log('🚀 Starting product import...\n')

  // Create categories first
  const categories = [
    {
      _type: 'category',
      title: 'Jewelry',
      slug: {current: 'jewelry'},
      description: 'Handcrafted Maasai beadwork jewelry including bracelets, necklaces, earrings, and anklets',
    },
    {
      _type: 'category',
      title: 'Apparel',
      slug: {current: 'apparel'},
      description: 'Premium t-shirts featuring traditional Maasai beadwork patterns',
    },
    {
      _type: 'category',
      title: 'Gift Sets',
      slug: {current: 'gift-sets'},
      description: 'Curated collections perfect for gifting',
    },
  ]

  console.log('📦 Creating categories...')
  const createdCategories = await Promise.all(
    categories.map((cat) => client.create(cat))
  )
  console.log(`✅ Created ${createdCategories.length} categories\n`)

  // Map categories for reference
  const jewelryCategory = createdCategories.find((c) => c.slug.current === 'jewelry')
  const apparelCategory = createdCategories.find((c) => c.slug.current === 'apparel')
  const giftSetCategory = createdCategories.find((c) => c.slug.current === 'gift-sets')

  // Import products
  console.log('📦 Importing products...')
  let imported = 0

  for (const product of seedData.products) {
    // Determine category based on tags
    let categoryRef
    if (product.tags.some((t: any) => t.value === 'tshirts' || t.value === 'apparel')) {
      categoryRef = {_type: 'reference', _ref: apparelCategory?._id}
    } else if (product.tags.some((t: any) => t.value === 'sets' || t.value === 'gift')) {
      categoryRef = {_type: 'reference', _ref: giftSetCategory?._id}
    } else {
      categoryRef = {_type: 'reference', _ref: jewelryCategory?._id}
    }

    // Get price from first variant (convert from cents to dollars)
    const price = product.variants[0]?.prices[0]?.amount / 100 || 0

    // Get inventory from first variant
    const inventory = product.variants[0]?.inventory_quantity || 0

    // Check if featured
    const featured = product.tags.some((t: any) => t.value === 'featured')

    const sanityProduct = {
      _type: 'product',
      title: product.title,
      slug: {current: product.handle},
      description: product.description,
      price,
      inventory,
      featured,
      category: categoryRef,
      seo: {
        metaTitle: product.title,
        metaDescription: product.subtitle || product.description.substring(0, 160),
      },
    }

    try {
      await client.create(sanityProduct)
      imported++
      console.log(`✅ Imported: ${product.title}`)
    } catch (error: any) {
      console.log(`❌ Failed to import ${product.title}: ${error.message}`)
    }
  }

  console.log(`\n🎉 Import complete! Imported ${imported} products`)
  console.log('\n📝 Next steps:')
  console.log('1. Go to http://localhost:3333')
  console.log('2. Click on Products to see all imported items')
  console.log('3. Add images to your products')
  console.log('4. Publish products to make them live')
}

importProducts().catch(console.error)
