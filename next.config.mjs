import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/core/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', 'framer-motion', 'date-fns'],
  },
  async redirects() {
    // Deprecated routes — code kept but not publicly accessible
    // Compliance checker stays available during maintenance.
    const deprecatedRoutes = ['courses', 'updates', 'docs', 'terms', 'privacy'];
    const deprecatedRedirects = deprecatedRoutes.flatMap((route) => [
      {
        source: `/:locale(en|ar)/${route}`,
        destination: '/:locale',
        permanent: true,
      },
      {
        source: `/:locale(en|ar)/${route}/:path*`,
        destination: '/:locale',
        permanent: true,
      },
    ]);

    const otherProductRedirects = [
      {
        source: '/:locale(en|ar)/products',
        destination: '/:locale',
        permanent: true,
      },
      {
        source: '/:locale(en|ar)/products/fee-calculator',
        destination: '/:locale',
        permanent: true,
      },
      {
        source: '/:locale(en|ar)/products/fee-calculator/:path*',
        destination: '/:locale',
        permanent: true,
      },
      {
        source: '/:locale(en|ar)/products/market-analysis',
        destination: '/:locale',
        permanent: true,
      },
      {
        source: '/:locale(en|ar)/products/market-analysis/:path*',
        destination: '/:locale',
        permanent: true,
      },
    ];

    return [
      {
        source: '/favicon.ico',
        destination: '/favicon_io/favicon.ico',
        permanent: true,
      },
      {
        source: '/:locale(en|ar)/web/home',
        destination: '/:locale',
        permanent: true,
      },
      {
        source: '/:locale(en|ar)/web/:path*',
        destination: '/:locale/:path*',
        permanent: true,
      },
      ...deprecatedRedirects,
      ...otherProductRedirects,
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default withNextIntl(nextConfig);
