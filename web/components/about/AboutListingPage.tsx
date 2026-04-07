"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubPageScaffold } from "@/components/layout/SubPageScaffold";
import { AppleHairlineRule } from "@/components/subpages/AppleHairlineRule";
import { SubWorkStyleHero } from "@/components/subpages/SubWorkStyleHero";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  liquidGlassHomeCard,
  SUB_WORK_PAGE_BG,
  workPortfolioRowChromeClassName,
} from "@/lib/figma-liquid-glass";
import { ShimmerOverlay } from "@/components/media/ImageWithSkeleton";
import { ParallaxLayer } from "@/components/work/Parallax";
import { AboutPentagramFigma } from "./AboutPentagramFigma";
import { figmaAboutScrollReference } from "./figma-about-assets";

/** Figma `315:78019` — 레퍼런스 스크린 (assumption: 내부 가이드용 에셋) */
function AboutScrollReferenceImage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[22px] bg-zinc-200/40 ring-1 ring-zinc-900/[0.07] md:aspect-[2/1] md:rounded-[28px]">
      {!loaded && (
        <ShimmerOverlay className="rounded-[inherit] bg-zinc-300/50" />
      )}
      <Image
        src={figmaAboutScrollReference}
        alt=""
        fill
        unoptimized
        className={cn(
          "object-cover object-top transition-opacity duration-700 ease-out motion-reduce:duration-150",
          loaded ? "opacity-100" : "opacity-0",
        )}
        sizes="(max-width: 1280px) 100vw, 1280px"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

const ABOUT_TXT_EN =
  "Pentacore is a small studio-shaped team building navigation, in-vehicle, and web products with automotive and enterprise partners.";

const ABOUT_TXT_KO =
  "펜타코어는 자동차·엔터프라이즈 파트너와 함께 내비게이션, 인비히클, 웹 프로덕트를 만드는 스튜디오형 팀입니다.";

const MISSION_LINES = [
  "We align UX, UI, and front-end delivery so intent in Figma survives in production.",
  "스펙과 현장 사이의 간극을 줄이고, 출시 이후에도 운영 가능한 구조를 남깁니다.",
] as const;

const VALUE_CARDS = [
  {
    title: "Craft",
    body: "디테일과 일관성. 디자인 시스템·컴포넌트 단위로 품질을 유지합니다.",
  },
  {
    title: "Clarity",
    body: "짧은 카피와 명확한 흐름. 복잡한 도메인도 단계별로 풀어 씁니다.",
  },
  {
    title: "Continuity",
    body: "구축 이후 운영·리뉴얼까지 같은 맥락으로 이어지게 설계합니다.",
  },
] as const;

const shell =
  "rounded-[20px] border border-zinc-900/[0.06] p-8 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-md supports-[backdrop-filter]:bg-white/65 md:rounded-[28px] md:p-10";

export function AboutListingPage() {
  return (
    <SubPageScaffold
      as="main"
      backgroundColor={SUB_WORK_PAGE_BG}
      className="flex min-h-dvh flex-col text-zinc-950 antialiased"
      contentClassName="flex min-h-dvh flex-col"
      data-figma="SUB_ABOUT"
    >
      <SubWorkStyleHero
        label="(ABOUT)"
        line1="Small team."
        line2="Big surfaces."
        bodyEn={ABOUT_TXT_EN}
        bodyKo={ABOUT_TXT_KO}
      />

      <AppleHairlineRule className="mx-auto max-w-[1280px] px-6 md:px-[76px]" />

      {/* 펜타그램 — WORK 톤에 맞춘 라이트 서피스 (기존 zinc-500 밴드 제거) */}
      <section
        className="relative overflow-hidden border-y border-zinc-900/[0.06] bg-zinc-200/35 py-20 md:py-28"
        data-figma="SUB_ABOUT pentagram_band"
      >
        <ParallaxLayer
          yRange={[8, -8]}
          className="mx-auto flex max-w-[1280px] justify-end px-6 md:px-[76px]"
        >
          <div className="relative h-[min(200px,42vw)] w-full max-w-[360px] md:h-[260px] md:max-w-[480px]">
            <AboutPentagramFigma className="scale-[1.2] md:scale-[1.35] md:opacity-[0.13]" />
          </div>
        </ParallaxLayer>
      </section>

      <section
        className="mx-auto w-full max-w-[1280px] px-6 py-20 md:px-[76px] md:py-28"
        data-figma="SUB_ABOUT values"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
          Values
        </p>
        <h2 className="mt-3 text-[clamp(1.5rem,4vw,2.25rem)] font-semibold tracking-tight text-zinc-950">
          일하는 방식
        </h2>
        <p className="mt-3 max-w-[42rem] text-[15px] leading-relaxed text-zinc-600">
          제품과 브랜드 톤을 해치지 않는 최소 단위로 품질을 쌓습니다.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {VALUE_CARDS.map((c, i) => (
            <ParallaxLayer
              key={c.title}
              yRange={[4 + (i % 3) * 2, -4 - (i % 3) * 2]}
              className="min-h-0"
            >
              <div
                className={cn(
                  "flex h-full flex-col justify-between transition-[transform,box-shadow] duration-300 ease-out",
                  shell,
                  workPortfolioRowChromeClassName,
                  "hover:-translate-y-0.5",
                )}
                style={liquidGlassHomeCard}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {c.title}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-zinc-700">
                    {c.body}
                  </p>
                </div>
              </div>
            </ParallaxLayer>
          ))}
        </div>
      </section>

      <AppleHairlineRule className="mx-auto max-w-[1280px] px-6 md:px-[76px]" />

      <section
        className="mx-auto w-full max-w-[1280px] px-6 py-20 md:px-[76px] md:py-28"
        data-figma="SUB_ABOUT narrative"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
          Narrative
        </p>
        <h2 className="mt-3 text-[clamp(1.5rem,4vw,2.25rem)] font-semibold tracking-tight text-zinc-950">
          스크롤과 리듬
        </h2>
        <p className="mt-3 max-w-[42rem] text-[15px] leading-relaxed text-zinc-600">
          긴 화면에서도 타이포와 간격이 숨 쉬듯 이어지도록 정리합니다.
        </p>

        <div className="mt-12">
          <AboutScrollReferenceImage />
        </div>

        <div
          className={cn(
            "mx-auto mt-14 max-w-[720px] space-y-5 text-center",
            shell,
            workPortfolioRowChromeClassName,
          )}
          style={liquidGlassHomeCard}
          data-figma="SUB_ABOUT mission_card"
        >
          {MISSION_LINES.map((line) => (
            <p
              key={line.slice(0, 28)}
              className="text-base font-normal leading-relaxed text-zinc-800 md:text-[17px] md:leading-relaxed [&+&]:mt-1"
            >
              {line}
            </p>
          ))}
        </div>

        <div className="mx-auto mt-14 flex max-w-[720px] flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          <Link
            href="/work"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-12 w-full justify-center rounded-full border-0 bg-zinc-950 px-8 text-[15px] font-medium text-white hover:bg-zinc-800 sm:w-auto",
            )}
          >
            WORK
          </Link>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 w-full justify-center rounded-full border-zinc-900/15 bg-white/40 text-zinc-900 backdrop-blur-sm hover:bg-white/70 sm:w-auto",
            )}
          >
            홈
          </Link>
        </div>
        <p className="mt-8 text-center">
          <Link
            href="/hiring"
            className="text-sm font-medium text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-400"
          >
            채용 안내 — HIRING →
          </Link>
        </p>
      </section>
    </SubPageScaffold>
  );
}
