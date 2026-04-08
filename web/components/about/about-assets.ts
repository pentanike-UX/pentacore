/** About 풀블리드 섹션 이미지 — `public/about/` */
export const ABOUT_FULL_IMAGES = {
  beforePhilosophy: {
    src: "/about/img_about1.png",
    width: 740,
    height: 1024,
  },
  beforeMission: {
    src: "/about/img_about2.png",
    width: 1024,
    height: 368,
  },
  beforePartners: {
    src: "/about/img_about3.png",
    width: 1024,
    height: 368,
  },
} as const;

/** `public/about/partners/partner_{n}.svg` — 실제 로고로 교체 (PNG 사용 시 동일 경로·번호 규칙 유지) */
export function aboutPartnerSrc(index1Based: number) {
  return `/about/partners/partner_${index1Based}.svg`;
}

export const ABOUT_PARTNER_COUNT = 13;
