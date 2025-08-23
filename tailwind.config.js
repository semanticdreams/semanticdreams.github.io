/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./.vitepress/theme/components/*.vue",
    "./posts/**/*.md",
    "./*.md",
  ],
  theme: {
    extend: {},
    container: {
    },
  },
  plugins: [],
}
