"use client";

import Image from "next/image";
import Link from "next/link";
import { HeaderBar } from "@/components/home/HeaderBar";
import { SUB_WORK_PAGE_BG } from "@/lib/figma-liquid-glass";
import { ParallaxLayer, ParallaxViewport } from "./Parallax";
import { WORK_DETAIL_SLUG } from "./work-assets";
import { figmaPentagramSmall, figmaPortfolioCardThumb } from "./figma-work-assets";
import { FigmaLogos } from "./FigmaLogos";
import { WorkPortfolioGlassRow } from "./WorkPortfolioGlassRow";
import { WORK_PORTFOLIO_ROWS } from "./work-portfolio-data";
import { useWorkCursor, WorkCursorProvider } from "./WorkCursorProvider";
import { WorkThumbHmg } from "./WorkThumbHmg";

/**
 * Figma `txt` — EN/KR 본문은 파일 내 텍스트 레이어와 1:1 대조 필요 시 교체 (assumption).
 */
const WORK_HERO_TXT_EN =
  "Pentacore partners with leading brands to ship navigation, platform, and web experiences that stay coherent from strategy through delivery.";

const WORK_HERO_TXT_KO =
  "펜타코어는 전략부터 실행까지 일관된 내비게이션·플랫폼·웹 경험을 선도 브랜드와 함께 완성합니다.";

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
      <div data-figma="img_sub">
        <div className="rounded-[15px] bg-zinc-400/35 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.14)] ring-1 ring-zinc-900/10">
          <div className="relative aspect-[820/629] overflow-hidden rounded-xl bg-zinc-900">
            <Image
              src={figmaPortfolioCardThumb.tablet}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 820px) 100vw, 820px"
              unoptimized
            />
            <div
              className="absolute inset-[2.5%] overflow-hidden rounded-[10px] md:inset-[3%]"
              aria-hidden
            >
              <div
                className="absolute inset-0"
                style={{
                  WebkitMaskImage: `url('${figmaPortfolioCardThumb.screenMask}')`,
                  maskImage: `url('${figmaPortfolioCardThumb.screenMask}')`,
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              >
                <Image
                  src={figmaPortfolioCardThumb.screenContent}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 800px) 95vw, 760px"
                  unoptimized
                />
              </div>
            </div>
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

          <div
            className="mt-12 space-y-6 md:mt-16 lg:mt-20"
            data-figma="PENTAGRAM"
          >
            <div className="w-full max-w-[min(100%,1040px)]">
              <Image
                src="/work/pentagram-pf05.svg"
                alt=""
                width={1040}
                height={400}
                className="h-auto w-full"
                priority
              />
            </div>
            <div className="relative h-[48px] w-[200px] md:h-[56px] md:w-[240px]">
              <Image
                src={figmaPentagramSmall.a}
                alt=""
                fill
                className="object-contain object-left"
                sizes="240px"
                unoptimized
              />
              <Image
                src={figmaPentagramSmall.b}
                alt=""
                fill
                className="object-contain object-left opacity-95 mix-blend-multiply"
                sizes="240px"
                unoptimized
              />
            </div>
          </div>

          <div
            className="mt-8 max-w-[min(100%,640px)] space-y-4"
            data-figma="txt"
          >
            <p className="text-[15px] font-normal leading-relaxed text-zinc-800">
              {WORK_HERO_TXT_EN}
            </p>
            <p className="text-[15px] font-normal leading-relaxed text-zinc-800">
              {WORK_HERO_TXT_KO}
            </p>
          </div>
        </div>
      </section>

      <WorkThumbHmg />

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
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-stretch gap-10">
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
