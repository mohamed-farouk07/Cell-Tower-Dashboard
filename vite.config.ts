import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "https://github.com/mohamed-farouk07/Cell-Tower-Dashboard/",
  build: {
    outDir: "dist",
  },
});
