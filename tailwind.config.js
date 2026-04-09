/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // 1. Typography: Apple-like typography (San Francisco style)
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        arabic: ['var(--font-ibm-plex-sans-arabic)', 'Tahoma', 'sans-serif'],
        amiriQuran: ['var(--font-amiri-quran)', 'Traditional Arabic', 'serif'],
        mono: ['var(--font-ibm-plex-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },

      // 2. Color Palette: Apple Design System
      colors: {
        // Apple System Grays
        grey: {
          50: '#f5f5f7', // Apple Light Background
          100: '#e5e5ea',
          200: '#d1d1d6',
          300: '#c7c7cc',
          400: '#aeaeb2',
          500: '#8e8e93', // Apple System Gray
          600: '#636366',
          700: '#48484a',
          800: '#3a3a3c',
          900: '#1c1c1e',
          950: '#000000', // Apple Dark Background
        },
        zinc: {
          50: '#f5f5f7', // Apple Light Background
          100: '#e5e5ea',
          200: '#d1d1d6',
          300: '#c7c7cc',
          400: '#aeaeb2',
          500: '#8e8e93', // Apple System Gray
          600: '#636366',
          700: '#48484a',
          800: '#3a3a3c',
          900: '#1c1c1e',
          950: '#000000', // Apple Dark Background
        },

        // PRIMARY: Kept for brand consistency, but using a cleaner tech emerald
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Brand Base
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
          DEFAULT: '#10b981',
        },

        // Apple System Blue (Optional accent replacement if needed, but keeping brand accent structure)
        apple: {
          blue: '#0071e3',
          red: '#ff3b30',
          green: '#34c759',
          orange: '#ff9500',
        },

        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', 
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
          DEFAULT: '#f59e0b',
        },

        // DARK MODE SURFACES: True blacks and deep grays like iOS/macOS
        dark: {
          bg: '#000000',      // Pure black for OLED / Apple Dark Mode
          card: '#1c1c1e',    // Elevated card in dark mode
          border: '#38383a',  // Subtle border
          hover: '#2c2c2e',   // Hover state
        },
      },

      // 3. Apple-like Visuals (Shadows & Borders)
      boxShadow: {
        // Automatically remap default tailwind shadows to Apple's diffuse shadows
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', // Apple base
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)', // Apple lg
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)', // Apple xl
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)', // Apple 2xl
        'apple': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'soft': '0 8px 30px rgba(0, 0, 0, 0.08)', // Apple diffuse shadow
        'hard': '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(16, 185, 129, 0.15)',
        'glow-accent': '0 0 20px rgba(245, 158, 11, 0.15)',
      },

      // Apple continuous corner curves (Approximation)
      borderRadius: {
        // Redefining standard sizes to be rounder by default
        'none': '0',
        'sm': '0.25rem', // 4px
        'md': '0.5rem', // 8px
        'lg': '1rem', // 16px (Automatically applies to old rounded-lg)
        'xl': '1.5rem', // 24px (Automatically applies to old rounded-xl)
        '2xl': '1.75rem', // 28px (Apple Card)
        '3xl': '2.5rem', // 40px
        'button': '9999px', // Pill shape
        'apple': '18px', // Common Apple radius
      },

      // 4. Apple-like Fluid Animations
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-up': 'scaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite', 
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
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    // Optional: Add a plugin for scrollbar hiding if used in MegaMenus
    // require('tailwind-scrollbar-hide'), 
  ],
}