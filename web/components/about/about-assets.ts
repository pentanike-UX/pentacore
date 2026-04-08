/** About 풀블리드 — 각 (하이라이트) 바로 위: img_about2 → Philosophy, 3 → Mission, 4 → Partners */
export const ABOUT_FULL_IMAGES = {
  beforePhilosophy: {
    src: "/about/img_about2.png",
    width: 1024,
    height: 368,
  },
  beforeMission: {
    src: "/about/img_about3.png",
    width: 1024,
    height: 368,
  },
  beforePartners: {
    src: "/about/img_about4.png",
    width: 1024,
    height: 415,
  },
} as const;

/** 에디토리얼 인트로 좌측 이미지 — 비율 유지 배치 (`AboutListingPage`) */
export const ABOUT_EDITORIAL_IMAGE = {
  src: "/about/img_about1.png",
  width: 740,
  height: 1024,
} as const;

/** `public/about/partners/partner_{n}.png` */
export function aboutPartnerSrc(index1Based: number) {
  return `/about/partners/partner_${index1Based}.png`;
}

export const ABOUT_PARTNER_COUNT = 13;
