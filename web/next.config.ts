import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /** 모노레포 루트에 루트 lockfile이 있을 때 추적·경고 정합 (로컬·Vercel) */
  outputFileTracingRoot: path.join(process.cwd(), ".."),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
        pathname: "/api/mcp/asset/**",
      },
    ],
  },
};

export default nextConfig;
