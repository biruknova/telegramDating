/** @type {import('tailwindcss').Config} */

const colors = window.Telegram.WebApp.themeParams;

const {
  bg_color: bgColor,
  text_color: txtColor,
  hint_color: hintColor,
  button_color: btnColor,
  button_text_color: btnTxtColor,
} = colors;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      btnColor: btnColor,
      bgColor: bgColor,
      txtColor: txtColor,
      hintColor: hintColor,
      btnTxtColor: btnTxtColor,
    },
  },
  plugins: [],
};
