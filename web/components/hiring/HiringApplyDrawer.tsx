"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** iOS Safari: input font-size < 16px 시 포커스 시 뷰포트 확대 */
const inputClass =
  "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-base text-zinc-950 outline-none transition-shadow placeholder:text-zinc-400 focus-visible:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-900/15";

const labelClass = "text-sm font-medium text-zinc-800";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 현재 공고 포지션 — 읽기 전용 자동 설정 */
  jobTitle: string;
};

/** `main`의 `isolate` 아래에 두면 헤더(z-100)보다 위로 못 올라감 → body 포털 + 상위 z-index */
const Z_OVERLAY = 500;

export function HiringApplyDrawer({ open, onOpenChange, jobTitle }: Props) {
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const [name, setName] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [portfolioErr, setPortfolioErr] = useState(false);
  const [doneMsg, setDoneMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setEntered(false);
      return;
    }
    setName("");
    setPortfolioUrl("");
    setPortfolioErr(false);
    setDoneMsg(null);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!open) return null;
  if (!mounted || typeof document === "undefined") return null;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const pf = form.elements.namedItem("portfolioFile") as HTMLInputElement;
    const hasFile = pf?.files?.length ? pf.files.length > 0 : false;
    const urlOk = portfolioUrl.trim().length > 0;

    if (!urlOk && !hasFile) {
      setPortfolioErr(true);
      return;
    }
    setPortfolioErr(false);
    setDoneMsg(
      "제출해 주셔서 감사합니다. 담당자 검토 후 연락드리겠습니다. (실제 전송·연동은 추후 구성 예정입니다.)",
    );
  };

  return createPortal(
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: Z_OVERLAY }}
      role="presentation"
    >
      <button
        type="button"
        className={cn(
          "pointer-events-auto absolute inset-0 bg-black/45 transition-opacity duration-300",
          entered ? "opacity-100" : "opacity-0",
        )}
        aria-label="배경 닫기"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="hiring-apply-title"
        className={cn(
          "pointer-events-auto absolute flex min-h-0 flex-col bg-[rgb(229,231,235)] shadow-[-16px_0_48px_rgba(0,0,0,0.14)] transition-transform duration-300 ease-out",
          /* 모바일·태블릿: 우측 풀하이트 시트 */
          "right-0 top-0 h-[100dvh] w-full max-w-full border-l border-zinc-300/80 sm:max-w-[min(100%,26rem)]",
          /* 데스크톱: 여백 + 넓은 패널(헤더·푸터와 겹침 방지는 포털+z-index) */
          "lg:inset-y-6 lg:right-8 lg:left-auto lg:h-[calc(100dvh-3rem)] lg:w-[min(42rem,calc(100vw-4rem))] lg:max-w-none lg:rounded-2xl lg:border lg:border-zinc-300/80 lg:shadow-2xl",
          entered ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-zinc-900/10 px-4 py-4 sm:px-5">
          <h2
            id="hiring-apply-title"
            className="text-lg font-semibold tracking-tight text-zinc-950"
          >
            지원하기
          </h2>
          <button
            type="button"
            className="rounded-md p-2 text-zinc-600 transition hover:bg-zinc-900/5 hover:text-zinc-950"
            aria-label="닫기"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 py-5 sm:px-5"
        >
          {doneMsg ? (
            <div className="flex flex-col gap-6">
              <p className="text-[15px] leading-relaxed text-zinc-700">
                {doneMsg}
              </p>
              <Button
                type="button"
                className="h-11 rounded-full border-0 bg-zinc-950 px-8 text-[15px] font-medium text-white hover:bg-zinc-800"
                onClick={() => onOpenChange(false)}
              >
                닫기
              </Button>
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="apply-name" className={labelClass}>
                  이름 <span className="text-red-600">*</span>
                </label>
                <input
                  id="apply-name"
                  name="name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="홍길동"
                />
              </div>

              <div className="mt-5">
                <label htmlFor="apply-position" className={labelClass}>
                  지원 포지션
                </label>
                <input
                  id="apply-position"
                  name="position"
                  readOnly
                  value={jobTitle}
                  className={cn(
                    inputClass,
                    "cursor-default bg-zinc-100/90 text-zinc-800",
                  )}
                  aria-readonly="true"
                />
                <p className="mt-1 text-xs text-zinc-500">
                  현재 열려 있는 공고 포지션이 자동으로 설정됩니다.
                </p>
              </div>

              <div className="mt-5">
                <label htmlFor="apply-resume" className={labelClass}>
                  이력서 첨부 <span className="text-red-600">*</span>
                </label>
                <input
                  id="apply-resume"
                  name="resume"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx,application/pdf"
                  className={cn(
                    inputClass,
                    "cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-zinc-200/80 file:px-3 file:py-1 file:text-base file:font-medium file:text-zinc-800",
                  )}
                />
              </div>

              <div className="mt-5">
                <span className={labelClass}>포트폴리오</span>
                <p className="mt-0.5 text-xs text-zinc-500">
                  URL 또는 파일 중 하나 이상 입력해 주세요.
                </p>
                <label htmlFor="apply-portfolio-url" className="sr-only">
                  포트폴리오 URL
                </label>
                <input
                  id="apply-portfolio-url"
                  name="portfolioUrl"
                  type="url"
                  inputMode="url"
                  value={portfolioUrl}
                  onChange={(e) => {
                    setPortfolioUrl(e.target.value);
                    setPortfolioErr(false);
                  }}
                  className={inputClass}
                  placeholder="https://…"
                />
                <label htmlFor="apply-portfolio-file" className="mt-3 block">
                  <span className="text-xs font-medium text-zinc-600">
                    또는 파일 첨부
                  </span>
                  <input
                    id="apply-portfolio-file"
                    name="portfolioFile"
                    type="file"
                    accept=".pdf,.zip,.png,.jpg,.jpeg,image/*,application/pdf"
                    onChange={() => setPortfolioErr(false)}
                    className={cn(
                      inputClass,
                      "mt-1 cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-zinc-200/80 file:px-3 file:py-1 file:text-base file:font-medium file:text-zinc-800",
                    )}
                  />
                </label>
                {portfolioErr ? (
                  <p className="mt-2 text-xs font-medium text-red-600" role="alert">
                    포트폴리오 URL 또는 파일을 입력해 주세요.
                  </p>
                ) : null}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-full border-zinc-300 bg-white px-6"
                  onClick={() => onOpenChange(false)}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  className="h-11 rounded-full border-0 bg-zinc-950 px-8 text-[15px] font-medium text-white hover:bg-zinc-800"
                >
                  제출하기
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>,
    document.body,
  );
}
