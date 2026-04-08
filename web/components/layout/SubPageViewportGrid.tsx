import { cn } from "@/lib/utils";

/** 라이트 그레이 위에서도 보이도록 흰색 계열(요청: white) */
const WHITE_LINE = "rgba(255, 255, 255, 0.42)";

/**
 * 12컬 세로 가이드 — 부모에 `relative` + `absolute inset-0`로 두는 전제(뷰포트 고정 아님).
 * 스크롤 시 문서 높이만큼 그리드가 이어짐.
 * 왼쪽 시작선 1px + 열 경계 11개 + 오른쪽 끝선(반복 패턴) = 13개 선 → 12칸 구간이 한 덩어리로 읽힘.
 */
export function SubPageViewportGrid({ className }: { className?: string }) {
  const stripe = `repeating-linear-gradient(
            to right,
            transparent 0,
            transparent calc(100% / 12 - 1px),
            ${WHITE_LINE} calc(100% / 12 - 1px),
            ${WHITE_LINE} calc(100% / 12)
          )`;
  return (
    <div
      className={cn(
        "pointer-events-none flex h-full min-h-full w-full justify-center",
        className,
      )}
      aria-hidden
      data-figma="SUB_WORK grid12 viewport"
    >
      <div
        className="h-full min-h-full w-full max-w-[1280px] border-solid"
        style={{
          borderLeftWidth: 1,
          borderLeftColor: WHITE_LINE,
          backgroundImage: stripe,
        }}
      />
    </div>
  );
}
