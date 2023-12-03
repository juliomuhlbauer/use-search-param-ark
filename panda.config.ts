import { defineConfig } from "@pandacss/dev";
import { select } from "~/components/radix/recipe";

export default defineConfig({
  preflight: true,
  presets: ["@pandacss/preset-base", "@park-ui/panda-preset"],
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: { slotRecipes: { select } },
  },
  jsxFramework: "react",
  outdir: "styled-system",
});
