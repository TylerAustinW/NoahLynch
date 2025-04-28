/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['app', 'components', 'hooks', 'lib', 'styles'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '**',
      },
    ],
  },
  env: {
    SPOTIFY_CLIENT_ID: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
    SPOTIFY_ARTIST_ID: process.env.NEXT_PUBLIC_SPOTIFY_ARTIST_ID,
  },
};

export default nextConfig;
