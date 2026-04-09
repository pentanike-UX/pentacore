"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  FixedImageWithSkeleton,
  ImageFillWithSkeleton,
} from "@/components/media/ImageWithSkeleton";
import { IMAGE_SIZES_CONTENT_1280 } from "@/lib/image-presets";
import { SUB_WORK_PAGE_BG } from "@/lib/figma-liquid-glass";
import { SUB_PAGE_COLUMN_GUTTER_X } from "@/lib/sub-page-gutters";
import { SubPageScaffold } from "@/components/layout/SubPageScaffold";
import { cn } from "@/lib/utils";
import { BorderedVerticalLoop } from "./BorderedVerticalLoop";
import { ParallaxLayer, ParallaxViewport } from "./Parallax";
import {
  WORKS_LIST_BACK_ICON_SRC,
  WORKS_VIEW_PF_06_SRC,
} from "./figma-work-assets";
import {
  hyundaiWorksViewImages,
  ST_FO_111_FULL_INTRINSIC,
  workImages,
} from "./work-assets";
import { FigmaBtnChip } from "./FigmaBtnChip";
import { FigmaLogos } from "./FigmaLogos";

const TEXT = "#1e1e1e";
const MUTED = "#757575";

/**
 * 작품 상세(SUB_WORK): 섹션별 `translateY` 페럴렉스는 **레이아웃 박스는 그대로** 두고 그리기만 이동한다.
 * 스크롤 구간에 따라 아래 섹션이 위 섹션 위로 겹쳐 그려져 margin/padding이 “덮인 것처럼” 보인다(sec_2↔sec_3 등).
 * 이 뷰에서는 페럴렉스를 끄고 픽셀 스펙 간격을 그대로 쓴다.
 */
const WORKS_DETAIL_PARALLAX_Y = [0, 0] as const;

const META_ROWS = [
  { label: "Renewal Project Timeline", value: "2024.06 ~ 2025.03" },
  { label: "Maintenance Timeline", value: "2020 ~ 2025" },
  { label: "Industry", value: "Automobile Manufacturer" },
  { label: "Deliverables", value: "Website Renewal" },
] as const;

const ROLES_BLOCK =
  "Website Renewal\nUX/UI Redesign\nFront-end Development\nBack-end Integration\nQA & Performance Optimization";

const INTRO_BODY =
  "현대자동차그룹 주요 브랜드의 내비게이션 업데이트 공식 홈페이지를 전면 리뉴얼하며, 브랜드별 사용자 흐름을 통합적으로 재정리하고 업데이트 경험을 더 직관적으로 개선했습니다. UI 디자인은 현대자동차 내부 디자인 시스템 및 가이드라인을 준수하여 브랜드 일관성을 유지하는 동시에 다양한 차량·기기 환경에서 안정적인 사용자 경험을 제공하도록 구축했습니다.";

const BRAND_LINKS = {
  hyundai: {
    kr: "https://update.hyundai.com",
    us: "https://update.hyundaiusa.com",
  },
  kia: {
    kr: "https://update.kia.com/kr",
    us: "https://update.kia.com/us/en",
  },
  genesis: {
    kr: "https://www.genesis.com/kr/ko/support/download-center",
    us: "https://update.genesis.com",
  },
} as const;

const SEC3_BODY_A =
  "심플한 텍스트와 이미지를 활용한 효과적인 정보전달.\n복잡하고 어려운 기존의 내비게이션 업데이트 방식을 \n찾기 쉽고, 간편하게 설치할 수 있도록 가이드 방법을 개선하는데 주력했습니다.";

const SEC3_BODY_B =
  "심플하고 명확한 메시지를 중심으로 새롭게 선보이는\n기능과 콘텐츠를 쉽고 효과적으로 콘텐츠를 탐색하고 이해할 수 있도록 각 섹션을 구성하였습니다. ";

const SEC4_BODY =
  "빌트인 캠·디스플레이오디오·내비게이션 업데이트 프로그램을 찾고 내 차량과의 호환 여부를 자연스러운 흐름 속에서 확인할 수 있습니다. 다운로드 전 필수 검증 과정을 더 명확하고 직관적으로 정리해 사용자가 흔들림 없이 올바른 소프트웨어를 받을 수 있도록 UX를 재설계했습니다.";

const SEC4IN_BODY =
  "통합된 Pleos 계정으로 로그인하면 등록된 차량의 소프트웨어 정보를 더 정확하게 확인할 수 있으며, 업데이트 가능 여부도 더욱 직관적으로 파악할 수 있습니다. 사용자별 차량 데이터를 기반으로 불필요한 검색 단계를 줄이고 가장 적합한 업데이트 경험을 제공하도록 설계했습니다.";

const SEC5_BODY =
  "업데이트 리뷰는 로그인한 사용자의 보유 차량 정보를 기반으로 소프트웨어 업데이트 기능과 실제 주행 경험을 함께 기록할 수 있는 기능입니다. 사용자는 업데이트 이후 차량의 변화와 만족도를 직접 남기며 더 나은 서비스 개선 방향에 기여할 수 있습니다. 이를 통해 사용자 실사용 데이터를 바탕으로 한 진정성 있는 업데이트 경험 생태계를 구축합니다.";

/** 중간구분 — fill #000, stroke #FFF 4px (Figma 스펙) */
function WorksSectionDivider({ className }: { className?: string }) {
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

function BrandRow({
  title,
  children,
  noDivider,
}: {
  title: ReactNode;
  children: ReactNode;
  /** sec_2 chips — 행 사이 보더 구분선 없음 */
  noDivider?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:gap-14",
        noDivider
          ? "pt-0"
          : "border-t border-black/10 pt-14 first:border-t-0 first:pt-0",
      )}
    >
      <div className="flex min-h-[50px] w-full max-w-[280px] shrink-0 flex-wrap items-center gap-[10px]">
        {typeof title === "string" ? (
          <span
            className="text-[15px] font-bold tracking-tight"
            style={{ color: TEXT }}
          >
            {title}
          </span>
        ) : (
          title
        )}
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function FigImage({
  src,
  alt,
  ratio,
  className,
}: {
  src: string;
  alt: string;
  ratio: string;
  className?: string;
}) {
  return (
    <ImageFillWithSkeleton
      src={src}
      alt={alt}
      aspectRatio={ratio}
      className={cn("bg-transparent", className)}
      imageClassName="object-top"
      objectFit="cover"
      sizes={IMAGE_SIZES_CONTENT_1280}
      unoptimized={src.startsWith("https://")}
    />
  );
}

/** Figma `GRID12` — 1280 내 12컬럼, gutter ~16–24px */
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

/**
 * Figma `/works_view` (node 279:22974) — 라이트 베이스 + Rectangle 27 밴드, 섹션 순서·카피 정합.
 */
export function WorksDetailView() {
  return (
    <SubPageScaffold
      as="main"
      backgroundColor={SUB_WORK_PAGE_BG}
      className="antialiased"
      style={{ color: TEXT }}
      data-figma="/works_view"
    >
      <div className="border-b border-zinc-900/10 pb-6 pt-[4.5rem] sm:pt-[5.75rem] md:pb-8 md:pt-[7.75rem]">
        <div
          className={cn("mx-auto max-w-[1280px]", SUB_PAGE_COLUMN_GUTTER_X)}
        >
          <Link
            href="/work"
            className="inline-flex size-[50px] shrink-0 items-center justify-center transition-opacity hover:opacity-70"
            aria-label="WORK 목록"
          >
            <FixedImageWithSkeleton
              src={WORKS_LIST_BACK_ICON_SRC}
              alt=""
              width={50}
              height={50}
              sizes="100px"
              unoptimized
              className="block"
            />
          </Link>
        </div>
      </div>

      <ParallaxViewport yRange={WORKS_DETAIL_PARALLAX_Y} className="block">
      {/* Title + summery + divider — SUB_WORK 동일 베이스 */}
      <div
        className={cn(
          "mx-auto max-w-[1280px] pb-14 md:pb-20",
          SUB_PAGE_COLUMN_GUTTER_X,
        )}
      >
        <Grid12>
          <ParallaxLayer
            yRange={WORKS_DETAIL_PARALLAX_Y}
            className="col-span-12 lg:col-span-8"
          >
            <header
              className="flex max-w-[609px] flex-col"
              data-figma="Title"
            >
              {/* PENTAGRAM PF_06 — P 위, 116×60, 상단 여백 ~100px */}
              <div
                className="relative mt-[4rem] h-[60px] w-[116px] shrink-0 md:mt-[5rem] lg:mt-[6.25rem]"
                aria-hidden
                data-figma="PF_06"
              >
                <FixedImageWithSkeleton
                  src={WORKS_VIEW_PF_06_SRC}
                  alt=""
                  width={116}
                  height={60}
                  sizes="240px"
                  unoptimized
                  className="object-contain object-left"
                />
              </div>
              <p
                className="mt-5 text-[28px] font-normal leading-tight tracking-tight"
                style={{ color: TEXT }}
              >
                현대자동차 그룹
              </p>
              <h1
                className="mt-5 text-[clamp(1.75rem,5vw,2.625rem)] font-bold leading-tight tracking-tight md:text-[42px]"
                style={{ color: TEXT }}
              >
                내비게이션 업데이트 공식 홈페이지
              </h1>
            </header>
          </ParallaxLayer>
          <ParallaxLayer
            yRange={WORKS_DETAIL_PARALLAX_Y}
            className="col-span-12"
          >
            <dl
              className="mt-14 flex max-w-[756px] flex-wrap gap-x-12 gap-y-5 md:mt-20"
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
          </ParallaxLayer>
        </Grid12>
      </div>

      <ParallaxLayer
        yRange={WORKS_DETAIL_PARALLAX_Y}
        className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2"
      >
        <div className="w-full" data-figma="중간구분 이미지">
          <FigImage
            src={hyundaiWorksViewImages.sectionDivider}
            alt=""
            ratio="1280/605"
          />
        </div>
      </ParallaxLayer>

      {/* sec_1 — 위·아래 14rem */}
      <section
        className={cn(
          "mx-auto max-w-[1280px] py-[8.75rem] md:py-[11.2rem] lg:py-[14rem]",
          SUB_PAGE_COLUMN_GUTTER_X,
        )}
        data-figma="sec_1"
      >
        <ParallaxLayer yRange={WORKS_DETAIL_PARALLAX_Y} className="w-full">
        <Grid12>
          <div className="col-span-12 flex justify-center lg:col-span-10 lg:col-start-2">
        <div className="w-full max-w-[964px]">
          <FigImage
            src={hyundaiWorksViewImages.heroHome}
            alt="Genesis navigation update — home"
            ratio="964/731"
          />
          <p
            className="mt-5 text-xs font-normal leading-snug"
            style={{ color: MUTED }}
          >
            Official U.S. Genesis Update Website – Home Screen
          </p>
        </div>
          </div>
        </Grid12>
        </ParallaxLayer>
      </section>

      {/* sec_2 — 위·아래 14rem; 칩 영역도 상·하 14rem */}
      <section
        className={cn(
          "mx-auto max-w-[1280px] py-[8.75rem] md:py-[11.2rem] lg:py-[14rem]",
          SUB_PAGE_COLUMN_GUTTER_X,
        )}
        data-figma="sec_2"
      >
        <ParallaxLayer yRange={WORKS_DETAIL_PARALLAX_Y} className="w-full">
        <Grid12>
          <div className="col-span-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0 xl:gap-x-24">
              <p
                className="whitespace-pre-line text-sm font-bold leading-relaxed"
                style={{ color: TEXT }}
              >
                {ROLES_BLOCK}
              </p>
              <p
                className="max-w-[730px] text-base font-normal leading-relaxed lg:max-w-none"
                style={{ color: TEXT }}
              >
                {INTRO_BODY}
              </p>
            </div>
          </div>

          {/* 데스크톱(lg+): 12컬 중 5~12열 · 칩 영역 상·하 14rem 패딩(본문↔칩 구간 포함) */}
          <div
            className="col-span-12 py-[8.75rem] md:py-[11.2rem] lg:col-span-8 lg:col-start-5 lg:py-[14rem]"
            data-figma="sec_2 chips"
          >
            <div className="space-y-32 md:space-y-40 lg:space-y-48">
              <BrandRow
                noDivider
                title={<FigmaLogos variant="logo_HM" />}
              >
                <div className="flex flex-col gap-[14px]">
                  <FigmaBtnChip
                    label="Official Hyundai Motors Navigation Update Website - KOREA"
                    href={BRAND_LINKS.hyundai.kr}
                  />
                  <FigmaBtnChip
                    label="Official Hyundai Motors Navigation Update Website - USA"
                    href={BRAND_LINKS.hyundai.us}
                  />
                </div>
              </BrandRow>
              <BrandRow noDivider title={<FigmaLogos variant="logo_KM" />}>
                <div className="flex flex-col gap-[14px]">
                  <FigmaBtnChip
                    label="Official Kia Navigation Update Website - KOREA"
                    href={BRAND_LINKS.kia.kr}
                  />
                  <FigmaBtnChip
                    label="Official Kia Navigation Update Website - USA"
                    href={BRAND_LINKS.kia.us}
                  />
                </div>
              </BrandRow>
              <BrandRow noDivider title={<FigmaLogos variant="logo_GN" />}>
                <div className="flex flex-col gap-[14px]">
                  <FigmaBtnChip
                    label="Official Genesis Navigation Update Website - KOREA"
                    href={BRAND_LINKS.genesis.kr}
                  />
                  <FigmaBtnChip
                    label="Official Genesis Navigation Update Website - USA"
                    href={BRAND_LINKS.genesis.us}
                  />
                </div>
              </BrandRow>
            </div>
          </div>
        </Grid12>
        </ParallaxLayer>
      </section>

      {/* sec_3 — 라이트 */}
      <section
        className={cn(
          "mx-auto max-w-[1280px] pb-16 md:pb-24",
          SUB_PAGE_COLUMN_GUTTER_X,
        )}
        data-figma="sec_3"
      >
        <ParallaxLayer yRange={WORKS_DETAIL_PARALLAX_Y} className="w-full">
        <Grid12>
          <div className="col-span-12">
            <WorksSectionDivider />
            <h2
              className="mt-10 max-w-[1128px] text-[clamp(2rem,7vw,5rem)] font-bold uppercase leading-[1.05] tracking-tight lg:mt-12 lg:text-[80px]"
              style={{ color: TEXT }}
            >
              Redefining the Future of Movement with Human-Centered Innovation
            </h2>
          </div>
          {/* Philosophy: sec_2와 동일 — lg+ 12칸을 2열로 분산 */}
          <div className="col-span-12 mt-[7.75rem] md:mt-[10rem] lg:mt-[12.5rem]">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0 xl:gap-x-24">
              <p
                className="whitespace-pre-line text-left text-base leading-relaxed"
                style={{ color: TEXT }}
              >
                {SEC3_BODY_A}
              </p>
              <p
                className="whitespace-pre-line text-left text-base leading-relaxed"
                style={{ color: TEXT }}
              >
                {SEC3_BODY_B}
              </p>
            </div>
          </div>
          <div className="col-span-12 mt-[9.25rem] w-full md:mt-[12rem] lg:mt-[15rem]">
            <FigImage
              src={hyundaiWorksViewImages.latestUpdateSample}
              alt="Latest update screen sample"
              ratio="938/726"
            />
            <p className="mt-5 text-xs leading-snug" style={{ color: MUTED }}>
              Official Notice Content Templating and UI Design – Latest Update
              Screen
            </p>
          </div>
        </Grid12>
        </ParallaxLayer>
      </section>

      {/* sec_4 ~ 크레딧 — 페이지 단일 배경 */}
        <section
          className={cn(
            "mx-auto max-w-[1280px] pb-0 pt-20 md:pb-0 md:pt-28",
            SUB_PAGE_COLUMN_GUTTER_X,
          )}
          data-figma="sec_4"
        >
          <ParallaxLayer yRange={WORKS_DETAIL_PARALLAX_Y} className="w-full">
          <Grid12>
            <div className="col-span-12">
            <WorksSectionDivider />
            <h2
              className="mt-10 text-[clamp(1.75rem,5vw,3.75rem)] font-bold uppercase leading-[1.08] tracking-tight lg:mt-12 lg:text-[80px]"
              style={{ color: TEXT }}
            >
              An Intuitive Download Flow, Without the Complexity.
            </h2>
            </div>

            <div className="col-span-12 mt-16 grid grid-cols-12 gap-y-16 lg:mt-24 lg:gap-x-8">
              <p
                className="col-span-12 max-w-[355px] text-base leading-relaxed lg:col-span-4"
                style={{ color: TEXT }}
              >
                {SEC4_BODY}
              </p>
              <div className="col-span-12 flex flex-col items-center gap-16 lg:col-span-8 lg:flex-row lg:items-start lg:justify-end lg:gap-12">
                <div className="w-full max-w-[324px] shrink-0 lg:w-[324px]">
                  <p className="mb-4 text-xs md:mb-5" style={{ color: MUTED }}>
                    ST-FO-005_BIC_m
                  </p>
                  <BorderedVerticalLoop
                    borderWidth={11}
                    aspectRatio="324/800"
                    src={workImages.loop005Full}
                    alt=""
                    slowDuration={13}
                    fastDuration={2.8}
                    sdsFrame
                  />
                </div>
                <div className="w-full max-w-[324px] shrink-0 lg:mt-[40.8125rem] lg:w-[324px]">
                  <p className="mb-4 text-xs md:mb-5" style={{ color: MUTED }}>
                    ST-FO-030_m
                  </p>
                  <BorderedVerticalLoop
                    borderWidth={11}
                    aspectRatio="324/800"
                    src={workImages.loop024Full}
                    alt=""
                    slowDuration={11}
                    fastDuration={3}
                    sdsFrame
                  />
                </div>
              </div>
            </div>
          </Grid12>
          </ParallaxLayer>
        </section>

        {/* sec_4/in */}
        <section
          className={cn(
            "mx-auto max-w-[1280px] pb-16 pt-[11.5rem] md:pt-[15rem] md:pb-24 lg:pt-[18.75rem]",
            SUB_PAGE_COLUMN_GUTTER_X,
          )}
          data-figma="sec_4/in_sec_"
        >
          <ParallaxLayer yRange={WORKS_DETAIL_PARALLAX_Y} className="w-full">
          <Grid12>
          <div className="col-span-12">
            <h2
              className="max-w-[893px] text-[clamp(1.5rem,4vw,3.75rem)] font-normal not-italic tracking-tight lg:text-[60px]"
              style={{ color: TEXT, lineHeight: "100%", fontWeight: 400 }}
            >
              Update the software optimized for your vehicle
              <br className="hidden sm:block" />
              —all in one step.
            </h2>
            <div className="mt-[7.75rem] space-y-[7.75rem] md:mt-[10rem] md:space-y-[10rem] lg:mt-[12.5rem] lg:space-y-[12.5rem]">
              <div>
                <FigImage
                  src={hyundaiWorksViewImages.flowStep1}
                  alt="Select model — step 1"
                  ratio="893/573"
                />
                <p className="mt-5 text-xs leading-snug" style={{ color: MUTED }}>
                  Select Model – Step 1
                </p>
              </div>
              <div>
                <FigImage
                  src={hyundaiWorksViewImages.flowStep2}
                  alt="Select year — step 2"
                  ratio="893/573"
                />
                <p className="mt-5 text-xs leading-snug" style={{ color: MUTED }}>
                  Select Year – Step 2
                </p>
              </div>
              <div>
                <FigImage
                  src={hyundaiWorksViewImages.flowStep3}
                  alt="Results and download — step 3"
                  ratio="893/573"
                />
                <p className="mt-5 text-xs leading-snug" style={{ color: MUTED }}>
                  Results &amp; Download – Step 3
                </p>
              </div>
            </div>
          </div>
          </Grid12>
          </ParallaxLayer>
        </section>

        {/* sec_4in */}
        <section
          className={cn(
            "mx-auto max-w-[1280px] py-16 md:py-24",
            SUB_PAGE_COLUMN_GUTTER_X,
          )}
          data-figma="sec_4in_sec_"
        >
          <ParallaxLayer yRange={WORKS_DETAIL_PARALLAX_Y} className="w-full">
          <Grid12>
            <div className="col-span-12">
              <h2
                className="max-w-[893px] text-[clamp(1.5rem,4vw,3.75rem)] font-bold uppercase leading-[1.1] tracking-tight lg:text-[60px]"
                style={{ color: TEXT }}
              >
                Precision Updates, Powered by Your Registered Vehicle.
              </h2>
            </div>
            {/* Philosophy: 우측 3칸(col 10–12) · 모바일 전폭 */}
            <p
              className="col-span-12 mt-[4rem] text-left text-base leading-relaxed md:mt-[5rem] lg:col-span-3 lg:col-start-10 lg:mt-[6.25rem]"
              style={{ color: TEXT }}
            >
              {SEC4IN_BODY}
            </p>
            <div className="col-span-12 mt-[4rem] md:mt-[5rem] lg:mt-[6.25rem]">
              <FigImage
                src={hyundaiWorksViewImages.myPageFlow}
                alt="My page — check updates"
                ratio="893/1117"
              />
              <p className="mt-5 text-xs leading-snug" style={{ color: MUTED }}>
                Check Updates for Your Vehicle – My Page Screen
              </p>
            </div>
          </Grid12>
          </ParallaxLayer>
        </section>

        {/* sec_5 */}
        <section
          className={cn(
            "mx-auto max-w-[1280px] py-16 md:py-28",
            SUB_PAGE_COLUMN_GUTTER_X,
          )}
          data-figma="sec_5"
        >
          <ParallaxLayer yRange={WORKS_DETAIL_PARALLAX_Y} className="w-full">
          <Grid12>
            <div className="col-span-12">
              <WorksSectionDivider />
              <h2
                className="mt-10 text-[clamp(2rem,7vw,5rem)] font-bold uppercase leading-[1.05] tracking-tight lg:mt-12 lg:text-[80px]"
                style={{ color: TEXT }}
              >
                Understanding the Update Through Your Journey.
              </h2>
            </div>
            <p
              className="col-span-12 mt-[7.75rem] text-left text-base leading-relaxed md:mt-[10rem] lg:col-span-3 lg:col-start-5 lg:mt-[12.5rem]"
              style={{ color: TEXT }}
            >
              {SEC5_BODY}
            </p>
            <div className="col-span-12 mx-auto mt-[7.75rem] w-full max-w-[1280px] md:mt-[10rem] lg:mt-[12.5rem]">
              <p className="mb-4 text-xs md:mb-5" style={{ color: MUTED }}>
                ST-FO-111
              </p>
              <div className="w-full min-w-0">
                <BorderedVerticalLoop
                  borderWidth={20}
                  aspectRatio="898/686"
                  src={workImages.loop111Full}
                  alt=""
                  slowDuration={16}
                  fastDuration={3.5}
                  stfo111Frame
                  stfo111Shadow
                  imgIntrinsicWidth={ST_FO_111_FULL_INTRINSIC.width}
                  imgIntrinsicHeight={ST_FO_111_FULL_INTRINSIC.height}
                />
              </div>
              <p className="mt-5 text-xs leading-snug" style={{ color: MUTED }}>
                Share Your Update Experience and View Insights – Update Review
                Screen
              </p>
            </div>
          </Grid12>
          </ParallaxLayer>
        </section>

        {/* HD / HAE + 크레딧 푸터 — 모바일 1열 · md 2열 · lg 4열 */}
        <section
          className={cn(
            "mx-auto max-w-[1280px] py-14 pb-24 md:py-20 md:pb-32",
            SUB_PAGE_COLUMN_GUTTER_X,
          )}
          data-figma="HD | HAE | Frame 1739335350"
          aria-label="클라이언트 및 크레딧"
        >
          <ParallaxLayer yRange={WORKS_DETAIL_PARALLAX_Y} className="w-full">
            <div className="grid grid-cols-1 gap-y-14 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
              <div data-figma="HD HYUNDAI_MOTOR_GROUP">
                <p
                  className="text-sm font-bold uppercase tracking-tight"
                  style={{ color: TEXT }}
                >
                  HYUNDAI MOTOR GROUP
                </p>
                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt style={{ color: MUTED }}>PM</dt>
                    <dd className="font-semibold">Doo won Yoo</dd>
                  </div>
                  <div>
                    <dt style={{ color: MUTED }}>Tech PL</dt>
                    <dd className="font-semibold">Ji hoon Jung</dd>
                  </div>
                </dl>
              </div>
              <div data-figma="HAE HYUNDAI_AUTOEVER">
                <p
                  className="text-sm font-bold uppercase tracking-tight"
                  style={{ color: TEXT }}
                >
                  HYUNDAI AUTOEVER
                </p>
                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt style={{ color: MUTED }}>PMO</dt>
                    <dd className="font-semibold">Se jong Lee</dd>
                  </div>
                  <div>
                    <dt style={{ color: MUTED }}>Tech PL</dt>
                    <dd className="font-semibold">Ji hoon Jung</dd>
                  </div>
                </dl>
              </div>
              <footer
                className="md:col-span-2 lg:col-span-2"
                data-figma="Frame 1739335350"
              >
                <div className="mx-auto max-w-[503px] space-y-14 md:mx-0 md:max-w-none md:space-y-16 lg:max-w-[min(100%,42rem)]">
                  <p
                    className="whitespace-pre-line text-[clamp(1.5rem,4vw,2.25rem)] font-normal leading-tight tracking-tight"
                    style={{ color: TEXT }}
                  >
                    Thanks{"\n"}for watching.
                  </p>
                  <div className="space-y-6 text-sm leading-relaxed md:space-y-7">
                    <CreditLine
                      role="Project Lead (PM &amp; UX Lead)"
                      names="Tae hun OH"
                    />
                    <CreditLine role="UIUX" names="Kyung hoon Park" />
                    <CreditLine
                      role="Front-end Developer"
                      names="Kwang hee Kwon, Gun tae Lim"
                    />
                    <CreditLine role="Publisher" names="Ji seung Na" />
                    <CreditLine
                      role="Service Planner &amp; Delivery Coordinator"
                      names="Tae hun OH, Seung ki Park"
                    />
                    <CreditLine
                      role="Back-end Developer"
                      names="Seok hyun Cho, Seon joo Kim, Eun hye Ahn, Ji yong Cheon, Jae hong Lee"
                    />
                  </div>
                  <p className="text-xs font-light" style={{ color: TEXT }}>
                    ⓒ PENTACORE.
                  </p>
                </div>
              </footer>
            </div>
          </ParallaxLayer>
        </section>
      </ParallaxViewport>
    </SubPageScaffold>
  );
}

function CreditLine({ role, names }: { role: string; names: string }) {
  return (
    <div>
      <p style={{ color: MUTED }}>{role}</p>
      <p className="mt-1 font-medium" style={{ color: TEXT }}>
        {names}
      </p>
    </div>
  );
}
