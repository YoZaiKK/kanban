import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customTeal: '#2D9596',
        customTealDark: '#2B7A7B',
        defaultBG: '#f4f4f5',
        primaryColor: '#265073',
        thirdColor: '#9AD0C2',
        forthColor: '#F1FADA',
      },
      boxShadow: {
        // the inner shadow must be white
        "inner-lg": "inset 0 0 10px 0 rgba(0, 0, 0, 0.1)",
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"), nextui(),
  ],
};
export default config;
