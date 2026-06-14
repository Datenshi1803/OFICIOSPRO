/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['http://localhost:3000', '192.168.56.1'],
  async headers() {
    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com https://challenges.cloudflare.com https://sandbox.paguelofacil.com https://secure.paguelofacil.com https://widget.cloudinary.com https://upload-widget.cloudinary.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com https://cdnjs.cloudflare.com",
      "img-src 'self' data: blob: https: http://localhost:8000 http://127.0.0.1:8000",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https: http://localhost:8000 http://127.0.0.1:8000 ws://localhost:* ws://127.0.0.1:*",
      "frame-src 'self' https://challenges.cloudflare.com https://sandbox.paguelofacil.com https://secure.paguelofacil.com https://widget.cloudinary.com https://upload-widget.cloudinary.com",
      "worker-src 'self' blob:",
      "media-src 'self' blob: data: https:",
      "manifest-src 'self'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
  },
}

export default nextConfig
