import type { FigmaLogoVariant } from "./FigmaLogos";

/**
 * Figma `portfolio_group` / `non-function-list` 인스턴스 카피 (SUB_WORK 295:69357).
 * 각 행 `LOGOS` ×3 — `prop1` 순서 (`295:69358`~`69370`).
 */
export type WorkPortfolioRow = {
  title: string;
  period: string;
  tags: readonly string[];
  href: string;
  logos: readonly [FigmaLogoVariant, FigmaLogoVariant, FigmaLogoVariant];
};

export const WORK_PORTFOLIO_ROWS: readonly WorkPortfolioRow[] = [
  {
    title:
      "현대 / 제네시스 / 기아 내비게이션 업데이트 공식 홈페이지 연간운영",
    period: "2022~2024",
    tags: ["구축", "연간운영"],
    href: "/works/hyundai-navigation",
    logos: ["logo_HM", "logo_GN", "logo_KM"],
  },
  {
    title: "현대오토에버 글로벌업데이트 NSUM 구축 및 연간운영",
    period: "2022",
    tags: ["구축", "연간운영"],
    href: "#",
    logos: ["logo_HAE", "logo_GN", "logo_KM"],
  },
  {
    title: "현대자동차 OTA시스템 구축",
    period: "2021",
    tags: ["구축", "연간운영"],
    href: "#",
    logos: ["logo_HM", "logo_GN", "logo_KM"],
  },
  {
    title: "현대오토에버 글로벌업데이트 35개국 연간운영",
    period: "2021",
    tags: ["구축", "연간운영"],
    href: "#",
    logos: ["logo_HAE", "logo_GN", "logo_KM"],
  },
  {
    title: "현대오토에버 PlayMap 홈페이지 구축",
    period: "2021",
    tags: ["구축", "연간운영"],
    href: "#",
    logos: ["logo_HAE", "logo_GN", "logo_KM"],
  },
  {
    title: "현대엠엔소프트 글로벌업데이트 공용화 홈페이지 신규 구축",
    period: "2018~2020",
    tags: ["구축", "연간운영"],
    href: "#",
    logos: ["logo_HMS", "logo_GN", "logo_KM"],
  },
  {
    title: "현대엠엔소프트 글로벌맵케어 구축 및 연간운영",
    period: "2018~2020",
    tags: ["구축", "연간운영"],
    href: "#",
    logos: ["logo_HMS", "logo_GN", "logo_KM"],
  },
  {
    title: "현대엠엔소프트 전사 홈페이지 연간운영",
    period: "2018~2020",
    tags: ["구축", "연간운영"],
    href: "#",
    logos: ["logo_HMS", "logo_GN", "logo_KM"],
  },
  {
    title: "SK엔카 서비스 리뉴얼 구축",
    period: "2017",
    tags: ["구축", "연간운영"],
    href: "#",
    logos: ["logo_SKE", "logo_GN", "logo_KM"],
  },
  {
    title: "삼성반도체 홈페이지 구축 및 연간운영",
    period: "2016",
    tags: ["구축", "연간운영"],
    href: "#",
    logos: ["logo_SS", "logo_GN", "logo_KM"],
  },
  {
    title: "LG전자 모션인식 리모콘 UI 및 캐주얼 게임 개발",
    period: "2016",
    tags: ["구축", "연간운영"],
    href: "#",
    logos: ["logo_SS", "logo_GN", "logo_KM"],
  },
  {
    title: "삼성에버랜드 홈페이지 리뉴얼 구축",
    period: "2014",
    tags: ["구축", "연간운영"],
    href: "#",
    logos: ["logo_SS", "logo_GN", "logo_KM"],
  },
  {
    title: "삼성 글로벌홈페이지 리뉴얼 구축",
    period: "2014",
    tags: ["구축", "연간운영"],
    href: "#",
    logos: ["logo_SS", "logo_GN", "logo_KM"],
  },
] as const;
