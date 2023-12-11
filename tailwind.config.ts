import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/*/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--montserrat)', 'sans-serif'],
        clash: ['var(--clash)', 'sans-serif'],
      },
      colors: {
        blue600: '#0856ED',
        blue500: '#00C2FF',

        black: '#000000',

        danger500: '#FF3062',
        warning500: '#F1B314',
        success500: '#1BD143',

        gray500: '#757575',
      },

      boxShadow: {
        'gradient-hover-shadow':
          '16px 0 24px 0 rgba(8,86,237,0.7), -16px 0 24px 0 rgba(0,194,255,0.7)',
      },
    },
  },
  plugins: [],
}
export default config
