import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'wrmf59p3',
  dataset: 'production',
  useCdn: false,
  token: 'skVGeIhFDEsy3bIKk8zu4xyKjS0UaxW4zFsjhzL4fxCAoWPFc4fD01Kvm7nTXsIQYXlZURJheWI8h0UqddGHkc77IVg5PruDoL5VgtoOBNBnUCMPcH141k9lpx2fPy0wEUcv2h19jj4ry2YzAILpFLwQUAvAv8Oq2yiSEelKzX5gv0v5LJN0',
  apiVersion: '2024-01-01',
})

console.log('🔍 Testing Sanity Connection...\n')

async function testConnection() {
  try {
    // Test 1: Fetch the Kenyan Pride Bracelet
    console.log('📦 Fetching Kenyan Pride Bracelet...')
    const product = await client.fetch(
      `*[_type == "product" && slug.current == "kenyan-pride-bracelet"][0]{
        title,
        price,
        slug,
        description,
        inventory
      }`
    )
    
    if (product) {
      console.log('✅ Product found in Sanity:')
      console.log(`   Title: ${product.title}`)
      console.log(`   Price: $${product.price}`)
      console.log(`   Slug: ${product.slug.current}`)
      console.log(`   Inventory: ${product.inventory}`)
      console.log('')
    } else {
      console.log('❌ Product not found!')
      return
    }

    // Test 2: Fetch all products
    console.log('📦 Fetching all products...')
    const allProducts = await client.fetch(
      `*[_type == "product"]{title, price, slug}`
    )
    
    console.log(`✅ Found ${allProducts.length} products:`)
    allProducts.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.title} - $${p.price}`)
    })
    console.log('')

    // Test 3: Check if price is 25.99
    if (product.price === 25.99) {
      console.log('✅ SUCCESS! Price is correctly set to $25.99 in Sanity')
      console.log('   The issue is browser caching on the website.')
    } else if (product.price === 25) {
      console.log('⚠️  Price is still $25.00 in Sanity')
      console.log('   You need to publish the changes in Sanity Studio')
    } else {
      console.log(`ℹ️  Current price: $${product.price}`)
    }

    console.log('\n📝 Next Steps:')
    console.log('1. If price is correct in Sanity but not on website:')
    console.log('   - Clear browser cache completely')
    console.log('   - Or open website in incognito/private window')
    console.log('   - Or wait for Netlify to rebuild (check Deploys tab)')
    console.log('')
    console.log('2. If price is wrong in Sanity:')
    console.log('   - Go to https://beads.sanity.studio')
    console.log('   - Edit the product')
    console.log('   - Change the price')
    console.log('   - Click PUBLISH (not just save)')

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

testConnection()
