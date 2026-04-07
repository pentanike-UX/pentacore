"use client";

import Image from "next/image";
import Link from "next/link";
import { Toast } from "@base-ui/react/toast";
import { HeaderBar } from "@/components/home/HeaderBar";
import {
  interactivePressableTransformGroupClassName,
  liquidGlassImgSubHoverClassName,
  SUB_WORK_PAGE_BG,
} from "@/lib/figma-liquid-glass";
import { cn } from "@/lib/utils";
import { ParallaxLayer, ParallaxViewport } from "./Parallax";
import { WORK_DETAIL_SLUG } from "./work-assets";
import { FigmaLogos } from "./FigmaLogos";
import { SubWorkGridBg } from "./SubWorkGridBg";
import { WorkPortfolioGlassRow } from "./WorkPortfolioGlassRow";
import { WORK_PORTFOLIO_ROWS } from "./work-portfolio-data";
import { WorkToastStack } from "./WorkToastStack";

/** 첨부 Figma — 플로팅 카드 상단 카피·뱃지 (내비 업데이트 대표 케이스) */
const FEATURED_PORTFOLIO_CARD = {
  title:
    "현대자동차 그룹 내비게이션 업데이트 공식 홈페이지",
  period: "2022~2024",
  tags: ["구축", "연간운영"],
} as const;

/** 모바일 24px / 태블릿 40px / 데스크톱 가터 없이 max-width 블록만 중앙 */
const WORK_GUTTER = "px-6 md:px-10 lg:px-0";

function PortfolioCardViewInner() {
  return (
    <Link
      href={`/works/${WORK_DETAIL_SLUG}`}
      data-figma="portfolio_card_view"
      className="group mx-auto block w-full max-w-[820px] outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(229,231,235)]"
    >
      <div
        data-figma="img_sub"
        className={cn(
          "isolate overflow-hidden rounded-[50px] bg-zinc-950 shadow-[0_24px_60px_rgba(0,0,0,0.35)] outline-none ring-1 ring-black/20 focus-visible:ring-2 focus-visible:ring-zinc-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(229,231,235)]",
          interactivePressableTransformGroupClassName,
          liquidGlassImgSubHoverClassName,
        )}
      >
        <div className="flex flex-col items-center gap-3 px-5 pb-2 pt-6 md:gap-4 md:px-8 md:pb-3 md:pt-8">
          <div
            className="flex items-center justify-center gap-[10px] rounded-full bg-zinc-200/95 px-4 py-2.5 shadow-sm"
            data-figma="portfolio_card_logo_pill"
          >
            <FigmaLogos variant="logo_HM" />
            <FigmaLogos variant="logo_GN" />
            <FigmaLogos variant="logo_KM" />
          </div>
          <p className="px-2 text-center text-[15px] font-bold leading-snug tracking-tight text-white md:text-[17px]">
            {FEATURED_PORTFOLIO_CARD.title}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center justify-center rounded-md bg-black px-2.5 py-1 text-xs font-medium text-white md:text-sm">
              {FEATURED_PORTFOLIO_CARD.period}
            </span>
            {FEATURED_PORTFOLIO_CARD.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center justify-center rounded-md bg-black px-2.5 py-1 text-xs font-medium text-white md:text-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="relative aspect-[1000/560] w-full px-3 pb-4 md:px-5 md:pb-5">
          <Image
            src="/work/img_sub.png"
            alt=""
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 820px) 100vw, 820px"
            unoptimized
          />
        </div>
      </div>
    </Link>
  );
}

function WorkPageBody() {
  return (
    <main
      className="flex min-h-dvh flex-col text-zinc-950 antialiased"
      style={{ backgroundColor: SUB_WORK_PAGE_BG }}
      data-figma="SUB_WORK"
    >
      <HeaderBar compact={false} surface="light" />

      {/* 첨부 레퍼런스: 풀블리드 차량 인테리어 히어로 — (WORK) 타이포·펜타그램·txt 구간 제거 */}
      <div
        className="relative isolate z-0 w-full shrink-0 pt-[92px] md:pt-[124px]"
        data-figma="thumb_sub_stack"
      >
        <div
          className="relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden bg-black"
        >
          <div className="relative mx-auto h-[clamp(220px,52vw,780px)] w-full max-w-[1920px] min-h-[220px]">
            <Image
              src="/work/sub-work-hero.png"
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
              unoptimized
            />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex translate-y-1/2 justify-center px-6 md:px-10">
          <div className="pointer-events-auto w-full max-w-[820px]">
            <ParallaxViewport yRange={[0, -20]} className="w-full">
              <ParallaxLayer yRange={[16, -16]} className="w-full">
                <PortfolioCardViewInner />
              </ParallaxLayer>
            </ParallaxViewport>
          </div>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col">
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-0 w-[2px] -translate-x-1/2 bg-black"
          style={{ bottom: 0 }}
          aria-hidden
          data-figma="portfolio_vertical_rule"
        />
        <div
          className={`relative z-10 flex flex-1 flex-col ${WORK_GUTTER}`}
          style={{ backgroundColor: SUB_WORK_PAGE_BG }}
        >
          <section
            className="relative flex flex-1 flex-col pt-[clamp(200px,36vw,400px)] pb-14 md:pb-20 lg:pb-24"
            data-figma="portfolio_group"
          >
            <SubWorkGridBg />
            <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-12 md:gap-14 lg:mx-auto lg:gap-16">
              {WORK_PORTFOLIO_ROWS.map((row, i) => (
                <ParallaxLayer
                  key={row.title}
                  yRange={[8 + (i % 5) * 3, -8 - (i % 5) * 3]}
                  className="w-full"
                >
                  <WorkPortfolioGlassRow row={row} tripleLogos={i === 0} />
                </ParallaxLayer>
              ))}
            </div>
          </section>

          <footer
            className={`relative z-10 border-t border-zinc-300/80 py-10 text-center text-xs text-zinc-500 ${WORK_GUTTER}`}
            style={{ backgroundColor: SUB_WORK_PAGE_BG }}
          >
            ⓒ PENTACORE · WORK
          </footer>
        </div>
      </div>
    </main>
  );
}

export function WorkListingPage() {
  return (
    <Toast.Provider>
      <WorkPageBody />
      <WorkToastStack />
    </Toast.Provider>
  );
}
