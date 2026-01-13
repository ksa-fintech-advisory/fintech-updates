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
      // 1. Typography: Engineering Stack
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        arabic: ['var(--font-tajawal)', 'Tajawal', ...defaultTheme.fontFamily.sans],
        // Monospace for Financial Data, APIs, and Version numbers
        mono: ['var(--font-ibm-plex-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },

      // 2. Color Palette: The "Zinc" System
      colors: {
        // Grey: Switched from Slate to Zinc for a neutral, metallic, high-tech feel
        grey: colors.zinc,

        // Use Zinc directly for explicit mapping in components
        zinc: colors.zinc,

        // PRIMARY: "Tech Emerald" - Precise & Trusted
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Brand Base
          600: '#059669',
          700: '#047857', // Hover States
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
          DEFAULT: '#10b981',
        },

        // ACCENT: "Signal Amber" - For alerts, highlights, and warmth
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Standard Warning/Highlight
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
          DEFAULT: '#f59e0b',
        },

        // DARK MODE SURFACES: High-Contrast Technical Dark
        dark: {
          bg: '#09090b',      // Zinc-950 (True dark, not blue)
          card: '#18181b',    // Zinc-900
          border: '#27272a',  // Zinc-800
          hover: '#27272a',   // Zinc-800
        },
      },

      // 3. Engineering Visuals
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },

      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.03)', // Very subtle for light mode
        'hard': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // For elevations
        'glow': '0 0 20px rgba(16, 185, 129, 0.15)', // Primary glow
        'glow-accent': '0 0 20px rgba(245, 158, 11, 0.15)', // Accent glow
      },

      // 4. Animation Utilities
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite', // For loading skeletons
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
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