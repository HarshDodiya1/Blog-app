import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    build: {
      sourcemap: process.env.NODE_ENV !== "production",
      outDir: "dist",
      chunkSizeWarningLimit: 500,
    },
    proxy: {
      "/api": {
        target:
          process.env.NODE_ENV === "production"
            ? process.env.VITE_API_BASE_PROD
            : process.env.VITE_API_BASE_DEV,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
