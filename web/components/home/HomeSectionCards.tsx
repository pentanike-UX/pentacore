"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CircleArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <div className="grid w-full max-w-[1240px] grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {HOME_LAYOUT_2_CARDS.map((c, i) => (
          <Link
            key={c.href}
            href={c.href}
            className={cn(
              "group mx-auto flex h-[254px] w-full max-w-[280px] flex-row items-start justify-between text-white outline-none transition-[opacity,transform] duration-500 ease-out-quart focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black lg:mx-0",
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0",
            )}
            style={{
              transitionDelay: visible ? `${i * 200}ms` : "0ms",
            }}
            data-figma={`HOME_LAYOUT-2 sect_${c.href.slice(1)}`}
          >
            <div className="flex min-w-0 flex-1 flex-col pr-2">
              <div className="flex flex-col gap-3">
                <div className="flex h-[110px] flex-col justify-start gap-3">
                  <Image
                    src={c.pentagramSrc}
                    alt=""
                    width={c.pentagramW}
                    height={c.pentagramH}
                    className="h-[50px] w-auto max-w-[77px] object-contain object-left"
                    unoptimized
                  />
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold leading-8 tracking-tight text-white">
                      {c.titleEn}
                    </h3>
                    <p className="text-sm font-normal leading-5 text-white">
                      {c.titleKo}
                    </p>
                  </div>
                </div>
                <div className="space-y-0 text-[12px] font-normal leading-[12px] text-white">
                  <p>{c.lines[0]}</p>
                  <p>{c.lines[1]}</p>
                </div>
              </div>
              <span className="mt-3 inline-flex h-10 w-[137px] max-w-full items-center gap-2 text-sm font-normal leading-6 text-white">
                View Details
                <CircleArrowRight
                  className="size-4 shrink-0 text-white"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </span>
            </div>
            <span
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-transparent text-white transition group-hover:border-white/50"
              aria-hidden
            >
              <ArrowUpRight className="size-[22px]" strokeWidth={1.5} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
