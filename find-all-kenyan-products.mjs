import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'wrmf59p3',
  dataset: 'production',
  useCdn: false,
  token: 'skVGeIhFDEsy3bIKk8zu4xyKjS0UaxW4zFsjhzL4fxCAoWPFc4fD01Kvm7nTXsIQYXlZURJheWI8h0UqddGHkc77IVg5PruDoL5VgtoOBNBnUCMPcH141k9lpx2fPy0wEUcv2h19jj4ry2YzAILpFLwQUAvAv8Oq2yiSEelKzX5gv0v5LJN0',
  apiVersion: '2024-01-01',
})

console.log('🔍 Finding ALL products with Kenyan in title or slug...\n')

async function findAll() {
  try {
    const products = await client.fetch(
      `*[_type == "product" && (title match "*Kenyan*" || slug.current match "*kenyan*")] {
        _id,
        title,
        "slug": slug.current,
        price,
        inventory,
        featured,
        _createdAt
      } | order(_createdAt desc)`
    )

    console.log(`Found ${products.length} product(s):\n`)
    
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.title}`)
      console.log(`   ID: ${p._id}`)
      console.log(`   Slug: ${p.slug}`)
      console.log(`   Price: $${p.price}`)
      console.log(`   Inventory: ${p.inventory}`)
      console.log(`   Featured: ${p.featured}`)
      console.log(`   Created: ${new Date(p._createdAt).toLocaleString()}`)
      console.log('')
    })

    // Now update ALL of them to $25.99
    console.log('Updating ALL to $25.99...\n')
    
    for (const product of products) {
      if (product.price !== 25.99) {
        await client
          .patch(product._id)
          .set({ price: 25.99 })
          .commit()
        
        console.log(`✅ Updated: ${product.title} from $${product.price} to $25.99`)
      } else {
        console.log(`✓ Already $25.99: ${product.title}`)
      }
    }

    console.log('\n✅ All Kenyan products updated!')

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

findAll()
