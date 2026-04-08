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

/** 원본 PNG 픽셀 — 다운스케일 없이 1:1 표시 + `next/image` `unoptimized`로 풀해상도 서빙 */
export const ABOUT_PARTNER_INTRINSIC: Record<
  number,
  { width: number; height: number }
> = {
  1: { width: 175, height: 50 },
  2: { width: 186, height: 68 },
  3: { width: 189, height: 67 },
  4: { width: 184, height: 73 },
  5: { width: 171, height: 73 },
  6: { width: 200, height: 55 },
  7: { width: 184, height: 55 },
  8: { width: 172, height: 55 },
  9: { width: 192, height: 51 },
  10: { width: 183, height: 56 },
  11: { width: 180, height: 88 },
  12: { width: 188, height: 82 },
  13: { width: 170, height: 32 },
} as const;

export function aboutPartnerIntrinsic(index1Based: number) {
  const s = ABOUT_PARTNER_INTRINSIC[index1Based];
  if (!s) throw new Error(`Unknown partner index: ${index1Based}`);
  return s;
}

export const ABOUT_PARTNER_COUNT = 13;
