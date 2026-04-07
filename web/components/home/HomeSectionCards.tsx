"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { liquidGlassHomeCard } from "@/lib/figma-liquid-glass";

/** `type=just icon` stroke — rgb(226,232,240) */
const ICON_BTN_BORDER = "#e2e8f0";

/** 카드 등장 한 사이클 길이 — 다음 카드는 50% 시점에서 시작 */
export const HOME_CARD_ENTRANCE_MS = 600;

/**
 * Figma `HOME_LAYOUT-2` / `section` (node 2003:55933).
 * 카피·심볼 구조는 `sect_work` ~ `sect_inquiry` — View Details 행 제외, 화살표는 우측 상단.
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
    minHClass: "min-h-[254px]" as const,
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
    minHClass: "min-h-[254px]" as const,
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
    minHClass: "min-h-[254px]" as const,
  },
  {
    href: "/inquiry",
    titleEn: "PROJECT INQUIRY",
    titleKo: "서비스 파트너를 찾고 있다면",
    lines: ["Starts with questions.", "Ends with structure."] as const,
    pentagramSrc: "/home/pentagram-inquiry.svg",
    pentagramW: 78,
    pentagramH: 41,
    /** Figma `sect_inquiry`: PAD 2열에서 가로폭 확장 후 PC에서 4열 복귀 */
    gridClassName:
      "w-full max-w-[min(100%,360px)] justify-self-center md:col-span-2 md:max-w-[580px] lg:col-span-1 lg:max-w-none lg:justify-self-stretch" as const,
    minHClass: "min-h-[280px] md:min-h-[254px]" as const,
  },
] as const;

type Props = {
  visible: boolean;
};

export function HomeSectionCards({ visible }: Props) {
  const D = HOME_CARD_ENTRANCE_MS;
  const stagger = D * 0.5;

  return (
    <section
      className="pointer-events-auto fixed inset-0 z-40 flex items-center justify-center px-6 pb-36 pt-24 md:px-10"
      aria-label="주요 섹션"
      data-figma="HOME_LAYOUT-2 section"
    >
      <div className="grid w-full max-w-[1240px] grid-cols-1 justify-items-center gap-10 md:grid-cols-2 lg:grid-cols-4">
        {HOME_LAYOUT_2_CARDS.map((c, i) => (
          <Link
            key={c.href}
            href={c.href}
            aria-label={`${c.titleEn} — ${c.titleKo}`}
            className={cn(
              "group relative isolate flex w-[280px] max-w-full flex-col items-center overflow-hidden rounded-[24px] p-10 text-zinc-900 outline-none",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_10px_40px_rgba(15,23,42,0.12)]",
              "ease-out hover:duration-300",
              "transition-[opacity,transform] duration-[600ms]",
              "hover:scale-105 active:scale-[0.98]",
              "focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0",
              c.minHClass,
              c.gridClassName,
            )}
            style={{
              ...liquidGlassHomeCard,
              transitionDelay: visible ? `${i * stagger}ms` : "0ms",
            }}
            data-figma={`HOME_LAYOUT-2 sect_${c.href.slice(1)}`}
          >
            <span
              className="absolute right-[20px] top-[20px] flex size-11 items-center justify-center rounded-[8.25px] border-[1.375px] bg-white text-black shadow-none transition group-hover:border-zinc-300"
              style={{ borderColor: ICON_BTN_BORDER }}
              aria-hidden
            >
              <ArrowUpRight className="size-[22px]" strokeWidth={2.75} />
            </span>
            <div className="flex w-full flex-col items-center gap-10 text-center">
              <div className="flex flex-col items-center gap-3">
                <Image
                  src={c.pentagramSrc}
                  alt=""
                  width={c.pentagramW}
                  height={c.pentagramH}
                  className="h-[50px] w-auto max-w-[77px] object-contain brightness-0"
                  unoptimized
                />
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold leading-8 tracking-tight text-black">
                    {c.titleEn}
                  </h3>
                  <p className="text-sm font-normal leading-5 text-gray-500">
                    {c.titleKo}
                  </p>
                </div>
              </div>
              <div
                className="text-black not-italic"
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
          </Link>
        ))}
      </div>
    </section>
  );
}
