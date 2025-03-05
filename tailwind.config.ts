import type { Config } from "tailwindcss";
// import { wScreenSize } from "#/lib/tailwind/index";
import plugin from "tailwindcss/plugin";

const wScreenSize = plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      "w-screen": (value) => ({
        width: value,
      }),
    },
    {
      values: theme("screens"),
    }
  );
});

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "2xs": "0px",
      xs: "370px",
      sm: "490px",
      md: "768px",
      lg: "1024px",
      xl: "1210px",
      "2xl": "1440px",
      "3xl": "1610px",
      "4xl": "1860px",
    },
    container: {
      center: true,
      screens: ["920px"],
    },
    fontFamily: {
      main: ["Space Mono", "Arial", "system-ui"],
      header: ["Space Mono", "Arial", "system-ui"],
      runes: ["Noto Sans Runic", "Arial", "system-ui"],
    },
    colors: {
      ct: "transparent",
      // Main
      bg: "#101014",
      light: "#f8f8f8",
      dark: "#000",

      // Main Others
      // ----- Items
      "item-1": "#127cea",
      "item-1h": "#369ef0",
      "item-1a": "#369ef0",
      "item-2": "#6bb9f0",
      "item-2h": "#8cd2f7",

      // ----- Accents
      "accent-1": "#2f2f2f",
      "accent-1h": "#2f2f2f",

      // ----- Accents - Shadows
      "s-accent-1": "#2f2f2f2f",

      // ----- Borders
      "border-1": "#4f4f4f6f",
      "alt-border-1": "#333333",
    },
    extend: {
      padding: {
        site: "6rem",
        big: "2.4rem",
        title: "4rem",
      },
      boxShadow: {
        "button-md": "0px 0px 10px 1px",
      },
    },
  },
  plugins: [
    wScreenSize,
    plugin(({ addComponents }) => {
      addComponents({
        ".item-1": {
          "@apply bg-item-1 border border-border-1": {},
        },
        ".item-1o": {
          "@apply bg-item-1 border border-border-1 bg-opacity-45": {},
        },
      });
    }),
  ],
} satisfies Config;
