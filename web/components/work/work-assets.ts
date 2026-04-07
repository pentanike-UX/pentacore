import { figmaHyundaiCase, figmaWorksViewDivider } from "./figma-work-assets";

/** ST-FO 루프 풀스크린 에셋 — Figma MCP URL */
export const workImages = {
  loop005Full: figmaHyundaiCase.stFo005Full,
  loop024Full: figmaHyundaiCase.stFo024Full,
  /** ST-FO-111 — 로컬 풀 프레임 PNG (`public/work/ST-FO-111_full.png`) */
  loop111Full: "/work/ST-FO-111_full.png",
} as const;

/** `/works_view` 정적 이미지 — Figma MCP + 로컬 PNG 일부 */
export const hyundaiWorksViewImages = {
  sectionDivider: figmaWorksViewDivider,
  heroHome: figmaHyundaiCase.sec1Hero,
  /** sec_3 — 최신업데이트 샘플 1 (로컬) */
  latestUpdateSample: "/work/latest-update-sample-1.png",
  flowStep1: figmaHyundaiCase.flowStep1,
  flowStep2: figmaHyundaiCase.flowStep2,
  flowStep3: figmaHyundaiCase.flowStep3,
  myPageFlow: figmaHyundaiCase.myPageFlow,
} as const;

export const WORK_DETAIL_SLUG = "hyundai-navigation";
