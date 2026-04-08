"use client";

import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import { SubPageScaffold } from "@/components/layout/SubPageScaffold";
import { Button } from "@/components/ui/button";
import { SUB_WORK_PAGE_BG } from "@/lib/figma-liquid-glass";
import { SUB_PAGE_COLUMN_GUTTER_X } from "@/lib/sub-page-gutters";
import { cn } from "@/lib/utils";

const CONTACT_EMAIL = "info@pentacore.kr";
const FORM_ID = "inquiry-main-form";

const GUTTER = cn("mx-auto w-full max-w-[1280px]", SUB_PAGE_COLUMN_GUTTER_X);

/** SUB_INQUIRY hero — 흰 배경 */
const heroBg = "bg-white";

const shellSoft =
  "rounded-[28px] border border-zinc-900/[0.05] bg-white/55 p-8 shadow-[0_1px_0_rgba(255,255,255,0.75)_inset,0_20px_56px_rgba(15,23,42,0.045)] backdrop-blur-md supports-[backdrop-filter]:bg-white/48 md:p-10";

const inputBase =
  "w-full rounded-2xl border border-zinc-200/90 bg-white/95 px-5 py-[1.125rem] text-[17px] leading-snug text-zinc-950 shadow-[0_1px_2px_rgba(15,23,42,0.035)] outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(24,24,27,0.06)] focus:ring-0 md:py-5 md:text-[18px]";

/** 주요 액션 버튼 — 모바일 전폭, sm 이상 고정 폭·줄바꿈 방지 */
const primaryActionButtonClass =
  "inline-flex h-14 w-full min-h-[48px] shrink-0 items-center justify-center rounded-full border-0 px-8 text-[15px] font-medium leading-snug sm:w-auto sm:min-w-[12.5rem] sm:px-10 sm:text-[16px]";

type QualificationState = {
  projectType: string | null;
  platform: string | null;
  timeline: string | null;
};

const PROJECT_TYPE_OPTIONS = [
  "신규 서비스",
  "기존 서비스 개선",
  "AI / 데이터 기반 서비스",
  "관리자 / 운영 시스템",
  "아직 정리되지 않음",
] as const;

const PLATFORM_OPTIONS = [
  "웹",
  "모바일",
  "웹 + 모바일",
  "내부 시스템",
] as const;

const TIMELINE_OPTIONS = [
  "최대한 빠르게",
  "1~2개월",
  "3개월 이상",
  "아직 검토 중",
] as const;

function buildInquiryMailto(payload: {
  name: string;
  email: string;
  company: string;
  message: string;
  q: QualificationState;
}) {
  const lines = [
    "— 프로젝트 기본 정보 —",
    payload.q.projectType ? `무엇을: ${payload.q.projectType}` : null,
    payload.q.platform ? `플랫폼: ${payload.q.platform}` : null,
    payload.q.timeline ? `일정: ${payload.q.timeline}` : null,
    "",
    "— 연락처 —",
    `이름: ${payload.name}`,
    `이메일: ${payload.email}`,
    payload.company.trim() ? `회사/팀: ${payload.company.trim()}` : null,
    "",
    "— 메시지 —",
    payload.message.trim() || "(내용 없음)",
  ]
    .filter(Boolean)
    .join("\n");

  const subject = `프로젝트 문의 — ${payload.name}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
}

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
      className="mb-3 block text-[15px] font-medium tracking-tight text-zinc-700"
    >
      {children}
      {optional ? (
        <span className="ml-2 font-normal text-zinc-400">(선택)</span>
      ) : (
        <span className="ml-1 text-red-600/90" aria-hidden>
          *
        </span>
      )}
    </label>
  );
}

function SelectChip({
  selected,
  children,
  onSelect,
  name,
}: {
  selected: boolean;
  children: ReactNode;
  onSelect: () => void;
  name: string;
}) {
  return (
    <button
      type="button"
      name={name}
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "max-w-full min-h-[48px] min-w-0 rounded-2xl border px-4 py-3 text-left text-[15px] font-medium transition-[background-color,border-color,transform,box-shadow] duration-200 ease-out sm:min-w-0 md:min-h-[52px] md:px-5 md:py-3.5 md:text-[16px]",
        "break-words [text-wrap:balance]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/12 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(229,231,235)]",
        selected
          ? "border-zinc-950 bg-zinc-950 text-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_8px_24px_rgba(0,0,0,0.12)]"
          : "border-zinc-200/80 bg-white/90 text-zinc-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-zinc-300 hover:bg-white active:scale-[0.99]",
      )}
    >
      {children}
    </button>
  );
}

function ChipGroup({
  legend,
  options,
  value,
  onChange,
  groupName,
}: {
  legend: string;
  options: readonly string[];
  value: string | null;
  onChange: (v: string) => void;
  groupName: string;
}) {
  return (
    <fieldset
      className={cn(
        "rounded-2xl border border-zinc-900/[0.04] bg-white/40 p-5 md:p-7",
        "backdrop-blur-[6px] supports-[backdrop-filter]:bg-white/35",
      )}
    >
      <legend className="px-0.5 text-[16px] font-semibold tracking-tight text-zinc-950 md:text-[17px]">
        {legend}
      </legend>
      <div className="mt-4 flex flex-wrap gap-2.5 md:mt-5 md:gap-3">
        {options.map((opt) => (
          <SelectChip
            key={opt}
            name={groupName}
            selected={value === opt}
            onSelect={() => onChange(opt)}
          >
            {opt}
          </SelectChip>
        ))}
      </div>
    </fieldset>
  );
}

function InquiryHero({ onStartInquiry }: { onStartInquiry: () => void }) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-zinc-900/[0.04]",
        heroBg,
        "motion-safe:animate-inquiry-hero-in",
      )}
      aria-labelledby="inquiry-hero-heading"
      data-figma="SUB_INQUIRY hero"
    >
      <div
        className={cn(
          "flex min-h-[min(68vh,600px)] flex-col justify-center py-24 md:min-h-[min(72vh,640px)] md:py-32",
          GUTTER,
        )}
      >
        <h1
          id="inquiry-hero-heading"
          className="max-w-[20ch] font-display text-[clamp(2.125rem,6.2vw,3.85rem)] font-semibold leading-[1.04] tracking-tight text-zinc-950"
        >
          Tell us about your project.
        </h1>
        <p className="mt-8 max-w-lg text-[17px] leading-relaxed text-zinc-600 md:mt-10 md:text-lg md:leading-relaxed">
          We’ll respond with scope, timeline, or next steps within 24 hours.
        </p>
        <div className="mt-12 w-full max-w-md">
          <Button
            type="button"
            onClick={onStartInquiry}
            className={cn(
              primaryActionButtonClass,
              "bg-zinc-950 text-white hover:bg-zinc-800",
            )}
          >
            문의 작성하기
          </Button>
        </div>
      </div>
    </section>
  );
}

function InquiryQualification({
  value,
  onChange,
}: {
  value: QualificationState;
  onChange: (next: QualificationState) => void;
}) {
  return (
    <section
      className={cn("py-20 md:py-28", GUTTER)}
      aria-labelledby="inquiry-qual-heading"
      data-figma="SUB_INQUIRY qualification"
    >
      <h2
        id="inquiry-qual-heading"
        className="text-[clamp(1.35rem,3.2vw,1.85rem)] font-semibold tracking-tight text-zinc-950"
      >
        프로젝트 기본 정보
      </h2>
      <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-zinc-600 md:text-[17px]">
        몇 가지 선택만으로 빠르게 방향을 정리할 수 있습니다.
      </p>
      <div className="mt-12 space-y-6 md:mt-14 md:space-y-8">
        <ChipGroup
          legend="무엇을 만들고 계신가요?"
          options={PROJECT_TYPE_OPTIONS}
          value={value.projectType}
          onChange={(projectType) => onChange({ ...value, projectType })}
          groupName="project-type"
        />
        <ChipGroup
          legend="플랫폼"
          options={PLATFORM_OPTIONS}
          value={value.platform}
          onChange={(platform) => onChange({ ...value, platform })}
          groupName="platform"
        />
        <ChipGroup
          legend="예상 일정"
          options={TIMELINE_OPTIONS}
          value={value.timeline}
          onChange={(timeline) => onChange({ ...value, timeline })}
          groupName="timeline"
        />
      </div>
    </section>
  );
}

const MESSAGE_PLACEHOLDER = `아래 내용을 간단히 작성해 주세요.

- 어떤 서비스를 만들고 있는지
- 주요 사용자 또는 대상
- 중요하게 생각하는 기능이나 요구사항
- 참고할 만한 서비스 (있다면)`;

function InquiryFormFields({
  qualification,
}: {
  qualification: QualificationState;
}) {
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const fd = new FormData(form);
      const name = String(fd.get("name") ?? "").trim();
      const email = String(fd.get("email") ?? "").trim();
      const company = String(fd.get("company") ?? "");
      const message = String(fd.get("message") ?? "");

      if (!name || !email) {
        form.reportValidity();
        return;
      }

      window.location.href = buildInquiryMailto({
        name,
        email,
        company,
        message,
        q: qualification,
      });
    },
    [qualification],
  );

  return (
    <section
      id="inquiry-form-anchor"
      className={cn("scroll-mt-24 md:scroll-mt-28", GUTTER)}
      aria-labelledby="inquiry-form-heading"
      data-figma="SUB_INQUIRY form"
    >
      <h2
        id="inquiry-form-heading"
        className="text-[clamp(1.35rem,3.2vw,1.85rem)] font-semibold tracking-tight text-zinc-950"
      >
        기본 정보 입력
      </h2>
      <form
        id={FORM_ID}
        className={cn("mt-12 space-y-10 md:mt-14 md:space-y-12", shellSoft)}
        onSubmit={onSubmit}
        aria-label="프로젝트 문의 양식"
      >
        <div className="grid gap-10 md:grid-cols-2 md:gap-x-10">
          <div className="min-w-0">
            <FieldLabel htmlFor="inquiry-name">이름</FieldLabel>
            <input
              id="inquiry-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className={inputBase}
              placeholder="홍길동"
            />
          </div>
          <div className="min-w-0">
            <FieldLabel htmlFor="inquiry-email">이메일</FieldLabel>
            <input
              id="inquiry-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputBase}
              placeholder="담당자@회사.kr"
            />
          </div>
        </div>
        <div>
          <FieldLabel htmlFor="inquiry-company" optional>
            회사 / 팀
          </FieldLabel>
          <input
            id="inquiry-company"
            name="company"
            type="text"
            autoComplete="organization"
            className={inputBase}
            placeholder="회사 또는 팀 이름"
          />
        </div>
        <div>
          <FieldLabel htmlFor="inquiry-message">메시지</FieldLabel>
          <textarea
            id="inquiry-message"
            name="message"
            rows={12}
            className={cn(
              inputBase,
              "min-h-[240px] resize-y leading-relaxed md:min-h-[280px]",
            )}
            placeholder={MESSAGE_PLACEHOLDER}
          />
        </div>
      </form>
    </section>
  );
}

function InquiryTrust() {
  return (
    <section
      className={cn("py-20 md:py-28", GUTTER)}
      aria-label="신뢰 정보"
      data-figma="SUB_INQUIRY trust"
    >
      <div className={cn(shellSoft)}>
        <p className="text-[16px] font-semibold text-zinc-950 md:text-[17px]">
          우리는 다음과 같은 프로젝트를 주로 다룹니다.
        </p>
        <ul className="mt-5 space-y-3 text-[16px] leading-relaxed text-zinc-600 md:text-[17px]">
          {["모빌리티 / 자동차", "AI / 데이터 서비스", "플랫폼 / SaaS"].map(
            (line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-zinc-400" />
                {line}
              </li>
            ),
          )}
        </ul>
        <p
          className="my-10 text-center text-[13px] font-medium uppercase tracking-[0.2em] text-zinc-400"
          role="separator"
        >
          또는
        </p>
        <div className="space-y-4 text-[16px] leading-relaxed text-zinc-600 md:text-[17px]">
          <p>
            평균{" "}
            <span className="font-semibold text-zinc-900">24시간 이내</span>에
            이메일로 초기 답변을 드립니다.
          </p>
          <p>필요하신 만큼만 알려 주셔도 되며, 부담 없이 소통할 수 있습니다.</p>
        </div>
      </div>
    </section>
  );
}

function InquiryCtaRail() {
  return (
    <section
      className={cn("pb-12 pt-4 md:pb-16", GUTTER)}
      aria-label="문의 제출"
      data-figma="SUB_INQUIRY cta"
    >
      <div className="flex flex-col items-stretch gap-4 sm:max-w-none sm:flex-row sm:items-center">
        <button
          type="submit"
          form={FORM_ID}
          className={cn(
            primaryActionButtonClass,
            "bg-zinc-950 text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2",
          )}
        >
          문의 보내기
        </button>
      </div>
      <p className="mt-10 text-center sm:text-left">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-block max-w-full break-all text-[15px] font-medium text-zinc-600 underline decoration-zinc-300 underline-offset-[5px] transition hover:text-zinc-950 hover:decoration-zinc-500"
        >
          또는 이메일로 문의하기 → {CONTACT_EMAIL}
        </a>
      </p>
    </section>
  );
}

function InquiryFallback() {
  return (
    <section
      className="w-full border-t border-zinc-900/[0.05] bg-white pb-24 pt-16 md:pb-32 md:pt-20"
      data-figma="SUB_INQUIRY fallback"
    >
      <div className="w-full text-center">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-950 md:text-xl">
          아직 정리가 필요하신가요?
        </h2>
        <p className="mt-5 text-[16px] leading-relaxed text-zinc-600 md:text-[17px]">
          간단한 문의만 남겨주셔도 괜찮습니다.
          <br className="hidden sm:inline" />{" "}
          아래 폼으로 방향을 함께 정리해 나갈 수 있습니다.
        </p>
        <p className="mt-8">
          <a
            href="#inquiry-form-anchor"
            className="text-[15px] font-medium text-zinc-800 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950"
          >
            문의 폼으로 이동
          </a>
        </p>
      </div>
    </section>
  );
}

export function InquiryPageView() {
  const [qualification, setQualification] = useState<QualificationState>({
    projectType: null,
    platform: null,
    timeline: null,
  });

  const scrollToForm = useCallback(() => {
    document.getElementById("inquiry-form-anchor")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <SubPageScaffold
      as="main"
      backgroundColor={SUB_WORK_PAGE_BG}
      className="text-zinc-950 antialiased"
      contentClassName="flex min-h-dvh flex-col"
      data-figma="SUB_INQUIRY"
    >
      <InquiryHero onStartInquiry={scrollToForm} />
      <InquiryQualification value={qualification} onChange={setQualification} />
      <InquiryFormFields qualification={qualification} />
      <InquiryTrust />
      <InquiryCtaRail />
      <InquiryFallback />
    </SubPageScaffold>
  );
}
