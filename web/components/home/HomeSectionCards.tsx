"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CircleArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { liquidGlassHomeCard } from "@/lib/figma-liquid-glass";

/** `type=with icon` 버튼 fill — rgb(15,23,42) */
const VIEW_DETAILS_BG = "#0f172a";
/** `type=just icon` stroke — rgb(226,232,240) */
const ICON_BTN_BORDER = "#e2e8f0";

/**
 * Figma `HOME_LAYOUT-2` / `section` (node 2003:55933).
 * 카피·심볼·버튼 구조는 `sect_work` ~ `sect_inquiry` 트리와 동일.
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
  },
  {
    href: "/about",
    titleEn: "ABOUT",
    titleKo: "펜타코어가 일하는 방식",
    lines: ["Designs the core.", "Shapes what works."] as const,
    pentagramSrc: "/home/pentagram-about.svg",
    pentagramW: 58,
    pentagramH: 50,
  },
  {
    href: "/hiring",
    titleEn: "HIRING",
    titleKo: "경험과 경험의 시너지",
    lines: ["Thinks in systems.", "Acts with ownership."] as const,
    pentagramSrc: "/home/pentagram-hiring.svg",
    pentagramW: 59,
    pentagramH: 55,
  },
  {
    href: "/inquiry",
    titleEn: "PROJECT INQUIRY",
    titleKo: "서비스 파트너를 찾고 있다면",
    lines: ["Starts with questions.", "Ends with structure."] as const,
    pentagramSrc: "/home/pentagram-inquiry.svg",
    pentagramW: 78,
    pentagramH: 41,
  },
] as const;

type Props = {
  visible: boolean;
};

export function HomeSectionCards({ visible }: Props) {
  return (
    <section
      className="pointer-events-auto fixed inset-0 z-40 flex items-center justify-center px-6 pb-36 pt-24 md:px-10"
      aria-label="주요 섹션"
      data-figma="HOME_LAYOUT-2 section"
    >
      {/* 1240×254 기준: 280×4 + 40×3 gap (Figma section 프레임) */}
      <div className="grid w-full max-w-[1240px] grid-cols-1 justify-items-center gap-10 md:grid-cols-2 lg:grid-cols-4">
        {HOME_LAYOUT_2_CARDS.map((c, i) => (
          <Link
            key={c.href}
            href={c.href}
            aria-label={`${c.titleEn} — ${c.titleKo}`}
            className={cn(
              "group isolate flex min-h-[254px] w-[280px] max-w-full flex-col items-center gap-[10px] overflow-hidden rounded-[24px] p-10 text-zinc-900 outline-none transition-[opacity,transform,box-shadow] duration-500 ease-out-quart",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_10px_40px_rgba(15,23,42,0.12)]",
              "focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0",
            )}
            style={{
              ...liquidGlassHomeCard,
              transitionDelay: visible ? `${i * 200}ms` : "0ms",
            }}
            data-figma={`HOME_LAYOUT-2 sect_${c.href.slice(1)}`}
          >
            {/*
              Figma sect_*: VERTICAL itemSpacing 10 — Frame 6(heads·copy·View Details, gap 40) + icon button
              카피 색: 제목/영문 #000, 한글 부제 rgb(107,114,128)
            */}
            <div className="flex w-full max-w-[200px] flex-col gap-10">
              <div className="flex flex-col gap-3">
                <Image
                  src={c.pentagramSrc}
                  alt=""
                  width={c.pentagramW}
                  height={c.pentagramH}
                  className="h-[50px] w-auto max-w-[77px] object-contain object-left brightness-0"
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
              <div className="text-[12px] font-normal leading-3 text-black">
                <p>{c.lines[0]}</p>
                <p>{c.lines[1]}</p>
              </div>
              <span
                className="inline-flex h-10 w-[137px] max-w-full shrink-0 items-center gap-2 rounded-md px-4 py-2 text-sm font-medium leading-6 text-white [&_svg]:text-white"
                style={{ backgroundColor: VIEW_DETAILS_BG }}
              >
                View Details
                <CircleArrowRight
                  className="size-4 shrink-0"
                  strokeWidth={2}
                  aria-hidden
                />
              </span>
            </div>
            <span
              className="flex size-11 shrink-0 items-center justify-center rounded-[8.25px] border-[1.375px] bg-white text-black shadow-none transition group-hover:border-zinc-300"
              style={{ borderColor: ICON_BTN_BORDER }}
              aria-hidden
            >
              <ArrowUpRight className="size-[22px]" strokeWidth={2.75} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
