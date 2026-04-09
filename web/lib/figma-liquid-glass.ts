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

/**
 * 버튼·링크 호버 — 애플 리퀴드 글라스에 가까운 블러·채도·내부 하이라이트.
 * 다크 베이스(홈 헤더/푸터 등)
 */
export const liquidGlassInteractiveHoverDark = [
  "transition-[backdrop-filter,background-color,box-shadow,transform] duration-300 ease-out",
  "hover:backdrop-blur-[18px] hover:saturate-150",
  "hover:bg-white/[0.16] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.42),0_6px_28px_rgba(0,0,0,0.12)]",
  "hover:ring-1 hover:ring-white/30",
].join(" ");

/**
 * 라이트 베이스(SUB_WORK 헤더 등) — 짙은 글래스 틴트
 */
export const liquidGlassInteractiveHoverLight = [
  "transition-[backdrop-filter,background-color,box-shadow,transform] duration-300 ease-out",
  "hover:backdrop-blur-[18px] hover:saturate-150",
  "hover:bg-zinc-950/[0.07] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_4px_22px_rgba(0,0,0,0.06)]",
  "hover:ring-1 hover:ring-zinc-900/12",
].join(" ");

/** `portfolio_group` 글래스 행 버튼 — 기존 fill 위 호버 강화 */
export const liquidGlassPortfolioRowHoverClassName = [
  "transition-[backdrop-filter,box-shadow,transform] duration-300 ease-out",
  "hover:backdrop-blur-[22px] hover:saturate-150",
  "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_8px_36px_rgba(15,23,42,0.1)]",
  "hover:ring-1 hover:ring-white/45",
].join(" ");
