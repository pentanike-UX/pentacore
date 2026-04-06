import { figmaHyundaiCase, figmaWorksViewDivider } from "./figma-work-assets";

/** ST-FO 루프 풀스크린 에셋 — Figma MCP URL */
export const workImages = {
  loop005Full: figmaHyundaiCase.stFo005Full,
  loop024Full: figmaHyundaiCase.stFo024Full,
  loop111Full: figmaHyundaiCase.stFo111Full,
} as const;

/** `/works_view` 정적 이미지 — 전부 Figma MCP */
export const hyundaiWorksViewImages = {
  sectionDivider: figmaWorksViewDivider,
  heroHome: figmaHyundaiCase.sec1Hero,
  latestUpdateSample: figmaHyundaiCase.sec3LatestSample,
  flowStep1: figmaHyundaiCase.flowStep1,
  flowStep2: figmaHyundaiCase.flowStep2,
  flowStep3: figmaHyundaiCase.flowStep3,
  myPageFlow: figmaHyundaiCase.myPageFlow,
} as const;

export const WORK_DETAIL_SLUG = "hyundai-navigation";
