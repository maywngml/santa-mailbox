import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'transparent-black': 'var(--transparent-black)',
        rose: 'var(--rose)',
        beige: 'var(--beige)',
        brown: 'var(--brown)',
        'light-green': 'var(--light-green)',
        green: 'var(--green)',
        'dark-green': 'var(--dark-green)',
      },
    },
  },
  plugins: [],
} satisfies Config;
