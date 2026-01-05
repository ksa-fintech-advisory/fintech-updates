/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Shorthand for all directories
  ],
  darkMode: 'class', // Essential for the engineering audience
  theme: {
    extend: {
      // 1. Typography: Adding a Monospace stack for financial data & code
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        arabic: ['var(--font-tajawal)', 'Tajawal', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-ibm-plex-mono)', 'Fira Code', ...defaultTheme.fontFamily.mono], // Crucial for APIs & Numbers
      },
      // 2. Color Palette
      colors: {
        // PRIMARY: "Digital Oasis" - An evolution of Saudi Green to be more screen-friendly
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7', // Active UI elements
          400: '#34d399',
          500: '#10b981', // Action Button (Standard)
          600: '#059669', // Hover State
          700: '#047857',
          800: '#065f46',
          900: '#064e3b', // Deep Backgrounds
          950: '#022c22', // Dark Mode Base
          DEFAULT: '#006747', // Brand Heritage (Logos only)
        },

        // ACCENT: "Sand & Gold" - Warmer, less metallic, more human
        accent: {
          50: '#fffbf0', // Warm paper background
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24', // Use for warnings/attention
          500: '#d97706', // Human-readable gold (Bronze-ish)
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
          DEFAULT: '#D4AF37', // Use sparingly for borders/icons
        },

        // NEUTRALS: "Slate" - Blue-based greys are better for tech/SaaS than pure grey
        grey: {
          ...require('tailwindcss/colors').slate,
        },

        // DARK MODE SURFACES: High-end Fintech feel
        dark: {
          bg: '#0B1120',      // Main background (Deep Navy, not Black)
          card: '#151E32',    // Card background
          border: '#2A3655',  // Subtle borders
        },

        // DATA VISUALIZATION: For Charts & Graphs (Fintech Essential)
        chart: {
          1: '#3B82F6', // Blue (Revenue)
          2: '#8B5CF6', // Purple (Growth)
          3: '#10B981', // Emerald (Profit)
          4: '#F59E0B', // Amber (Pending)
          5: '#EF4444', // Red (Expenses)
        }
      },
      // 3. Immersive Effects
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        'card': '0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.04)',
        'glow-primary': '0 0 20px rgba(16, 185, 129, 0.15)', // Subtle green glow for active inputs
        'glow-accent': '0 0 20px rgba(212, 175, 55, 0.15)',
        'float': '0 10px 40px -10px rgba(0,0,0,0.08)', // For modals
      },
      // 4. Animation (Micro-interactions for "Human" feel)
      animation: {
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)', // Apple-like easing
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite', // For live status indicators
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' }, // Reduced distance for subtlety
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'), // Essential for Fintech inputs
  ],
}