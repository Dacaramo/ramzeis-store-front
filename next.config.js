const { hostname } = require('os');

const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  // Other Next.js configuration ...
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
});
