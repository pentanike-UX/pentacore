"use client";

import { cn } from "@/lib/utils";

const WHITE_LINE = "rgba(255, 255, 255, 0.22)";

/**
 * 서브페이지(공통 크롬) 전역 — SUB_WORK 12컬럼 세로 가이드와 동일 패턴.
 * 배경 위 · 본문(이미지·텍스트) 아래 (`AppChrome`에서 z-[1], 콘텐츠 래퍼 z-[2]).
 */
export function SubPageViewportGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[1] flex justify-center",
        className,
      )}
      aria-hidden
      data-figma="SUB_WORK grid12 viewport"
    >
      <div
        className="h-full w-full max-w-[1280px]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            to right,
            transparent 0,
            transparent calc(100% / 12 - 1px),
            ${WHITE_LINE} calc(100% / 12 - 1px),
            ${WHITE_LINE} calc(100% / 12)
          )`,
        }}
      />
    </div>
  );
}
