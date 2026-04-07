"use client";

import { usePathname } from "next/navigation";
import { FooterBar } from "@/components/home/FooterBar";
import { HeaderBar } from "@/components/home/HeaderBar";
import { useBreakpoint } from "@/hooks/useBreakpoint";

/**
 * `/` 제외 전역 헤더·푸터 (홈은 `HomeExperience`가 인트로·동영상과 함께 자체 크롬).
 * 스크롤 시 글래스 쉘은 `HeaderBar` / `FooterBar` 내부 `scrollGlass`로 처리.
 */
export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bp = useBreakpoint();

  if (pathname === "/") {
    return <>{children}</>;
  }

  const darkSurface = pathname === "/hiring" || pathname === "/inquiry";
  const surface = darkSurface ? "dark" : "light";
  const compact = bp !== "desktop";
  const footerVariant =
    bp === "mobile" ? "mobile" : bp === "tablet" ? "tablet" : "desktop";

  return (
    <>
      <HeaderBar compact={compact} surface={surface} scrollGlass />
      {/* 고정 푸터·헤더에 가리지 않도록 하단 여유 */}
      <div className="min-h-dvh pb-32 md:pb-36">{children}</div>
      <FooterBar surface={surface} variant={footerVariant} scrollGlass />
    </>
  );
}
