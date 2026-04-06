"use client";

import Link from "next/link";
import { HeaderBar } from "@/components/home/HeaderBar";
import { ParallaxLayer, ParallaxViewport } from "./Parallax";
import { WORK_DETAIL_SLUG, workImages } from "./work-assets";
import { useWorkCursor, WorkCursorProvider } from "./WorkCursorProvider";

function PortfolioCardViewInner() {
  const { setPortfolioHover } = useWorkCursor();

  return (
    <Link
      href={`/works/${WORK_DETAIL_SLUG}`}
      className="group relative mx-auto block w-full max-w-[820px]"
      data-figma="portfolio_card_view"
      onMouseEnter={() => setPortfolioHover(true)}
      onMouseLeave={() => setPortfolioHover(false)}
      onFocus={() => setPortfolioHover(true)}
      onBlur={() => setPortfolioHover(false)}
    >
      <div className="relative aspect-[820/629] overflow-hidden rounded-sm border border-white/10 bg-zinc-900 shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
          style={{ backgroundImage: `url(${workImages.portfolioThumb})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
          <p className="text-xs font-medium uppercase tracking-widest text-white/60">
            Portfolio
          </p>
          <h2 className="mt-2 max-w-md text-2xl font-bold leading-tight text-white md:text-3xl">
            현대자동차 그룹 내비게이션 업데이트 공식 홈페이지
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white/90">
              구축
            </span>
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white/90">
              연간운영
            </span>
          </div>
          <p className="mt-6 text-sm text-white/70 transition group-hover:text-white">
            상세 보기 →
          </p>
        </div>
      </div>
    </Link>
  );
}

const listTitles = [
  "프로젝트 리스트 A",
  "프로젝트 리스트 B",
  "프로젝트 리스트 C",
  "프로젝트 리스트 D",
  "프로젝트 리스트 E",
  "프로젝트 리스트 F",
  "프로젝트 리스트 G",
  "프로젝트 리스트 H",
  "프로젝트 리스트 I",
  "프로젝트 리스트 J",
  "프로젝트 리스트 K",
  "프로젝트 리스트 L",
  "프로젝트 리스트 M",
] as const;

function WorkPageBody() {
  return (
    <main className="bg-black text-white">
      <HeaderBar compact={false} />

      <section className="relative px-4 pb-16 pt-28 md:px-8 lg:px-[5.5rem] lg:pt-32">
        <ParallaxViewport yRange={[0, -36]} className="max-w-[2174px]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-8">
            <ParallaxLayer yRange={[24, -24]} className="shrink-0">
              <span className="text-sm font-medium text-white/50">WORK</span>
            </ParallaxLayer>
            <div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
                디지털 프로덕트와 브랜드 경험을 설계합니다.
              </h1>
              <p className="mt-4 max-w-2xl text-base text-white/65 md:text-lg">
                Figma SUB_WORK / SUB_WORK_Tablet / SUB_WORK_Mobile 레이아웃을 참고한
                리스트 페이지입니다. 스크롤 시 섹션별 시차를 둡니다.
              </p>
            </div>
          </div>
        </ParallaxViewport>
      </section>

      <section className="relative -mt-8 overflow-hidden">
        <ParallaxLayer yRange={[-20, 20]} className="relative min-h-[40vh] w-full md:min-h-[50vh] lg:min-h-[60vh]">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center"
            style={{ backgroundImage: `url(${workImages.heroWide})` }}
          />
        </ParallaxLayer>
        <ParallaxLayer yRange={[30, -40]} className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-40 mix-blend-screen"
            style={{
              backgroundImage: `url(${workImages.heroParallax})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </ParallaxLayer>
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </section>

      <section className="relative z-10 px-4 py-20 md:px-8 lg:px-[5.5rem] lg:py-28">
        <ParallaxLayer yRange={[40, -40]}>
          <PortfolioCardViewInner />
        </ParallaxLayer>
      </section>

      <section
        className="border-t border-white/10 px-4 py-16 md:px-8 lg:px-40 lg:py-24"
        data-figma="portfolio_group"
      >
        <h2 className="mb-10 text-lg font-semibold text-white/80">
          더 많은 프로젝트
        </h2>
        <ul className="flex flex-col gap-3 md:gap-4">
          {listTitles.map((title, i) => (
            <ParallaxLayer
              key={title}
              yRange={[12 + (i % 4) * 4, -12 - (i % 4) * 4]}
            >
              <li className="flex items-center justify-between border-b border-white/10 py-4 text-sm text-white/70 transition hover:border-white/25 hover:text-white md:text-base">
                <span>{title}</span>
                <span className="text-white/40">—</span>
              </li>
            </ParallaxLayer>
          ))}
        </ul>
      </section>

      <footer className="border-t border-white/10 px-4 py-12 text-center text-xs text-white/40 md:px-8">
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
