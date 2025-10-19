import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'wrmf59p3',
  dataset: 'production',
  useCdn: false,
  token: 'skVGeIhFDEsy3bIKk8zu4xyKjS0UaxW4zFsjhzL4fxCAoWPFc4fD01Kvm7nTXsIQYXlZURJheWI8h0UqddGHkc77IVg5PruDoL5VgtoOBNBnUCMPcH141k9lpx2fPy0wEUcv2h19jj4ry2YzAILpFLwQUAvAv8Oq2yiSEelKzX5gv0v5LJN0',
  apiVersion: '2024-01-01',
})

console.log('🔍 Checking ALL Products in Sanity...\n')

async function checkProducts() {
  try {
    const products = await client.fetch(
      `*[_type == "product"] | order(_createdAt desc) {
        _id,
        title,
        "slug": slug.current,
        price,
        inventory,
        featured
      }`
    )

    console.log(`✅ Found ${products.length} products:\n`)
    
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.title}`)
      console.log(`   Price: $${p.price}`)
      console.log(`   Slug: ${p.slug}`)
      console.log(`   Inventory: ${p.inventory}`)
      console.log(`   Featured: ${p.featured ? 'Yes' : 'No'}`)
      console.log('')
    })

    // Check custom design requests
    const customOrders = await client.fetch(
      `*[_type == "customDesignRequest"] | order(createdAt desc) {
        _id,
        customerName,
        email,
        designType,
        status,
        createdAt
      }`
    )

    console.log(`\n📋 Custom Design Requests: ${customOrders.length}`)
    customOrders.forEach((order, i) => {
      console.log(`${i + 1}. ${order.customerName} - ${order.designType}`)
      console.log(`   Email: ${order.email}`)
      console.log(`   Status: ${order.status}`)
      console.log(`   Date: ${new Date(order.createdAt).toLocaleString()}`)
      console.log('')
    })

    console.log('\n✅ SANITY CMS IS WORKING PERFECTLY!')
    console.log('\n📝 Next steps:')
    console.log('1. Go to your website in incognito window')
    console.log('2. Check if products show correct prices')
    console.log('3. Try submitting a custom design request')
    console.log('4. Check Sanity Studio to see the request')

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

checkProducts()
