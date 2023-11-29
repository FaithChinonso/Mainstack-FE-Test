import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "340px",
      // => @media (min-width: 340px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        mono: "linear-gradient(139deg, #56616B 2.33%, #131316' 96.28%))",
      },
      boxShadow: {
        "light-mode-100": "0 2px 4px 0 rgba(45, 59, 67, 0.05)",
        "light-mode-101": "0 2px 6px 0 rgba(45, 59, 67, 0.36)",
      },
      colors: {
        text: "#56616B",
        dark: "#131316",
        white: "#FFFFFF",
        faintBorder: "rgba(45, 59, 67, 0.05)",
        lightGrey: "#EFF1F6",

        lightGreen: "#E3FCF2",
        lightRed: "#F9E3E0",
        green: "#0EA163",
        yellow: "#A77A07",
      },
      borderWidth: {
        DEFAULT: "1px",
        "0": "0",
        "2": "2px",
        "3": "3px",
        "4": "4px",
        "6": "6px",
        "8": "8px",
      },
    },
  },
  plugins: [],
}
export default config
