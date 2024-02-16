/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-750': '#234ACD',
      },
      fontFamily: {
        inter: ['Inter', 'sans'],
      },
      textSizes: {
        '4xl': '3rem',
        '6xl': '10rem',
        // Add more sizes as needed
      },
    },
  },
  darkMode: 'class', // Enable the 'class' mode for dark mode
  plugins: [],
}
