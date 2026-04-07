"use client";

import Image from "next/image";
import Link from "next/link";
import { Toast } from "@base-ui/react/toast";
import { HeaderBar } from "@/components/home/HeaderBar";
import {
  liquidGlassPortfolioRow,
  SUB_WORK_PAGE_BG,
  workPortfolioImgSubInteractionClassName,
} from "@/lib/figma-liquid-glass";
import { cn } from "@/lib/utils";
import { ParallaxLayer, ParallaxViewport } from "./Parallax";
import { WORK_DETAIL_SLUG } from "./work-assets";
import { figmaPentagramSmall } from "./figma-work-assets";
import { FigmaLogos } from "./FigmaLogos";
import { WorkPortfolioGlassRow } from "./WorkPortfolioGlassRow";
import { WORK_PORTFOLIO_ROWS } from "./work-portfolio-data";
import { useWorkCursor, WorkCursorProvider } from "./WorkCursorProvider";
import { WorkThumbHmg } from "./WorkThumbHmg";
import { WorkToastStack } from "./WorkToastStack";

/** Figma `txt` — 문구 고정 (변경 시 Figma와 동기화). 줄바꿈 유지 */
const WORK_TXT_EN = `This is the moment when imagination becomes reality,
when abstract ideas are translated into clear structure,
shaped through design and development,
and proven through real-world use and operation.`;

const WORK_TXT_KO = `이곳은 상상이 현실이 되는 순간입니다.
추상적인 아이디어는 명확한 구조로 정리되고,
디자인과 개발을 통해 구현되며,
실제 사용과 운영을 통해 그 가치를 증명합니다.`;

/** 모바일 24px / 태블릿 40px / 데스크톱 가터 없이 max-width 블록만 중앙 */
const WORK_GUTTER = "px-6 md:px-10 lg:px-0";

function PortfolioCardViewInner() {
  const { setPortfolioHover } = useWorkCursor();

  return (
    <Link
      href={`/works/${WORK_DETAIL_SLUG}`}
      data-figma="portfolio_card_view"
      className="group mx-auto block w-full max-w-[820px] outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(229,231,235)]"
      onMouseEnter={() => setPortfolioHover(true)}
      onMouseLeave={() => setPortfolioHover(false)}
      onFocus={() => setPortfolioHover(true)}
      onBlur={() => setPortfolioHover(false)}
    >
      <div className="mb-8 flex justify-center px-2">
        <div className="flex items-center gap-[10px]">
          <FigmaLogos variant="logo_HM" />
          <FigmaLogos variant="logo_GN" />
          <FigmaLogos variant="logo_KM" />
        </div>
      </div>
      <div
        data-figma="img_sub"
        className={cn(
          "isolate overflow-hidden rounded-[50px] outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(229,231,235)]",
          workPortfolioImgSubInteractionClassName,
        )}
        style={liquidGlassPortfolioRow}
      >
        <div className="relative aspect-[1000/819] w-full">
          <Image
            src="/work/img_sub.png"
            alt=""
            fill
            className="object-contain object-center"
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
      className="min-h-dvh text-zinc-950 antialiased"
      style={{ backgroundColor: SUB_WORK_PAGE_BG }}
      data-figma="SUB_WORK"
    >
      <HeaderBar compact={false} surface="light" />

      <section
        className={`relative pb-10 pt-[92px] md:pb-14 md:pt-[124px] ${WORK_GUTTER}`}
        style={{ backgroundColor: SUB_WORK_PAGE_BG }}
      >
        <div className="mx-auto max-w-[min(100%,1740px)] lg:mx-auto">
          <div
            className="flex flex-col gap-0 uppercase"
            data-figma="HERO"
          >
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:gap-[min(6rem,5.04vw)] lg:gap-[96.8px]">
              <p className="shrink-0 text-[19.2px] font-semibold leading-none tracking-tight text-zinc-950">
                (WORK)
              </p>
              <h1 className="font-display text-[clamp(2.25rem,11vw,8rem)] font-black leading-[0.95] tracking-tight text-zinc-950">
                Builds with intent.
              </h1>
            </div>
            <p className="mt-2 font-display text-[clamp(2.25rem,11vw,8rem)] font-black leading-[0.95] tracking-tight text-zinc-950 md:mt-0">
              Runs in reality.
            </p>
          </div>

          <div
            className="relative left-1/2 mt-12 w-screen max-w-[100vw] -translate-x-1/2 pr-10 lg:mt-20 lg:pr-[100px]"
            data-figma="PENTAGRAM"
          >
            <div className="flex flex-col items-end space-y-6 md:mt-16">
              <div className="w-full max-w-[171.6px] lg:max-w-[429px]">
                <Image
                  src="/work/pentagram-pf05.svg"
                  alt=""
                  width={429}
                  height={324}
                  className="h-auto w-full"
                  priority
                />
              </div>
              <div className="relative aspect-[200/48] w-full max-w-[80px] lg:max-w-[200px]">
                <Image
                  src={figmaPentagramSmall.a}
                  alt=""
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 1023px) 80px, 200px"
                  unoptimized
                />
                <Image
                  src={figmaPentagramSmall.b}
                  alt=""
                  fill
                  className="object-contain object-left opacity-95 mix-blend-multiply"
                  sizes="(max-width: 1023px) 80px, 200px"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>

        {/* 뷰포트 가로 50% 지점에서 텍스트 시작 · 모바일은 px-6 내 pl-[50vw] 보정 */}
        <div
          className="relative left-1/2 mt-8 w-screen max-w-[100vw] -translate-x-1/2 pl-[50vw] pr-6 md:mt-10 md:pr-10"
          data-figma="txt"
        >
          <div className="max-w-[min(640px,calc(50vw-1.5rem))] md:max-w-[min(640px,calc(50vw-2.5rem))]">
            <h3 className="whitespace-pre-line text-2xl font-semibold tracking-tight text-zinc-950 md:hidden">
              {WORK_TXT_EN}
            </h3>
            <h2 className="hidden whitespace-pre-line text-3xl font-semibold tracking-tight text-zinc-950 md:block">
              {WORK_TXT_EN}
            </h2>
            <p className="mt-4 whitespace-pre-line text-base font-normal leading-relaxed text-zinc-800 md:hidden">
              {WORK_TXT_KO}
            </p>
            <p className="mt-6 hidden whitespace-pre-line text-lg font-normal leading-relaxed text-zinc-600 md:block">
              {WORK_TXT_KO}
            </p>
          </div>
        </div>
      </section>

      <WorkThumbHmg />

      <section
        className={`relative z-10 py-16 md:py-24 lg:py-28 ${WORK_GUTTER}`}
        style={{ backgroundColor: SUB_WORK_PAGE_BG }}
      >
        <ParallaxViewport
          yRange={[0, -20]}
          className="mx-auto w-full max-w-[1280px] lg:mx-auto"
        >
          <ParallaxLayer yRange={[16, -16]}>
            <PortfolioCardViewInner />
          </ParallaxLayer>
        </ParallaxViewport>
      </section>

      <div className={`mx-auto max-w-[1280px] lg:mx-auto ${WORK_GUTTER}`}>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-400/50 to-transparent" />
      </div>

      <section
        className={`py-12 md:py-16 lg:py-20 ${WORK_GUTTER}`}
        style={{ backgroundColor: SUB_WORK_PAGE_BG }}
        data-figma="portfolio_group"
      >
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-stretch lg:mx-auto">
          {WORK_PORTFOLIO_ROWS.map((row, i) => (
            <ParallaxLayer
              key={row.title}
              yRange={[8 + (i % 5) * 3, -8 - (i % 5) * 3]}
              className="flex w-full justify-center"
            >
              <WorkPortfolioGlassRow row={row} tripleLogos={i === 0} />
            </ParallaxLayer>
          ))}
        </div>
      </section>

      <footer
        className={`border-t border-zinc-300/80 py-10 text-center text-xs text-zinc-500 ${WORK_GUTTER}`}
        style={{ backgroundColor: SUB_WORK_PAGE_BG }}
      >
        ⓒ PENTACORE · WORK
      </footer>
    </main>
  );
}

export function WorkListingPage() {
  return (
    <Toast.Provider>
      <WorkCursorProvider>
        <WorkPageBody />
        <WorkToastStack />
      </WorkCursorProvider>
    </Toast.Provider>
  );
}
