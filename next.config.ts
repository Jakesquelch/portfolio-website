import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the on-screen route-status indicator that appears bottom-left in dev.
  // Next.js will still surface build / runtime errors as usual.
  devIndicators: false,
};

export default nextConfig;
