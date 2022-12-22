import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: "",
  // build: {
  //   minify: false,
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@CONST": path.resolve(__dirname, "./src/utils/CONST"),
      "@types": path.resolve(__dirname, "./src/@types"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@app-utils": path.resolve(__dirname, "./src/utils/app-utils"),
      "@custom-data-utils": path.resolve(
        __dirname,
        "./src/utils/custom-data-utils"
      ),
      "@collection-utils": path.resolve(
        __dirname,
        "./src/utils/collection-utils"
      ),
      "@show-utils": path.resolve(__dirname, "./src/utils/show-utils"),
      "@search-utils": path.resolve(__dirname, "./src/utils/search-utils"),
      "@style-utils": path.resolve(__dirname, "./src/utils/style-utils"),
      "@watch-status-utils": path.resolve(
        __dirname,
        "./src/utils/watch-status-utils"
      ),
    },
  },
});
