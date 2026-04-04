import {resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {defineConfig} from "vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  optimizeDeps: {
    include: ["ml5"],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "us-map-paper": resolve(__dirname, "us-map-paper/index.html"),
        yinyang: resolve(__dirname, "yinyang/index.html"),
        "air-text": resolve(__dirname, "air-text/index.html"),
      },
    },
  },
});
