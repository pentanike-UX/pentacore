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

/** 화살표 영역: right 20px + 버튼 폭 + 여유 → heads/copy가 우측으로 밀리지 않도록 */
const CONTENT_PAD_RIGHT_MOBILE = "pr-[52px]"; /* 20 + 32(size-8) */
const CONTENT_PAD_RIGHT_DESKTOP = "lg:pr-[56px]"; /* 20 + 36(size-9) */

/**
 * Figma `HOME_LAYOUT-2` / `section` (node 2003:55933).
 * - 뷰포트 정중앙 그리드, 카드 max-h 136(<lg) / 254(lg+)
 * - heads↔copy 간격 16px / 40px, 화살표 `absolute` top/right 20px (카드 프레임 기준)
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

const cardShellClassName = cn(
  "group relative isolate flex w-full min-h-0 flex-col overflow-hidden text-zinc-900 outline-none",
  "max-h-[136px] max-lg:max-w-[min(100%,380px)] lg:max-h-[254px]",
  "rounded-[36px] max-lg:pl-4 max-lg:pr-4 max-lg:pt-3 max-lg:pb-3 lg:rounded-[24px] lg:w-[280px] lg:max-w-full lg:px-6 lg:py-5",
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
              {/* 카드 프레임(Link padding box) 기준 absolute — top 20px, right 20px */}
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
                  "flex min-h-0 w-full flex-1 flex-col overflow-hidden text-left",
                  CONTENT_PAD_RIGHT_MOBILE,
                  CONTENT_PAD_RIGHT_DESKTOP,
                  "max-lg:gap-4 lg:items-center lg:gap-10 lg:text-center",
                )}
              >
                {/* heads: 펜타그램(lg) + 영문 타이틀 + 한글 카피 */}
                <div className="flex min-h-0 shrink-0 flex-col gap-1 lg:items-center lg:gap-1.5">
                  <Image
                    src={c.pentagramSrc}
                    alt=""
                    width={c.pentagramW}
                    height={c.pentagramH}
                    className="hidden h-7 w-auto max-w-[52px] shrink-0 object-contain brightness-0 lg:block lg:h-9 lg:max-w-[64px]"
                    unoptimized
                  />
                  <h3 className="text-[15px] font-bold leading-tight tracking-tight text-black lg:text-2xl lg:font-bold lg:leading-none lg:tracking-tight">
                    {c.titleEn}
                  </h3>
                  <p className="line-clamp-2 text-[11px] font-normal leading-snug text-gray-500 lg:line-clamp-none lg:text-sm lg:leading-normal">
                    {c.titleKo}
                  </p>
                </div>

                {/* copy: 슬로건 2줄 — heads와 간격 16px(<lg) / 40px(lg+) */}
                <div
                  className={cn(
                    "min-w-0 shrink-0 font-black uppercase leading-[115%] tracking-tight text-black",
                    "text-[8px] lg:text-xs",
                    "max-lg:text-left lg:text-center",
                  )}
                >
                  <p className="max-lg:line-clamp-1 lg:whitespace-normal">
                    {c.lines[0]}
                  </p>
                  <p className="max-lg:line-clamp-1 lg:whitespace-normal">
                    {c.lines[1]}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
