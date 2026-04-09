import { cn } from "@/lib/utils";

const LINE = "border-[rgba(255,255,255,0.42)]";

/** 모바일 4 · 태블릿(md~) 8 · 데스크톱(lg~) 12 — `useBreakpoint`와 동일 계단(768 / 1024) */
function ColStrip({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={cn(
            "h-full min-h-0 min-w-0 flex-1 border-r border-solid",
            LINE,
            i === 0 && "border-l",
          )}
        />
      ))}
    </>
  );
}

/**
 * 반응형 컬럼 세로 가이드 — 부모에 `relative` + `absolute inset-0` 전제.
 * 스크롤 시 문서 높이만큼 이어짐. 열은 flex 균등 분배로 그라데이션 % 반올림 이슈 완화.
 */
export function SubPageViewportGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none flex h-full min-h-full w-full justify-center",
        className,
      )}
      aria-hidden
      data-figma="SUB_WORK grid viewport (4 / 8 / 12)"
    >
      <div className="pointer-events-none relative h-full min-h-full w-full max-w-[1280px]">
        {/* < md: 4 columns */}
        <div className="absolute inset-0 flex md:hidden">
          <ColStrip count={4} />
        </div>
        {/* md–lg: 8 columns */}
        <div className="absolute inset-0 hidden md:flex lg:hidden">
          <ColStrip count={8} />
        </div>
        {/* lg+: 12 columns */}
        <div className="absolute inset-0 hidden lg:flex">
          <ColStrip count={12} />
        </div>
      </div>
    </div>
  );
}
