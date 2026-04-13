import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/app-agenda-regulatoria-antaq/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      },
      manifest: {
        name: "Agenda Regulatória ANTAQ",
        short_name: "Agenda ANTAQ",
        description: "Acompanhamento dos temas da Agenda Regulatória da ANTAQ",
        theme_color: "#1d4ed8",
        background_color: "#f5f7fb",
        display: "standalone",
        start_url: "/app-agenda-regulatoria-antaq/",
        icons: [
          {
            src: "/app-agenda-regulatoria-antaq/icons/pwa-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/app-agenda-regulatoria-antaq/icons/pwa-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
});