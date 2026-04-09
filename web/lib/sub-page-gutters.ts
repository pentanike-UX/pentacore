/**
 * `max-w-[1280px]` 본문 컬럼 — 좌우 패딩.
 * - 모바일: 1.5rem (24px)
 * - 태블릿(md~lg 미만): 2.5rem (40px)
 * - lg~1300px: 2rem (32px) — 예전 lg+ 단일 `px-0` 구간 보완
 * - 1301px+: 0 — 12컬 뷰포트 그리드와 열 맞춤
 */
export const SUB_PAGE_COLUMN_GUTTER_X =
  "px-[1.5rem] md:px-[2.5rem] lg:px-[2rem] min-[1301px]:px-0" as const;

/**
 * ABOUT / WORK / HIRING 히어로 — 라벨·대형 타이틀만 (본문 풀블리드·펜타그램 제외).
 * lg+ 좌우 6.25rem (Figma). 그 아래는 본문 컬럼과 동일 스텝.
 */
export const SUB_HERO_HEADING_PAD_X =
  "px-[1.5rem] md:px-[2.5rem] lg:px-[6.25rem]" as const;
