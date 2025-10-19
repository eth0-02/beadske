const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: 'wrmf59p3',
  dataset: 'production',
  useCdn: false,
  token: 'skVGeIhFDEsy3bIKk8zu4xyKjS0UaxW4zFsjhzL4fxCAoWPFc4fD01Kvm7nTXsIQYXlZURJheWI8h0UqddGHkc77IVg5PruDoL5VgtoOBNBnUCMPcH141k9lpx2fPy0wEUcv2h19jj4ry2YzAILpFLwQUAvAv8Oq2yiSEelKzX5gv0v5LJN0',
  apiVersion: '2024-01-01',
})

// Convert markdown-style body to Sanity blocks
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
  {
    _type: 'blogPost',
    title: 'How Authentic Maasai Jewelry is Made: From Bead to Beauty',
    slug: {current: 'how-maasai-jewelry-is-made'},
    mainImage: 'https://placehold.co/1200x600/14A3E4/FFFFFF?text=Craftsmanship',
    excerpt: 'Take a behind-the-scenes look at the intricate process of creating authentic Maasai beadwork. Discover the skill, patience, and tradition behind every handcrafted piece.',
    author: 'Maasai Beadwork Team',
    categories: ['craftsmanship', 'stories'],
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    featured: true,
    body: bodyToBlocks(`Creating authentic Maasai jewelry is an art form passed down through generations. Each piece requires hours of meticulous work, combining traditional techniques with individual creativity.

## STEP 1: SELECTING THE BEADS

The process begins with carefully selecting glass beads. Artisans choose colors based on the piece's intended meaning and the patterns they envision. Quality beads are essential—each one must be uniform in size and color.

## STEP 2: PLANNING THE DESIGN

Before threading a single bead, experienced artisans plan their designs. Traditional patterns are memorized and passed down, but each artisan adds their personal touch.

## STEP 3: THE THREADING TECHNIQUE

Using strong thread or wire, artisans begin the painstaking process of threading beads. For necklaces and bracelets, multiple strands are woven together. This requires incredible precision.

## STEP 4: CREATING THE PATTERN

As the piece takes shape, the pattern emerges. Geometric designs, stripes, and traditional symbols are created bead by bead. This stage can take hours to days.

## STEP 5: FINISHING TOUCHES

The final stage involves securing the piece, adding clasps or ties, and ensuring durability. Artisans inspect every detail to meet their high standards.

## THE TIME INVESTMENT

A simple bracelet might take 3-4 hours to complete. Complex necklaces can require 20+ hours of work. This reflects the dedication of Maasai artisans.

## SUPPORTING ARTISAN COMMUNITIES

When you purchase authentic Maasai jewelry, you're supporting skilled artisans and their families. Your purchase helps preserve traditional crafts and keeps cultural heritage alive.`),
    seo: {
      metaTitle: 'How Maasai Jewelry is Made: Authentic Handcrafted Process 2024',
      metaDescription: 'Discover how authentic Maasai jewelry is handcrafted. Learn about traditional beadwork techniques, artisan skills, and the time behind each piece.',
    }
  },
  {
    _type: 'blogPost',
    title: '7 Reasons Why Handmade Jewelry is Better Than Mass-Produced',
    slug: {current: 'handmade-jewelry-vs-mass-produced'},
    mainImage: 'https://placehold.co/1200x600/14E45C/FFFFFF?text=Handmade+Quality',
    excerpt: 'Discover why handmade jewelry offers superior quality, uniqueness, and ethical value compared to mass-produced alternatives.',
    author: 'Maasai Beadwork Team',
    categories: ['craftsmanship'],
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    featured: true,
    body: bodyToBlocks(`In a world of fast fashion and mass production, handmade jewelry stands out as a beacon of quality, authenticity, and ethical craftsmanship.

## 1. EACH PIECE IS TRULY UNIQUE

No two handmade pieces are exactly alike. You're wearing a unique work of art, not what everyone else has.

## 2. SUPERIOR QUALITY AND DURABILITY

Handmade jewelry is crafted with attention to every detail. Built to last for years, not break after a few wears.

## 3. ETHICAL AND SUSTAINABLE

You know exactly where your jewelry comes from. Fair wages, sustainable practices, no exploitation.

## 4. CULTURAL AUTHENTICITY

Handmade Maasai jewelry carries centuries of cultural tradition. Each piece tells a story and represents authentic heritage.

## 5. BETTER MATERIALS

Artisans select quality materials chosen for beauty and durability, not just to minimize costs.

## 6. PERSONAL CONNECTION

Your jewelry was made by a real person with real skills and passion. You're supporting someone's livelihood.

## 7. INVESTMENT VALUE

Handmade jewelry often appreciates over time, becoming heirlooms. Mass-produced jewelry has no resale value.

## MAKE THE CONSCIOUS CHOICE

Choosing handmade jewelry is an investment in quality, ethics, and culture.`),
    seo: {
      metaTitle: 'Handmade vs Mass-Produced Jewelry: 7 Reasons to Choose Handmade',
      metaDescription: 'Discover why handmade jewelry is superior. Learn about quality, ethics, uniqueness, and cultural authenticity.',
    }
  },
  {
    _type: 'blogPost',
    title: 'Meet the Artisans: Stories from Maasai Women Beadwork Makers',
    slug: {current: 'meet-maasai-women-artisans'},
    mainImage: 'https://placehold.co/1200x600/E4C614/FFFFFF?text=Our+Artisans',
    excerpt: 'Get to know the talented Maasai women behind our beautiful beadwork. Their stories of skill, resilience, and cultural pride will inspire you.',
    author: 'Maasai Beadwork Team',
    categories: ['stories', 'culture'],
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    featured: false,
    body: bodyToBlocks(`Behind every piece of Maasai beadwork is a skilled artisan with a unique story.

## NASHIPAI: MASTER OF TRADITIONAL PATTERNS

Nashipai learned beadwork from her grandmother at age seven. Now 45, she's a master artisan who teaches younger women. "When I create a necklace, I'm preserving our history for my grandchildren."

## NOLKISARUNI: INNOVATION MEETS TRADITION

At 28, Nolkisaruni represents a new generation. She honors tradition while experimenting with contemporary designs. "I want young people to be proud of our culture."

## TIPIS: FROM STRUGGLE TO SUCCESS

Tipis started beadwork after her husband passed, needing to support four children. "Beadwork saved my family. Now my daughters are in school."

## THE COOPERATIVE SPIRIT

These women work together, sharing skills, materials, and support. This community spirit is as important as the beadwork itself.

## ECONOMIC EMPOWERMENT

Beadwork provides financial independence—school fees, healthcare, better housing. It gives them a voice in their communities.

## YOUR IMPACT

When you purchase Maasai beadwork, you're directly supporting these women and their families.`),
    seo: {
      metaTitle: 'Meet Maasai Women Artisans: Stories Behind the Beadwork',
      metaDescription: 'Discover inspiring stories of Maasai women artisans who create authentic beadwork.',
    }
  },
  {
    _type: 'blogPost',
    title: 'Sustainable Fashion: Why Ethical Jewelry Matters in 2024',
    slug: {current: 'sustainable-ethical-jewelry-2024'},
    mainImage: 'https://placehold.co/1200x600/3AE414/FFFFFF?text=Sustainable+Fashion',
    excerpt: 'Explore the growing movement toward sustainable fashion. Learn why your jewelry choices can make a positive impact.',
    author: 'Maasai Beadwork Team',
    categories: ['news'],
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    featured: false,
    body: bodyToBlocks(`The fashion industry is at a crossroads. Sustainable and ethical jewelry is no longer a niche—it's a necessity.

## THE HIDDEN COST OF FAST FASHION

That $5 necklace comes with hidden costs: exploited workers, toxic materials, environmental damage.

## WHAT MAKES JEWELRY ETHICAL?

Ethical jewelry ensures fair wages, safe conditions, and transparent supply chains. It respects cultural heritage.

## THE ENVIRONMENTAL IMPACT

Handmade beadwork has a fraction of the environmental footprint. Quality pieces last for years, reducing waste.

## EMPOWERING COMMUNITIES

Ethical jewelry creates sustainable livelihoods. Your money goes directly to skilled workers.

## HOW TO SHOP ETHICALLY

Look for transparent brands. Ask questions. Choose quality over quantity. Support artisan cooperatives.

## THE MAASAI BEADWORK MODEL

Our beadwork represents sustainable fashion: handmade by artisans earning fair wages, using traditional techniques.

## YOUR POWER AS A CONSUMER

Every purchase is a vote for the kind of world you want. Choose ethical jewelry to support fair labor and cultural preservation.`),
    seo: {
      metaTitle: 'Sustainable Ethical Jewelry Guide 2024: Why It Matters',
      metaDescription: 'Learn why sustainable and ethical jewelry matters. Discover how to shop responsibly.',
    }
  },
  {
    _type: 'blogPost',
    title: 'How to Style Maasai Beadwork: Modern Fashion Meets Traditional Art',
    slug: {current: 'how-to-style-maasai-beadwork'},
    mainImage: 'https://placehold.co/1200x600/E414A3/FFFFFF?text=Styling+Guide',
    excerpt: 'Learn how to incorporate authentic Maasai beadwork into your modern wardrobe. Get styling tips and outfit ideas.',
    author: 'Maasai Beadwork Team',
    categories: ['culture'],
    publishedAt: new Date(Date.now() - 432000000).toISOString(),
    featured: false,
    body: bodyToBlocks(`Maasai beadwork isn't just for special occasions—it's versatile enough for everyday wear.

## CASUAL EVERYDAY LOOK

Pair a beaded bracelet with jeans and white t-shirt. Stack multiple bracelets for bohemian vibes.

## OFFICE PROFESSIONAL

Choose sophisticated color combinations—black, white, gold. A beaded necklace over a blazer adds personality.

## EVENING ELEGANCE

Make a statement with bold Maasai jewelry. A multi-strand necklace pairs beautifully with a little black dress.

## FESTIVAL AND BOHEMIAN

Perfect for festivals! Layer necklaces, stack bracelets, mix patterns and colors.

## BEACH AND VACATION

Beaded anklets and bracelets add color to swimwear and sundresses.

## COLOR COORDINATION TIPS

Red pops against white, black, or denim. Green complements earth tones. Multi-colored beadwork works with solid colors.

## MIXING METALS AND MATERIALS

Mix beadwork with gold and silver pieces. The key is balance.

## WEARING WITH RESPECT

Remember that Maasai beadwork carries cultural significance. Wear it with appreciation and share its story.`),
    seo: {
      metaTitle: 'How to Style Maasai Beadwork Jewelry: Fashion Guide 2024',
      metaDescription: 'Learn how to style Maasai beadwork jewelry. Get fashion tips for casual, office, and evening looks.',
    }
  },
]

async function importBlogPosts() {
  console.log('🚀 Starting blog posts import to Sanity...\n')

  let imported = 0

  for (const post of blogPosts) {
    try {
      await client.create(post)
      imported++
      console.log(`✅ ${imported}. ${post.title}`)
    } catch (error) {
      console.log(`❌ Failed: ${post.title} - ${error.message}`)
    }
  }

  console.log(`\n🎉 Import complete! Imported ${imported} of ${blogPosts.length} blog posts`)
  console.log('\n📝 Next steps:')
  console.log('1. Go to http://localhost:3333')
  console.log('2. Click "Blog Posts" to see all imported posts')
  console.log('3. Add images to posts')
  console.log('4. Edit and customize content')
  console.log('5. Publish posts')
}

importBlogPosts().catch(console.error)
