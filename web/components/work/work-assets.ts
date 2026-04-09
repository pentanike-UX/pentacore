import { figmaHyundaiCase, figmaWorksViewDivider } from "./figma-work-assets";

/** ST-FO 루프 풀스크린 — `public/work/` 로컬 에셋 (Figma MCP URL 대체) */
export const workImages = {
  loop005Full: "/work/ST-FO-005_BIC_m_full.png",
  loop024Full: "/work/ST-FO-024_m_full.png",
  loop111Full: "/work/ST-FO-111_full.png",
} as const;

/** `ST-FO-111_full.png` 원본 픽셀 — 에셋 교체 시 동기화 */
export const ST_FO_111_FULL_INTRINSIC = { width: 2696, height: 9626 } as const;

/** `/works_view` 정적 이미지 — Figma MCP + 로컬 PNG 일부 */
export const hyundaiWorksViewImages = {
  sectionDivider: figmaWorksViewDivider,
  heroHome: figmaHyundaiCase.sec1Hero,
  /** sec_3 — 최신업데이트 샘플 1: `public/work/latest-update-sample-1.png` (Figma/보내기명 `최신업데이트_샘플 1.png` 동일 에셋) */
  latestUpdateSample: "/work/latest-update-sample-1.png",
  flowStep1: figmaHyundaiCase.flowStep1,
  flowStep2: figmaHyundaiCase.flowStep2,
  flowStep3: figmaHyundaiCase.flowStep3,
  myPageFlow: figmaHyundaiCase.myPageFlow,
} as const;

export const WORK_DETAIL_SLUG = "hyundai-navigation";
