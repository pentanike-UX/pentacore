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

/** HOME_LAYOUT-2 카드 노출 시 홈 베이스 — SUB_WORK와 동일 톤 (Figma 정합) */
export const HOME_CARDS_PAGE_BG = SUB_WORK_PAGE_BG;
