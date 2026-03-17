/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["app", "components", "lib"],
  },
  typescript: {},
  images: {
    qualities: [25, 40, 50, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "**",
      },
    ],
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Content-Security-Policy",
          value: `
            default-src 'self';
            script-src 'self' 'unsafe-inline' https://*.vercel.com https://vercel.live https://va.vercel-scripts.com;
            style-src 'self' 'unsafe-inline';
            img-src 'self' blob: data: https://i.scdn.co https://img.youtube.com https://i.ytimg.com;
            media-src 'self';
            font-src 'self';
            connect-src 'self' https://api.spotify.com https://vercel.live https://vitals.vercel-insights.com;
            frame-src 'self' https://*.creator-spring.com https://www.youtube.com https://youtube.com https://vercel.live https://vercel.com;
            object-src 'none';
            base-uri 'self';
            form-action 'self';
            frame-ancestors 'none';
            block-all-mixed-content;
            upgrade-insecure-requests;
          `
            .replace(/\s{2,}/g, " ")
            .trim(),
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
      ],
    },
  ],
};
export default nextConfig;
