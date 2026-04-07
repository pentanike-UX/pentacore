"use client";

import { cn } from "@/lib/utils";

const GUTTER = "px-6 md:px-10 lg:px-0";

type Props = {
  /** 예: (HIRING) */
  label: string;
  line1: string;
  line2: string;
  bodyEn: string;
  bodyKo: string;
  className?: string;
};

/**
 * SUB_WORK `HERO`와 동일 톤·타이포 스케일(assumption: Figma 미동기화 시에도 WORK와 정렬).
 */
export function SubWorkStyleHero({
  label,
  line1,
  line2,
  bodyEn,
  bodyKo,
  className,
}: Props) {
  return (
    <section
      className={cn(
        "relative pb-10 pt-[92px] md:pb-14 md:pt-[124px]",
        GUTTER,
        className,
      )}
      data-figma="SUB_WORK HERO pattern"
    >
      <div className="w-full">
        <div className="flex flex-col gap-0 uppercase">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:gap-[min(6rem,5.04vw)] lg:gap-[96.8px]">
            <p className="shrink-0 text-[19.2px] font-semibold leading-none tracking-tight text-zinc-950">
              {label}
            </p>
            <h1 className="font-display text-[clamp(2.25rem,11vw,8rem)] font-black leading-[0.95] tracking-tight text-zinc-950">
              {line1}
            </h1>
          </div>
          <p className="mt-2 font-display text-[clamp(2.25rem,11vw,8rem)] font-black leading-[0.95] tracking-tight text-zinc-950 md:mt-0">
            {line2}
          </p>
        </div>
      </div>

      <div
        className="relative left-1/2 mt-[120px] w-screen max-w-[100vw] -translate-x-1/2 pl-[50vw] pr-6 md:mt-[160px] md:pr-10 lg:mt-[200px]"
        data-figma="SUB_WORK txt pattern"
      >
        <div className="max-w-[min(640px,calc(50vw-1.5rem))] md:max-w-[min(640px,calc(50vw-2.5rem))]">
          <h3 className="whitespace-pre-line text-2xl font-semibold tracking-tight text-zinc-950 md:hidden">
            {bodyEn}
          </h3>
          <h2 className="hidden whitespace-pre-line text-3xl font-semibold tracking-tight text-zinc-950 md:block">
            {bodyEn}
          </h2>
          <p className="mt-4 whitespace-pre-line text-base font-normal leading-relaxed text-zinc-800 md:hidden">
            {bodyKo}
          </p>
          <p className="mt-6 hidden whitespace-pre-line text-lg font-normal leading-relaxed text-zinc-600 md:block">
            {bodyKo}
          </p>
        </div>
      </div>
    </section>
  );
}
