import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'wrmf59p3',
  dataset: 'production',
  useCdn: false,
  token: 'skVGeIhFDEsy3bIKk8zu4xyKjS0UaxW4zFsjhzL4fxCAoWPFc4fD01Kvm7nTXsIQYXlZURJheWI8h0UqddGHkc77IVg5PruDoL5VgtoOBNBnUCMPcH141k9lpx2fPy0wEUcv2h19jj4ry2YzAILpFLwQUAvAv8Oq2yiSEelKzX5gv0v5LJN0',
  apiVersion: '2024-01-01',
})

console.log('🔧 Updating product price...\n')

async function updatePrice() {
  try {
    // Find the product with slug "kenyan-pride-bracelet"
    const product = await client.fetch(
      `*[_type == "product" && slug.current == "kenyan-pride-bracelet"][0]{_id, title, price}`
    )
    
    if (!product) {
      console.log('❌ Product not found!')
      return
    }

    console.log(`📦 Found product: ${product.title}`)
    console.log(`   Current price: $${product.price}`)
    console.log(`   Updating to: $25.99`)
    
    // Update the price
    await client
      .patch(product._id)
      .set({ price: 25.99 })
      .commit()
    
    console.log('✅ Price updated successfully!')
    console.log('\n📝 Next steps:')
    console.log('1. Go to https://beads.sanity.studio')
    console.log('2. Find "Kenyan Pride Bracelet" in products')
    console.log('3. You should see price is now $25.99')
    console.log('4. It should already be published')
    console.log('5. Open website in incognito window to see changes')

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

updatePrice()
