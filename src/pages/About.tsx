import { motion } from 'framer-motion'
import { Heart, Users, Globe, Award } from 'lucide-react'
import SEO from '@/components/SEO'
import BeadDivider from '@/components/BeadDivider'

export default function About() {
  const artisans = [
    {
      name: 'Naomi Lekishon',
      role: 'Master Beadworker',
      image: '/placeholder.svg',
      bio: '15 years of experience creating traditional Maasai jewelry',
    },
    {
      name: 'Sarah Nkuruna',
      role: 'Design Lead',
      image: '/placeholder.svg',
      bio: 'Blending traditional patterns with contemporary styles',
    },
    {
      name: 'Grace Parsitau',
      role: 'Quality Artisan',
      image: '/placeholder.svg',
      bio: 'Ensuring every piece meets the highest standards',
    },
  ]

  const values = [
    {
      icon: Heart,
      title: 'Authentic Craftsmanship',
      description: 'Every piece is handcrafted using traditional Maasai beadwork techniques passed down through generations.',
    },
    {
      icon: Users,
      title: 'Community Empowerment',
      description: 'We work directly with Maasai artisans, providing fair wages and supporting local communities.',
    },
    {
      icon: Globe,
      title: 'Cultural Preservation',
      description: 'Keeping Maasai beadwork traditions alive while sharing them with the world.',
    },
    {
      icon: Award,
      title: 'Quality & Pride',
      description: 'Each piece represents the pride and skill of our artisans, crafted with exceptional attention to detail.',
    },
  ]

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about our mission to preserve Maasai beadwork traditions while empowering local artisan communities in Kenya."
        keywords="Maasai culture, artisan jewelry, fair trade, handcrafted Kenya, cultural preservation"
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-bead-neutral">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Our <span className="text-bead-red">Story</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Preserving Maasai heritage through authentic beadwork while empowering local artisan communities
            </p>
            <BeadDivider />
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-heading font-bold mb-6">
                Crafted with Culture. Worn with Pride.
              </h2>
              <p className="text-gray-700 mb-4">
                Maasai Beadwork was founded with a simple yet powerful mission: to celebrate and preserve the rich tradition of Maasai beadwork while creating sustainable livelihoods for local artisans in Kenya.
              </p>
              <p className="text-gray-700 mb-4">
                Each piece in our collection tells a story — a story of heritage, skill, and cultural pride. The colors of the Kenyan flag (black, red, white, and green) are woven into every design, representing the strength, bravery, peace, and prosperity of the Kenyan people.
              </p>
              <p className="text-gray-700">
                By choosing our jewelry, you're not just wearing a beautiful accessory — you're supporting artisan communities, preserving cultural traditions, and carrying a piece of Kenyan heritage with you.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-bead-neutral rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Maasai artisan at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-bead-red rounded-full opacity-20 -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-bead-green rounded-full opacity-20 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-bead-neutral">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Our Values</h2>
            <BeadDivider />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bead-red flex items-center justify-center">
                  <value.icon className="text-white" size={32} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisans Section */}
      <section id="artisans" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Meet Our Artisans</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The talented hands behind every piece of jewelry
            </p>
            <BeadDivider />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artisans.map((artisan, idx) => (
              <motion.div
                key={artisan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="aspect-square bg-bead-neutral rounded-lg overflow-hidden mb-4">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading font-bold text-xl mb-1">{artisan.name}</h3>
                <p className="text-bead-red font-semibold mb-2">{artisan.role}</p>
                <p className="text-gray-600 text-sm">{artisan.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-bead-red text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2">50+</div>
              <p className="text-lg opacity-90">Artisans Supported</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <p className="text-lg opacity-90">Pieces Crafted</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl font-bold mb-2">5</div>
              <p className="text-lg opacity-90">Communities Empowered</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
