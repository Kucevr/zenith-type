/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#F5F5F3',
          black: '#0A0A0A',
          accent: '#FF3C00',
          lime: '#D4FF00',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        serif: ['Playfair Display', 'serif'],
        unbounded: ['Unbounded', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        chakra: ['Chakra Petch', 'sans-serif'],
        bricolage: ['Bricolage Grotesque', 'sans-serif'],
        fraunces: ['Fraunces', 'serif'],
        epilogue: ['Epilogue', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        inconsolata: ['Inconsolata', 'monospace'],
        public: ['Public Sans', 'sans-serif'],
        newsreader: ['Newsreader', 'serif'],
        sora: ['Sora', 'sans-serif'],
        libre: ['Libre Baskerville', 'serif'],
        kanit: ['Kanit', 'sans-serif'],
        vollkorn: ['Vollkorn', 'serif'],
        hanken: ['Hanken Grotesk', 'sans-serif'],
        zilla: ['Zilla Slab', 'serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      }
    }
  },
  plugins: [],
}
