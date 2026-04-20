"use client";

import { FillSlotImageWithSkeleton } from "@/components/media/ImageWithSkeleton";
import { cn } from "@/lib/utils";
import { figmaLogos } from "./figma-work-assets";

/** Figma `LOGOS` COMPONENT_SET `274:22224` — `prop1` 값과 동일 */
export type FigmaLogoVariant =
  | "logo_HM"
  | "logo_GN"
  | "logo_KM"
  | "logo_HAE"
  | "logo_HMS"
  | "logo_LGE"
  | "logo_SKE"
  | "logo_SS";

type Props = {
  variant: FigmaLogoVariant;
  className?: string;
  /**
   * `row`: 포트폴리오 행 등 소형(기본).
   * `feature`: `/works/hyundai-navigation` sec_2 등 — 동일 높이 기준으로 브랜드별 슬롯만 조정해 밀도감 맞춤.
   */
  presentation?: "row" | "feature";
};

/**
 * Figma `LOGOS` 레이아웃 근사 — 에셋은 `public/work/logo_*.png` (`figmaLogos`).
 */
export function FigmaLogos({
  variant,
  className,
  presentation = "row",
}: Props) {
  const feat = presentation === "feature";

  switch (variant) {
    case "logo_HM":
      return (
        <div
          className={cn(
            feat
              ? "relative flex h-[76px] w-[min(100%,148px)] flex-col items-start justify-center sm:h-[84px] sm:w-[min(100%,164px)]"
              : "relative flex h-[30px] w-[39px] flex-col items-center justify-center",
            className,
          )}
          data-figma="LOGOS logo_HM"
        >
          <FillSlotImageWithSkeleton
            src={figmaLogos.logo_HM_Vector}
            alt=""
            slotClassName={
              feat
                ? "h-[64px] w-[min(100%,140px)] shrink-0 sm:h-[72px] sm:w-[156px]"
                : "h-5 w-[39px] shrink-0"
            }
            sizes={feat ? "200px" : "96px"}
            imageClassName="object-contain object-center"
            unoptimized
          />
        </div>
      );
    case "logo_GN":
      return (
        <div
          className={cn(
            feat
              ? "relative flex h-[76px] w-full max-w-[300px] flex-col items-start justify-center overflow-visible sm:h-[84px] sm:max-w-[320px]"
              : "relative flex h-[30px] w-[81px] flex-col items-center justify-center overflow-hidden",
            className,
          )}
          data-figma="LOGOS logo_GN"
        >
          <FillSlotImageWithSkeleton
            src={figmaLogos.logo_GN_Mask}
            alt=""
            slotClassName={
              feat
                ? "h-[52px] w-[min(100%,300px)] shrink-0 sm:h-[58px] sm:w-[308px]"
                : "h-[22px] w-[81px] shrink-0"
            }
            sizes={feat ? "360px" : "180px"}
            imageClassName="object-contain object-center"
            unoptimized
          />
        </div>
      );
    case "logo_KM":
      return (
        <div
          className={cn(
            feat
              ? "relative flex h-[76px] w-full max-w-[240px] flex-col items-start justify-center sm:h-[84px] sm:max-w-[260px]"
              : "relative flex h-[30px] w-[49px] flex-col items-center justify-center",
            className,
          )}
          data-figma="LOGOS logo_KM"
        >
          <FillSlotImageWithSkeleton
            src={figmaLogos.logo_KM_Group}
            alt=""
            slotClassName={
              feat
                ? "h-[42px] w-[min(100%,236px)] shrink-0 sm:h-[46px] sm:w-[252px]"
                : "h-[14px] w-[49px] shrink-0"
            }
            sizes={feat ? "280px" : "120px"}
            imageClassName="object-contain object-center"
            unoptimized
          />
        </div>
      );
    case "logo_HAE":
      return (
        <div
          className={cn(
            "relative flex h-[30px] flex-col items-center justify-center",
            className,
          )}
          data-figma="LOGOS logo_HAE"
        >
          <FillSlotImageWithSkeleton
            src={figmaLogos.logo_HAE_Mask}
            alt=""
            slotClassName="h-5 w-[70px] shrink-0"
            sizes="160px"
            imageClassName="object-contain object-center"
            unoptimized
          />
        </div>
      );
    case "logo_HMS":
      return (
        <div
          className={cn(
            "relative flex h-[30px] w-[87px] flex-col items-center justify-center overflow-hidden",
            className,
          )}
          data-figma="LOGOS logo_HMS"
        >
          <FillSlotImageWithSkeleton
            src={figmaLogos.logo_HMS_Mask}
            alt=""
            slotClassName="h-5 w-[87px] shrink-0"
            sizes="200px"
            imageClassName="object-contain object-center"
            unoptimized
          />
        </div>
      );
    case "logo_LGE":
      return (
        <div
          className={cn(
            "relative flex h-[30px] w-[88px] flex-col items-center justify-center overflow-hidden",
            className,
          )}
          data-figma="LOGOS logo_LGE"
        >
          <FillSlotImageWithSkeleton
            src={figmaLogos.logo_LGE_Image}
            alt=""
            slotClassName="h-5 w-[88px] shrink-0"
            sizes="200px"
            imageClassName="object-contain object-center"
            unoptimized
          />
        </div>
      );
    case "logo_SKE":
      return (
        <div
          className={cn(
            "relative flex h-[30px] flex-col items-center justify-center",
            className,
          )}
          data-figma="LOGOS logo_SKE"
        >
          <FillSlotImageWithSkeleton
            src={figmaLogos.logo_SKE_Mask}
            alt=""
            slotClassName="h-[26px] w-[63px] shrink-0"
            sizes="140px"
            imageClassName="object-contain object-center"
            unoptimized
          />
        </div>
      );
    case "logo_SS":
      return (
        <div
          className={cn(
            "relative flex h-[30px] w-[102px] flex-col items-center justify-center overflow-hidden",
            className,
          )}
          data-figma="LOGOS logo_SS"
        >
          <FillSlotImageWithSkeleton
            src={figmaLogos.logo_SS_Image}
            alt=""
            slotClassName="h-5 w-[102px] shrink-0"
            sizes="220px"
            imageClassName="object-contain object-center"
            unoptimized
          />
        </div>
      );
    default:
      return null;
  }
}
