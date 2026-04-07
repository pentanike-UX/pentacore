/**
 * Figma MCP 에셋 URL (만료 ~7일). 마스크·펜타그램 등 핵심 UI는 `public/home/` 정적 파일로 동기화.
 * 파일: 9ITorSV0OrBzp0WeeDLnGn — INTRO-1, HOME_LAYOUT-1/2 등
 */
export const assets = {
  logoWordmark: "https://www.figma.com/api/mcp/asset/5a710328-eb08-44b3-89e9-49d87cf1ee99",
  logoLineStroke: "https://www.figma.com/api/mcp/asset/5a06f35e-f53f-433c-a788-16794c7a43f9",
  menuUnion: "https://www.figma.com/api/mcp/asset/b5c9dc2e-00b8-4142-80cf-d88723e7dc3a",
  heroStill: "https://www.figma.com/api/mcp/asset/257cda8f-1d9f-4f0a-8f7e-50764087d047",
  /** HOME_LAYOUT-1 `Mask group` — Figma export viewBox 1001×115 (스펙 표기 1000×114와 동일 에셋) */
  logoMaskSvg: "/home/logo-mask.svg",
  /** 레거시 MCP — 헤더는 `PentacoreWordmark` + `public/home/pentacore-symbol.svg` 사용 */
  homeHeaderLogo: "https://www.figma.com/api/mcp/asset/35f6a58d-25b1-46e6-94ab-d87a42f986a8",
  homeHeaderLine: "https://www.figma.com/api/mcp/asset/62e738eb-2a3c-4b28-bc8a-95212558741e",
  homeMenuUnion: "https://www.figma.com/api/mcp/asset/5e070f1f-8e2a-462f-b763-314eff743da0",
  footerDivider: "https://www.figma.com/api/mcp/asset/501c56b2-2114-4d89-89c9-7388aa8ed238",
} as const;
