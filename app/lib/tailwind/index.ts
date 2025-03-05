import plugin from "tailwindcss/plugin";

export const wScreenSize = plugin(({ matchUtilities, theme }) => {
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
