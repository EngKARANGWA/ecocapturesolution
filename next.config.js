/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.ecocapturesolutions.com' }],
        destination: 'https://ecocapturesolution.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
