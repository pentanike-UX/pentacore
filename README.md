# pentacore

## 개요
앱 코드·프레임워크는 아직 없고, **문서·작업 로그·PR/이슈 템플릿·가벼운 자동화**만 갖춘 초기 상태다. 제품 한 줄 설명은 [docs/00_project-overview.md](docs/00_project-overview.md)의 TODO를 채운다.

## 개발 시작 순서 (권장)
1. [docs/00_project-overview.md](docs/00_project-overview.md) · [docs/01_product-prd.md](docs/01_product-prd.md)로 방향 정리
2. [docs/02_tech-setup.md](docs/02_tech-setup.md)에 스택·실행 방법 기록 후 프레임워크 도입
3. [docs/03_information-architecture.md](docs/03_information-architecture.md) · [docs/04_screen-spec.md](docs/04_screen-spec.md)를 화면 작업과 함께 갱신
4. API·환경은 [docs/07_api-env.md](docs/07_api-env.md), 데이터는 [docs/06_data-schema.md](docs/06_data-schema.md)

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

## package-lock.json
이전에 루트에만 lock 파일이 있었을 수 있다. `package.json` 추가 후 필요하면 `npm install`로 lock을 정리한다.
