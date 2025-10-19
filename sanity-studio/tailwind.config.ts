import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kenyan flag colors - Maasai beadwork palette
        'bead-black': '#000000',
        'bead-red': '#BB0A1E',
        'bead-white': '#FFFFFF',
        'bead-green': '#0A6E29',
        'bead-neutral': '#F5F5F0',
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'bead': '50px',
      },
      boxShadow: {
        'bead-glow-red': '0 0 20px rgba(187, 10, 30, 0.3)',
        'bead-glow-green': '0 0 20px rgba(10, 110, 41, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bead-pulse': 'beadPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        beadPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
