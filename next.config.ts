import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Serve fielmente o site original (com Pixel + notificações injetados)
  // na rota /. O HTML estático vive em public/site.html.
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/site.html",
        },
        {
          source: "/index.html",
          destination: "/site.html",
        },
      ],
    };
  },
};

export default nextConfig;
