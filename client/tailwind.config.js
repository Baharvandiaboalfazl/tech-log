/** @type {import('tailwindcss').Config} */
module.exports = {
  // فعال کردن حالت تاریک بر اساس کلاس
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
