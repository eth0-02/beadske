import { loadStripe } from '@stripe/stripe-js'

const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ''

export const stripePromise = loadStripe(STRIPE_KEY)
