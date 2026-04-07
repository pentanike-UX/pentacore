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
import { WorkPortfolioGlassRow } from "./WorkPortfolioGlassRow";
import { WORK_PORTFOLIO_ROWS } from "./work-portfolio-data";
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
  return (
    <Link
      href={`/works/${WORK_DETAIL_SLUG}`}
      data-figma="portfolio_card_view"
      className="group mx-auto block w-full max-w-[820px] outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(229,231,235)]"
    >
      <div
        data-figma="img_sub"
        className={cn(
          "isolate overflow-hidden rounded-[50px] outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(229,231,235)]",
          interactivePressableTransformGroupClassName,
          liquidGlassImgSubHoverClassName,
        )}
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
      className="flex min-h-dvh flex-col text-zinc-950 antialiased"
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
            className="relative left-1/2 mt-[150px] w-screen max-w-[100vw] -translate-x-1/2 pr-10 lg:pr-[100px]"
            data-figma="PENTAGRAM"
          >
            <div className="flex flex-col items-end">
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
            </div>
          </div>
        </div>

        {/* 뷰포트 가로 50% 지점에서 텍스트 시작 · 모바일은 px-6 내 pl-[50vw] 보정 */}
        <div
          className="relative left-1/2 mt-[250px] w-screen max-w-[100vw] -translate-x-1/2 pl-[50vw] pr-6 md:pr-10"
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

      <div
        className="relative isolate z-0 w-full shrink-0"
        data-figma="thumb_sub_stack"
      >
        <WorkThumbHmg className="relative z-0" />
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
            className="flex flex-1 flex-col pt-[clamp(200px,36vw,380px)] pb-12 md:pb-16 lg:pb-20"
            data-figma="portfolio_group"
          >
            <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-10 lg:mx-auto">
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
