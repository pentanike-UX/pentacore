# 정보 구조 (IA)

> 화면 간 관계와 내비게이션. 모바일 우선으로 생각한다.

## 사이트맵 (개략)
```
/                    홈 (인트로 → 마스크 동영상·카드 — HomeExperience)
/about               About
/work                Work 목록·포트폴리오
/works/[slug]        케이스 상세 (현재 hyundai-navigation)
/hiring              채용 목록
/hiring/[slug]       공고 상세 (현재 backend-developer)
/inquiry             프로젝트 문의 (mailto 플로우)
```

## 주요 사용자 흐름
1. **랜딩 → 탐색**  
   - `/` 진입 → 인트로(또는 재방문 시 생략) → 헤더/푸터·카드로 **About / Work / Hiring / Inquiry** 이동
2. **포트폴리오 깊이**  
   - `/work`에서 목록·로고 행 확인 → (링크 제공 시) `/works/hyundai-navigation` 상세
3. **채용**  
   - `/hiring` → 공고 카드 → `/hiring/backend-developer` → 지원 드로어/액션
4. **문의**  
   - `/inquiry`에서 질문 선택 → 제출 시 **mailto:info@pentacore.kr** 본문 조합

## 내비게이션 패턴
- **홈**: 상단 `HeaderBar`·하단 `FooterBar` (동영상 위 오버레이·글래스 스크롤 연동).
- **서브페이지** (`/` 제외): `AppChrome`이 동일 헤더·푸터(라이트 서피스, 인라인 푸터) 제공. `SubPageScaffold`로 감싼 본문에 **맨 위로** 플로팅 버튼(스크롤 시; 메뉴 오버레이와 z-order 연동 — `04_screen-spec` 공통).
- **햄버거**: `HeaderMenuIcon` + `HeaderNavOverlay` 풀스크린 메뉴.
- **워드마크**: `PentacoreWordmark` + `public/home/pentacore-symbol.svg` 등.

## 콘텐츠 그룹
| 그룹 | 설명 | 대표 화면 |
|------|------|-----------|
| 브랜드·스토리 | 매니페스토·ISO 뱃지·톤 | `/`, `/about` |
| 실적 | 클라이언트 로고·기간·태그·케이스 스크롤 | `/work`, `/works/[slug]` |
| 채용 | 공고·지원 UI | `/hiring`, `/hiring/[slug]` |
| 리드 | 폼·이메일 | `/inquiry` |

## 심층 링크 / SEO
- 전역 **`metadata`·`viewport`·`metadataBase`**: 통일 타이틀·디스크립션·키워드·OG·Twitter·이미지 **alt**·`theme-color`·`apple-touch-icon` — [04_screen-spec.md](./04_screen-spec.md) **공통**·`web/app/layout.tsx`.
- 정적 OG·파비콘: `web/app/opengraph-image.png`, `icon.png`, `twitter-image.png`; Apple 터치 아이콘은 `web/public/apple-touch-icon.png`.
- canonical 기본 `/` (루트); 하위 페이지별 `generateMetadata` 확장은 TODO.

## 변경 시
- [04_screen-spec.md](./04_screen-spec.md)와 함께 갱신할 것.
