"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { liquidGlassPortfolioRow } from "@/lib/figma-liquid-glass";
import { FigmaLogos } from "./FigmaLogos";
import type { WorkPortfolioRow } from "./work-portfolio-data";

type Props = {
  row: WorkPortfolioRow;
};

/**
 * Figma `non-function-list` — pill GLASS, 좌측 `LOGOS`×3 (280px 트랙).
 */
export function WorkPortfolioGlassRow({ row }: Props) {
  return (
    <Link
      href={row.href}
      scroll={row.href !== "#"}
      className={cn(
        "group isolate flex w-full max-w-[1280px] flex-col items-stretch gap-6 rounded-[50px] px-6 py-8 outline-none transition-[transform,box-shadow] duration-300 ease-out md:flex-row md:items-center md:gap-[90px] md:px-10 md:py-10",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_28px_rgba(15,23,42,0.08)]",
        "hover:scale-[1.02] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_12px_40px_rgba(15,23,42,0.12)]",
        "active:scale-[0.985]",
        "focus-visible:ring-2 focus-visible:ring-zinc-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(229,231,235)]",
      )}
      style={liquidGlassPortfolioRow}
      data-figma="non-function-list"
    >
      <div className="flex w-full shrink-0 items-center justify-center gap-[10px] md:w-[280px] md:justify-start">
        {row.logos.map((v) => (
          <FigmaLogos key={`${row.title}-${v}`} variant={v} />
        ))}
      </div>
      <p className="w-full min-w-0 flex-1 text-center text-[18px] font-semibold leading-snug tracking-tight text-zinc-950 md:text-left">
        {row.title}
      </p>
      <div className="flex w-full shrink-0 flex-wrap items-center justify-center gap-2 md:w-[280px] md:justify-end">
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
