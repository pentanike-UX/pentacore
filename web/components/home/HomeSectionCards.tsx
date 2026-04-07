"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  interactivePressableTransformClassName,
  liquidGlassHomeCard,
  liquidGlassInteractiveHoverLight,
} from "@/lib/figma-liquid-glass";

/** `type=just icon` stroke — rgb(226,232,240) */
const ICON_BTN_BORDER = "#e2e8f0";

/**
 * Figma `HOME_LAYOUT-2` / `section` (node 2003:55933).
 * - 높이: 모바일·태블릿 max 136px / 데스크톱 max 254px
 * - 카드 그리드는 뷰포트 기준 정중앙, 화살표는 카드 프레임 기준 top/right 20px
 */
export const HOME_LAYOUT_2_CARDS = [
  {
    href: "/work",
    titleEn: "WORK",
    titleKo: "파트너와 함께 만든 결과들",
    lines: ["Builds with intent.", "Runs in reality."] as const,
    pentagramSrc: "/home/pentagram-work.svg",
    pentagramW: 56,
    pentagramH: 43,
    gridClassName: "" as const,
  },
  {
    href: "/about",
    titleEn: "ABOUT",
    titleKo: "펜타코어가 일하는 방식",
    lines: ["Designs the core.", "Shapes what works."] as const,
    pentagramSrc: "/home/pentagram-about.svg",
    pentagramW: 58,
    pentagramH: 50,
    gridClassName: "" as const,
  },
  {
    href: "/hiring",
    titleEn: "HIRING",
    titleKo: "경험과 경험의 시너지",
    lines: ["Thinks in systems.", "Acts with ownership."] as const,
    pentagramSrc: "/home/pentagram-hiring.svg",
    pentagramW: 59,
    pentagramH: 55,
    gridClassName: "" as const,
  },
  {
    href: "/inquiry",
    titleEn: "PROJECT INQUIRY",
    titleKo: "서비스 파트너를 찾고 있다면",
    lines: ["Starts with questions.", "Ends with structure."] as const,
    pentagramSrc: "/home/pentagram-inquiry.svg",
    pentagramW: 78,
    pentagramH: 41,
    gridClassName:
      "w-full md:col-span-2 md:max-w-[580px] md:justify-self-center lg:col-span-1 lg:w-[280px] lg:max-w-full lg:justify-self-center" as const,
  },
] as const;

/** 카드 셸 공통 — max 높이 + 공통 버튼과 동일 hover/active 스케일 */
const cardShellClassName = cn(
  "group relative isolate flex w-full min-h-0 flex-col overflow-hidden text-zinc-900 outline-none",
  "max-h-[136px] max-lg:max-w-[min(100%,380px)] lg:max-h-[254px]",
  "rounded-[36px] max-lg:px-4 max-lg:py-3 lg:rounded-[24px] lg:w-[280px] lg:max-w-full lg:px-6 lg:py-5",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_10px_40px_rgba(15,23,42,0.12)]",
  "transition-[backdrop-filter,box-shadow,transform] duration-300 ease-out",
  interactivePressableTransformClassName,
  liquidGlassInteractiveHoverLight,
  "focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
);

export function HomeSectionCards() {
  return (
    <section
      className={cn(
        "pointer-events-auto fixed inset-0 z-[35] overflow-y-auto overscroll-y-contain",
        "scroll-pt-[100px] scroll-pb-[100px]",
      )}
      aria-label="주요 섹션"
      data-figma="HOME_LAYOUT-2 section"
    >
      <div
        className={cn(
          "mx-auto flex min-h-[calc(100dvh-1px)] w-full max-w-[1240px] flex-col items-center justify-center",
          "px-6 pb-[calc(11rem+100px+env(safe-area-inset-bottom,0px))] pt-[calc(5.5rem+env(safe-area-inset-top,0px))]",
          "md:px-10 md:pb-[calc(12rem+100px+env(safe-area-inset-bottom,0px))] md:pt-[calc(6.25rem+env(safe-area-inset-top,0px))]",
          "lg:px-8 lg:pb-[calc(13rem+100px+env(safe-area-inset-bottom,0px))] lg:pt-[calc(7.5rem+env(safe-area-inset-top,0px))]",
        )}
      >
        <div className="grid w-full grid-cols-1 justify-items-center gap-7 md:grid-cols-2 md:gap-9 lg:grid-cols-4 lg:gap-10">
          {HOME_LAYOUT_2_CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              aria-label={`${c.titleEn} — ${c.titleKo}`}
              className={cn(cardShellClassName, c.gridClassName)}
              style={liquidGlassHomeCard}
              data-figma={`HOME_LAYOUT-2 sect_${c.href.slice(1)}`}
            >
              {/* 카드 프레임(Link) 기준 절대좌표 — top/right 20px */}
              <span
                className="absolute right-[20px] top-[20px] z-[2] flex size-8 items-center justify-center rounded-lg border-[1.375px] bg-white text-black shadow-none transition-colors duration-300 ease-out group-hover:border-slate-300 lg:size-9 lg:rounded-[8.25px]"
                style={{ borderColor: ICON_BTN_BORDER }}
                aria-hidden
              >
                <ArrowUpRight
                  className="size-[18px] lg:size-[20px]"
                  strokeWidth={2.75}
                />
              </span>
              <div
                className={cn(
                  "flex min-h-0 w-full flex-1 flex-col overflow-hidden pr-11 max-lg:pr-10 lg:pr-9",
                  "max-lg:text-left",
                  "lg:items-center lg:text-center",
                )}
              >
                <div className="flex min-h-0 flex-1 flex-col gap-0.5 lg:items-center lg:gap-1.5">
                  <Image
                    src={c.pentagramSrc}
                    alt=""
                    width={c.pentagramW}
                    height={c.pentagramH}
                    className="hidden h-[26px] w-auto max-w-[48px] shrink-0 object-contain brightness-0 lg:block lg:h-[34px] lg:max-w-[60px]"
                    unoptimized
                  />
                  <div className="min-w-0 max-lg:space-y-0 lg:space-y-0.5">
                    <h3 className="text-sm font-bold leading-tight tracking-tight text-black lg:text-lg lg:leading-snug">
                      {c.titleEn}
                    </h3>
                    <p className="line-clamp-2 text-[10px] font-normal leading-tight text-gray-500 lg:line-clamp-none lg:text-xs lg:leading-snug">
                      {c.titleKo}
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    "mt-auto shrink-0 font-black uppercase leading-[110%] tracking-tight text-black",
                    "max-lg:pt-1 max-lg:text-left max-lg:text-[7px]",
                    "lg:mt-1 lg:text-center lg:text-[10px]",
                  )}
                >
                  <p className="max-lg:truncate">{c.lines[0]}</p>
                  <p className="max-lg:truncate">{c.lines[1]}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
