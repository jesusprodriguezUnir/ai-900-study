/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0078d4',
        'primary-dark': '#106ebe',
        secondary: '#50e6ff',
        surface: '#f3f4f6',
        'surface-dark': '#1e293b'
      }
    }
  },
  plugins: []
};