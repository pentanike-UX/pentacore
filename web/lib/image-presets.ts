/** 서브페이지·주요 UI 이미지 공통 — Next/Image `quality` (로컬 `unoptimized`일 때는 무시됨) */
export const SUBPAGE_IMAGE_QUALITY = 100;

/** 풀블리드·히어로 배너 — 뷰포트 너비 기준 최대 해상도 선택 */
export const IMAGE_SIZES_FULL_BLEED = "100vw";

/** `max-w-[1280px]` 본문 컬럼 기준 (WORK 상세 `FigImage` 등과 동일) */
export const IMAGE_SIZES_CONTENT_1280 =
  "(max-width: 1280px) 100vw, 1280px";

/** 카드·고정 최대 폭(예: 820px 포트폴리오 카드) */
export const IMAGE_SIZES_CARD_820 = "(max-width: 820px) 100vw, 820px";

/** ABOUT 에디토리얼 좌측 — lg에서 약 절반 컬럼 */
export const IMAGE_SIZES_ABOUT_EDITORIAL =
  "(min-width: 1024px) 50vw, 100vw";

/** 파트너 로고 타일 — 표시 크기보다 넉넉히(레티나) */
export const IMAGE_SIZES_PARTNER_LOGO =
  "(max-width: 1023px) 200px, 280px";
