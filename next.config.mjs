/** @type {import('next').NextConfig} */
const nextConfig = {
   eslint: {
      dirs: ['app', 'components', 'hooks', 'lib', 'styles'],
   },
   typescript: {
      // We'll use TypeScript checking for better code quality
   },
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'i.scdn.co',
            pathname: '**',
         },
      ],
   },
   headers: async () => [
      {
         // Apply these headers to all routes
         source: '/:path*',
         headers: [
            {
               key: 'Content-Security-Policy',
               value: `
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel.com;
            style-src 'self' 'unsafe-inline';
            img-src 'self' blob: data: https://i.scdn.co;
            font-src 'self';
            connect-src 'self' https://api.spotify.com;
            frame-src 'self';
            object-src 'none';
            base-uri 'self';
            form-action 'self';
            frame-ancestors 'none';
            block-all-mixed-content;
            upgrade-insecure-requests;
          `
                  .replace(/\s{2,}/g, ' ')
                  .trim(),
            },
            {
               key: 'X-Content-Type-Options',
               value: 'nosniff',
            },
            {
               key: 'X-Frame-Options',
               value: 'DENY',
            },
            {
               key: 'X-XSS-Protection',
               value: '1; mode=block',
            },
            {
               key: 'Referrer-Policy',
               value: 'strict-origin-when-cross-origin',
            },
            {
               key: 'Permissions-Policy',
               value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
            },
         ],
      },
   ],
};
export default nextConfig;
