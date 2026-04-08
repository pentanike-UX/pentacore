/**
 * `max-w-[1280px]` 본문 컬럼 — 좌우 패딩 제거(lg+) 구간에서 모바일·태블릿 최소 여백.
 * - 모바일: 1.5rem (24px)
 * - 태블릿(md~lg 미만): 2.5rem (40px)
 * - 데스크톱(lg+): 0 — 12컬 뷰포트 그리드와 열 맞춤
 */
export const SUB_PAGE_COLUMN_GUTTER_X =
  "px-[1.5rem] md:px-[2.5rem] lg:px-0" as const;
