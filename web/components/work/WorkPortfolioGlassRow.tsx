"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { liquidGlassPortfolioRow } from "@/lib/figma-liquid-glass";
import type { WorkPortfolioRow } from "./work-portfolio-data";

type Props = {
  row: WorkPortfolioRow;
};

/**
 * Figma `non-function-list` — pill GLASS row, padding 40, 내부 gap 90, corner ~50.
 * 상태: default / hover(확대)·active(축소) 는 variant 크기 비율로 근사.
 */
export function WorkPortfolioGlassRow({ row }: Props) {
  return (
    <Link
      href={row.href}
      scroll={row.href !== "#"}
      className={cn(
        "group isolate flex w-full max-w-[1280px] flex-col gap-4 rounded-[50px] px-6 py-8 outline-none transition-[transform,box-shadow] duration-300 ease-out md:flex-row md:items-center md:gap-[90px] md:px-10 md:py-10",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_28px_rgba(15,23,42,0.08)]",
        "hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_12px_40px_rgba(15,23,42,0.12)]",
        "active:scale-[0.985]",
        "focus-visible:ring-2 focus-visible:ring-zinc-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(229,231,235)]",
      )}
      style={liquidGlassPortfolioRow}
      data-figma="non-function-list"
    >
      {/* group_logo: LOGOS×3 — Dev 너비 근사, 실제 에셋 미수급 시 플레이스홀더 */}
      <div
        className="hidden shrink-0 items-center gap-[10px] md:flex"
        style={{ width: 280 }}
        aria-hidden
      >
        <div className="h-[30px] w-[39px] rounded-sm bg-zinc-900/8" />
        <div className="h-[30px] w-[81px] rounded-sm bg-zinc-900/8" />
        <div className="h-[30px] w-[48px] rounded-sm bg-zinc-900/8" />
      </div>
      <p className="min-w-0 flex-1 text-left text-[18px] font-semibold leading-snug tracking-tight text-zinc-950">
        {row.title}
      </p>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <span className="inline-flex h-7 min-w-[56px] items-center justify-center rounded-lg bg-zinc-950 px-2.5 text-base font-normal text-white">
          {row.period}
        </span>
        {row.tags.map((t) => (
          <span
            key={`${row.title}-${t}`}
            className="inline-flex h-7 items-center justify-center rounded-lg bg-zinc-950 px-2.5 text-base font-normal text-white"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
