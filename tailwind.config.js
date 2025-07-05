import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./{app,modules}/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
    colors: {
      neutral: colors.slate,
      primary: colors.blue,
      negative: colors.rose,
      positive: colors.green,
      attention: colors.amber,
      white: "#ffffff",
      black: "#000000",
    },
  },
  plugins: [],
};
