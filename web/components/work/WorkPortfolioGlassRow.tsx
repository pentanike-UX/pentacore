"use client";

import { Toast } from "@base-ui/react/toast";
import { cn } from "@/lib/utils";
import {
  liquidGlassPortfolioRow,
  workPortfolioRowInteractionClassName,
} from "@/lib/figma-liquid-glass";
import { FigmaLogos } from "./FigmaLogos";
import type { WorkPortfolioRow } from "./work-portfolio-data";

type Props = {
  row: WorkPortfolioRow;
  /** 첫 번째 카드만 Hyundai·Genesis·Kia 3로고 */
  tripleLogos: boolean;
};

/**
 * Figma `non-function-list` — pill GLASS, 클릭 시 토스트만 (서브 이동 없음).
 */
export function WorkPortfolioGlassRow({ row, tripleLogos }: Props) {
  const { add } = Toast.useToastManager();
  const logoVariants = tripleLogos ? row.logos : [row.logos[0]!];

  return (
    <button
      type="button"
      aria-label={row.title}
      onClick={() => add({ title: "준비 중입니다." })}
      className={cn(
        "group isolate flex w-full flex-col items-start rounded-[50px] px-6 py-8 text-left outline-none md:flex-row md:items-center md:justify-between md:px-10 md:py-10",
        workPortfolioRowInteractionClassName,
        "focus-visible:ring-2 focus-visible:ring-zinc-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(229,231,235)]",
      )}
      style={liquidGlassPortfolioRow}
      data-figma="non-function-list"
    >
      <div
        className={cn(
          "flex w-full shrink-0 items-center justify-start md:w-[280px]",
          tripleLogos && "gap-[10px]",
        )}
      >
        {logoVariants.map((v) => (
          <FigmaLogos key={`${row.title}-${v}`} variant={v} />
        ))}
      </div>
      <p className="w-full min-w-0 flex-1 text-left text-[18px] font-semibold leading-snug tracking-tight text-zinc-950 md:text-center">
        {row.title}
      </p>
      <div className="flex w-full shrink-0 flex-wrap items-center justify-start md:w-[280px] md:justify-center lg:justify-end [&>span+span]:ml-2">
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
    </button>
  );
}
