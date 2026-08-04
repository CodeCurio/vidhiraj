import type { NextConfig } from "next";

const securityHeaders = [
  // Prevents MIME-type sniffing — guards against drive-by-download attacks
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Prevents clickjacking by disallowing framing from other origins
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Restricts how much referrer info is sent cross-origin
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Permissions policy — disable unused browser features
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Basic Content Security Policy — allows Google Translate, Firebase, fonts, analytics
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Scripts: self + Google Translate + Google Analytics/Tag Manager + Firebase
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://translate.google.com https://translate.googleapis.com https://www.googletagmanager.com https://www.google-analytics.com https://apis.google.com",
      // Styles: self + inline + Google Fonts + Google Translate widget
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://translate.googleapis.com",
      // Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self + data + blob + https: + Firebase + Unsplash + flagcdn + Google
      "img-src 'self' data: blob: https: https://firebasestorage.googleapis.com https://storage.googleapis.com https://images.unsplash.com https://picsum.photos https://flagcdn.com https://www.google-analytics.com https://www.googletagmanager.com https://translate.google.com https://translate.googleapis.com https://*.googleapis.com",
      // Connections: allow ws/wss for Next.js HMR + Firebase + Google APIs + Analytics
      "connect-src 'self' ws: wss: http: https: https://*.googleapis.com https://*.firebaseio.com https://firebasestorage.googleapis.com https://www.google-analytics.com https://analytics.google.com https://translate.googleapis.com",
      // Frames: Google Translate uses iframes
      "frame-src 'self' https://translate.google.com",
      // Form submissions
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.googleapis.com' },
      { protocol: 'https', hostname: '**.googleusercontent.com' },
    ],
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
