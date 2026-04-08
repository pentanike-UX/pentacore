import type { NextConfig } from "next";
import path from "path";

/**
 * Vercel에서 Root Directory가 `web`일 때 상위 폴더 추적은
 * "Root 외부 파일 포함" 설정/번들과 충돌해 배포가 비정상일 수 있음.
 * 로컬에서만 상위 lockfile 경고를 줄이기 위해 부모를 tracing root로 둠.
 */
const nextConfig: NextConfig = {
  ...(process.env.VERCEL
    ? {}
    : { outputFileTracingRoot: path.join(process.cwd(), "..") }),
  images: {
    qualities: [75, 85, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
        pathname: "/api/mcp/asset/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
