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
 * Figma `txt` — 문구·타이포 고정 (변경 시 Figma와 동기화).
 */
const WORK_HERO_TXT_EN =
  "Pentacore partners with leading brands to ship navigation, platform, and web experiences that stay coherent from strategy through delivery.";

const WORK_HERO_TXT_KO =
  "펜타코어는 전략부터 실행까지 일관된 내비게이션·플랫폼·웹 경험을 선도 브랜드와 함께 완성합니다.";

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

      <section
        className={`relative pb-10 pt-[92px] md:pb-14 md:pt-[124px] ${WORK_GUTTER}`}
        style={{ backgroundColor: SUB_WORK_PAGE_BG }}
      >
        <div className="mx-auto max-w-[min(100%,1740px)] lg:mx-auto">
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

        {/* 12컬럼 중앙 6칸(col 4–9) · 모바일은 섹션 px-6 기준 좌측 정렬 */}
        <div className="mx-auto mt-8 max-w-[1280px] md:mt-10 lg:mx-auto">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-6">
            <div
              className="col-span-12 text-left md:col-span-6 md:col-start-4"
              data-figma="txt"
            >
              <div className="space-y-4">
                <p className="text-[15px] font-normal leading-relaxed text-zinc-800">
                  {WORK_HERO_TXT_EN}
                </p>
                <p className="text-[15px] font-normal leading-relaxed text-zinc-800">
                  {WORK_HERO_TXT_KO}
                </p>
              </div>
            </div>
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
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-stretch gap-10 lg:mx-auto">
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
    <WorkCursorProvider>
      <WorkPageBody />
    </WorkCursorProvider>
  );
}
