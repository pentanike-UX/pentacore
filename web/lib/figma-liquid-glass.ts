/**
 * Figma `GLASS` 효과 CSS 근사 — Dev에서 읽은 radius·fill opacity 기준.
 * @see non-function-list (portfolio row) · HOME_LAYOUT-2 sect_* (home cards)
 */
export const liquidGlassHomeCard = {
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px) saturate(160%)",
  WebkitBackdropFilter: "blur(10px) saturate(160%)",
} as const;

export const liquidGlassPortfolioRow = {
  background: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(10px) saturate(160%)",
  WebkitBackdropFilter: "blur(10px) saturate(160%)",
} as const;

/** SUB_WORK 프레임 배경 */
export const SUB_WORK_PAGE_BG = "rgb(229, 231, 235)";

/**
 * 마우스 반응 UI 공통 — transform만 300ms ease-out (박스쉐도우와 분리해 호버 즉시 반응).
 * 직접 호버 대상(button·Link 본체 등)
 */
export const interactivePressableTransformClassName =
  "transition-transform duration-300 ease-out hover:scale-105 active:scale-[0.98]" as const;

/**
 * 상위 `group` 호버/액티브에 맞춤 — img_sub·홈 카드 내부 래퍼 등
 */
export const interactivePressableTransformGroupClassName =
  "transition-transform duration-300 ease-out group-hover:scale-105 group-active:scale-[0.98]" as const;

/** `portfolio_group` 행 — 글래스 고정 쉐도우 (스케일은 interactivePressableTransformClassName) */
export const workPortfolioRowChromeClassName =
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_28px_rgba(15,23,42,0.08)]" as const;

/** HOME_LAYOUT-2 카드 노출 시 홈 베이스 — SUB_WORK와 동일 톤 (Figma 정합) */
export const HOME_CARDS_PAGE_BG = SUB_WORK_PAGE_BG;
