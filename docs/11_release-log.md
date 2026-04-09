# 릴리즈 로그

> `./scripts/log-release.sh "<버전>" "<한 줄 요약>"` 또는 `npm run log:release`로 추가한다.

## 형식
- 버전은 [SemVer](https://semver.org/) 권장 (예: `v0.1.0`).
- 사용자에게 의미 있는 변경 위주로 한 줄 요약.

---

## 기록

### v0.1.0-web — 2026-04-08
- Next.js 15 앱(`web/`): 홈 인트로·동영상, About, Work·Works 상세(`hyundai-navigation`), Hiring·공고 상세, Inquiry(mailto).
- 전역 SEO 메타·Open Graph·Twitter·`metadataBase`, 파일 기반 `icon`/`opengraph-image`/`twitter-image`.
- AppChrome·홈 크롬 분리, 리퀴드 글래스 헤더/푸터, 반응형 브레이크포인트.

<!-- 스크립트는 파일 끝에 블록을 append 한다 -->
