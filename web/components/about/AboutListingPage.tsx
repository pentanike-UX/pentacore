"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { liquidGlassHomeCard, SUB_WORK_PAGE_BG } from "@/lib/figma-liquid-glass";
import { ParallaxLayer } from "@/components/work/Parallax";
import { AboutPentagramFigma } from "./AboutPentagramFigma";
import { figmaAboutScrollReference } from "./figma-about-assets";

/** Figma 텍스트 레이어 미동기화 — 카피는 assumption */
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

export function AboutListingPage() {
  return (
    <main
      className="min-h-dvh text-zinc-950 antialiased"
      style={{ backgroundColor: SUB_WORK_PAGE_BG }}
      data-figma="SUB_ABOUT"
    >
      {/* —— SUB_WORK와 동일 톤의 히어로 트랙 —— */}
      <section className="relative px-5 pb-12 pt-[92px] md:px-10 md:pb-16 md:pt-[124px] lg:px-20">
        <div className="mx-auto max-w-[1740px]">
          <div className="flex flex-col gap-0">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:gap-[min(6rem,5.04vw)] lg:gap-[96.8px]">
              <p className="shrink-0 text-[19.2px] font-semibold leading-none tracking-tight text-zinc-950">
                (ABOUT)
              </p>
              <h1 className="font-display text-[clamp(2.25rem,11vw,8rem)] font-black leading-[0.95] tracking-tight text-zinc-950">
                Small team.
              </h1>
            </div>
            <p className="mt-2 font-display text-[clamp(2.25rem,11vw,8rem)] font-black leading-[0.95] tracking-tight text-zinc-950 md:mt-0">
              Big surfaces.
            </p>
          </div>

          <div className="mt-10 max-w-[min(100%,640px)] space-y-4 md:mt-14" data-figma="txt">
            <p className="text-[15px] font-normal leading-relaxed text-zinc-800">
              {ABOUT_TXT_EN}
            </p>
            <p className="text-[15px] font-normal leading-relaxed text-zinc-800">
              {ABOUT_TXT_KO}
            </p>
          </div>
        </div>
      </section>

      {/* —— Figma PENTAGRAM 데코 —— */}
      <section
        className="relative overflow-hidden bg-zinc-500 py-16 md:py-24"
        data-figma="SUB_ABOUT pentagram_band"
      >
        <ParallaxLayer yRange={[10, -10]} className="mx-auto flex max-w-[1280px] justify-center px-5 md:px-10">
          <div className="relative h-[200px] w-[min(100%,520px)] scale-100 md:scale-[1.15] md:origin-center">
            <AboutPentagramFigma />
          </div>
        </ParallaxLayer>
      </section>

      {/* —— 값 제안 카드 (glass / hover·focus) —— */}
      <section
        className="px-5 py-16 md:px-10 md:py-24 lg:px-20"
        data-figma="SUB_ABOUT values"
      >
        <div className="mx-auto grid max-w-[1280px] gap-6 md:grid-cols-3 md:gap-8">
          {VALUE_CARDS.map((c, i) => (
            <ParallaxLayer
              key={c.title}
              yRange={[6 + (i % 3) * 2, -6 - (i % 3) * 2]}
              className="min-h-0"
            >
              <Card
                className={cn(
                  "h-full transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg",
                  "focus-within:ring-2 focus-within:ring-zinc-900/15 focus-within:ring-offset-2 focus-within:ring-offset-[rgb(229,231,235)]",
                )}
                style={liquidGlassHomeCard}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold tracking-tight">
                    {c.title}
                  </CardTitle>
                  <CardDescription className="text-zinc-700">
                    {c.body}
                  </CardDescription>
                </CardHeader>
              </Card>
            </ParallaxLayer>
          ))}
        </div>
      </section>

      {/* —— 다크 밴드: 스크롤 내러티브 레퍼런스(Figma 이미지) + 그라데이션 미션 카드 —— */}
      <section
        className="dark bg-zinc-950 px-5 py-16 text-white md:px-10 md:py-24 lg:px-20"
        data-figma="SUB_ABOUT narrative"
      >
        <div className="mx-auto max-w-[1280px] space-y-10">
          <div className="space-y-2">
            <p className="text-sm font-medium text-white/70">
              Reference — scroll &amp; line rhythm
            </p>
            <p className="text-xs text-white/50">
              Figma `315:78019`에 배치된 레퍼런스 스크린(assumption: 스크롤 기반 타이포 모션 가이드).
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
            <div className="relative aspect-[16/10] w-full bg-black/40 md:aspect-[2/1]">
              <Image
                src={figmaAboutScrollReference}
                alt=""
                fill
                className="object-cover object-top"
                sizes="(max-width: 1280px) 100vw, 1280px"
                unoptimized
              />
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.08 },
              },
            }}
            className="mx-auto max-w-[720px] rounded-2xl bg-gradient-to-br from-violet-200/95 via-indigo-100/95 to-sky-200/95 px-8 py-10 text-center text-zinc-950 shadow-xl ring-1 ring-black/5 md:px-12 md:py-14"
            data-figma="SUB_ABOUT mission_card"
          >
            {MISSION_LINES.map((line) => (
              <motion.p
                key={line.slice(0, 24)}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-base font-normal leading-relaxed md:text-lg [&+&]:mt-4"
              >
                {line}
              </motion.p>
            ))}
          </motion.div>

          {/* Button 상태: shadcn `button.tsx` — default / outline / disabled */}
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/work"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "w-full justify-center sm:w-auto",
              )}
            >
              WORK 보기
            </Link>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full justify-center border-white/25 bg-white/5 text-white hover:bg-white/10 sm:w-auto",
              )}
            >
              홈으로
            </Link>
            <Button type="button" variant="secondary" size="lg" disabled className="w-full sm:w-auto">
              채용 안내 (준비 중)
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}
