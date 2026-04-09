# 화면 스펙

> 화면마다 한 블록. 모바일 뷰 기준으로 작성. **Figma 프레임·컴포넌트와 이름을 맞춰 추적**한다.

## 템플릿 (복사용)

### 화면: `<이름>`
- **Figma**: 파일 링크·`프레임 이름`·주요 컴포넌트명 (MCP/URL) — TODO
- **코드 컴포넌트**: (예: `ScreenName` / `features/foo/Bar.tsx`) — TODO
- **경로/라우트**: `TODO`
- **목적**: 
- **진입**: (어디서 오는지)
- **반응형**: 모바일 / 데스크톱 차이/브레이크포인트 — TODO
- **주요 UI**: (Figma 컴포넌트명과 대응)
- **상태**: loading / empty / error / disabled — 각각 Figma에 정의된지·없으면 assumption/TODO
- **액션**: 
- **비고**: 미확정 사항·assumption 목록

---

## 공통
- **브레이크포인트** (`useBreakpoint`): `<768` mobile · `<1024` tablet · 그 외 desktop.
- **루트 레이아웃**: `web/app/layout.tsx` — `AppChrome`, `GlobalCursorProvider`, 폰트 변수, **SEO 메타** (title template, Open Graph, Twitter, keywords, canonical `/`).
- **파비콘·OG**: `web/app/icon.png`, `opengraph-image.png`, `twitter-image.png` (파일 기반 메타데이터).
- **metadataBase**: `https://www.pentacore.co.kr` — 배포 도메인과 다르면 수정.

---

### 화면: 홈 (`/`)
- **Figma**: 홈·히어로·카드 그리드 프레임 — 코드 주석에 `HOME_LAYOUT`, SUB 참조; 정확한 파일 URL은 TODO
- **코드 컴포넌트**: `HomeExperience` (`HomeSectionCards`, `HeaderBar`, `FooterBar`, `home-manifesto` 등)
- **경로/라우트**: `web/app/page.tsx` → `/`
- **목적**: 브랜드 첫인상, 인트로·동영상·태그라인, 하위 섹션 진입
- **진입**: 직링크·외부 캠페인·푸터/메뉴 홈
- **반응형**: 인트로 원·카드 스태거·헤더 compact 모드; 태블릿/데스크톱 열·여백 조정
- **주요 UI**: 풀스크린 비디오(마스크), 타이핑/롤링 상태 문구, Skip, ISO 뱃지, 매니페스토, 카드 그리드
- **상태**: 동영상 `canplay`/`canplaythrough` 대기; `ImageWithSkeleton` 등 일부 미디어; 인트로 완료 `localStorage` `pentacore_intro_done`
- **액션**: Skip 인트로, 스크롤, 내비 링크
- **비고**: `NEXT_PUBLIC_HERO_VIDEO_URL` 미설정 시 `/video/hero.mp4`

---

### 화면: About (`/about`)
- **Figma**: About 리스팅 — `figma-about-assets` 등 주석 참조; 프레임 URL TODO
- **코드 컴포넌트**: `AboutListingPage`, `AboutPentagramFigma`
- **경로/라우트**: `web/app/about/page.tsx`
- **목적**: 스튜디오 소개·비주얼(펜타그램 등)
- **진입**: 푸터·오버레이 메뉴·직링크
- **반응형**: 서브페이지 라이트 톤, `SubPageScaffold` 계열 여백
- **주요 UI**: 히어로 카피, 그래픽 섹션
- **상태**: 이미지 로딩 스켈레톤(해당 컴포넌트 사용 시)
- **액션**: 스크롤, (있는 경우) 외부 PDF 링크 — `about-assets`의 company overview URL
- **비고**: —

---

### 화면: Work 목록 (`/work`)
- **Figma**: `portfolio_group` / SUB_WORK — `work-portfolio-data`, `figma-work-assets` 주석
- **코드 컴포넌트**: `WorkListingPage`, `WorkPortfolioGlassRow`, `FigmaLogos`, `BorderedVerticalLoop`, `Parallax` 등
- **경로/라우트**: `web/app/work/page.tsx`
- **목적**: 실적 목록·로고·기간·태그, 브랜드 신뢰
- **진입**: 내비·홈 카드
- **반응형**: 글래스 행·루프·패럴랙스 강도 브레이크포인트별 조정
- **주요 UI**: 포트폴리오 행, 토스트 스택(`WorkToastStack`) 등
- **상태**: 스크롤·모션 중심; 별도 empty API 없음(정적 배열)
- **액션**: 케이스로 이동 링크(구현된 경우)
- **비고**: 데이터 소스 `WORK_PORTFOLIO_ROWS`

---

### 화면: Works 상세 (`/works/[slug]`)
- **Figma**: 현대 내비 케이스 — `figma-work-assets`, `work-assets` MCP/로컬 경로
- **코드 컴포넌트**: `WorksDetailView`
- **경로/라우트**: `web/app/works/[slug]/page.tsx` — 현재 슬러그 `hyundai-navigation`만 (`WORK_DETAIL_SLUG`)
- **목적**: 단일 대형 케이스 스토리텔링(롱 스크롤 이미지 등)
- **진입**: Work에서 링크·직링크
- **반응형**: 풀블리드 이미지·디바이더; `ST_FO_111_FULL_INTRINSIC` 등 치수 상수
- **주요 UI**: 섹션 이미지, 플로우 스텝, 최신업데이트 샘플 PNG
- **상태**: 이미지 스켈레톤; 잘못된 슬러그 → `notFound()`
- **액션**: 스크롤
- **비고**: 신규 케이스 시 `WORK_DETAIL_SLUG`·`generateStaticParams`·뷰 동기화

---

### 화면: Hiring 목록 (`/hiring`)
- **Figma**: TODO (프레임 링크)
- **코드 컴포넌트**: `HiringPageView`
- **경로/라우트**: `web/app/hiring/page.tsx`
- **목적**: 채용 공고 목록
- **진입**: 내비·홈
- **반응형**: 서브 라이트 톤
- **주요 UI**: 공고 카드, CTA
- **상태**: 정적 공고; empty는 데이터 미추가 시
- **액션**: 상세 페이지·지원 열기
- **비고**: —

---

### 화면: Hiring 상세 (`/hiring/[slug]`)
- **Figma**: TODO
- **코드 컴포넌트**: `HiringJobDetailView`, `HiringApplyDrawer`
- **경로/라우트**: `web/app/hiring/[slug]/page.tsx` — `backend-developer` (`HIRING_JOB_SLUG_BACKEND`)
- **목적**: 직무 설명·지원
- **진입**: 목록
- **반응형**: 드로어·패널 폭(데스크톱 넓은 패널 등 구현 반영)
- **주요 UI**: 본문, 지원 버튼 → `HiringApplyDrawer`(포털·z-index)
- **상태**: 지원 폼/링크 — 구현 기준 확인
- **액션**: 지원서 제출·외부 링크
- **비고**: 신규 공고 시 슬러그 상수·`generateStaticParams` 동기화 (`hiring-assets.ts`)

---

### 화면: Inquiry (`/inquiry`)
- **Figma**: SUB_INQUIRY — 코드에 흰 히어로·글래스 쉘
- **코드 컴포넌트**: `InquiryPageView`
- **경로/라우트**: `web/app/inquiry/page.tsx`
- **목적**: 프로젝트 유형·플랫폼·일정 등 선택 후 메일 초안
- **진입**: 내비 “PROJECT INQUIRY”
- **반응형**: 폼 전폭/버튼 `sm` 이상 고정 폭
- **주요 UI**: 자격 질문, 텍스트 입력, 제출 → `mailto:info@pentacore.kr`
- **상태**: 클라이언트 폼 상태; 서버 검증 없음
- **액션**: 제출 시 기본 메일 클라이언트
- **비고**: 스팸·누락 방지는 향후 서버 연동 시

---

## Figma ↔ 코드 추적 (요약)
| 영역 | 코드 앵커 |
|------|-----------|
| 리퀴드 글래스 | `lib/figma-liquid-glass.ts`, 헤더/푸터 주석 |
| Work 에셋 | `components/work/figma-work-assets.ts`, `work-assets.ts` |
| About 에셋 | `components/about/figma-about-assets.ts` |
| 홈 레거시 MCP 경로 | `components/home/figma-assets.ts` (주석) |

미맵핑 프레임은 Figma 링크·프레임명 확정 후 본 표에 추가한다.
