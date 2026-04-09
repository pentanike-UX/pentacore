"use client";

import Link from "next/link";
import { Toast } from "@base-ui/react/toast";
import {
  interactivePressableTransformClassName,
  SUB_WORK_PAGE_BG,
} from "@/lib/figma-liquid-glass";
import { SubPageScaffold } from "@/components/layout/SubPageScaffold";
import {
  ImageFillWithSkeleton,
  IntrinsicWidthImageWithSkeleton,
} from "@/components/media/ImageWithSkeleton";
import { IMAGE_SIZES_CARD_820 } from "@/lib/image-presets";
import {
  SUB_HERO_HEADING_PAD_X,
  SUB_PAGE_COLUMN_GUTTER_X,
} from "@/lib/sub-page-gutters";
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

function PortfolioCardViewInner() {
  return (
    <Link
      href={`/works/${WORK_DETAIL_SLUG}`}
      data-figma="portfolio_card_view"
      className={cn(
        "group relative z-20 mx-auto block w-full max-w-[820px] outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(229,231,235)]",
        interactivePressableTransformClassName,
      )}
    >
      <div
        data-figma="img_sub"
        className="isolate overflow-hidden rounded-[50px] outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(229,231,235)]"
      >
        <ImageFillWithSkeleton
          src="/work/img_sub.png"
          alt=""
          aspectRatio="1000/819"
          className="bg-transparent"
          imageClassName="object-center"
          objectFit="contain"
          sizes={IMAGE_SIZES_CARD_820}
          unoptimized
        />
      </div>
    </Link>
  );
}

function WorkPageBody() {
  /** 가로 오버플로: `SubPageScaffold`·`AppChrome`의 `overflow-x-hidden`으로 처리. `body`에 overflow를 걸면 `fixed` 포털 FAB가 푸터 뒤로 깔릴 수 있음. */
  return (
    <SubPageScaffold
      as="main"
      backgroundColor={SUB_WORK_PAGE_BG}
      className="flex min-h-dvh flex-col overflow-x-hidden text-zinc-950 antialiased"
      contentClassName="flex min-h-dvh flex-col overflow-x-hidden"
      data-figma="SUB_WORK"
    >
      {/* 단색 배경 금지: z-[2]가 `SubPageViewportGrid`(z-[1])를 가림 */}
      <section className="relative pb-10 pt-[4.5rem] sm:pt-[5.75rem] md:pb-14 md:pt-[7.75rem]">
        <div className="w-full">
          <div className={cn(SUB_HERO_HEADING_PAD_X)}>
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
          </div>

          <div
            className="relative left-1/2 mt-[6rem] w-screen max-w-[100vw] -translate-x-1/2 pr-10 md:mt-[7.5rem] lg:mt-[9.375rem] lg:pr-[6.25rem]"
            data-figma="PENTAGRAM"
          >
            <div className="flex flex-col items-end">
              <div className="w-full max-w-[171.6px] lg:max-w-[429px]">
                <IntrinsicWidthImageWithSkeleton
                  src="/work/pentagram-pf05.svg"
                  alt=""
                  width={434}
                  height={328}
                  sizes="(max-width: 1024px) 50vw, 860px"
                  priority
                  unoptimized
                  objectFit="contain"
                  className="bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "relative mb-[4.5rem] mt-[10rem] max-w-[100vw] md:mt-[12.5rem] lg:mt-[15.625rem]",
            /* 모바일: 12컬 그리드 — 2칸 비우고 3열부터 끝까지 */
            "max-md:px-[1.5rem]",
            "md:left-1/2 md:w-screen md:-translate-x-1/2 md:pl-[50vw] md:pr-10",
            "pr-6",
          )}
          data-figma="txt"
        >
          <div className="grid grid-cols-12 gap-x-5 md:block">
            <div className="col-span-10 col-start-3 md:max-w-[min(640px,calc(50vw-2.5rem))]">
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
        </div>
      </section>

      {/* overflow-visible: 플로팅 카드가 thumb 위로 올라갈 때 잘리지 않음 */}
      <div
        className="relative z-20 w-full shrink-0 overflow-visible"
        data-figma="thumb_sub_stack"
      >
        <WorkThumbHmg className="relative z-0 overflow-visible" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex translate-y-1/2 justify-center overflow-visible px-6 md:px-10">
          <div className="pointer-events-auto flex w-full max-w-[820px] justify-center overflow-visible">
            {/* 모바일: 카드 130% 스케일 + origin-center — 가로 오버플로는 `AppChrome`/`SubPageScaffold` overflow-x 숨김 */}
            <div className="w-full max-md:origin-center max-md:scale-[1.3] md:scale-100">
              <ParallaxViewport yRange={[0, -20]} className="w-full overflow-visible">
                <ParallaxLayer yRange={[16, -16]} className="w-full overflow-visible">
                  <PortfolioCardViewInner />
                </ParallaxLayer>
              </ParallaxViewport>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="relative flex flex-1 flex-col">
          <section
            className="relative flex flex-1 flex-col pt-[clamp(7.5rem,36vw,25rem)] pb-14 md:pb-20 lg:pb-24"
            data-figma="portfolio_group"
          >
            {/* 12컬 그리드: `SubPageScaffold` 내 `SubPageViewportGrid` */}
            <div
              className="pointer-events-none absolute left-1/2 top-0 z-[2] h-full w-[2px] -translate-x-1/2 bg-black"
              aria-hidden
              data-figma="portfolio_vertical_rule"
            />
            <div
              className={cn(
                "relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-[14px] lg:mx-auto",
                SUB_PAGE_COLUMN_GUTTER_X,
              )}
            >
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

        </div>
      </div>
    </SubPageScaffold>
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
