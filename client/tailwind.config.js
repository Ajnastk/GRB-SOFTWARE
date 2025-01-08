/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arvo: ["Arvo", "serif"],
      },
      keyframes:{
        reveal:{
          from:{
            transform :"translateY(80px)",
            opacity: "0",
          },
          to:{
            transform: "translateY(0px)",
            opacity: "1",
          },
          
        },
      },
      animation: {
        reveal: "reveal 2.5s forwards",
      },
    },
  },
  plugins: [daisyui], // Use the imported `daisyui` plugin
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
   darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
 }