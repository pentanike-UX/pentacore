# 기술 셋업

## 현재 상태
- **프레임워크**: TODO (미선정)
- **패키지 매니저**: npm (`package-lock.json` 존재; 루트에 최소 `package.json`으로 스크립트만 연동 가능)
- **런타임**: TODO (Node 버전 등)
- **배포**: TODO

## 로컬 실행
```bash
# TODO: 프레임워크 확정 후 채우기
# 예: npm install && npm run dev
```

## 권장 Node 버전
<!-- TODO: 예: 20 LTS -->

## 환경 변수
자세한 키 목록은 [07_api-env.md](./07_api-env.md).

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

## 디렉터리 (예정)
<!-- TODO: app/ 또는 src/ 구조 확정 후 업데이트 -->
