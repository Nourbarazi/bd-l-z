import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3001,
  },
  base: "/bd-l-z/",
  assetsInclude: ["**/*.png", "**/*.jpg"],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});
