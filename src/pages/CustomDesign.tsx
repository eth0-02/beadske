import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Palette, Upload, CheckCircle } from 'lucide-react'
import { client as sanityClient } from '@/lib/sanity'

interface FormData {
  customerName: string
  email: string
  phone: string
  designType: string
  colors: string[]
  size: string
  description: string
  budget: string
  deadline: string
}

export default function CustomDesign() {
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    email: '',
    phone: '',
    designType: '',
    colors: [],
    size: '',
    description: '',
    budget: '',
    deadline: '',
  })
  const [images, setImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const designTypes = [
    { value: 'bracelet', label: 'Bracelet' },
    { value: 'necklace', label: 'Necklace' },
    { value: 'anklet', label: 'Anklet' },
    { value: 'earrings', label: 'Earrings' },
    { value: 'belt', label: 'Belt' },
    { value: 'headband', label: 'Headband' },
    { value: 'other', label: 'Other' },
  ]

  const colorOptions = [
    'Red', 'Black', 'White', 'Green', 'Blue', 
    'Yellow', 'Orange', 'Purple', 'Gold', 'Silver'
  ]

  const budgetRanges = [
    { value: 'under-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200-500', label: '$200 - $500' },
    { value: 'over-500', label: 'Over $500' },
    { value: 'flexible', label: 'Flexible' },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleColorToggle = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Submit to Formspree
      const formspreeData = new FormData()
      formspreeData.append('customerName', formData.customerName)
      formspreeData.append('email', formData.email)
      formspreeData.append('phone', formData.phone)
      formspreeData.append('designType', formData.designType)
      formspreeData.append('colors', formData.colors.join(', '))
      formspreeData.append('size', formData.size)
      formspreeData.append('description', formData.description)
      formspreeData.append('budget', formData.budget)
      formspreeData.append('deadline', formData.deadline)
      
      // Add images to form data
      images.forEach((image, index) => {
        formspreeData.append(`image${index + 1}`, image)
      })

      // Submit to Formspree
      const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID || 'xpwynjyb'
      const formspreeResponse = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: formspreeData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (!formspreeResponse.ok) {
        throw new Error('Failed to submit to Formspree')
      }

      // Also save to Sanity for backup/tracking
      try {
        const request = {
          _type: 'customDesignRequest',
          customerName: formData.customerName,
          email: formData.email,
          phone: formData.phone,
          designType: formData.designType,
          colors: formData.colors,
          size: formData.size,
          description: formData.description,
          budget: formData.budget,
          deadline: formData.deadline,
          status: 'new',
          createdAt: new Date().toISOString(),
        }
        await sanityClient.create(request)
      } catch (sanityError) {
        console.warn('Sanity backup failed, but Formspree succeeded:', sanityError)
      }

      setSubmitted(true)
    } catch (err) {
      console.error('Error submitting request:', err)
      setError('Failed to submit your request. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-50 py-16">
        <Helmet>
          <title>Request Submitted - Maasai Beadwork</title>
        </Helmet>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Request Submitted Successfully!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your custom design request. Our artisans will review your request and get back to you within 2-3 business days.
          </p>
          <p className="text-gray-600 mb-8">
            We'll send a confirmation email to <strong>{formData.email}</strong> with the details of your request.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setSubmitted(false)
                setFormData({
                  customerName: '',
                  email: '',
                  phone: '',
                  designType: '',
                  colors: [],
                  size: '',
                  description: '',
                  budget: '',
                  deadline: '',
                })
                setImages([])
              }}
              className="px-6 py-3 bg-bead-red text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Submit Another Request
            </button>
            <a
              href="/shop"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Browse Products
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-16">
      <Helmet>
        <title>Custom Design Request - Maasai Beadwork</title>
        <meta name="description" content="Request a custom handcrafted Maasai beadwork design. Our artisans will create unique jewelry tailored to your specifications." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Palette className="w-12 h-12 text-bead-red mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Custom Design Request</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a unique vision? Our skilled Maasai artisans can create custom beadwork designs tailored to your preferences. 
            Share your ideas and we'll bring them to life!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  required
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bead-red focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bead-red focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bead-red focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Design Details */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Design Details</h2>
            
            <div className="mb-6">
              <label htmlFor="designType" className="block text-sm font-medium text-gray-700 mb-2">
                Type of Design *
              </label>
              <select
                id="designType"
                name="designType"
                required
                value={formData.designType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bead-red focus:border-transparent"
              >
                <option value="">Select a type...</option>
                {designTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Colors
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorToggle(color.toLowerCase())}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      formData.colors.includes(color.toLowerCase())
                        ? 'border-bead-red bg-bead-red text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-bead-red'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                Size/Measurements
              </label>
              <input
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                placeholder="e.g., wrist circumference 7 inches, neck size 16 inches"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bead-red focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Design Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your custom design idea in detail. Include any specific patterns, symbols, or meanings you'd like incorporated..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bead-red focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">
                Minimum 10 characters, maximum 1000 characters
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
                Reference Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-bead-red transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <label htmlFor="images" className="cursor-pointer">
                  <span className="text-bead-red hover:underline">Upload images</span>
                  <span className="text-gray-600"> or drag and drop</span>
                  <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB each</p>
                {images.length > 0 && (
                  <p className="text-sm text-green-600 mt-2">{images.length} image(s) selected</p>
                )}
              </div>
            </div>
          </div>

          {/* Budget & Timeline */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Budget & Timeline</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bead-red focus:border-transparent"
                >
                  <option value="">Select a range...</option>
                  {budgetRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                  Desired Completion Date
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bead-red focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-bead-red text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                'Submit Request'
              )}
            </button>
          </div>
        </form>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">What Happens Next?</h3>
          <ol className="space-y-4 text-gray-600">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-bead-red text-white rounded-full flex items-center justify-center text-sm">1</span>
              <span><strong>Review:</strong> Our design team will review your request within 2-3 business days.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-bead-red text-white rounded-full flex items-center justify-center text-sm">2</span>
              <span><strong>Quote:</strong> We'll send you a detailed quote including price, timeline, and design mockup.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-bead-red text-white rounded-full flex items-center justify-center text-sm">3</span>
              <span><strong>Approval:</strong> Once you approve, we'll begin handcrafting your unique piece.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-bead-red text-white rounded-full flex items-center justify-center text-sm">4</span>
              <span><strong>Delivery:</strong> Your custom beadwork will be carefully packaged and shipped to you.</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
