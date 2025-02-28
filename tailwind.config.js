/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // automatically shared by the textColor, borderColor, and backgroundColor
      colors: {
        primary: "#F47920",    // Orange
        primaryTransparent: "#F4792014",  
        secondary: "#212B36",  // Dark Black
        background: "#F1F1F1",
        black: "#000000",
        bodyColor: "#637381",
        bodyLight: "#919EAB",
        success: "#229A16",
        successTransparent: "#54D62C29",
        error: "#B72136",
        errorTransparent: "#FF484229",
        warning: "#FFC107",
        warningTransparent: "#FFC10714",
        blue: "#1035BB",
        white: "#FFFFFF",
        lightPink: "#DB1F3580",
        lightYellow: "#FFC10780",
        lightGreen: "#78CDA3",
        transparent: "#ffffff00",
        tableHeader: '#F4F6F8',
      },

      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },

      fontSize: {
        "1xl": "36px",
        "2xl": "32px",
        "3xl": "24px",
        "4xl": "20px",
        "5xl": "18px",
        "6xl": "16px",
        "7xl": "14px",
        "8xl": "13px",
        "9xl": "12px",
      },
    },
  },
  plugins: [],
};
