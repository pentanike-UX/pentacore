# 디자인 규칙

## Source of truth (Figma + docs)
- **Figma**: 레이아웃·시각 스펙·컴포넌트·annotation의 1차 기준.
- **docs**: 화면별 의도·상태·라우트·가정·TODO는 `docs/04_screen-spec.md` 등과 함께 관리한다.
- Figma에 없거나 불명확한 것은 **assumption / TODO**로 표시하고, 확정 시 문서·코멘트를 갱신한다.
- Figma **파일/프레임/컴포넌트 이름** ↔ 코드 **컴포넌트 이름**은 `04_screen-spec`에서 추적 가능하게 유지한다.

## 원칙
- **모바일 우선**: `<768px`에서 먼저 설계; `useBreakpoint`로 tablet/desktop 확장.
- **여백 중심**: 정보 밀도를 과하게 올리지 않는다.
- **짧은 카피**: 제목·버튼·에러 문구는 짧고 명확하게.
- **일관된 톤**: 다크 홈 vs 라이트 서브(SUB_WORK, SUB_INQUIRY) — `HeaderBar`/`FooterBar`의 `surface: dark | light`로 정렬.

## 터치·접근성
- 터치 타깃: 주요 버튼 최소 높이 **48px** 수준(예: Inquiry primary `min-h-[48px]`).
- 포커스/키보드: 폼·버튼 네이티브 포커스 링 유지; 커스텀 커서는 `GlobalCursorProvider`와 병행 시 상호작용 요소 확인 TODO.

## 색·타이포
- **루트**: `html`에 `dark` 클래스, 기본 다크 서피스(홈·동영상 위 대비).
- **폰트**: `--font-sans` Geist, 본문 한글 Noto Sans KR(`--font-noto`), 대형 영문 타이틀 Inter 900(`--font-inter-display`).
- **글래스**: `liquidGlass*` 유틸 — 헤더/푸터 스크롤 시 쉘; 라이트 페이지는 밝은 테두리·그림자 변형.

## 컴포넌트 가이드
- **버튼**: `components/ui/button` — primary CTA는 rounded-full·충분한 패딩(서브페이지에서 명시적 클래스 병행).
- **카드**: `components/ui/card` — Work/홈 카드 변형과 용도 구분.
- **폼**: Inquiry — 라벨·placeholder 명확; 제출은 mailto(서버 에러 상태 없음).

## 금지
- 화면 가득 정보 나열 without 구역·여백
- 로딩/빈 상태/에러 없이 “그냥 빈 화면”만 보여주기

## 구현 대비 Figma (지속 갱신)
- 미세한 간격·모션 duration은 코드와 Figma가 1:1이 아닐 수 있음 → PR·본 문서에 bullet로 차이 적기.
