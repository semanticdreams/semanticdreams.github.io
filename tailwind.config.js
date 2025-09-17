/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./.vitepress/theme/components/*.vue",
    "./posts/**/*.md",
    "./projects/**/*.md",
    "./*.md",
  ],
  theme: {
    extend: {},
    container: {
    },
  },
  plugins: [],
}
