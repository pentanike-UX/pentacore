# 프로젝트 개요 (pentacore)

## 한 줄 요약
PENTACORE 공식 웹: **IT·AI 개발부터 서비스 운영까지** 내비·인비히클·웹·AI 등을 다루는 기술·디자인 스튜디오의 포트폴리오·채용·문의를 담은 **마케팅/브랜드 사이트** (Next.js). (사이트 메타 타이틀·디스크립션과 동일 포지셔닝.)

## 문제 / 기회
- 파트너·지원자에게 **역량·프로젝트·연락 경로**를 일관된 브랜드 경험으로 전달한다.
- Figma 기반 UI를 코드로 구현하고, 문서(`docs/`)로 스펙·IA·기술 상태를 추적한다.

## 대상 사용자
- **B2B / 파트너**: 프로젝트 문의, 회사·업무 이해 (About, Work, Inquiry).
- **지원자**: 채용 공고·지원 흐름 (Hiring).
- **내부**: 디자인–개발 정합, 릴리즈·QA 체크.

## 현재 단계
- 리포: **`web/`** 에 Next.js 15 앱 운영 중 (홈·Work·Works 상세·About·Hiring·Inquiry).
- 정적·클라이언트 데이터 위주; 문의 제출은 **mailto** 조합 (서버 API 없음).
- 다음 마일스톤: 배포 URL·환경 변수 확정, Figma 대비 잔여 갭 정리, (선택) 문의 백엔드 연동.

## 관련 문서 (빠른 링크)
| 우선순위 | 문서 | 용도 |
|----------|------|------|
| 1 | [01_product-prd.md](./01_product-prd.md) | 무엇을 만들지 |
| 2 | [03_information-architecture.md](./03_information-architecture.md) | 화면·흐름 |
| 3 | [04_screen-spec.md](./04_screen-spec.md) | 화면별 상세 |
| 4 | [02_tech-setup.md](./02_tech-setup.md) | 실행·스택 |
| 5 | [10_qa-checklist.md](./10_qa-checklist.md) | 출시 전 점검 |

## 용어
- **SUB_WORK** 등: Figma 서브 페이지/섹션 톤을 코드 주석·에셋에서 인용 (라이트 서브페이지 배경 등).
- **HOME_LAYOUT-1 / 2**: 홈 단계별 레이아웃(마스크 동영상·카드 그리드 등) 구현 구간을 가리키는 비공식 명칭.
- **Works**: 포트폴리오 목록·케이스 상세 (`/work`, `/works/[slug]`).
