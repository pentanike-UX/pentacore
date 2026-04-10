# 릴리즈 로그

> `./scripts/log-release.sh "<버전>" "<한 줄 요약>"` 또는 `npm run log:release`로 추가한다.

## 형식
- 버전은 [SemVer](https://semver.org/) 권장 (예: `v0.1.0`).
- 사용자에게 의미 있는 변경 위주로 한 줄 요약.

---

## 기록

### 문서 동기화 (미배포 변경 요약) — 2026-04-08
> 아래는 코드에 반영된 기능·스펙을 `docs/`와 맞추기 위한 요약. 별도 태그 없이 누적 작업 기록용.

- **SEO**: 루트 메타 타이틀·디스크립션·키워드·OG·Twitter 통일; `og:image`/`twitter:image` alt; `theme-color`; `apple-touch-icon` 경로(`public/`, 180px 권장 TODO).
- **서브페이지**: `SubPageScaffold` 맨 위로 FAB(포털·메뉴 딤 연동·z); `AppChrome`/`SubPage` 기반 가로 오버플로 처리.
- **`/work`**: 카드 뷰 모바일 130%·`txt` 그리드·썸 간격; `portfolio_group` 모바일 타이포 한 단계 축소.
- **`/works/hyundai-navigation`**: sec_2 칩 KOREA/US/EU URL; 크레딧 간격·본문 © 제거.

### v0.1.0-web — 2026-04-08
- Next.js 15 앱(`web/`): 홈 인트로·동영상, About, Work·Works 상세(`hyundai-navigation`), Hiring·공고 상세, Inquiry(mailto).
- 전역 SEO 메타·Open Graph·Twitter·`metadataBase`, 파일 기반 `icon`/`opengraph-image`/`twitter-image`.
- AppChrome·홈 크롬 분리, 리퀴드 글래스 헤더/푸터, 반응형 브레이크포인트.

<!-- 스크립트는 파일 끝에 블록을 append 한다 -->
