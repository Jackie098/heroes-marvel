import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [react()],
  resolve: {
    alias: {
      // "@shared": path.resolve(__dirname, "./src/shared"),
      // "@shared": "./src/shared",
    },
  },
});
