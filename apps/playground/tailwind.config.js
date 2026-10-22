/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1e1916',
        panel: '#251e1a',
        panel2: '#2c2420',
        edge: '#38302a',
        bright: '#f3e9d8',
        body: '#c8baa6',
        muted: '#8a7c6e',
        amber: '#cf9b5c',
        sage: '#8a9a6d',
        clay: '#b6a892',
        accent: 'var(--accent)',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Hanken Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
