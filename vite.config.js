import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function copySpa404() {
  return {
    name: "copy-spa-404",
    closeBundle() {
      const index = resolve("dist/index.html");
      if (existsSync(index)) {
        copyFileSync(index, resolve("dist/404.html"));
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), copySpa404()],
  appType: "spa",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})
