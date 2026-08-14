/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/workshops',
        destination: '/products/workshops',
        permanent: false,
      },
      {
        source: '/workshops/aerospace-and-drones',
        destination: '/products/workshops/drone-assembly-bootcamp',
        permanent: false,
      },
      {
        source: '/workshops/aerospace_drones',
        destination: '/products/workshops/drone-assembly-bootcamp',
        permanent: false,
      },
      {
        source: '/workshops/robotics-and-electronics',
        destination: '/products/workshops',
        permanent: false,
      },
      {
        source: '/workshops/robotics_electronics',
        destination: '/products/workshops',
        permanent: false,
      },
      {
        source: '/workshops/ai-and-data-science',
        destination: '/products/workshops/yolov8-autonomous-drone',
        permanent: false,
      },
      {
        source: '/community/events',
        destination: '/contact',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
