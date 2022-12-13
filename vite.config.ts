import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
    },
  },
});
