# 데이터 스키마 (초안)

> 프론트엔드 기준 정적·클라이언트 데이터를 정리한다. 백엔드 API는 현재 없음.

## 엔티티 개요
| 엔티티 | 설명 | 저장 위치 / 형태 |
|--------|------|------------------|
| 포트폴리오 행 | 제목·기간·태그·로고 키 배열 | `web/components/work/work-portfolio-data.ts` — `WORK_PORTFOLIO_ROWS` |
| Works 케이스 슬러그 | 상세 페이지 식별자 | `WORK_DETAIL_SLUG` (`hyundai-navigation`) — `work-assets.ts` |
| 채용 공고 슬러그 | 상세·SSG 파라미터 | `HIRING_JOB_SLUG_BACKEND` 등 — `hiring-assets.ts`, `generateStaticParams`와 동기화 |
| 인트로 완료 플래그 | 재방문 시 인트로 스킵 | 브라우저 `localStorage` 키 `pentacore_intro_done` (`HomeExperience`) |
| 문의 폼 초안 | 선택지·자유 입력 | 클라이언트 state만; 제출 시 mailto 쿼리로 직렬화 (서버 저장 없음) |

## 관계
- 포트폴리오 행 **N** — Works 상세는 별도 슬러그로 **1:N 확장 가능**(현재 상세 1건).
- Hiring 목록 ↔ 상세는 **slug**로 1:1 매핑(추가 공고 시 상수·정적 파라미터 추가).

## 식별자·버전
- 슬러그: **kebab-case** 문자열, URL 경로와 동일.
- 타임스탬프: 비즈니스 데이터에 날짜는 **기간 문자열**(예: `2022~2024`)로 UI 표시; DB 스키마 없음.

## 마이그레이션 / 호환
- `localStorage` 키 변경 시 기존 사용자 인트로 동작이 달라질 수 있음 → 키 변경 시 한 번만 마이그레이션 고려.
- 영상 URL: 환경 변수 도입 시 기본 `/video/hero.mp4`와 병행.

## 보안·PII
- 문의 내용은 **mailto**로 사용자 기기의 메일 앱에만 전달; 서버 로그 없음.
- 폼에 입력된 전화·이메일을 앱 로그에 `console` 출력하지 않도록 유지.
- TODO: 향후 API 연동 시 PII 암호화·보관 기간 정책
