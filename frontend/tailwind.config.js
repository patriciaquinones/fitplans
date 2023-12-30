module.exports = {
  content: [
    "./src/**/*.{html,ts}", // add this line
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CC0505",
        secondary: {
          100: "#EFEDE8",
          200: "#323443",
          300: "#23242A",
          400: "#828282",
        },
      },
      screens: {
        "2xs": "320px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1440px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-in-out forwards",
      },
    },
    fontFamily: {
      body: ["Inter", "Roboto", "Noto Sans"],
      sans: ["Roboto", "Noto Sans"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
