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

/** `portfolio_group` 행 — 기본 글래스 쉐도우 + 호버 스케일 (non-function-list 정합) */
export const workPortfolioRowInteractionClassName =
  "transition-[transform,box-shadow] duration-300 ease-out shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_28px_rgba(15,23,42,0.08)] hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_12px_40px_rgba(15,23,42,0.12)] active:scale-[0.985]" as const;

/** `portfolio_card_view`의 `img_sub` — 상위 `group` 호버 시 동일 상태 (링크·로고 영역 포함) */
export const workPortfolioImgSubInteractionClassName =
  "transition-[transform,box-shadow] duration-300 ease-out shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_28px_rgba(15,23,42,0.08)] group-hover:scale-[1.02] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_12px_40px_rgba(15,23,42,0.12)] group-active:scale-[0.985]" as const;

/** HOME_LAYOUT-2 카드 노출 시 홈 베이스 — SUB_WORK와 동일 톤 (Figma 정합) */
export const HOME_CARDS_PAGE_BG = SUB_WORK_PAGE_BG;
