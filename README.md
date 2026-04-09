# pentacore

## 개요
**PENTACORE** 공식 웹 애플리케이션이 `web/`에 있다 (Next.js 15, React 19). 브랜드 홈, 포트폴리오(Work·Works), About, Hiring, Inquiry를 포함한다. 제품 한 줄·IA·화면 상세는 [docs/00_project-overview.md](docs/00_project-overview.md), [docs/03_information-architecture.md](docs/03_information-architecture.md), [docs/04_screen-spec.md](docs/04_screen-spec.md)를 본다.

## 빠른 시작
```bash
cd web
npm install
npm run dev
```
브라우저: `http://localhost:3000`  
빌드: `npm run build && npm run start`  
Node **20+** 권장 (`web/package.json` engines).

## 문서 우선순위
| 순서 | 문서 |
|------|------|
| 1 | [01_product-prd.md](docs/01_product-prd.md) |
| 2 | [03_information-architecture.md](docs/03_information-architecture.md) |
| 3 | [04_screen-spec.md](docs/04_screen-spec.md) |
| 4 | [02_tech-setup.md](docs/02_tech-setup.md) |
| 5 | [10_qa-checklist.md](docs/10_qa-checklist.md) |

## 작업 로그 남기기
```bash
npm run log:work -- "Cursor" "한 줄로 작업 목적"
npm run log:work -- "Cursor" "목적" "프롬프트 요약(선택)"

npm run log:release -- "v0.1.0" "릴리즈 한 줄 요약"

npm run log:adr -- "의사결정 제목"
```
또는 `./scripts/` 아래 스크립트를 직접 실행해도 된다. 기록 위치: [docs/08_prompt-log.md](docs/08_prompt-log.md), [docs/11_release-log.md](docs/11_release-log.md), [docs/09_decision-log.md](docs/09_decision-log.md).

## Git 훅 (선택)
한 번만 실행하면 커밋 전에 문서 갱신을 **떠올리게** 안내한다 (커밋은 막지 않음).

```bash
npm run hooks:install
```

## Figma MCP (Cursor)
- **권장**: 에이전트 채팅에 `/add-plugin figma` 입력 → 공식 플러그인 설치 후 OAuth.
- **또는**: 루트 [`.cursor/mcp.json`](.cursor/mcp.json)의 원격 서버를 Cursor MCP에서 연결(중복 시 하나만 사용). 상세는 [docs/02_tech-setup.md](docs/02_tech-setup.md).

## Cursor에 시킬 때
- 맥락: “목표는 …, 관련 문서는 docs/0x … 참고”처럼 문서 경로를 짚어준다.
- UI 작업: Figma MCP 연결 시 프레임·컴포넌트·annotation 먼저 확인; `docs/04`·`docs/05`와 SoT 유지.
- 큰 설계 변경: 먼저 `docs/09_decision-log.md`에 ADR 추가를 요청할 수 있다.

## 환경 변수
- `NEXT_PUBLIC_HERO_VIDEO_URL` (선택) — 홈 히어로 영상. 미설정 시 `/video/hero.mp4`. 자세한 내용은 [docs/07_api-env.md](docs/07_api-env.md).

## package-lock.json
`web/package-lock.json`이 웹 앱의 잠금 파일이다. 루트 스크립트와 병행 시 각 디렉터리에서 `npm install`을 실행한다.
