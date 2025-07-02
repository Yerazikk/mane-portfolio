// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maneGreen: 'oklch(40.5% 0.101 131.063)',
      },
    },
  },
  plugins: [],
};
