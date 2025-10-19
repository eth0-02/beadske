import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'wrmf59p3',
  dataset: 'production',
  useCdn: false,
  token: 'skVGeIhFDEsy3bIKk8zu4xyKjS0UaxW4zFsjhzL4fxCAoWPFc4fD01Kvm7nTXsIQYXlZURJheWI8h0UqddGHkc77IVg5PruDoL5VgtoOBNBnUCMPcH141k9lpx2fPy0wEUcv2h19jj4ry2YzAILpFLwQUAvAv8Oq2yiSEelKzX5gv0v5LJN0',
  apiVersion: '2024-01-01',
})

console.log('🔍 Finding and fixing Kenyan Pride Bracelet price...\n')

async function fixPrice() {
  try {
    // Find ALL products with "Kenyan Pride" in the title
    const products = await client.fetch(
      `*[_type == "product" && title match "Kenyan Pride*"] {
        _id,
        title,
        "slug": slug.current,
        price,
        inventory,
        featured
      }`
    )

    console.log(`Found ${products.length} product(s) matching "Kenyan Pride":\n`)
    
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.title}`)
      console.log(`   ID: ${p._id}`)
      console.log(`   Slug: ${p.slug}`)
      console.log(`   Current Price: $${p.price}`)
      console.log(`   Inventory: ${p.inventory}`)
      console.log(`   Featured: ${p.featured}`)
      console.log('')
    })

    // Update ALL of them to $25.99
    console.log('Updating all Kenyan Pride products to $25.99...\n')
    
    for (const product of products) {
      if (product.price !== 25.99) {
        await client
          .patch(product._id)
          .set({ price: 25.99 })
          .commit()
        
        console.log(`✅ Updated: ${product.title} (${product.slug})`)
      } else {
        console.log(`✓ Already correct: ${product.title} (${product.slug})`)
      }
    }

    console.log('\n✅ All Kenyan Pride products updated to $25.99!')
    console.log('\n📝 Next steps:')
    console.log('1. Refresh the shop page')
    console.log('2. You should see $25.99 for Kenyan Pride Bracelet')
    console.log('3. If still showing $25.00, clear browser cache')

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

fixPrice()
