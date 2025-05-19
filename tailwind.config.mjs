import rippleui from 'rippleui';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',       // for App Router (Next 13+)
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [rippleui],
};

export default config;
