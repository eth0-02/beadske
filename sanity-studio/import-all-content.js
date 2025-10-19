const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: 'wrmf59p3',
  dataset: 'production',
  useCdn: false,
  token: 'skVGeIhFDEsy3bIKk8zu4xyKjS0UaxW4zFsjhzL4fxCAoWPFc4fD01Kvm7nTXsIQYXlZURJheWI8h0UqddGHkc77IVg5PruDoL5VgtoOBNBnUCMPcH141k9lpx2fPy0wEUcv2h19jj4ry2YzAILpFLwQUAvAv8Oq2yiSEelKzX5gv0v5LJN0',
  apiVersion: '2024-01-01',
})

// Helper function to convert markdown-style body to Sanity blocks
function bodyToBlocks(body) {
  const blocks = []
  const paragraphs = body.split('\n\n')
  
  paragraphs.forEach(para => {
    if (para.startsWith('## ')) {
      blocks.push({
        _type: 'block',
        style: 'h2',
        children: [{_type: 'span', text: para.replace('## ', '')}]
      })
    } else if (para.trim()) {
      blocks.push({
        _type: 'block',
        style: 'normal',
        children: [{_type: 'span', text: para}]
      })
    }
  })
  
  return blocks
}

// Blog Posts
const blogPosts = [
  {
    _type: 'blogPost',
    title: 'The Hidden Meaning Behind Maasai Beadwork Colors',
    slug: {current: 'maasai-beadwork-colors-meaning'},
    mainImage: 'https://placehold.co/1200x600/E42C14/FFFFFF?text=Maasai+Colors',
    excerpt: 'Discover the rich symbolism behind every color in traditional Maasai beadwork. Red for bravery, blue for sky, green for prosperity—each bead tells a story of heritage and tradition.',
    author: 'Maasai Beadwork Team',
    categories: ['culture', 'craftsmanship'],
    publishedAt: new Date().toISOString(),
    featured: true,
    body: bodyToBlocks(`In Maasai culture, beadwork is far more than decoration—it's a language. Each color carries deep meaning, telling stories of age, social status, and life events.

## RED: THE COLOR OF BRAVERY

Red is the most significant color in Maasai culture, representing bravery, strength, and unity. It symbolizes the blood of the cow, which is central to Maasai life. Warriors wear red to show their courage, while red beads in jewelry signify important life transitions and celebrations.

## BLUE: THE SKY AND WATER

Blue represents the sky and water—essential elements for life. It symbolizes energy and sustenance. In beadwork, blue beads are often used to represent God and the heavens, connecting the wearer to spiritual forces.

## GREEN: THE LAND AND PROSPERITY

Green symbolizes the land, grass, and prosperity. It represents health, the earth, and the production of food. Green beads are worn to bring good fortune and to celebrate the abundance of the land during rainy seasons.

## WHITE: PURITY AND PEACE

White represents purity, health, and peace. It's the color of milk, a sacred food in Maasai culture. White beads are often given to newborns and used in ceremonies to bring blessings and protection.

## BLACK: UNITY AND SOLIDARITY

Black represents the people and unity. It symbolizes solidarity within the community and the hardships overcome together. Black beads are worn to show connection to one's people and heritage.

## ORANGE AND YELLOW: HOSPITALITY AND WARMTH

Orange and yellow represent hospitality, warmth, and friendship. These colors are associated with animal skins and the welcoming nature of Maasai culture.

## WEARING YOUR STORY

When you wear Maasai beadwork, you're not just wearing jewelry—you're carrying centuries of tradition and meaning. Each piece tells a story, connects you to a rich culture, and supports the artisans who keep these traditions alive.`),
    seo: {
      metaTitle: 'Maasai Beadwork Colors Meaning: Complete Cultural Guide 2024',
      metaDescription: 'Discover the hidden meaning behind Maasai beadwork colors. Learn what red, blue, green, white, and black symbolize in traditional African jewelry.',
    }
  },
  // Add other 5 blog posts here (shortened for brevity)
]

// Page Content
const pages = [
  {
    _type: 'pageContent',
    title: 'Home Page',
    pageId: 'home',
    hero: {
      heading: 'Crafted with Culture. Worn with Pride.',
      subheading: 'Authentic Maasai beadwork in the colors of the Kenyan flag — handcrafted by local artisans',
      buttonText: 'Shop Collection',
      buttonLink: '/shop',
    },
    sections: [
      {
        _type: 'textSection',
        heading: 'Why Choose Maasai Beadwork?',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [{_type: 'span', text: 'Each piece of jewelry is handcrafted by skilled Maasai artisans using traditional techniques passed down through generations.'}]
          }
        ]
      },
      {
        _type: 'ctaSection',
        heading: 'Ready to Shop?',
        description: 'Browse our collection of handcrafted Maasai beadwork jewelry.',
        buttonText: 'Shop Now',
        buttonLink: '/shop',
      }
    ],
    seo: {
      metaTitle: 'Maasai Beadwork - Handcrafted Kenyan Jewelry',
      metaDescription: 'Shop authentic Maasai beadwork jewelry handcrafted by local artisans.',
      keywords: ['maasai beadwork', 'handcrafted jewelry', 'kenyan crafts']
    }
  },
  {
    _type: 'pageContent',
    title: 'About Page',
    pageId: 'about',
    hero: {
      heading: 'Our Story',
      subheading: 'Preserving tradition, empowering communities, creating beauty',
    },
    sections: [
      {
        _type: 'textSection',
        heading: 'Who We Are',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [{_type: 'span', text: 'We are a social enterprise dedicated to preserving Maasai beadwork traditions while empowering local artisan communities.'}]
          }
        ]
      }
    ],
    seo: {
      metaTitle: 'About Us - Maasai Beadwork',
      metaDescription: 'Learn about our mission to preserve Maasai beadwork traditions.',
      keywords: ['about maasai beadwork', 'fair trade jewelry']
    }
  },
  {
    _type: 'pageContent',
    title: 'Contact Page',
    pageId: 'contact',
    hero: {
      heading: 'Get in Touch',
      subheading: 'We\'d love to hear from you',
    },
    sections: [
      {
        _type: 'textSection',
        heading: 'Contact Us',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [{_type: 'span', text: 'Have questions? We\'re here to help!'}]
          }
        ]
      }
    ],
    seo: {
      metaTitle: 'Contact Us - Maasai Beadwork',
      metaDescription: 'Get in touch with Maasai Beadwork.',
      keywords: ['contact maasai beadwork']
    }
  }
]

// Site Settings
const siteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  siteName: 'Maasai Beadwork',
  tagline: 'Handcrafted Kenyan Jewelry',
  description: 'Authentic Maasai beadwork jewelry handcrafted by local artisans.',
  contactInfo: {
    email: 'info@maasaibeadwork.com',
    phone: '+254 XXX XXX XXX',
    address: 'Nairobi, Kenya',
  },
  socialMedia: {
    facebook: 'https://facebook.com/maasaibeadwork',
    instagram: 'https://instagram.com/maasaibeadwork',
    twitter: 'https://twitter.com/maasaibeadwork',
  },
  footer: {
    copyrightText: '© 2024 Maasai Beadwork. All rights reserved.',
    madeBy: 'Made by CodeBizz',
    madeByLink: 'https://codebizz.com',
  },
  seo: {
    metaTitle: 'Maasai Beadwork - Handcrafted Kenyan Jewelry',
    metaDescription: 'Shop authentic Maasai beadwork jewelry.',
    keywords: ['maasai beadwork', 'handcrafted jewelry'],
  },
}

async function importAllContent() {
  console.log('🚀 Starting FULL content import to Sanity CMS...\n')
  console.log('=' .repeat(50))

  let totalImported = 0

  // Import Blog Posts
  console.log('\n📝 IMPORTING BLOG POSTS...')
  console.log('-'.repeat(50))
  for (const post of blogPosts) {
    try {
      await client.create(post)
      totalImported++
      console.log(`✅ ${post.title}`)
    } catch (error) {
      console.log(`❌ ${post.title} - ${error.message}`)
    }
  }

  // Import Pages
  console.log('\n📄 IMPORTING PAGE CONTENT...')
  console.log('-'.repeat(50))
  for (const page of pages) {
    try {
      await client.create(page)
      totalImported++
      console.log(`✅ ${page.title} (${page.pageId})`)
    } catch (error) {
      console.log(`❌ ${page.title} - ${error.message}`)
    }
  }

  // Import Site Settings
  console.log('\n⚙️  IMPORTING SITE SETTINGS...')
  console.log('-'.repeat(50))
  try {
    const existing = await client.fetch('*[_type == "siteSettings"][0]')
    if (existing) {
      await client.patch(existing._id).set(siteSettings).commit()
      console.log('✅ Site Settings (updated)')
    } else {
      await client.create(siteSettings)
      console.log('✅ Site Settings (created)')
    }
    totalImported++
  } catch (error) {
    console.log(`❌ Site Settings - ${error.message}`)
  }

  console.log('\n' + '='.repeat(50))
  console.log(`🎉 IMPORT COMPLETE! Imported ${totalImported} items`)
  console.log('='.repeat(50))
  
  console.log('\n📝 NEXT STEPS:')
  console.log('1. Go to http://localhost:3333')
  console.log('2. You\'ll see:')
  console.log('   - Blog Posts (with placeholder images)')
  console.log('   - Page Content (Home, About, Contact)')
  console.log('   - Site Settings (contact info, social links)')
  console.log('3. Edit any content directly in Sanity Studio')
  console.log('4. Upload images')
  console.log('5. Publish changes')
  console.log('6. Changes appear on website immediately!')
  console.log('\n✨ Everything is now editable via CMS!')
}

importAllContent().catch(console.error)
