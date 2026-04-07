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

  /** HIRING·INQUIRY — SUB_WORK 톤 라이트 서브(헤더·인라인 푸터) */
  const surface = "light";
  const compact = bp !== "desktop";
  const footerVariant =
    bp === "mobile" ? "mobile" : bp === "tablet" ? "tablet" : "desktop";
  /** 라이트 서브 — 문서 하단 인라인 푸터 */
  const subInlineFooter = true;

  return (
    <>
      <HeaderBar compact={compact} surface={surface} scrollGlass />
      <div
        className={
          subInlineFooter
            ? "flex min-h-dvh flex-col pb-0"
            : "min-h-dvh pb-32 md:pb-36"
        }
      >
        <div className={subInlineFooter ? "flex-1" : undefined}>{children}</div>
        <FooterBar
          surface={surface}
          variant={footerVariant}
          scrollGlass={!subInlineFooter}
          placement={subInlineFooter ? "inline" : "fixed"}
        />
      </div>
    </>
  );
}
