// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";
dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    host: "127.0.0.1", // 여기를 수정
    port: 3000,
  },
  plugins: [react()],
});
