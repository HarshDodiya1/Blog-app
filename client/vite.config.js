import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target:
          process.env.NODE_ENV === "production"
            ? "https://backendquiller.vercel.app/"
            : "http://localhost:3000",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
