import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'wrmf59p3',
  dataset: 'production',
  useCdn: false,
  token: 'skVGeIhFDEsy3bIKk8zu4xyKjS0UaxW4zFsjhzL4fxCAoWPFc4fD01Kvm7nTXsIQYXlZURJheWI8h0UqddGHkc77IVg5PruDoL5VgtoOBNBnUCMPcH141k9lpx2fPy0wEUcv2h19jj4ry2YzAILpFLwQUAvAv8Oq2yiSEelKzX5gv0v5LJN0',
  apiVersion: '2024-01-01',
})

console.log('🧪 Testing Custom Design Order Submission...\n')

async function testCustomOrder() {
  try {
    // Create a test custom design request
    const testRequest = {
      _type: 'customDesignRequest',
      customerName: 'Test Customer',
      email: 'test@example.com',
      phone: '+1234567890',
      designType: 'bracelet',
      colors: ['red', 'black', 'white'],
      size: '7 inches',
      description: 'I would like a custom bracelet with Kenyan flag colors and traditional Maasai patterns.',
      budget: '50-100',
      deadline: '2025-11-01',
      status: 'new',
      createdAt: new Date().toISOString(),
    }

    console.log('📝 Creating test custom design request...')
    const result = await client.create(testRequest)
    
    console.log('✅ Custom order created successfully!')
    console.log(`   Order ID: ${result._id}`)
    console.log(`   Customer: ${result.customerName}`)
    console.log(`   Design Type: ${result.designType}`)
    console.log(`   Status: ${result.status}`)
    console.log('')

    // Fetch all custom design requests
    console.log('📦 Fetching all custom design requests...')
    const allRequests = await client.fetch(
      `*[_type == "customDesignRequest"] | order(createdAt desc) {
        _id,
        customerName,
        email,
        designType,
        status,
        createdAt
      }`
    )

    console.log(`✅ Found ${allRequests.length} custom design request(s):`)
    allRequests.forEach((req, i) => {
      console.log(`   ${i + 1}. ${req.customerName} - ${req.designType} (${req.status})`)
      console.log(`      Email: ${req.email}`)
      console.log(`      Date: ${new Date(req.createdAt).toLocaleString()}`)
    })
    console.log('')

    console.log('📝 How to view in Sanity Studio:')
    console.log('1. Go to: https://beads.sanity.studio')
    console.log('2. Look for "Custom Design Requests" in the sidebar')
    console.log('3. You should see all submitted custom orders there!')
    console.log('')
    console.log('✅ Custom order system is working perfectly!')

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

testCustomOrder()
