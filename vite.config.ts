import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { port, r } from "./scripts/utils";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  root: r("src"),
  base: command === "serve" ? `http://localhost:${port}/` : "/dist/",
  server: {
    port,
  },
  plugins: [
    react(),
    tsconfigPaths({
      parseNative: false,
    }),
  ],
  build: {
    outDir: r("extension/dist"),
    emptyOutDir: false,
    sourcemap: "inline",
    // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        background: r("src/background/index.html"),
        options: r("src/options/index.html"),
        popup: r("src/popup/index.html"),
      },
    },
  },
}));
