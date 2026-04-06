import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:      '#FAF6EE',
        'cream-dark': '#F0EAD8',
        navy:       '#0D1B2A',
        'navy-mid': '#1B2B4B',
        gold:       '#F5C200',
        'gold-dark':'#C69B00',
        ink:        '#0D1B2A',
        'ink-muted':'#5A5A6A',
        'ink-light':'#9A9AAA',
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body:     ['Inter',   'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg:  '0.5rem',
        xl:  '1rem',
        '2xl': '1.5rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
}

export default config
