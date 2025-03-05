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
      main: ["Roboto", "Arial", "system-ui"],
      header: ["Syne", "Arial", "system-ui"],
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
      "item-1": "#292931",
      "item-1h": "#444449",
      "item-1a": "#444449",
      "item-2": "#35353d",
      "item-2h": "#4a4a51",
      "item-2a": "#4a4a51",
      "item-3": "#2d2d31",

      // ----- Accents
      "accent--2": "#acc507",
      "accent--1t": "#c1dd089f",
      "accent--1": "#c1dd08",
      "accent-1": "#d0f009",
      "accent-1h": "#dff83a",

      // ----- Accents - Shadows
      "s-accent-1": "#d0f0092f",

      // ----- Alts
      "alt-1": "#FF1493",

      // ----- Borders
      "border-1": "#4f4f4f6f",
      "alt-border-1": "#333333",

      // ----- infos
      "alert-1": "#e70000",
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
