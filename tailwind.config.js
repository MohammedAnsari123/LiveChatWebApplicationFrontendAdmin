/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10b981', // Emerald 500
          hover: '#059669',   // Emerald 600
        },
        secondary: '#3f3f46', // Zinc 700
        dark: '#09090b',      // Zinc 950
        card: '#18181b',      // Zinc 900
        sidebar: '#18181b',   // Zinc 900
        border: '#27272a',    // Zinc 800
      }
    },
  },
  plugins: [],
}
