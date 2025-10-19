import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Cart from './components/Cart'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import About from './pages/About'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'
import CheckoutSuccess from './pages/CheckoutSuccess'
import CheckoutCancel from './pages/CheckoutCancel'
import Login from './pages/Login'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import CustomDesign from './pages/CustomDesign'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <Cart />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:handle" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/custom-design" element={<CustomDesign />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/cancel" element={<CheckoutCancel />} />
          <Route path="/login" element={<Login />} />
          {/* 404 Page */}
          <Route path="*" element={
            <div className="container mx-auto px-4 py-20 text-center">
              <h1 className="text-5xl font-heading font-bold mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-8">Page not found</p>
              <a href="/" className="btn-bead-primary">
                Go Home
              </a>
            </div>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
