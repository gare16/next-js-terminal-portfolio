import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  devIndicators: false,
  async headers() {
    return [
      {
        // Apply cache headers to static assets
        source: "/:path*\\.(js|css|png|jpg|jpeg|gif|webp|avif|ico|svg|woff2?|ttf|eot|otf|pdf|txt|xml|json|csv|map|zip|tar|gz|br|gzip|wasm)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Apply cache headers to API download route
        source: "/api/download/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600",
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);