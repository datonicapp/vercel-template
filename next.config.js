/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "firebase-admin",
      "@sendgrid/mail",
      "@google/generative-ai"
    ]
  }
};

module.exports = nextConfig;
