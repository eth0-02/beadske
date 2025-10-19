const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: 'wrmf59p3',
  dataset: 'production',
  useCdn: false,
  token: 'skVGeIhFDEsy3bIKk8zu4xyKjS0UaxW4zFsjhzL4fxCAoWPFc4fD01Kvm7nTXsIQYXlZURJheWI8h0UqddGHkc77IVg5PruDoL5VgtoOBNBnUCMPcH141k9lpx2fPy0wEUcv2h19jj4ry2YzAILpFLwQUAvAv8Oq2yiSEelKzX5gv0v5LJN0',
  apiVersion: '2024-01-01',
})

const siteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  siteName: 'Maasai Beadwork',
  tagline: 'Handcrafted Kenyan Jewelry',
  description: 'Authentic Maasai beadwork jewelry handcrafted by local artisans in the colors of the Kenyan flag.',
  contactInfo: {
    email: 'info@maasaibeadwork.com',
    phone: '+254 XXX XXX XXX',
    address: 'Nairobi, Kenya',
  },
  socialMedia: {
    facebook: 'https://facebook.com/maasaibeadwork',
    instagram: 'https://instagram.com/maasaibeadwork',
    twitter: 'https://twitter.com/maasaibeadwork',
    pinterest: 'https://pinterest.com/maasaibeadwork',
  },
  footer: {
    copyrightText: '© 2024 Maasai Beadwork. All rights reserved.',
    madeBy: 'Made by CodeBizz',
    madeByLink: 'https://codebizz.com',
  },
  seo: {
    metaTitle: 'Maasai Beadwork - Handcrafted Kenyan Jewelry',
    metaDescription: 'Shop authentic Maasai beadwork jewelry handcrafted by local artisans. Bracelets, necklaces, and anklets in Kenyan flag colors.',
    keywords: ['maasai beadwork', 'handcrafted jewelry', 'kenyan crafts', 'african jewelry', 'fair trade'],
  },
  announcement: {
    enabled: true,
    message: '🎉 Free shipping on orders over $50! Use code: FREESHIP50',
  },
}

async function importSiteSettings() {
  console.log('🚀 Importing site settings to Sanity...\n')

  try {
    // Check if settings already exist
    const existing = await client.fetch('*[_type == "siteSettings"][0]')
    
    if (existing) {
      // Update existing
      await client
        .patch(existing._id)
        .set(siteSettings)
        .commit()
      console.log('✅ Site settings updated!')
    } else {
      // Create new
      await client.create(siteSettings)
      console.log('✅ Site settings created!')
    }

    console.log('\n📝 Next steps:')
    console.log('1. Go to http://localhost:3333')
    console.log('2. Click "Site Settings"')
    console.log('3. Edit contact info, social links, etc.')
    console.log('4. Upload logo')
    console.log('5. Publish changes')
  } catch (error) {
    console.log(`❌ Failed: ${error.message}`)
  }
}

importSiteSettings().catch(console.error)
