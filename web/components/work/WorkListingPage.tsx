"use client";

import Image from "next/image";
import Link from "next/link";
import { HeaderBar } from "@/components/home/HeaderBar";
import { SUB_WORK_PAGE_BG } from "@/lib/figma-liquid-glass";
import { ParallaxLayer, ParallaxViewport } from "./Parallax";
import { WORK_DETAIL_SLUG, workImages } from "./work-assets";
import { WorkPortfolioGlassRow } from "./WorkPortfolioGlassRow";
import { WORK_PORTFOLIO_ROWS } from "./work-portfolio-data";
import { useWorkCursor, WorkCursorProvider } from "./WorkCursorProvider";

const GROUP_LOGO_SRC = "/work/group-logo-hmg.svg";

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
        <Image
          src={GROUP_LOGO_SRC}
          alt=""
          width={280}
          height={30}
          className="h-[30px] w-[min(280px,100%)] object-contain"
          unoptimized
        />
      </div>
      {/* Figma Thumb: 외곽 베젤 + inner 스크린 ~15px 라운드 */}
      <div data-figma="img_sub">
        <div className="rounded-[15px] bg-zinc-400/35 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.14)] ring-1 ring-zinc-900/10">
          <div className="relative aspect-[820/629] overflow-hidden rounded-xl bg-zinc-900">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-95 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
              style={{
                backgroundImage: `url(${workImages.portfolioThumb})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
              <p className="text-xs font-medium uppercase tracking-widest text-white/70">
                Portfolio
              </p>
              <h2 className="mt-2 max-w-xl text-2xl font-bold leading-tight text-white md:text-3xl">
                현대자동차 그룹 내비게이션 업데이트 공식 홈페이지
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/30 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-sm">
                  구축
                </span>
                <span className="rounded-full border border-white/30 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-sm">
                  연간운영
                </span>
              </div>
              <p className="mt-6 text-sm text-white/75 transition group-hover:text-white">
                상세 보기 →
              </p>
            </div>
          </div>
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

      <section className="relative px-5 pb-10 pt-[92px] md:px-10 md:pb-14 md:pt-[124px] lg:px-20">
        <div className="mx-auto max-w-[1740px]">
          <div className="flex flex-col gap-0">
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
        </div>
      </section>

      {/* thumb_HMG: Figma `image 13` + `image 14` 이중 레이어 */}
      <section className="relative overflow-hidden" data-figma="thumb_HMG">
        <ParallaxLayer
          yRange={[-12, 12]}
          className="relative min-h-[32vh] w-full md:min-h-[40vh] lg:min-h-[48vh]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${workImages.thumbHmgBack})` }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-85 mix-blend-multiply"
            style={{
              backgroundImage: `url(${workImages.thumbHmgFront})`,
              backgroundPosition: "center 40%",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(229,231,235)]/55 via-transparent to-[rgb(229,231,235)]/45" />
        </ParallaxLayer>
      </section>

      <section className="relative z-10 px-5 py-16 md:px-10 md:py-24 lg:px-20 lg:py-28">
        <ParallaxViewport yRange={[0, -20]} className="mx-auto max-w-[1280px]">
          <ParallaxLayer yRange={[16, -16]}>
            <PortfolioCardViewInner />
          </ParallaxLayer>
        </ParallaxViewport>
      </section>

      <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-20">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-400/50 to-transparent" />
      </div>

      <section
        className="px-5 py-12 md:px-10 md:py-16 lg:px-20 lg:py-20"
        data-figma="portfolio_group"
      >
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10">
          {WORK_PORTFOLIO_ROWS.map((row, i) => (
            <ParallaxLayer
              key={row.title}
              yRange={[8 + (i % 5) * 3, -8 - (i % 5) * 3]}
              className="flex w-full justify-center"
            >
              <WorkPortfolioGlassRow row={row} />
            </ParallaxLayer>
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-300/80 px-5 py-10 text-center text-xs text-zinc-500 md:px-10">
        ⓒ PENTACORE · WORK
      </footer>
    </main>
  );
}

export function WorkListingPage() {
  return (
    <WorkCursorProvider>
      <WorkPageBody />
    </WorkCursorProvider>
  );
}
