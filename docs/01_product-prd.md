# PRD (제품 요구 초안)

> 마케팅 웹 기준으로 정리. 불확실한 부분은 TODO로 남긴다.

## 목표
- PENTACORE의 **정체성·대표 프로젝트·채용·문의**를 한 사이트에서 탐색 가능하게 한다.
- 모바일 우선 반응형으로 **Figma와 정합된** 시각·모션 경험을 제공한다.

## 비목표 (하지 않을 것)
- 로그인·권한·사용자 대시보드 (현 버전).
- 문의 폼의 **서버 수신·CRM 연동** (현재는 mailto; 추후 검토).
- 다국어 전면 i18n 라우팅 (본문은 한·영 혼용; `html lang="ko"`).

## 사용자 스토리 (우선순위 순)
1. 방문자로서 **홈**에서 브랜드 인트로·핵심 메시지·하단 내비로 각 섹션에 들어가고 싶다.
2. 파트너로서 **Work**에서 실적 목록과 **대표 케이스 상세**를 보고 싶다.
3. 지원자로서 **Hiring**에서 공고를 읽고 지원(드로어/링크) 흐름을 쓰고 싶다.
4. 문의자로서 **Inquiry**에서 선택지를 고른 뒤 **이메일 초안**을 열고 싶다.

## 기능 범위
### Must
- 홈: 인트로(동영상·타이핑·Skip)·재방문 시 인트로 생략(`localStorage`)·섹션 카드.
- 전역 내비: ABOUT / WORK / HIRING / PROJECT INQUIRY.
- Work 목록·포트폴리오 행(로고·기간·태그); Works 상세 1건(정적 슬러그).
- About, Hiring 목록·공고 상세(정적 슬러그), Inquiry 폼(mailto).
- SEO: 루트 `metadata`/`viewport`로 **통일된** 타이틀·디스크립션·키워드·Open Graph·Twitter Card; OG/Twitter **이미지 alt**; `theme-color`; `apple-touch-icon` 경로. 파일: `app/icon.png`, `opengraph-image.png`, `twitter-image.png` (상세는 `04_screen-spec` 공통).

### Should
- 스크롤 연동 리퀴드 글래스 헤더/푸터, 브레이크포인트별 레이아웃(모바일·태블릿·데스크톱).
- 서브페이지(`SubPageScaffold`): 스크롤 시 **맨 위로** 플로팅 버튼; 전역 메뉴(햄버거) 오버레이와 z-order 조화.
- 이미지·동영상 로딩 스켈레톤 등 빈 화면 완화.

### Could
- 추가 Works 케이스 페이지·CMS 연동.
- 문의 서버 API·스팸 방지.

## 성공 지표
| 지표 | 정의 | 목표 |
|------|------|------|
| 빌드·배포 | `next build` 성공, 프로덕션 배포 | TODO: 배포 파이프라인 확정 후 수치화 |
| LCP (홈) | 대표 이미지/비디오 로드 | TODO: 배포 후 측정 기준 합의 |
| 전환 | 문의 mailto 클릭·채용 지원 완료 | TODO: 분석 도구 연동 시 |

## 리스크 / 가정
- **metadataBase**는 `https://www.pentacore.co.kr` 기준; 실제 배포 도메인과 다르면 수정 필요.
- 대용량 `hero` 영상은 CDN/URL 환경 변수로 교체 가능 (`NEXT_PUBLIC_HERO_VIDEO_URL`).
- Figma와 1:1 불일치 구간은 코드 주석·본 문서에 assumption/TODO로 남길 수 있음.

## 변경 이력
| 날짜 | 변경 |
|------|------|
| 2026-04-08 | 초기 웹 구현 반영, PRD 범위 구체화. 동일일 문서 동기화: SEO 통일 카피·OG/Twitter alt·theme-color·apple-touch-icon; 서브 FAB·가로 오버플로 정책; Work/Works 상세는 `04_screen-spec` |
| (이전) | 초안 |
