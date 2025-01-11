/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ticketmahal.s3.us-east-1.amazonaws.com"],
  },
  webpack: (config) => {
    config.infrastructureLogging = {
      level: "error",
    };
    return config;
  },
};

export default nextConfig;
