"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  FixedImageWithSkeleton,
  ImageFillWithSkeleton,
  ShimmerOverlay,
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
  WORKS_SEC1_HERO_IMAGE,
  workImages,
} from "./work-assets";
import { FigmaBtnChip } from "./FigmaBtnChip";
import { FigmaLogos } from "./FigmaLogos";

const TEXT = "#1e1e1e";
const MUTED = "#757575";

/** 이미지 하단 캡션 — 12컬 중앙 8칸(col 3–10), 모바일·태블릿은 전폭·텍스트 가운데 */
const WORKS_IMAGE_CAPTION_CLASS =
  "col-span-12 mt-5 text-center text-xs font-normal leading-snug lg:col-span-8 lg:col-start-3";

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
    korea: "https://update.hyundai.com",
    us: "https://update.hyundai.com/US/EN/home",
    eu: "https://update.hyundai.com/EU/EN/home",
  },
  kia: {
    korea: "https://update.kia.com",
    us: "https://update.kia.com/US/EN/home",
    eu: "https://update.kia.com/EU/EN/home",
  },
  genesis: {
    korea: "https://update.genesis.com",
    us: "https://update.genesis.com/US/EN/home",
    eu: "https://update.genesis.com/EU/EN/home",
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
        "grid grid-cols-12 gap-x-5 gap-y-6 md:gap-x-8 lg:items-center lg:gap-y-0",
        noDivider
          ? "pt-0"
          : "border-t border-black/10 pt-14 first:border-t-0 first:pt-0",
      )}
    >
      {/* 로고: 6~7열 · CTA: 8열부터 12열까지 */}
      <div className="col-span-12 flex min-h-[72px] w-full min-w-0 items-center md:min-h-[80px] lg:col-span-2 lg:col-start-6">
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
      <div className="col-span-12 min-w-0 lg:col-span-5 lg:col-start-8">
        {children}
      </div>
    </div>
  );
}

/**
 * `public/work` PNG는 네이티브 `<img>`로 직접 링크 (`/_next/image`·긴 srcset 없음).
 * 원격(Figma) URL만 `next/image` fill 사용.
 */
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
  const [loaded, setLoaded] = useState(false);
  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setLoaded(true);
  }, []);

  if (src.startsWith("/work/")) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden bg-transparent",
          className,
        )}
        style={{ aspectRatio: ratio }}
      >
        {!loaded && <ShimmerOverlay />}
        {/* eslint-disable-next-line @next/next/no-img-element -- 로컬 정적 PNG 직링크 의도 */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={onLoad}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-out motion-reduce:duration-150",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
    );
  }

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
 * sec_4 ST-FO-005/030: 컨테이너만 줄이면 30px radius가 상대적으로 과해짐.
 * 324×800 Figma 수치를 유지한 뒤 `scale`로만 축소한다.
 */
function Scaled324x800PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative overflow-visible",
        "aspect-[324/800] w-[calc(324px*0.56)] md:w-[calc(324px*0.72)]",
        "lg:aspect-auto lg:h-auto lg:w-[324px]",
      )}
    >
      <div
        className={cn(
          "absolute left-0 top-0 w-[324px] origin-top-left will-change-transform",
          "scale-[0.56] md:scale-[0.72]",
          "lg:relative lg:scale-100",
        )}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * sec_5 ST-FO-111: 40px/20px 라운드·보더를 데스크톱 픽셀로 유지하고 뷰포트에 맞게 scale만 조정.
 */
function Scaled898x686DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full overflow-visible",
        /* max-lg만 고정 폭+scale — lg에서 md 너비 규칙이 남으면 데스크톱이 ~610px로 고정됨 */
        "aspect-[898/686] w-[min(100%,calc(898px*0.38))] max-lg:mx-auto",
        "md:w-[min(100%,calc(898px*0.52))]",
        "lg:aspect-auto lg:h-auto lg:w-full lg:max-w-none",
      )}
    >
      <div
        className={cn(
          "absolute left-0 top-0 w-[898px] max-w-none origin-top-left will-change-transform",
          "scale-[0.38] md:scale-[0.52]",
          "lg:relative lg:left-auto lg:top-auto lg:w-full lg:scale-100",
        )}
      >
        {children}
      </div>
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
            src={WORKS_SEC1_HERO_IMAGE}
            alt="Genesis navigation update — home"
            ratio="964/731"
          />
        </div>
          </div>
          <p className={WORKS_IMAGE_CAPTION_CLASS} style={{ color: MUTED }}>
            Official U.S. Genesis Update Website – Home Screen
          </p>
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
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
              <p
                className="col-span-12 whitespace-pre-line text-sm font-bold leading-relaxed lg:col-span-5"
                style={{ color: TEXT }}
              >
                {ROLES_BLOCK}
              </p>
              <p
                className="col-span-12 max-w-[730px] text-base font-normal leading-relaxed lg:col-span-7 lg:col-start-6 lg:max-w-none"
                style={{ color: TEXT }}
              >
                {INTRO_BODY}
              </p>
            </div>
          </div>

          {/* 브랜드 행: 전역 12칸(로고 6~7열, CTA 8~12열) · 상·하 14rem 패딩 */}
          <div
            className="col-span-12 py-[8.75rem] md:py-[11.2rem] lg:py-[14rem]"
            data-figma="sec_2 chips"
          >
            <div className="space-y-32 md:space-y-40 lg:space-y-48">
              <BrandRow
                noDivider
                title={<FigmaLogos variant="logo_HM" presentation="feature" />}
              >
                <div className="flex flex-col gap-[14px]">
                  <FigmaBtnChip
                    label="Official Hyundai Motors Navigation Update Website - KOREA"
                    href={BRAND_LINKS.hyundai.korea}
                  />
                  <FigmaBtnChip
                    label="Official Hyundai Motors Navigation Update Website - USA"
                    href={BRAND_LINKS.hyundai.us}
                  />
                  <FigmaBtnChip
                    label="Official Hyundai Motors Navigation Update Website - EU"
                    href={BRAND_LINKS.hyundai.eu}
                  />
                </div>
              </BrandRow>
              <BrandRow
                noDivider
                title={<FigmaLogos variant="logo_KM" presentation="feature" />}
              >
                <div className="flex flex-col gap-[14px]">
                  <FigmaBtnChip
                    label="Official Kia Navigation Update Website - KOREA"
                    href={BRAND_LINKS.kia.korea}
                  />
                  <FigmaBtnChip
                    label="Official Kia Navigation Update Website - USA"
                    href={BRAND_LINKS.kia.us}
                  />
                  <FigmaBtnChip
                    label="Official Kia Navigation Update Website - EU"
                    href={BRAND_LINKS.kia.eu}
                  />
                </div>
              </BrandRow>
              <BrandRow
                noDivider
                title={<FigmaLogos variant="logo_GN" presentation="feature" />}
              >
                <div className="flex flex-col gap-[14px]">
                  <FigmaBtnChip
                    label="Official Genesis Navigation Update Website - KOREA"
                    href={BRAND_LINKS.genesis.korea}
                  />
                  <FigmaBtnChip
                    label="Official Genesis Navigation Update Website - USA"
                    href={BRAND_LINKS.genesis.us}
                  />
                  <FigmaBtnChip
                    label="Official Genesis Navigation Update Website - EU"
                    href={BRAND_LINKS.genesis.eu}
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
          </div>
          <p className={WORKS_IMAGE_CAPTION_CLASS} style={{ color: MUTED }}>
            Official Notice Content Templating and UI Design – Latest Update
            Screen
          </p>
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

            <div className="col-span-12 mt-16 grid grid-cols-12 gap-x-3 gap-y-10 md:gap-y-0 md:gap-x-6 lg:mt-24 lg:gap-x-8">
              <p
                className="col-span-12 min-w-0 text-sm leading-relaxed md:col-span-4 md:text-base lg:max-w-[355px]"
                style={{ color: TEXT }}
              >
                {SEC4_BODY}
              </p>
              <div className="col-span-12 flex min-w-0 flex-row items-start justify-center gap-2 md:col-span-8 md:justify-end md:gap-4 lg:gap-12">
                <div className="flex shrink-0 flex-col">
                  <Scaled324x800PhoneFrame>
                    <BorderedVerticalLoop
                      borderWidth={11}
                      aspectRatio="324/800"
                      src={workImages.loop005Full}
                      alt=""
                      slowDuration={13}
                      fastDuration={2.8}
                      sdsFrame
                    />
                  </Scaled324x800PhoneFrame>
                </div>
                <div className="mt-[132px] flex shrink-0 flex-col md:mt-12 lg:mt-[40.8125rem]">
                  <Scaled324x800PhoneFrame>
                    <BorderedVerticalLoop
                      borderWidth={11}
                      aspectRatio="324/800"
                      src={workImages.loop024Full}
                      alt=""
                      slowDuration={11}
                      fastDuration={3}
                      sdsFrame
                    />
                  </Scaled324x800PhoneFrame>
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
          </div>
          <div className="col-span-12 mt-[7.75rem] md:mt-[10rem] lg:mt-[12.5rem]">
            <FigImage
              src={hyundaiWorksViewImages.flowStep1}
              alt="Select model — step 1"
              ratio="893/573"
            />
          </div>
          <p className={WORKS_IMAGE_CAPTION_CLASS} style={{ color: MUTED }}>
            Select Model – Step 1
          </p>
          <div className="col-span-12 mt-[7.75rem] md:mt-[10rem] lg:mt-[12.5rem]">
            <FigImage
              src={hyundaiWorksViewImages.flowStep2}
              alt="Select year — step 2"
              ratio="893/573"
            />
          </div>
          <p className={WORKS_IMAGE_CAPTION_CLASS} style={{ color: MUTED }}>
            Select Year – Step 2
          </p>
          <div className="col-span-12 mt-[7.75rem] md:mt-[10rem] lg:mt-[12.5rem]">
            <FigImage
              src={hyundaiWorksViewImages.flowStep3}
              alt="Results and download — step 3"
              ratio="893/573"
            />
          </div>
          <p className={WORKS_IMAGE_CAPTION_CLASS} style={{ color: MUTED }}>
            Results &amp; Download – Step 3
          </p>
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
            {/* Philosophy: 데스크톱 6칸 너비 · 모바일 전폭 */}
            <p
              className="col-span-12 mt-[4rem] text-left text-base leading-relaxed md:mt-[5rem] lg:col-span-6 lg:col-start-1 lg:mt-[6.25rem]"
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
            </div>
            <p className={WORKS_IMAGE_CAPTION_CLASS} style={{ color: MUTED }}>
              Check Updates for Your Vehicle – My Page Screen
            </p>
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
              className="col-span-12 mt-[7.75rem] text-left text-base leading-relaxed md:mt-[10rem] lg:col-span-6 lg:col-start-1 lg:mt-[12.5rem]"
              style={{ color: TEXT }}
            >
              {SEC5_BODY}
            </p>
            <div className="col-span-12 mx-auto mt-[7.75rem] w-full max-w-[1280px] md:mt-[10rem] lg:mt-[12.5rem]">
              <div className="w-full min-w-0">
                <Scaled898x686DeviceFrame>
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
                </Scaled898x686DeviceFrame>
              </div>
            </div>
            <p className={WORKS_IMAGE_CAPTION_CLASS} style={{ color: MUTED }}>
              Share Your Update Experience and View Insights – Update Review
              Screen
            </p>
          </Grid12>
          </ParallaxLayer>
        </section>

        {/* 크레딧 — 12컬럼 기준 col 7~12 좌측 정렬 (Figma 레퍼런스) */}
        <section
          className={cn(
            "mx-auto max-w-[1280px] py-14 pb-24 md:py-20 md:pb-32",
            SUB_PAGE_COLUMN_GUTTER_X,
          )}
          data-figma="HD | HAE | credits"
          aria-label="클라이언트 및 크레딧"
        >
          <ParallaxLayer yRange={WORKS_DETAIL_PARALLAX_Y} className="w-full">
            <Grid12>
              <p
                className="col-span-12 text-[clamp(1.5rem,4vw,2.25rem)] font-bold leading-tight tracking-tight lg:col-span-6 lg:col-start-7"
                style={{ color: TEXT }}
              >
                Thanks for watching.
              </p>

              <div
                className="col-span-12 mt-16 space-y-12 lg:col-span-2 lg:col-start-7 lg:mt-20 lg:space-y-0"
                data-figma="HYUNDAI MOTORS"
              >
                <p
                  className="text-sm font-bold uppercase tracking-tight"
                  style={{ color: TEXT }}
                >
                  HYUNDAI MOTORS
                </p>
                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt style={{ color: MUTED }}>PM</dt>
                    <dd className="mt-1 space-y-1 font-semibold">
                      <div>Doo won Yoo</div>
                      <div>Eun ji Jeong</div>
                    </dd>
                  </div>
                </dl>
              </div>
              <div
                className="col-span-12 mt-8 space-y-0 lg:col-span-4 lg:col-start-9 lg:mt-20"
                data-figma="HYUNDAI AUTOEVER"
              >
                <p
                  className="text-sm font-bold uppercase tracking-tight"
                  style={{ color: TEXT }}
                >
                  HYUNDAI AUTOEVER
                </p>
                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt style={{ color: MUTED }}>PM</dt>
                    <dd className="mt-1 font-semibold">Se jong Lee</dd>
                  </div>
                  <div>
                    <dt style={{ color: MUTED }}>Tech PL</dt>
                    <dd className="mt-1 font-semibold">Ji hoon Jung</dd>
                  </div>
                </dl>
              </div>

              <footer
                className="col-span-12 mt-16 space-y-8 lg:col-span-6 lg:col-start-7 lg:mt-20"
                data-figma="PENTACORE credits"
              >
                <p
                  className="text-sm font-bold uppercase tracking-tight"
                  style={{ color: TEXT }}
                >
                  PENTACORE
                </p>
                <div className="space-y-6 text-sm leading-relaxed md:space-y-7">
                  <CreditLine
                    role="Project Lead (PM &amp; UX Lead)"
                    names="Tae hun Oh"
                  />
                  <CreditLine
                    role="Service Planner &amp; Delivery Coordinator"
                    names="Tae hun Oh, Seung ki Park"
                  />
                  <CreditLine role="UIUX" names="Kyung hoon Park" />
                  <CreditLine
                    role="Front-end Developer"
                    names="Kwang hee Kwon, Gun tae Lim"
                  />
                  <CreditLine role="Publisher" names="Ji seung Na" />
                  <CreditLine
                    role="Back-end Developer"
                    names="Seok hyun Cho, Seon joo Kim, Eun hye Ahn, Ji yong Cheon, Jae hong Lee"
                  />
                </div>
              </footer>
            </Grid12>
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
      <p className="mt-1 font-semibold" style={{ color: TEXT }}>
        {names}
      </p>
    </div>
  );
}
