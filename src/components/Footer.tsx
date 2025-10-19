import { Link } from 'react-router-dom'
import { Instagram, MessageCircle, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-bead-black text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex gap-1 mb-4">
              <div className="w-3 h-3 rounded-full bg-bead-red" />
              <div className="w-3 h-3 rounded-full bg-white" />
              <div className="w-3 h-3 rounded-full bg-bead-green" />
            </div>
            <h3 className="font-heading font-bold text-lg mb-2">Maasai Beadwork</h3>
            <p className="text-gray-400 text-sm">
              Crafted with Culture. Worn with Pride.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="text-gray-400 hover:text-bead-red transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=bracelets" className="text-gray-400 hover:text-bead-red transition-colors">Bracelets</Link></li>
              <li><Link to="/shop?category=necklaces" className="text-gray-400 hover:text-bead-red transition-colors">Necklaces</Link></li>
              <li><Link to="/shop?category=anklets" className="text-gray-400 hover:text-bead-red transition-colors">Anklets</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-heading font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-bead-red transition-colors">Our Story</Link></li>
              <li><Link to="/about#artisans" className="text-gray-400 hover:text-bead-red transition-colors">Artisans</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-bead-red transition-colors">Contact Us</Link></li>
              <li><Link to="/admin" className="text-gray-400 hover:text-bead-red transition-colors">Admin</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-bead-red flex items-center justify-center hover:bg-bead-green transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-bead-green flex items-center justify-center hover:bg-bead-red transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="mailto:info@maasaibeadwork.com"
                className="w-10 h-10 rounded-full bg-bead-red flex items-center justify-center hover:bg-bead-green transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Maasai Beadwork. All rights reserved.</p>
          <p className="mt-2">
            Made by{' '}
            <a
              href="https://codebizz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bead-red hover:text-bead-green transition-colors font-semibold"
            >
              CodeBizz
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
