// tailwind.config.mjs
import tailwindScrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adjust paths as needed
  ],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindScrollbar,
  ],
}
