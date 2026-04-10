# 의사결정 로그 (ADR 스타일)

> `./scripts/new-adr.sh "제목"` 또는 `npm run log:adr`로 추가한다.

## ADR 템플릿 (참고)
- **상태**: 제안 / 확정 / 폐기
- **맥락**: 왜 결정이 필요한가
- **결정**: 무엇을 택했는가
- **결과**: 장단점, 후속 조치

---

## 기록

### ADR-001 — Next.js App Router + `web/` 단일 앱 (확정)
- **맥락**: 브랜드 사이트에 SSR/메타·라우팅·에셋 파이프라인이 필요함.
- **결정**: Next.js 15 App Router, 앱 루트는 `web/`. 정적 케이스·채용은 `generateStaticParams`로 SSG.
- **결과**: 파일 기반 OG·아이콘, 레이아웃 중첩, 배포 친화적. 모노레포 추가 시 `web` 경로만 조정하면 됨.

### ADR-002 — 홈 전용 크롬 vs `AppChrome` 분리 (확정)
- **맥락**: 홈은 풀스크린 인트로·동영상 위 헤더/푸터와 서브페이지 라이트 톤이 다름.
- **결정**: `/`는 `HomeExperience`가 헤더/푸터·페이즈 직접 관리; 그 외는 `AppChrome`이 `HeaderBar`/`FooterBar` 제공.
- **결과**: 조건부 레이아웃이 명확해짐. 신규 전면 풀스크린 페이지 추가 시 동일 패턴 검토.

### ADR-003 — 문의 제출은 mailto (확정, 임시)
- **맥락**: 서버리스/API 없이 빠르게 리드 폼 제공.
- **결정**: `InquiryPageView`에서 선택값·본문을 조합해 `mailto:info@pentacore.kr`로 연다.
- **결과**: 구현 단순, 전환 추적·스팸 필터 약함 → 추후 API 또는 폼 서비스로 대체 가능.

### ADR-004 — 전역 SEO 메타 단일 문구 + OG/Twitter alt + theme-color·apple-touch-icon (확정)
- **맥락**: 검색·SNS 공유용 타이틀·설명·키워드를 최신 포지셔닝(IT·AI·운영)에 맞추고, 접근성·모바일 홈 화면 대비 메타를 보강.
- **결정**: `web/app/layout.tsx`에서 상수 기반으로 `<title>` 기본값, description, keywords, Open Graph, Twitter Card를 **동일 카피**로 설정. `openGraph.images`·`twitter.images`에 기존 PNG 경로 유지 + **alt**. `viewport.themeColor`로 `#000000`. `icons.apple` → `/apple-touch-icon.png`(`public/`, 180×180 권장 TODO).
- **결과**: 소스·디버거에서 태그 일관성 확보. `og:site_name`, `og:type`, `og:locale`, canonical·metadataBase는 기존 정책 유지.

### ADR-005 — 서브 가로 스크롤 억제는 `AppChrome`/`SubPageScaffold`, 맨 위로 FAB는 `body` 포털 (확정)
- **맥락**: `/work` 모바일에서 카드 스케일로 가로 오버플로가 생김. `html`/`body`에 `overflow-x: hidden`을 걸면 `position: fixed` 포털(맨 위로 버튼)이 인라인 푸터(`z-10`) 등과 쌓임이 깨져 **가려지는** 브라우저 동작이 있음.
- **결정**: `WorkListingPage`에서 document `overflowX` 조작 제거. **`AppChrome`** 메인 래퍼와 **`SubPageScaffold`**에 `overflow-x-hidden`. 맨 위로 버튼은 **`createPortal(..., document.body)`** + 높은 z의 포인터 이벤트 셸; 풀스크린 메뉴 시 `HeaderBar`가 `data-header-nav-open`으로 동기화해 딤 아래로.
- **결과**: 가로 스크롤·FAB 가시성 동시 만족. 신규 “전역 fixed” UI 추가 시 동일 쌓임·overflow 정책 검토.
