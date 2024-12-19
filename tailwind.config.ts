import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pc-lined-paper': `repeating-linear-gradient(
          to bottom,
          var(--beige),
          var(--beige) 38px,
          var(--brown) 38px,
          var(--brown) 40px
        )`,
        'mobile-lined-paper': `repeating-linear-gradient(
          to bottom,
          var(--beige),
          var(--beige) 28px,
          var(--brown) 28px,
          var(--brown) 30px
        )`,
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'transparent-black': 'var(--transparent-black)',
        rose: 'var(--rose)',
        beige: 'var(--beige)',
        'light-brown': 'var(--light-brown)',
        brown: 'var(--brown)',
        'dark-brown': 'var(--dark-brown)',
        'light-green': 'var(--light-green)',
        green: 'var(--green)',
        'dark-green': 'var(--dark-green)',
      },
      keyframes: {
        letterSlideUp: {
          '0%': { transform: 'translateY(200px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        letterSlideUp: 'letterSlideUp 0.3s ease-out forwards',
      },
      screens: {
        mobile: { raw: '(max-width: 1023px)' },
      },
    },
  },
  plugins: [],
} satisfies Config;
