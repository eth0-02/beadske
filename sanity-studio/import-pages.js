const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: 'wrmf59p3',
  dataset: 'production',
  useCdn: false,
  token: 'skVGeIhFDEsy3bIKk8zu4xyKjS0UaxW4zFsjhzL4fxCAoWPFc4fD01Kvm7nTXsIQYXlZURJheWI8h0UqddGHkc77IVg5PruDoL5VgtoOBNBnUCMPcH141k9lpx2fPy0wEUcv2h19jj4ry2YzAILpFLwQUAvAv8Oq2yiSEelKzX5gv0v5LJN0',
  apiVersion: '2024-01-01',
})

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
            children: [{_type: 'span', text: 'Each piece of jewelry is handcrafted by skilled Maasai artisans using traditional techniques passed down through generations. When you wear our beadwork, you\'re not just wearing beautiful jewelry — you\'re supporting local communities and preserving cultural heritage.'}]
          }
        ]
      },
      {
        _type: 'imageTextSection',
        heading: 'Handcrafted Excellence',
        content: 'Every bead is carefully selected and threaded by hand. Our artisans take pride in creating pieces that blend traditional Maasai patterns with contemporary style. Each piece takes hours to complete, ensuring the highest quality and attention to detail.',
        imagePosition: 'left',
      },
      {
        _type: 'imageTextSection',
        heading: 'Supporting Local Artisans',
        content: 'Your purchase directly supports Maasai women and their families. We work with artisan cooperatives to ensure fair wages and sustainable livelihoods. Together, we\'re preserving traditional crafts while empowering communities.',
        imagePosition: 'right',
      },
      {
        _type: 'ctaSection',
        heading: 'Ready to Shop?',
        description: 'Browse our collection of handcrafted Maasai beadwork jewelry. Each piece is unique and made with love.',
        buttonText: 'Shop Now',
        buttonLink: '/shop',
      }
    ],
    seo: {
      metaTitle: 'Maasai Beadwork - Handcrafted Kenyan Jewelry | Authentic African Beadwork',
      metaDescription: 'Shop authentic Maasai beadwork jewelry handcrafted by local artisans. Bracelets, necklaces, and anklets in Kenyan flag colors. Support fair trade and cultural heritage.',
      keywords: ['maasai beadwork', 'handcrafted jewelry', 'kenyan crafts', 'african jewelry', 'fair trade', 'artisan jewelry']
    }
  },
  {
    _type: 'pageContent',
    title: 'About Page',
    pageId: 'about',
    hero: {
      heading: 'Our Story',
      subheading: 'Preserving tradition, empowering communities, creating beauty',
      buttonText: 'Shop Collection',
      buttonLink: '/shop',
    },
    sections: [
      {
        _type: 'textSection',
        heading: 'Who We Are',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [{_type: 'span', text: 'We are a social enterprise dedicated to preserving Maasai beadwork traditions while empowering local artisan communities. Our mission is to create sustainable livelihoods for Maasai women through their incredible craftsmanship.'}]
          }
        ]
      },
      {
        _type: 'imageTextSection',
        heading: 'Our Mission',
        content: 'To preserve traditional Maasai beadwork techniques, empower women artisans with fair wages and sustainable income, and share the beauty of Maasai culture with the world through authentic handcrafted jewelry.',
        imagePosition: 'left',
      },
      {
        _type: 'imageTextSection',
        heading: 'Our Impact',
        content: 'We work directly with artisan cooperatives, ensuring fair wages and safe working conditions. 100% of profits go back to the artisans and their communities. We\'ve helped send children to school, improve healthcare access, and preserve cultural heritage.',
        imagePosition: 'right',
      },
      {
        _type: 'textSection',
        heading: 'Our Values',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [{_type: 'span', text: 'Authenticity: Every piece is genuinely handcrafted by Maasai artisans. Fair Trade: We ensure fair wages and ethical working conditions. Sustainability: We support sustainable livelihoods and environmental practices. Cultural Preservation: We honor and preserve traditional Maasai beadwork techniques.'}]
          }
        ]
      },
      {
        _type: 'ctaSection',
        heading: 'Join Our Mission',
        description: 'Every purchase supports artisan communities and preserves cultural heritage.',
        buttonText: 'Shop Collection',
        buttonLink: '/shop',
      }
    ],
    seo: {
      metaTitle: 'About Us - Maasai Beadwork | Supporting Artisan Communities',
      metaDescription: 'Learn about our mission to preserve Maasai beadwork traditions and empower local artisans. Fair trade, handcrafted jewelry supporting communities.',
      keywords: ['about maasai beadwork', 'fair trade jewelry', 'artisan communities', 'social enterprise', 'cultural preservation']
    }
  },
  {
    _type: 'pageContent',
    title: 'Contact Page',
    pageId: 'contact',
    hero: {
      heading: 'Get in Touch',
      subheading: 'We\'d love to hear from you',
      buttonText: 'Shop Collection',
      buttonLink: '/shop',
    },
    sections: [
      {
        _type: 'textSection',
        heading: 'Contact Us',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [{_type: 'span', text: 'Have questions about our products, shipping, or artisan communities? We\'re here to help! Reach out to us and we\'ll get back to you as soon as possible.'}]
          }
        ]
      },
      {
        _type: 'imageTextSection',
        heading: 'Customer Support',
        content: 'Email: info@maasaibeadwork.com\nPhone: +254 XXX XXX XXX\nHours: Monday - Friday, 9AM - 5PM EAT\n\nWe typically respond within 24 hours.',
        imagePosition: 'left',
      },
      {
        _type: 'imageTextSection',
        heading: 'Visit Our Workshop',
        content: 'Want to see our artisans at work? We welcome visitors to our workshop in Kenya. Contact us to schedule a visit and meet the talented women behind our beautiful beadwork.',
        imagePosition: 'right',
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
      metaTitle: 'Contact Us - Maasai Beadwork | Customer Support',
      metaDescription: 'Get in touch with Maasai Beadwork. Questions about products, shipping, or artisan communities? We\'re here to help.',
      keywords: ['contact maasai beadwork', 'customer support', 'jewelry questions', 'artisan workshop']
    }
  },
  {
    _type: 'pageContent',
    title: 'Shop Page',
    pageId: 'shop',
    hero: {
      heading: 'Shop Our Collection',
      subheading: 'Handcrafted Maasai beadwork jewelry in authentic Kenyan flag colors',
      buttonText: 'View All Products',
      buttonLink: '#products',
    },
    sections: [
      {
        _type: 'textSection',
        heading: 'Our Collection',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [{_type: 'span', text: 'Browse our complete collection of handcrafted Maasai beadwork jewelry. Each piece is unique, made with love by skilled artisans, and features the vibrant colors of the Kenyan flag.'}]
          }
        ]
      },
      {
        _type: 'ctaSection',
        heading: 'Can\'t Find What You\'re Looking For?',
        description: 'We offer custom orders! Contact us to create a unique piece just for you.',
        buttonText: 'Contact Us',
        buttonLink: '/contact',
      }
    ],
    seo: {
      metaTitle: 'Shop Maasai Beadwork Jewelry | Handcrafted Bracelets, Necklaces & Anklets',
      metaDescription: 'Shop authentic Maasai beadwork jewelry. Handcrafted bracelets, necklaces, and anklets in Kenyan flag colors. Fair trade, supporting artisan communities.',
      keywords: ['buy maasai jewelry', 'handcrafted bracelets', 'african beadwork', 'kenyan jewelry', 'fair trade jewelry']
    }
  }
]

async function importPages() {
  console.log('🚀 Starting page content import to Sanity...\n')

  let imported = 0

  for (const page of pages) {
    try {
      await client.create(page)
      imported++
      console.log(`✅ ${imported}. ${page.title} (${page.pageId})`)
    } catch (error) {
      console.log(`❌ Failed: ${page.title} - ${error.message}`)
    }
  }

  console.log(`\n🎉 Import complete! Imported ${imported} of ${pages.length} pages`)
  console.log('\n📝 Next steps:')
  console.log('1. Go to http://localhost:3333')
  console.log('2. Click "Page Content" to see all imported pages')
  console.log('3. Edit content, add images, customize')
  console.log('4. Publish changes')
  console.log('5. Update frontend to fetch from Sanity')
}

importPages().catch(console.error)
