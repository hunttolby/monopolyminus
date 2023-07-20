/** @type {import('tailwindcss').Config} */
const {
  colors,
  scalingObj,
  typography,
  boxShadow,
} = require('./styles/tailwind')
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    backgroundColor: colors.backgroundColor,
    textColor: colors.textColor,
    borderColor: colors.borderColor,
    outlineColor: colors.backgroundColor,
    extend: {
      colors: { ...colors.backgroundColor, ...colors.textColor },
      spacing: scalingObj,
      borderRadius: scalingObj,
      boxShadow: boxShadow,
      fontSize: { ...scalingObj, ...typography },
      fontFamily: {
        serif: 'Inter',
      },
    },
  },
  plugins: [],
}
