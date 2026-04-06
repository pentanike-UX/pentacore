---
name: figma-eseo-implement
description: >-
  Pentacore에서 Figma 디자인을 프로덕션 코드로 구현한다. Use when the user invokes
  /Figma에서, says "Figma에서", "피그마에서 코드", implements UI from a Figma file or URL,
  or asks to match Figma frames/components in this repo. Canvas writes in Figma require
  figma-use before use_figma.
---

# Figma에서 → 코드 구현 (Pentacore)

사용자가 **`/Figma에서`**로 호출했거나, Figma를 기준으로 이 저장소에 UI를 구현하라고 했을 때 이 스킬을 따른다.

## 0. Pentacore 소스 오브 트루스 (선행)

구현에 들어가기 **전에** 다음을 읽고 스펙·토큰·네이밍을 맞춘다.

- `docs/04_screen-spec.md`
- `docs/05_design-rules.md`

디자인이 불명확하면 추정으로 채우지 말고 **TODO** 또는 **assumption**으로 남긴다. 모바일/데스크톱 브레이크포인트와 **loading / empty / error / disabled** 상태를 빠뜨리지 않는다.

## 1. 범위

- **이 스킬의 결과물**: 이 리포지토리 안의 앱 코드(컴포넌트·스타일·에셋 연동).
- Figma 캔버스를 **수정**해야 하면 Cursor Figma 플러그인의 **figma-use** 스킬을 먼저 읽고 `use_figma`를 쓴다. (코드만 구현할 때는 보통 불필요.)

## 2. Figma MCP 워크플로 (순서 고정)

Figma MCP 서버(`plugin-figma-figma`)가 연결되어 있어야 한다. 도구 스키마는 호출 전에 확인한다.

1. **노드 식별**  
   - URL이 있으면 `fileKey`, `node-id`(노드 ID)를 파싱한다.  
   - 데스크톱 MCP만 쓰는 환경에서는 선택 노드 규칙이 있을 수 있으니, 해당 서버 문서를 따른다.
2. **`get_design_context`** — 레이아웃, 타이포, 색, 컴포넌트 구조. 응답이 크면 **`get_metadata`**로 트리를 보고 자식 노드만 다시 가져온다.
3. **`get_screenshot`** — 시각 기준(1:1 대조용)으로 유지한다.
4. **에셋** — MCP가 준 이미지/SVG 소스를 사용한다. 불필요한 아이콘 패키지 추가나, 로컬호스트로 제공된 에셋을 임의로 placeholder로 바꾸지 않는다.

## 3. 코드로 옮길 때

- MCP가 내놓은 코드(예: React+Tailwind)는 **디자인 표현**으로만 보고, 이 프로젝트의 프레임워크·스타일·컴포넌트 규칙에 맞게 재작성한다.
- 기존 버튼·입력·타이포·레이아웃 프리미티브를 **재사용**한다.
- 구현 후 Figma·스펙과의 차이를 짧게 bullet로 정리할 수 있으면 사용자에게 알린다.

## 4. 보조

세부 단계·품질 체크는 Cursor에 설치된 **figma-implement-design** 스킬과 같은 원칙을 적용해도 된다. 충돌 시 **이 스킬의 Pentacore `docs/` 및 프로젝트 규칙**이 우선한다.
