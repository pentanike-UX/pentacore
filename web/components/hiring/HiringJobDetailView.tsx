"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { FixedImageWithSkeleton } from "@/components/media/ImageWithSkeleton";
import { SUB_WORK_PAGE_BG } from "@/lib/figma-liquid-glass";
import { SubPageScaffold } from "@/components/layout/SubPageScaffold";
import {
  WORKS_LIST_BACK_ICON_SRC,
  WORKS_VIEW_PF_06_SRC,
} from "@/components/work/figma-work-assets";
import { buttonVariants } from "@/components/ui/button";
import { SUB_PAGE_COLUMN_GUTTER_X } from "@/lib/sub-page-gutters";
import { cn } from "@/lib/utils";

const TEXT = "#1e1e1e";
const MUTED = "#757575";

function JobSectionDivider({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)} aria-hidden>
      <svg
        className="block h-4 w-full md:h-[18px]"
        viewBox="0 0 1280 16"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2"
          y="2"
          width="1276"
          height="12"
          fill="#000000"
          stroke="#FFFFFF"
          strokeWidth={4}
        />
      </svg>
    </div>
  );
}

function Grid12({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-12 gap-x-5 md:gap-x-8", className)}>
      {children}
    </div>
  );
}

const META_ROWS = [
  { label: "고용 형태", value: "정규직 (수습 3개월)" },
  { label: "기술 스택", value: "Java, React" },
  { label: "근무", value: "서울 / 협의 (하이브리드)" },
  { label: "지원", value: "이력서·포트폴리오·GitHub 링크" },
] as const;

/**
 * 채용 상세 — `/works_view` 레이아웃 리듬을 참고한 구성(assumption: Figma 채용 상세 미정).
 */
export function HiringJobDetailView() {
  return (
    <SubPageScaffold
      as="main"
      backgroundColor={SUB_WORK_PAGE_BG}
      className="antialiased"
      style={{ color: TEXT }}
      data-figma="SUB_HIRING_JOB_DETAIL"
    >
      <div className="border-b border-zinc-900/10 pb-6 pt-[4.5rem] sm:pt-[5.75rem] md:pb-8 md:pt-[7.75rem]">
        <div
          className={cn("mx-auto max-w-[1280px]", SUB_PAGE_COLUMN_GUTTER_X)}
        >
          <Link
            href="/hiring"
            className="inline-flex size-[50px] shrink-0 items-center justify-center transition-opacity hover:opacity-70"
            aria-label="HIRING 목록"
          >
            <FixedImageWithSkeleton
              src={WORKS_LIST_BACK_ICON_SRC}
              alt=""
              width={50}
              height={50}
              sizes="100px"
              className="block"
              unoptimized
            />
          </Link>
        </div>
      </div>

      <div
        className={cn(
          "mx-auto max-w-[1280px] pb-14 pt-10 md:pb-20 md:pt-12",
          SUB_PAGE_COLUMN_GUTTER_X,
        )}
      >
        <Grid12>
          <div className="col-span-12 lg:col-span-8">
            <header className="flex max-w-[720px] flex-col" data-figma="Title">
              <div
                className="relative h-[60px] w-[116px] shrink-0"
                aria-hidden
                data-figma="PF_06"
              >
                <FixedImageWithSkeleton
                  src={WORKS_VIEW_PF_06_SRC}
                  alt=""
                  width={116}
                  height={60}
                  sizes="240px"
                  className="object-contain object-left"
                  unoptimized
                  skeletonClassName="rounded-sm"
                />
              </div>
              <p
                className="mt-5 text-[28px] font-normal leading-tight tracking-tight"
                style={{ color: TEXT }}
              >
                Pentacore
              </p>
              <h1
                className="mt-5 text-[clamp(1.75rem,5vw,2.625rem)] font-bold leading-tight tracking-tight md:text-[42px]"
                style={{ color: TEXT }}
              >
                Back-end Developer
              </h1>
              <p className="mt-3 text-[15px] font-medium text-zinc-600">
                Java · React 연계 서비스 개발
              </p>
            </header>
          </div>
          <div className="col-span-12">
            <dl
              className="mt-10 flex max-w-[756px] flex-wrap gap-x-12 gap-y-5 md:mt-14"
              data-figma="summery"
            >
              {META_ROWS.map((row) => (
                <div key={row.label} className="min-w-[140px]">
                  <dt
                    className="text-xs font-normal leading-none"
                    style={{ color: MUTED }}
                  >
                    {row.label}
                  </dt>
                  <dd
                    className="mt-1 text-sm font-bold leading-tight"
                    style={{ color: TEXT }}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Grid12>
      </div>

      <section
        className={cn(
          "mx-auto max-w-[1280px] pb-16 md:pb-24",
          SUB_PAGE_COLUMN_GUTTER_X,
        )}
      >
        <JobSectionDivider />
        <h2
          className="mt-10 text-xl font-bold uppercase tracking-tight md:mt-12 md:text-2xl"
          style={{ color: TEXT }}
        >
          소개
        </h2>
        <p
          className="mt-6 max-w-[730px] text-base leading-relaxed"
          style={{ color: TEXT }}
        >
          현대자동차그룹 소프트웨어 업데이트·모빌리티 관련 프로젝트에서 안정적인
          API와 서비스 레이어를 설계·구현합니다. Java 기반 백엔드와 React로
          구성된 운영 도구·콘솔과의 연동 경험이 있다면 더욱 좋습니다.
        </p>

        <h2
          className="mt-14 text-xl font-bold uppercase tracking-tight md:mt-16 md:text-2xl"
          style={{ color: TEXT }}
        >
          주요 업무
        </h2>
        <ul
          className="mt-6 max-w-[730px] list-disc space-y-2 pl-5 text-base leading-relaxed"
          style={{ color: TEXT }}
        >
          <li>업데이트·배포 관련 REST API 설계 및 구현</li>
          <li>레거시 시스템과의 연동, 데이터 정합성·성능 이슈 대응</li>
          <li>React 기반 내부/파트너용 웹과의 API 계약 협업</li>
          <li>코드 리뷰, 테스트, 문서화</li>
        </ul>

        <h2
          className="mt-14 text-xl font-bold uppercase tracking-tight md:mt-16 md:text-2xl"
          style={{ color: TEXT }}
        >
          자격 요건
        </h2>
        <ul
          className="mt-6 max-w-[730px] list-disc space-y-2 pl-5 text-base leading-relaxed"
          style={{ color: TEXT }}
        >
          <li>Java(Spring 등) 기반 웹 서비스 개발 경력 3년 이상</li>
          <li>React로 화면·상태·API 연동을 구현해 본 경험</li>
          <li>SQL·트랜잭션·캐시 등 백엔드 기본기</li>
          <li>Git 기반 협업, 이슈·PR 중심 커뮤니케이션</li>
        </ul>

        <h2
          className="mt-14 text-xl font-bold uppercase tracking-tight md:mt-16 md:text-2xl"
          style={{ color: TEXT }}
        >
          우대 사항
        </h2>
        <ul
          className="mt-6 max-w-[730px] list-disc space-y-2 pl-5 text-base leading-relaxed"
          style={{ color: TEXT }}
        >
          <li>클라우드·컨테이너 배포 경험</li>
          <li>자동차·모빌리티 도메인 경험</li>
          <li>영어 기술 문서 독해 및 협업 가능 수준</li>
        </ul>

        <div className="mt-16 flex flex-col gap-4 border-t border-zinc-900/10 pt-10 sm:flex-row sm:items-center">
          <Link
            href="/inquiry"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-12 rounded-full border-0 bg-zinc-950 px-8 text-[15px] font-medium text-white hover:bg-zinc-800",
            )}
          >
            지원·문의하기
          </Link>
          <p className="text-sm" style={{ color: MUTED }}>
            실제 지원 채널 연결 전까지는 프로젝트 문의를 통해 연락 주세요.
          </p>
        </div>
      </section>
    </SubPageScaffold>
  );
}
