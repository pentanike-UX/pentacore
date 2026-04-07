"use client";

/**
 * SUB_WORK `portfolio_group` — 12컬럼 세로 가이드 (Figma 그리드 근사).
 */
export function SubWorkGridBg() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 flex justify-center overflow-hidden"
      aria-hidden
      data-figma="SUB_WORK grid12"
    >
      <div
        className="h-full w-full max-w-[1280px]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            to right,
            transparent 0,
            transparent calc(100% / 12 - 1px),
            rgba(0, 0, 0, 0.065) calc(100% / 12 - 1px),
            rgba(0, 0, 0, 0.065) calc(100% / 12)
          )`,
        }}
      />
    </div>
  );
}
