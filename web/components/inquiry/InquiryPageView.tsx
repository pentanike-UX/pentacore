"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { SubPageScaffold } from "@/components/layout/SubPageScaffold";
import { AppleHairlineRule } from "@/components/subpages/AppleHairlineRule";
import { SubWorkStyleHero } from "@/components/subpages/SubWorkStyleHero";
import { Button } from "@/components/ui/button";
import { SUB_WORK_PAGE_BG } from "@/lib/figma-liquid-glass";
import { cn } from "@/lib/utils";

const HERO_EN = `Tell us what you’re building, where it lives, and what “done” should feel like.
We respond with a clear next step—questions, scope, or a short call.`;

const HERO_KO = `만들고 있는 것, 환경, 완료의 기준을 알려 주세요.
질문·범위 제안·짧은 통화 등 다음 액션을 명확히 안내드립니다.`;

const field =
  "w-full rounded-[12px] border border-zinc-300/90 bg-white/95 px-4 py-3 text-[15px] text-zinc-950 shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/8";

const shell =
  "rounded-[20px] border border-zinc-900/[0.06] bg-white/75 p-8 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-md supports-[backdrop-filter]:bg-white/65 md:rounded-[28px] md:p-10";

function FieldLabel({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[13px] font-medium tracking-wide text-zinc-600"
    >
      {children}
      {optional ? (
        <span className="ml-1 font-normal text-zinc-400">(선택)</span>
      ) : null}
    </label>
  );
}

export function InquiryPageView() {
  return (
    <SubPageScaffold
      as="main"
      backgroundColor={SUB_WORK_PAGE_BG}
      className="text-zinc-950 antialiased"
      contentClassName="flex min-h-dvh flex-col"
      data-figma="SUB_INQUIRY"
    >
      <SubWorkStyleHero
        label="(PROJECT INQUIRY)"
        line1="Start with questions."
        line2="End with clarity."
        bodyEn={HERO_EN}
        bodyKo={HERO_KO}
      />

      <AppleHairlineRule className="mx-auto max-w-[1280px] px-6 md:px-[76px]" />

      <section className="mx-auto grid w-full max-w-[1280px] gap-12 px-6 pb-24 pt-12 md:grid-cols-12 md:gap-x-8 md:px-[76px] md:pb-32 md:pt-16">
        <div className="md:col-span-5">
          <h2 className="text-[clamp(1.5rem,3.5vw,2rem)] font-semibold tracking-tight text-zinc-950">
            보내주실 내용
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-zinc-600">
            서비스 영역, 일정 감각, 참고 링크가 있으면 함께 적어 주세요.             제출 버튼은 아직 서버와 연결되지 않았습니다. 입력은 로컬에서만
            유지됩니다.
          </p>
          <p className="mt-6 text-sm text-zinc-500">
            급한 문의는{" "}
            <a
              href="mailto:hello@pentacore.example"
              className="font-medium text-zinc-800 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500"
            >
              hello@pentacore.example
            </a>
            로도 보내실 수 있습니다. (assumption: 실제 주소로 교체)
          </p>
          <p className="mt-8">
            <Link
              href="/hiring"
              className="text-sm font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950"
            >
              채용 문의는 HIRING 페이지 →
            </Link>
          </p>
        </div>

        <div className="md:col-span-7">
          <form
            className={cn(shell, "space-y-6")}
            onSubmit={(e) => e.preventDefault()}
            aria-label="프로젝트 문의 폼"
          >
            <div>
              <FieldLabel htmlFor="inquiry-name">이름</FieldLabel>
              <input
                id="inquiry-name"
                name="name"
                type="text"
                autoComplete="name"
                className={field}
                placeholder="홍길동"
              />
            </div>
            <div>
              <FieldLabel htmlFor="inquiry-email">이메일</FieldLabel>
              <input
                id="inquiry-email"
                name="email"
                type="email"
                autoComplete="email"
                className={field}
                placeholder="you@company.com"
              />
            </div>
            <div>
              <FieldLabel htmlFor="inquiry-company" optional>
                회사 / 팀
              </FieldLabel>
              <input
                id="inquiry-company"
                name="company"
                type="text"
                className={field}
                placeholder="Pentacore"
              />
            </div>
            <div>
              <FieldLabel htmlFor="inquiry-message">메시지</FieldLabel>
              <textarea
                id="inquiry-message"
                name="message"
                rows={6}
                className={cn(field, "min-h-[140px] resize-y")}
                placeholder="프로젝트 맥락, 목표, 희망 일정을 적어 주세요."
              />
            </div>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="submit"
                className="h-11 rounded-full bg-zinc-950 px-8 text-[15px] font-medium text-white hover:bg-zinc-800"
                disabled
              >
                보내기 (준비 중)
              </Button>
              <p className="text-xs text-zinc-500">
                제출 시 데이터는 전송되지 않습니다.
              </p>
            </div>
          </form>
        </div>
      </section>
    </SubPageScaffold>
  );
}
