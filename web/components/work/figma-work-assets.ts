/**
 * Figma 파일 `9ITorSV0OrBzp0WeeDLnGn` — MCP `get_design_context` 기준 에셋 URL.
 * 원격 URL은 만료될 수 있음 → 만료 시 동일 노드로 MCP 재추출.
 */

/**
 * SUB_WORK `thumb_HMG` — Figma `img_thumb_HMG` / `image 12` (`257:32376` in `img_sub` `257:32374`).
 * 이전 MCP URL 만료 시 동일 노드로 재추출.
 */
export const figmaImgThumbHmg =
  "https://www.figma.com/api/mcp/asset/5fc60450-0bee-4caa-a0f0-e2b94cbbe785";

/** 레거시 이중 레이어(필요 시 블렌드용) — 만료 시 재추출 */
export const figmaThumbHmg = {
  image13: figmaImgThumbHmg,
  image14:
    "https://www.figma.com/api/mcp/asset/ba5733be-87bf-4f30-8982-17a5a72c52aa",
} as const;

/** SUB_WORK `img_sub` — 태블릿 베젤 + 화면 마스크 */
export const figmaPortfolioCardThumb = {
  tablet:
    "https://www.figma.com/api/mcp/asset/db02b4b5-f3d1-4a8d-8ff7-833f373c2205",
  screenMask:
    "https://www.figma.com/api/mcp/asset/d1fe7fdd-78ee-4719-b38c-0c6109591333",
  /** `img_sub` effect_screen 내부 스크린 레이어 */
  screenContent:
    "https://www.figma.com/api/mcp/asset/3d095443-2b3c-4985-bbab-46d0acc13f67",
} as const;

/** PENTAGRAM PF_06 — `/works_view` P 위 데코 (표시 116×60). `public/work/pentagram-pf06.svg` */
export const WORKS_VIEW_PF_06_SRC = "/work/pentagram-pf06.svg";

/** WORK 상세 → 목록 (`back.svg`) */
export const WORKS_LIST_BACK_ICON_SRC = "/work/work-list-back.svg";

/** PENTAGRAM 인스턴스 `295:69010` (PF_12) */
export const figmaPentagramSmall = {
  a: "https://www.figma.com/api/mcp/asset/5f7fdd75-ca40-4af8-8028-aafa971d19da",
  b: "https://www.figma.com/api/mcp/asset/c5810893-66de-4d21-b580-d58f2c1d3303",
} as const;

/**
 * LOGOS 컴포넌트 세트 `274:22224` — 소스는 `public/work/logo_*.png` (Figma MCP URL 만료 방지).
 * 키 이름은 `FigmaLogos`·기존 import와의 호환을 위해 유지.
 */
export const figmaLogos = {
  logo_HM_Vector: "/work/logo_HM.png",
  logo_GN_Mask: "/work/logo_GN.png",
  logo_KM_Group: "/work/logo_KM.png",
  logo_HAE_Mask: "/work/logo_HAE.png",
  logo_HMS_Mask: "/work/logo_HMS.png",
  logo_LGE_Image: "/work/logo_LGE.png",
  logo_SKE_Mask: "/work/logo_SKE.png",
  logo_SS_Image: "/work/logo_SS.png",
} as const;

/** `btn_chip` (예: `279:23037`) */
export const figmaBtnChip = {
  externalIcon:
    "https://www.figma.com/api/mcp/asset/b6659c0a-6bb7-40b6-b860-413ae1dac716",
} as const;

/** `/works_view` 중간구분 */
export const figmaWorksViewDivider =
  "https://www.figma.com/api/mcp/asset/8d5245c1-a8a7-48b4-9d24-888d92519516";

/** works_view 스크린·루프 */
export const figmaHyundaiCase = {
  sec1Hero:
    "https://www.figma.com/api/mcp/asset/33c68562-07c8-4e79-8092-723bc335816b",
  flowStep1:
    "https://www.figma.com/api/mcp/asset/dcb2035c-7d0c-41bf-ae57-b9ca2372e733",
  flowStep2:
    "https://www.figma.com/api/mcp/asset/0fcbc93f-2548-41ab-95f4-60262cba06ee",
  flowStep3:
    "https://www.figma.com/api/mcp/asset/bcaf39ed-fbe0-4b6b-a68c-09c0012a9055",
  myPageFlow:
    "https://www.figma.com/api/mcp/asset/54677547-3131-4c48-a873-872d1b76cf31",
  sec3LatestSample:
    "https://www.figma.com/api/mcp/asset/33c68562-07c8-4e79-8092-723bc335816b",
  stFo005Full:
    "https://www.figma.com/api/mcp/asset/bb522fda-1375-4eca-87a1-3b319591570e",
  stFo024Full:
    "https://www.figma.com/api/mcp/asset/0a6facdf-c2d2-4fbe-88be-e3a380d1882b",
  /** ST-FO-111 내부 롱 스크롤용 (첫 스크린 레이어) */
  stFo111Full:
    "https://www.figma.com/api/mcp/asset/01abd481-90f7-473c-bd56-7ef0ee00a755",
} as const;
