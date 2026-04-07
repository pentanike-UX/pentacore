"use client";

import { cn } from "@/lib/utils";

type LineProps = { className?: string; widthPct?: number };

function SkeletonLine({ className, widthPct = 100 }: LineProps) {
  return (
    <div
      className={cn(
        "relative h-[1.05em] overflow-hidden rounded-md bg-zinc-200/[0.72] md:h-[1.12em]",
        className,
      )}
      style={{ width: `${widthPct}%` }}
      aria-hidden
    >
      <div
        className="absolute inset-y-0 left-0 w-[200%] animate-skeleton-shimmer bg-gradient-to-r from-transparent via-white/45 to-transparent motion-reduce:animate-none motion-reduce:opacity-70"
        aria-hidden
      />
    </div>
  );
}

/** 본문형 텍스트 블록 자리 — 영문 2줄 + 한글 2줄 느낌 */
export function HeroCopyTextSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4 md:space-y-5", className)} aria-hidden>
      <div className="space-y-3">
        <SkeletonLine widthPct={100} className="h-[1.35rem] md:h-[1.5rem]" />
        <SkeletonLine widthPct={88} className="h-[1.35rem] md:h-[1.5rem]" />
      </div>
      <div className="space-y-2.5 pt-2">
        <SkeletonLine widthPct={96} className="h-[1rem] md:h-[1.05rem]" />
        <SkeletonLine widthPct={92} className="h-[1rem] md:h-[1.05rem]" />
        <SkeletonLine widthPct={64} className="h-[1rem] md:h-[1.05rem]" />
      </div>
    </div>
  );
}

/** 공고 카드 높이 근사 */
export function JobCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[20px] border border-zinc-900/[0.06] bg-zinc-200/35 p-8 md:rounded-[28px] md:p-10",
        className,
      )}
      aria-hidden
    >
      <div className="h-3 w-24 rounded-md bg-zinc-300/80" />
      <div className="mt-4 h-8 max-w-[280px] rounded-md bg-zinc-300/70" />
      <div className="mt-5 flex gap-2">
        <div className="h-7 w-14 rounded-full bg-zinc-300/60" />
        <div className="h-7 w-16 rounded-full bg-zinc-300/60" />
      </div>
      <div className="mt-8 h-4 w-28 rounded-md bg-zinc-300/50 md:ml-auto" />
    </div>
  );
}

/** 프로세스 섹션 제목·부제 자리 */
export function ProcessSectionHeaderSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)} aria-hidden>
      <div className="h-[clamp(1.5rem,4vw,2.25rem)] w-40 max-w-[55%] rounded-lg bg-zinc-200/[0.72]" />
      <div className="h-4 w-full max-w-[42rem] rounded-md bg-zinc-200/60" />
    </div>
  );
}

/** 프로세스 카드 3열 */
export function ProcessCardsSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("grid gap-5 md:grid-cols-3 md:gap-6", className)}
      aria-hidden
    >
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-[20px] border border-zinc-900/[0.06] bg-zinc-200/35 p-8 md:rounded-[28px] md:p-10"
        >
          <div className="mb-5 size-[52px] rounded-[14px] bg-zinc-300/70" />
          <div className="h-3 w-8 rounded bg-zinc-300/60" />
          <div className="mt-3 h-6 w-24 rounded-md bg-zinc-300/65" />
          <div className="mt-3 space-y-2">
            <div className="h-3.5 w-full rounded bg-zinc-300/50" />
            <div className="h-3.5 w-[92%] rounded bg-zinc-300/50" />
          </div>
        </div>
      ))}
    </div>
  );
}
