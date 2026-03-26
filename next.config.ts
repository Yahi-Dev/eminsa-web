import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const securityHeaders = [
  // Prevent clickjacking — only allow this site to frame itself
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Prevent MIME-type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Control referrer information
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Disable client-side features not used (reduces attack surface)
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Force HTTPS in production (1 year, include subdomains)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // Legacy XSS protection for older browsers
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // Content-Security-Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: self + next.js inline scripts + vercel analytics
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Styles: self + inline (Tailwind requires this)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Images: self + cloudinary + data URIs
      "img-src 'self' data: blob: https://res.cloudinary.com",
      // Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // API calls: self only
      "connect-src 'self' https://api.cloudinary.com",
      // Media
      "media-src 'self' https://res.cloudinary.com",
      // Forms submit to self only
      "form-action 'self'",
      // Allow Google Maps iframes
      "frame-src 'self' https://www.google.com https://maps.google.com",
      // No plugins
      "object-src 'none'",
      // Frame ancestors (defense-in-depth with X-Frame-Options)
      "frame-ancestors 'self'",
      // Upgrade insecure requests in production
      ...(process.env.NODE_ENV === "production"
        ? ["upgrade-insecure-requests"]
        : []),
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Serve AVIF first (50% smaller than WebP), fallback to WebP, then original
    formats: ["image/avif", "image/webp"],
    // Common screen widths — covers mobile, tablet, desktop, retina
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images for 30 days in production (default is 60s)
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // Restrict to our specific Cloudinary cloud
        pathname: "/dixsymrg5/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
