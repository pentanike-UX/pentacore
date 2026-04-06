/** WORK / works_view용 플레이스홀더 이미지 — Figma ST-FO-*_full 에셋으로 교체 */
export const workImages = {
  heroWide: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=2560&q=80",
  heroParallax: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=3200&q=80",
  /** thumb_HMG: Figma `image 13` / `image 14` 이중 레이어 근사 */
  thumbHmgBack: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=2560&q=85",
  thumbHmgFront: "https://images.unsplash.com/photo-1489827904720-24f2adbf6d6f?w=2560&q=85",
  portfolioThumb: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&q=80",
  loop005: "https://picsum.photos/id/106/375/3800",
  loop024: "https://picsum.photos/id/119/375/2800",
  loop111: "https://picsum.photos/id/29/900/3400",
} as const;

/**
 * Figma `/works_view` RECTANGLE·IMAGE fill 근사 (해시보내기 전까지 원격 URL).
 * 로컬 `public/works/hyundai-navigation/` 에 PNG 배치 시 이 객체를 파일 경로로 교체하면 됨.
 */
export const hyundaiWorksViewImages = {
  /** `중간구분 이미지` ×2 동일 해시 */
  sectionDivider: workImages.heroWide,
  /** sec_1 스크린샷 — 리스트 썸과 동일 톤 */
  heroHome: workImages.portfolioThumb,
  /** sec_3 `최신업데이트_샘플` — Figma는 VIDEO 노드 */
  latestUpdateSample: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1800&q=85",
  /** sec_4/in 단계별 스크린 (893×573) */
  flowStep1: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1800&q=80",
  flowStep2: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1800&q=80",
  flowStep3: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1800&q=80",
  /** sec_4in 통합 화면 (893×1117) */
  myPageFlow: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1800&q=85",
} as const;

export const WORK_DETAIL_SLUG = "hyundai-navigation";
