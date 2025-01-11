import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import { addDynamicIconSelectors } from "@iconify/tailwind";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [nextui(), addDynamicIconSelectors()],
} satisfies Config;
