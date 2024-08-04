/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    borderRadius: {
      DEFAULT: 'calc(var(--radius) - 2px)',
      full: '50%',
      none: '0',
      tab: '35%',
    },
    colors: ({ colors }) => ({
      black: colors.black,
      white: colors.white,
      bgMainLeft: 'var(--bg-main-l)',
      bgMainRight: 'var(--bg-main-r)',
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      border: 'var(--border)',
      note: 'var(--note-border)',
      input: 'var(--input)',
      ring: 'var(--ring)',
      success: 'var(--success)',
      primary: {
        DEFAULT: 'var(--primary)',
        foreground: 'var(--primary-foreground)',
      },
      secondary: {
        DEFAULT: 'var(--secondary)',
        foreground: 'var(--secondary-foreground)',
      },
      destructive: {
        DEFAULT: 'var(--destructive)',
        foreground: 'var(--destructive-foreground)',
      },
      muted: {
        DEFAULT: 'var(--muted)',
        foreground: 'var(--muted-foreground)',
      },
      accent: {
        DEFAULT: 'var(--accent)',
        foreground: 'var(--accent-foreground)',
      },
      popover: {
        DEFAULT: 'var(--popover)',
        foreground: 'var(--popover-foreground)',
      },
      card: {
        DEFAULT: 'var(--card)',
        foreground: 'var(--card-foreground)',
      },
    }),
    fontFamily: { app: ['Rethink'] },

    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'spin-slow': 'spin 2s linear infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwind-capitalize-first-letter'),
  ],
}
