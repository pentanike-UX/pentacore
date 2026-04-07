"use client";

import Link from "next/link";
import { SubPageScaffold } from "@/components/layout/SubPageScaffold";
import { AppleHairlineRule } from "@/components/subpages/AppleHairlineRule";
import { SubWorkStyleHero } from "@/components/subpages/SubWorkStyleHero";
import { Button, buttonVariants } from "@/components/ui/button";
import { SUB_WORK_PAGE_BG } from "@/lib/figma-liquid-glass";
import { cn } from "@/lib/utils";

const HERO_EN = `We hire for curiosity, clarity, and ownership.
Small teams move fast when everyone understands the “why” behind the work.`;

const HERO_KO = `펜타코어는 호기심·명확성·주인의식을 중시합니다.
작은 팀은 각자 일의 이유를 공유할 때 가장 빠르게 움직입니다.`;

const shell =
  "rounded-[20px] border border-zinc-900/[0.06] bg-white/75 p-8 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-md supports-[backdrop-filter]:bg-white/65 md:rounded-[28px] md:p-10";

export function HiringPageView() {
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
      />

      <AppleHairlineRule className="mx-auto max-w-[1280px] px-6 md:px-[76px]" />

      <section
        className="mx-auto w-full max-w-[1280px] px-6 pb-20 pt-16 md:px-[76px] md:pb-28 md:pt-20"
        aria-labelledby="hiring-open-roles"
      >
        <h2
          id="hiring-open-roles"
          className="text-[clamp(1.5rem,4vw,2.25rem)] font-semibold tracking-tight text-zinc-950"
        >
          열린 포지션
        </h2>
        <p className="mt-2 max-w-[42rem] text-[15px] leading-relaxed text-zinc-600">
          공고는 준비 중입니다. 아래 버튼으로 문의를 남기면 포지션이 열릴 때
          연락드릴 수 있습니다.
        </p>
        <div className={cn("mt-10", shell)}>
          <p className="text-sm font-medium text-zinc-500">현재 상태</p>
          <p className="mt-3 text-lg font-semibold tracking-tight text-zinc-900">
            등록된 공고가 없습니다
          </p>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-zinc-600">
            채용이 활성화되면 이 영역에 역할·요건·지원 방법이 표시됩니다.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-8 rounded-full border-zinc-300 bg-white/80 px-6"
            disabled
            aria-disabled
          >
            지원하기 (준비 중)
          </Button>
        </div>
      </section>

      <AppleHairlineRule className="mx-auto max-w-[1280px] px-6 md:px-[76px]" />

      <section
        className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-[76px] md:py-24"
        aria-labelledby="hiring-process"
      >
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
              title: "대화",
              body: "포트폴리오와 관심 분야를 중심으로 가볍게 이야기를 나눕니다.",
            },
            {
              step: "02",
              title: "실무 과제",
              body: "짧은 과제로 협업 방식과 사고의 깊이를 함께 확인합니다.",
            },
            {
              step: "03",
              title: "오퍼",
              body: "합류 시 기대 역할·환경을 투명하게 공유하고 결정을 돕습니다.",
            },
          ].map((item) => (
            <li key={item.step} className={cn(shell, "flex flex-col")}>
              <span className="text-xs font-semibold tabular-nums text-zinc-400">
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-zinc-950">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto w-full max-w-[1280px] px-6 pb-24 md:px-[76px] md:pb-32">
        <div className={cn(shell, "flex flex-col gap-6 md:flex-row md:items-center md:justify-between")}>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-950 md:text-2xl">
              프로젝트 문의가 먼저인가요?
            </h2>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-zinc-600">
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
      </section>
    </SubPageScaffold>
  );
}
