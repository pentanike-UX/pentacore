# API · 환경 변수

## 베이스 URL
| 환경 | URL | 비고 |
|------|-----|------|
| local | `http://localhost:3000` | `npm run dev` |
| staging | TODO | 배포 확정 후 기입 |
| production | `https://www.pentacore.co.kr` (가정) | `layout.tsx` `metadataBase`와 일치 필요 |

## 인증
- 없음 (공개 마케팅 사이트).

## 환경 변수 목록
| 변수명 | 필수 | 설명 | 예시 (비밀 아님) |
|--------|------|------|------------------|
| `NEXT_PUBLIC_HERO_VIDEO_URL` | 아니오 | 홈 히어로 동영상 절대/경로 URL; 미설정 시 `/video/hero.mp4` | `https://cdn.example.com/hero.mp4` |

## 로컬 `.env`
- `web/` 기준 `.env.local` 사용 가능(Next 관례).
- 저장소에 커밋하지 않는다.
- 팀 공유 방식: TODO

## 주요 엔드포인트 (초안)
| 메서드 | 경로 | 용도 |
|--------|------|------|
| — | — | **백엔드 API 없음** |

외부 링크(참고):
- 회사 개요 PDF 등: `about-assets` / About 페이지에서 사용하는 스토리지 URL.
- 문의: `mailto:info@pentacore.kr` (클라이언트 조합).

## 레이트 리밋 / 에러 코드
- 해당 없음 (정적·클라이언트만).

## SEO·메타
- `metadataBase`, `openGraph`, `twitter` — `web/app/layout.tsx`.
- OG 이미지 URL은 `metadataBase` + 파일 메타데이터로 생성되므로 **프로덕션 도메인**과 불일치 시 미리보기 깨짐 가능.
