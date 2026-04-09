# 기술 셋업

## 현재 상태
- **프레임워크**: Next.js **15.5** (App Router, Turbopack dev)
- **UI**: React **19**, Tailwind CSS **3.4**, Framer Motion, `@base-ui/react`, shadcn 스타일 유틸(`components/ui`)
- **폰트**: `next/font` — Geist, Noto Sans KR, Inter 900(디스플레이)
- **패키지 매니저**: npm (`web/package-lock.json`)
- **런타임**: Node **>= 20.9.0** (`web/package.json` engines)
- **배포**: TODO (Vercel·자체 호스팅 등 확정 후 [07_api-env.md](./07_api-env.md) 갱신)

## 로컬 실행
```bash
cd web
npm install
npm run dev
# http://localhost:3000
```

프로덕션 빌드:
```bash
cd web
npm run build
npm run start
```

## 권장 Node 버전
- **20 LTS 이상** (engines와 동일 권장)

## 환경 변수
자세한 키 목록은 [07_api-env.md](./07_api-env.md).

## Figma MCP (Cursor)

### 권장: 공식 플러그인
Cursor **에이전트 채팅**에 다음을 입력하면 Figma 공식 플러그인(MCP·스킬·룰 번들)이 설치된다.

```text
/add-plugin figma
```

설치 후 안내에 따라 **Connect / Allow access**로 OAuth를 완료한다. 자세한 절차는 [Figma — Remote MCP (Cursor)](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/) 참고.

### 이 리포지토리: `.cursor/mcp.json`
팀과 동일한 **원격 MCP 엔드포인트**를 쓰도록 워크스페이스에 [`.cursor/mcp.json`](../.cursor/mcp.json)을 두었다. Cursor **설정 → MCP**에서 `figma` 서버가 보이면 **연결·인증**만 하면 된다.

- 공식 플러그인과 **동시에** 켜면 항목이 중복될 수 있다. 한쪽만 사용하거나, 중복 항목을 끈다.
- **데스크톱 전용** MCP는 Figma 앱에서 Dev Mode의 desktop MCP를 켠 뒤 `http://127.0.0.1:3845/mcp` 등 로컬 URL을 쓰는 방식이다(원격 URL과 택일).

UI 구현 시 SoT는 [05_design-rules.md](./05_design-rules.md) · [04_screen-spec.md](./04_screen-spec.md)와 Figma를 함께 본다.

## 작업 로그 (npm)
```bash
npm run log:work -- "Cursor" "작업 한 줄 요약"
# 선택: 세 번째 인자로 프롬프트 요약
npm run log:work -- "Cursor" "필터 개선" "Explore에 지역 필터 추가"

npm run log:release -- "v0.1.0" "변경 요약 한 줄"

npm run log:adr -- "결정 제목 한 줄"
```

또는 셸에서 직접:
```bash
./scripts/log-work.sh "Cursor" "작업 요약"
./scripts/log-release.sh "v0.1.0" "릴리즈 요약"
./scripts/new-adr.sh "ADR 제목"
```

## Git 훅 (선택)
커밋 전 안내만 출력한다 (`core.hooksPath=.githooks`).

```bash
npm run hooks:install
```

## 디렉터리 (웹 앱)
```
pentacore/
├── web/                      # Next.js 앱 루트
│   ├── app/                  # App Router: layout, page, opengraph-image, icon
│   ├── components/           # 기능·레이아웃·UI 컴포넌트
│   ├── hooks/                # useBreakpoint 등
│   ├── lib/                  # 유틸·디자인 토큰성 상수
│   └── public/               # 정적 에셋 (video/, work/ 등)
├── docs/                     # 본 문서 세트
└── scripts/                  # 로그·ADR 스크립트
```
