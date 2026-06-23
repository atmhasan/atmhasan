import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  define: {
    __CONTENT_VERSION__: JSON.stringify(new Date().toISOString())
  }
});
