import { defineConfig } from "@pandacss/dev";
import { select as radixSelect } from "~/components/radix/recipe";

export default defineConfig({
  preflight: true,
  presets: ["@pandacss/preset-base", "@park-ui/panda-preset"],
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: { slotRecipes: { radixSelect } },
  },
  jsxFramework: "react",
  outdir: "styled-system",
});
