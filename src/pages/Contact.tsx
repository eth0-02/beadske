import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Instagram, MapPin, Send } from 'lucide-react'
import SEO from '@/components/SEO'
import BeadDivider from '@/components/BeadDivider'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Maasai Beadwork. We'd love to hear from you about our handcrafted jewelry and artisan partnerships."
        keywords="contact Maasai Beadwork, customer support, jewelry inquiries, artisan partnerships"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or want to learn more about our artisan partnerships? We'd love to hear from you!
          </p>
          <BeadDivider />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-heading font-bold mb-6">Send us a Message</h2>
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-bead-green text-white p-6 rounded-lg text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center">
                    <Send className="text-bead-green" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-bead"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-bead"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-bead"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="input-bead resize-none"
                      placeholder="Tell us more..."
                    />
                  </div>

                  <button type="submit" className="btn-bead-primary w-full flex items-center justify-center gap-2">
                    <Send size={20} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <div className="bg-bead-neutral p-8 rounded-lg">
              <h2 className="text-2xl font-heading font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-bead-red flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:info@maasaibeadwork.com" className="text-bead-red hover:underline">
                      info@maasaibeadwork.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-bead-green flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                    <a href="https://wa.me/1234567890" className="text-bead-green hover:underline">
                      +254 123 456 789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-bead-black flex items-center justify-center flex-shrink-0">
                    <Instagram className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Instagram</h3>
                    <a href="https://instagram.com/maasaibeadwork" className="text-gray-700 hover:underline">
                      @maasaibeadwork
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-bead-red flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-gray-700">
                      Kajiado County<br />
                      Kenya
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-heading font-bold mb-6">Business Hours</h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM EAT</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM EAT</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-bead-green text-white p-8 rounded-lg">
              <h3 className="text-xl font-heading font-bold mb-3">Need Quick Answers?</h3>
              <p className="mb-4 opacity-90">
                Check out our FAQ section for common questions about shipping, returns, and product care.
              </p>
              <button className="btn-bead bg-white text-bead-green hover:bg-bead-neutral">
                View FAQ
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
