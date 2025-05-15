import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chat PWA Application",
    short_name: "Chat PWA",
    description: "Simple chat PWA application",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0ea5e9",
    icons: [
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  }
}
