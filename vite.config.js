import { defineConfig } from "vite";

export default defineConfig({
  root: "./test",
  resolve: {
    alias: {
      "../backend/index_bg.wasm": "../backend/index_bg.wasm?url",
    },
  },
  server: { port: "8080" },
  build: { outDir: "../" },
});
