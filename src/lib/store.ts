import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  thumbnail?: string
  variant_id?: string
}

interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
}

interface StoreState {
  // Cart
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  cartTotal: () => number
  cartCount: () => number

  // User
  user: User | null
  token: string | null
  setUser: (user: User | null) => void
  login: (user: User, token: string) => void
  logout: () => void

  // UI
  isCartOpen: boolean
  setCartOpen: (open: boolean) => void
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],
      
      addToCart: (item) => {
        const existingItem = get().cart.find((i) => i.id === item.id)
        if (existingItem) {
          set({
            cart: get().cart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          })
        } else {
          set({ cart: [...get().cart, item] })
        }
      },

      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id)
        } else {
          set({
            cart: get().cart.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          })
        }
      },

      clearCart: () => set({ cart: [] }),

      cartTotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      cartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0)
      },

      // User state
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      login: (user, token) => {
        try {
          localStorage.setItem('auth_token', token)
        } catch {}
        set({ user, token })
      },
      logout: () => {
        try {
          localStorage.removeItem('auth_token')
        } catch {}
        set({ user: null, token: null, cart: [] })
      },

      // UI state
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
    }),
    {
      name: 'maasai-beadwork-storage',
      partialize: (state) => ({
        cart: state.cart,
        user: state.user,
        token: state.token,
      }),
    }
  )
)
