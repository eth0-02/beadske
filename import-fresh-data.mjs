import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'wrmf59p3',
  dataset: 'production',
  useCdn: false,
  token: 'skVGeIhFDEsy3bIKk8zu4xyKjS0UaxW4zFsjhzL4fxCAoWPFc4fD01Kvm7nTXsIQYXlZURJheWI8h0UqddGHkc77IVg5PruDoL5VgtoOBNBnUCMPcH141k9lpx2fPy0wEUcv2h19jj4ry2YzAILpFLwQUAvAv8Oq2yiSEelKzX5gv0v5LJN0',
  apiVersion: '2024-01-01',
})

console.log('🚀 Starting fresh data import to Sanity...\n')

// Products
const products = [
  {
    _type: 'product',
    title: 'Kenyan Pride Bracelet',
    slug: { current: 'kenyan-pride-bracelet' },
    price: 25.00,
    description: 'A stunning bracelet featuring the colors of the Kenyan flag. Handcrafted with traditional Maasai beadwork techniques.',
    inventory: 15,
    featured: true,
  },
  {
    _type: 'product',
    title: 'Maasai Heritage Necklace',
    slug: { current: 'maasai-heritage-necklace' },
    price: 45.00,
    description: 'An elegant necklace showcasing intricate Maasai beadwork patterns passed down through generations.',
    inventory: 10,
    featured: true,
  },
  {
    _type: 'product',
    title: 'Unity Anklet',
    slug: { current: 'unity-anklet' },
    price: 20.00,
    description: 'A delicate anklet symbolizing unity and community, crafted with vibrant beads.',
    inventory: 20,
    featured: false,
  },
  {
    _type: 'product',
    title: 'Warrior Spirit Bracelet',
    slug: { current: 'warrior-spirit-bracelet' },
    price: 30.00,
    description: 'Bold and striking bracelet inspired by Maasai warrior traditions.',
    inventory: 12,
    featured: true,
  },
  {
    _type: 'product',
    title: 'Heritage Choker',
    slug: { current: 'heritage-choker' },
    price: 35.00,
    description: 'A traditional choker necklace featuring authentic Maasai beadwork.',
    inventory: 8,
    featured: false,
  },
]

// Categories
const categories = [
  {
    _type: 'category',
    title: 'Jewelry',
    slug: { current: 'jewelry' },
    description: 'Handcrafted Maasai beadwork jewelry',
  },
  {
    _type: 'category',
    title: 'Apparel',
    slug: { current: 'apparel' },
    description: 'Traditional Maasai-inspired clothing',
  },
  {
    _type: 'category',
    title: 'Gift Sets',
    slug: { current: 'gift-sets' },
    description: 'Curated collections of Maasai beadwork',
  },
]

async function importData() {
  try {
    // Import categories first
    console.log('📦 Importing categories...')
    for (const category of categories) {
      const result = await client.create(category)
      console.log(`✅ Created category: ${category.title}`)
    }

    // Import products
    console.log('\n📦 Importing products...')
    for (const product of products) {
      const result = await client.create(product)
      console.log(`✅ Created product: ${product.title} - $${product.price}`)
    }

    console.log('\n🎉 Import complete! All data has been pushed to Sanity.')
    console.log('\n📝 Next steps:')
    console.log('1. Go to https://beads.sanity.studio')
    console.log('2. You should see all the new products and categories')
    console.log('3. Add images to products in Sanity Studio')
    console.log('4. Publish each product')
    console.log('5. Refresh your website to see the changes')
    
  } catch (error) {
    console.error('❌ Error importing data:', error.message)
  }
}

importData()
