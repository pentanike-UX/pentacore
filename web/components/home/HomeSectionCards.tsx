"use client";

import { IntrinsicNaturalImageWithSkeleton } from "@/components/media/ImageWithSkeleton";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PENTACORE_MANIFESTO_PARAGRAPH } from "@/components/home/home-manifesto";
import {
  interactivePressableTransformClassName,
  liquidGlassHomeCard,
  liquidGlassInteractiveHoverLight,
} from "@/lib/figma-liquid-glass";

/** `type=just icon` stroke — rgb(226,232,240) */
const ICON_BTN_BORDER = "#e2e8f0";

/**
 * Figma `HOME_LAYOUT-2` / `section` (node 2003:55933).
 * - 뷰포트 정중앙 그리드: <lg 가로 그리드 셀에 맞춤·높이 136·radius 16 / lg+ 280×254·radius 24
 * - heads↔copy 간격 16px / 40px, 화살표 `absolute` top/right 20px
 * - <lg heads: h5 톤(titleEn)·subtle(titleKo) / copy 12px·black(900)
 * - 내부 패딩: <lg 24px · lg+ 40px (콘텐츠↔프레임)
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
    /** 태블릿 2열에서 `col-span-2`면 4번째만 한 줄로 떨어짐 → 2×2 유지 위해 다른 카드와 동일 */
    gridClassName: "" as const,
  },
] as const;

/** 홈 히어로 — 카드 그리드 상단 키카피 */
const HOME_KEY_COPY = {
  line1: "We design products that work.",
  line2: "Start your project with us.",
} as const;

const cardShellClassName = cn(
  "group relative isolate flex w-full flex-col overflow-hidden text-zinc-900 outline-none",
  "p-6 lg:p-10",
  "max-lg:h-[136px] max-lg:min-h-[136px] max-lg:max-h-[136px] max-lg:rounded-[16px]",
  "lg:h-[254px] lg:min-h-[254px] lg:max-h-[254px] lg:w-[280px] lg:max-w-[280px] lg:shrink-0 lg:rounded-[24px]",
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
          "mx-auto flex min-h-dvh w-full max-w-[1240px] flex-col items-center justify-center",
          "px-6 md:px-10 lg:px-8",
          /* 기존은 pt ≪ pb 라 flex 박스의 수직 중심이 뷰포트보다 위였음 → py 동일값으로 정렬 */
          "py-[calc(11rem+100px+max(env(safe-area-inset-top,0px),env(safe-area-inset-bottom,0px)))]",
          "md:py-[calc(12rem+100px+max(env(safe-area-inset-top,0px),env(safe-area-inset-bottom,0px)))]",
          "lg:py-[calc(13rem+100px+max(env(safe-area-inset-top,0px),env(safe-area-inset-bottom,0px)))]",
        )}
      >
        <div className="flex w-full flex-col items-center gap-12 md:gap-14 lg:gap-16">
          <div
            className="max-w-[min(100%,36rem)] text-center"
            data-figma="HOME_LAYOUT-2 key_copy"
          >
            <p className="font-display text-[clamp(2.625rem,4.8vw,3.75rem)] font-semibold leading-[1.12] tracking-tight text-white text-balance drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
              {HOME_KEY_COPY.line1}
            </p>
            <p className="mt-1 font-display text-[clamp(2.625rem,4.8vw,3.75rem)] font-semibold leading-[1.12] tracking-tight text-white text-balance drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] md:mt-1.5">
              {HOME_KEY_COPY.line2}
            </p>
          </div>

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
                  "max-lg:gap-4 lg:items-center lg:gap-10 lg:text-center",
                )}
              >
                {/* heads: 펜타그램(lg) + 영문 타이틀 + 한글 카피 */}
                <div className="flex min-h-0 shrink-0 flex-col gap-1 lg:items-center lg:gap-1.5">
                  <IntrinsicNaturalImageWithSkeleton
                    src={c.pentagramSrc}
                    alt=""
                    width={c.pentagramW}
                    height={c.pentagramH}
                    sizes="128px"
                    unoptimized
                    className="hidden shrink-0 lg:block"
                    imageClassName="h-7 w-auto max-w-[52px] object-contain brightness-0 lg:h-9 lg:max-w-[64px]"
                  />
                  <h3 className="text-lg font-semibold leading-snug tracking-tight text-zinc-950 lg:text-2xl lg:font-bold lg:leading-none lg:tracking-tight">
                    {c.titleEn}
                  </h3>
                  <p className="line-clamp-2 text-sm font-normal leading-snug text-zinc-500 lg:line-clamp-none lg:text-sm lg:leading-normal lg:text-gray-500">
                    {c.titleKo}
                  </p>
                </div>

                {/* copy: 슬로건 2줄 — heads와 간격 16px(<lg) / 40px(lg+) */}
                <div
                  className={cn(
                    "min-w-0 shrink-0 text-xs font-black uppercase leading-[115%] tracking-tight text-black",
                    "lg:text-xs",
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

          <div
            className="max-w-[min(100%,40rem)] text-center"
            data-figma="HOME_LAYOUT-2 manifesto"
          >
            <p className="text-[14px] font-medium leading-relaxed text-white/90 text-pretty drop-shadow-[0_1px_16px_rgba(0,0,0,0.35)] md:text-[15px] md:leading-relaxed">
              {PENTACORE_MANIFESTO_PARAGRAPH}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
