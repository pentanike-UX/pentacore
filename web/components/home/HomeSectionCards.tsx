"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  interactivePressableTransformGroupClassName,
  liquidGlassHomeCard,
  liquidGlassInteractiveHoverLight,
} from "@/lib/figma-liquid-glass";

/** `type=just icon` stroke — rgb(226,232,240) */
const ICON_BTN_BORDER = "#e2e8f0";

/**
 * Figma `HOME_LAYOUT-2` / `section` (node 2003:55933).
 * - lg+: 4열, 펜타그램·카피 중앙 정렬 (기존 데스크톱).
 * - md~lg: 2열, 첨부 PAD — 좌측 정렬·펜타그램 숨김·태그라인 하단.
 * - 모바일: 1열 동일 내부 배치.
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
    minHClass: "min-h-[220px] md:min-h-[248px] lg:min-h-[254px]" as const,
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
    minHClass: "min-h-[220px] md:min-h-[248px] lg:min-h-[254px]" as const,
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
    minHClass: "min-h-[220px] md:min-h-[248px] lg:min-h-[254px]" as const,
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
    minHClass: "min-h-[240px] md:min-h-[260px] lg:min-h-[254px]" as const,
  },
] as const;

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
      {/* 헤더·푸터(z-100) 아래에서 스크롤; 하단은 푸터 회피 + 100px 이상 추가 여유 */}
      <div
        className={cn(
          "mx-auto flex min-h-[calc(100dvh-1px)] w-full max-w-[1240px] flex-col",
          "px-6 pb-[calc(11rem+100px+env(safe-area-inset-bottom,0px))] pt-[calc(5.5rem+env(safe-area-inset-top,0px))]",
          "md:px-10 md:pb-[calc(12rem+100px+env(safe-area-inset-bottom,0px))] md:pt-[calc(6.25rem+env(safe-area-inset-top,0px))]",
          "lg:justify-center lg:px-8 lg:pb-[calc(13rem+100px+env(safe-area-inset-bottom,0px))] lg:pt-[calc(7.5rem+env(safe-area-inset-top,0px))]",
        )}
      >
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:justify-items-center lg:gap-10">
          {HOME_LAYOUT_2_CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              aria-label={`${c.titleEn} — ${c.titleKo}`}
              className={cn(
                "group relative isolate flex w-full max-w-full flex-col overflow-hidden rounded-[24px] p-8 text-zinc-900 outline-none md:p-9 lg:w-[280px] lg:max-w-full lg:p-10",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_10px_40px_rgba(15,23,42,0.12)]",
                "transition-[backdrop-filter,box-shadow] duration-300 ease-out",
                liquidGlassInteractiveHoverLight,
                "focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                c.minHClass,
                c.gridClassName,
              )}
              style={liquidGlassHomeCard}
              data-figma={`HOME_LAYOUT-2 sect_${c.href.slice(1)}`}
            >
              <div
                className={cn(
                  "relative flex min-h-0 w-full flex-1 flex-col",
                  interactivePressableTransformGroupClassName,
                )}
              >
                <span
                  className="absolute right-4 top-4 z-[1] flex size-10 items-center justify-center rounded-[8px] border-[1.375px] bg-white text-black shadow-none transition-colors duration-300 ease-out group-hover:border-zinc-300 md:right-5 md:top-5 md:size-11 md:rounded-[8.25px] lg:right-5 lg:top-5"
                  style={{ borderColor: ICON_BTN_BORDER }}
                  aria-hidden
                >
                  <ArrowUpRight
                    className="size-[20px] md:size-[22px]"
                    strokeWidth={2.75}
                  />
                </span>
                <div
                  className={cn(
                    "flex min-h-0 w-full flex-1 flex-col gap-6 pr-11 text-left md:gap-8 md:pr-12",
                    "lg:items-center lg:gap-10 lg:pr-0 lg:text-center",
                  )}
                >
                  <div className="flex flex-col gap-3 lg:items-center">
                    <Image
                      src={c.pentagramSrc}
                      alt=""
                      width={c.pentagramW}
                      height={c.pentagramH}
                      className="hidden h-[50px] w-auto max-w-[77px] object-contain brightness-0 lg:block"
                      unoptimized
                    />
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl md:leading-8 lg:text-2xl">
                        {c.titleEn}
                      </h3>
                      <p className="text-sm font-normal leading-5 text-gray-500">
                        {c.titleKo}
                      </p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "mt-auto uppercase text-black not-italic",
                      "text-left lg:mt-0 lg:text-center",
                    )}
                    style={{
                      fontSize: "12px",
                      fontWeight: 900,
                      lineHeight: "100%",
                      letterSpacing: "-0.24px",
                    }}
                  >
                    <p>{c.lines[0]}</p>
                    <p>{c.lines[1]}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
