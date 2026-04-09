"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, FileSearch, MessageCircle } from "lucide-react";
import { SubPageScaffold } from "@/components/layout/SubPageScaffold";
import { SubWorkStyleHero } from "@/components/subpages/SubWorkStyleHero";
import { buttonVariants } from "@/components/ui/button";
import { HIRING_JOB_SLUG_BACKEND, HIRING_PF05_SRC } from "@/components/hiring/hiring-assets";
import {
  FixedImageWithSkeleton,
  ImageFillWithSkeleton,
  IntrinsicWidthImageWithSkeleton,
} from "@/components/media/ImageWithSkeleton";
import { IMAGE_SIZES_FULL_BLEED } from "@/lib/image-presets";
import {
  HeroCopyTextSkeleton,
  JobCardSkeleton,
  ProcessCardsSkeleton,
  ProcessSectionHeaderSkeleton,
} from "@/components/media/TextSkeleton";
import {
  liquidGlassHomeCard,
  SUB_WORK_PAGE_BG,
  workPortfolioRowChromeClassName,
} from "@/lib/figma-liquid-glass";
import { SUB_PAGE_COLUMN_GUTTER_X } from "@/lib/sub-page-gutters";
import { cn } from "@/lib/utils";

/** `/public/hire/img_hire1.png` 실제 픽셀 */
const HIRE_IMG1_W = 1024;
const HIRE_IMG1_H = 442;
/** `/public/hire/img_hire2.png` 실제 픽셀 */
const HIRE_IMG2_W = 1024;
const HIRE_IMG2_H = 576;

const HERO_EN = `We hire for curiosity, clarity, and ownership.
Small teams move fast when everyone understands the “why” behind the work.`;

const HERO_KO = `펜타코어는 호기심·명확성·주인의식을 중시합니다.
작은 팀은 각자 일의 이유를 공유할 때 가장 빠르게 움직입니다.`;

const shell =
  "rounded-[20px] border border-zinc-900/[0.06] bg-white/75 p-8 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-md supports-[backdrop-filter]:bg-white/65 md:rounded-[28px] md:p-10";

/** 데스크톱 기준 200px → 12.5rem, 모바일·태블릿은 동일 비율(≈0.62 / 0.8) */
const fullBleedImg =
  "relative left-1/2 mt-[7.75rem] md:mt-[10rem] lg:mt-[12.5rem] w-screen max-w-[100vw] -translate-x-1/2";

function ProcessIcon({ children }: { children: ReactNode }) {
  return (
    <div
      className="mb-5 flex size-[52px] items-center justify-center rounded-[14px] bg-zinc-950/[0.04] text-zinc-800 ring-1 ring-zinc-900/[0.08]"
      aria-hidden
    >
      {children}
    </div>
  );
}

const CULTURE_BULLETS = [
  "펜타코어는 현대자동차그룹과 함께 소프트웨어 업데이트 관련 프로젝트를 함께 만들어 가고 있습니다. 모빌리티 분야의 개발에 참여해 보는 경험을 얻고 싶으신 분과 함께하고 싶어요.",
  "성장에 대한 갈증이 있고 좋은 방향으로 성장하고 싶으신 분과 함께 하고 싶어요.",
  "변화를 두려워하지 않고 새로운 기술을 학습하며 꾸준히 성장하실 수 있는 분과 함께하고 싶어요.",
  "주어진 비즈니스에 대한 이해가 빠르고, 이에 필요한 시스템의 설계가 가능하신 분과 함께 하고 싶어요.",
] as const;

export function HiringPageView() {
  const [hireImg1Ready, setHireImg1Ready] = useState(false);

  return (
    <SubPageScaffold
      as="main"
      backgroundColor={SUB_WORK_PAGE_BG}
      className="text-zinc-950 antialiased"
      contentClassName="flex min-h-dvh flex-col"
      data-figma="SUB_HIRING"
    >
      <SubWorkStyleHero
        label="(HIRING)"
        line1="Build together."
        line2="Ship with care."
        bodyEn={HERO_EN}
        bodyKo={HERO_KO}
        hideBodyCopy
      />

      <div className={fullBleedImg}>
        <IntrinsicWidthImageWithSkeleton
          src="/hire/img_hire1.png"
          alt=""
          width={HIRE_IMG1_W}
          height={HIRE_IMG1_H}
          sizes={IMAGE_SIZES_FULL_BLEED}
          priority
          unoptimized
          objectFit="contain"
          onLoadComplete={() => setHireImg1Ready(true)}
        />
      </div>

      <section
        className={cn(
          "mx-auto w-full max-w-[1280px] pt-12 md:pt-14",
          SUB_PAGE_COLUMN_GUTTER_X,
        )}
        aria-label="채용 메시지"
        aria-busy={!hireImg1Ready}
      >
        <h2 className="sr-only">We hire for curiosity</h2>
        {hireImg1Ready ? (
          <>
            <p className="whitespace-pre-line text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
              {HERO_EN}
            </p>
            <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-zinc-700 md:text-lg md:leading-relaxed">
              {HERO_KO}
            </p>
          </>
        ) : (
          <HeroCopyTextSkeleton />
        )}
      </section>

      <section
        className={cn(
          "mx-auto w-full max-w-[1280px] pb-8 pt-16 md:pb-12 md:pt-20",
          SUB_PAGE_COLUMN_GUTTER_X,
        )}
        aria-labelledby="hiring-open-roles"
        aria-busy={!hireImg1Ready}
      >
        {hireImg1Ready ? (
          <>
            <h2
              id="hiring-open-roles"
              className="text-[clamp(1.5rem,4vw,2.25rem)] font-semibold tracking-tight text-zinc-950"
            >
              열린 포지션
            </h2>
            <p className="mt-2 max-w-[42rem] text-[15px] leading-relaxed text-zinc-600">
              아래 카드를 눌러 상세 요건과 업무를 확인하세요.
            </p>
            <Link
              href={`/hiring/${HIRING_JOB_SLUG_BACKEND}`}
              className={cn(
                "group mt-10 flex flex-col gap-4 transition-[transform,box-shadow] duration-300 ease-out md:flex-row md:items-center md:justify-between",
                shell,
                "hover:-translate-y-0.5 hover:shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_20px_48px_rgba(15,23,42,0.1)]",
              )}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Engineering
                </p>
                <p className="mt-2 text-xl font-semibold tracking-tight text-zinc-950 md:text-2xl">
                  Back-end Developer
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-zinc-950/[0.06] px-3 py-1 text-xs font-medium text-zinc-800 ring-1 ring-zinc-900/10">
                    Java
                  </span>
                  <span className="rounded-full bg-zinc-950/[0.06] px-3 py-1 text-xs font-medium text-zinc-800 ring-1 ring-zinc-900/10">
                    React
                  </span>
                </div>
              </div>
              <span className="text-sm font-medium text-zinc-500 transition group-hover:text-zinc-900 md:shrink-0">
                상세 보기 →
              </span>
            </Link>
          </>
        ) : (
          <>
            <div className="space-y-3" aria-hidden>
              <div className="h-[clamp(1.5rem,4vw,2.25rem)] w-36 rounded-lg bg-zinc-200/[0.72]" />
              <div className="h-4 w-full max-w-[42rem] rounded-md bg-zinc-200/60" />
            </div>
            <JobCardSkeleton className="mt-10" />
          </>
        )}
      </section>

      <section
        className={cn(
          "mx-auto w-full max-w-[1280px] pb-20 pt-20 md:pb-28 md:pt-28",
          SUB_PAGE_COLUMN_GUTTER_X,
        )}
        aria-labelledby="hiring-process"
        aria-busy={!hireImg1Ready}
      >
        {hireImg1Ready ? (
          <>
            <h2
              id="hiring-process"
              className="text-[clamp(1.5rem,4vw,2.25rem)] font-semibold tracking-tight text-zinc-950"
            >
              프로세스
            </h2>
            <p className="mt-2 max-w-[42rem] text-[15px] leading-relaxed text-zinc-600">
              단계를 짧게 유지하고, 서로의 시간을 존중하는 방식으로 진행합니다.
            </p>
            <ol className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
              {[
                {
                  step: "01",
                  title: "서류검토",
                  body: "제출해 주신 이력서·경력 사항을 바탕으로 직무 적합성과 경험을 검토합니다.",
                  icon: (
                    <FileSearch
                      className="size-[26px]"
                      strokeWidth={1.35}
                      aria-hidden
                    />
                  ),
                },
                {
                  step: "02",
                  title: "인터뷰",
                  body: "포트폴리오와 관심 분야를 중심으로 가볍게 이야기를 나눕니다.",
                  icon: (
                    <MessageCircle
                      className="size-[26px]"
                      strokeWidth={1.35}
                      aria-hidden
                    />
                  ),
                },
                {
                  step: "03",
                  title: "오퍼",
                  body: "합류 시 기대 역할·환경을 투명하게 공유하고 결정을 돕습니다.",
                  icon: (
                    <CheckCircle2
                      className="size-[26px]"
                      strokeWidth={1.35}
                      aria-hidden
                    />
                  ),
                },
              ].map((item) => (
                <li key={item.step} className={cn(shell, "flex flex-col")}>
                  <ProcessIcon>{item.icon}</ProcessIcon>
                  <span className="text-xs font-semibold tabular-nums text-zinc-400">
                    {item.step}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </>
        ) : (
          <>
            <ProcessSectionHeaderSkeleton />
            <ProcessCardsSkeleton className="mt-12" />
          </>
        )}
      </section>

      <section
        className={cn(
          "mx-auto w-full max-w-[1280px] pb-20 md:pb-28",
          SUB_PAGE_COLUMN_GUTTER_X,
        )}
        aria-labelledby="hiring-culture-fit"
      >
        <div className={cn(shell)}>
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-14">
            <div className="shrink-0">
              <FixedImageWithSkeleton
                src={HIRING_PF05_SRC}
                alt=""
                width={83}
                height={63}
                sizes="166px"
                className="block h-[63px] w-[83px] object-contain object-left"
                data-figma="PF_05"
                unoptimized
                skeletonClassName="rounded-md"
              />
              <h2
                id="hiring-culture-fit"
                className="mt-6 text-2xl font-semibold tracking-tight text-zinc-950 md:text-[28px]"
              >
                Culture Fit
              </h2>
            </div>
            <ul className="min-w-0 flex-1 space-y-5 text-[15px] leading-relaxed text-zinc-700">
              {CULTURE_BULLETS.map((line, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-400"
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* img_hire2 배경 + 리퀴드 글라스 문의 CTA — 하단 패딩 없음(푸터와 맞닿음) */}
      <section
        className={fullBleedImg}
        aria-labelledby="hiring-inquiry-cta"
        data-figma="HIRING_inquiry_cta_on_img"
      >
        <div
          className="relative isolate w-full overflow-hidden bg-zinc-200/20"
          style={{ aspectRatio: `${HIRE_IMG2_W} / ${HIRE_IMG2_H}` }}
        >
          <ImageFillWithSkeleton
            coverParent
            src="/hire/img_hire2.png"
            alt=""
            className="bg-zinc-200/20"
            imageClassName="object-cover object-center"
            sizes={IMAGE_SIZES_FULL_BLEED}
            unoptimized
          />
          {/* 배경 위 글래스 카드 가독성 */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-zinc-950/35 to-zinc-950/5"
            aria-hidden
          />
          <div
            className={cn(
              "absolute inset-0 z-10 flex items-center justify-center py-10 md:py-12",
              SUB_PAGE_COLUMN_GUTTER_X,
            )}
          >
            <div className="w-full max-w-[1280px]">
              <div
                className={cn(
                  "flex flex-col gap-6 rounded-[20px] border border-white/60 p-8 ring-1 ring-zinc-900/[0.08] supports-[backdrop-filter]:border-white/45 md:flex-row md:items-center md:justify-between md:rounded-[28px] md:p-10",
                  workPortfolioRowChromeClassName,
                )}
                style={liquidGlassHomeCard}
              >
                <div>
                  <h2
                    id="hiring-inquiry-cta"
                    className="text-xl font-semibold tracking-tight text-zinc-950 md:text-2xl"
                  >
                    프로젝트 문의가 먼저인가요?
                  </h2>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-zinc-700">
                    파트너십·의뢰는 프로젝트 문의 페이지에서 정리해 주시면 빠르게
                    검토합니다.
                  </p>
                </div>
                <Link
                  href="/inquiry"
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "h-12 shrink-0 rounded-full border-0 bg-zinc-950 px-8 text-[15px] font-medium text-white hover:bg-zinc-800",
                  )}
                >
                  PROJECT INQUIRY
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SubPageScaffold>
  );
}
