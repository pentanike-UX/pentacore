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
};

/**
 * Figma `LOGOS` 레이아웃 근사 — 에셋은 `public/work/logo_*.png` (`figmaLogos`).
 */
export function FigmaLogos({ variant, className }: Props) {
  switch (variant) {
    case "logo_HM":
      return (
        <div
          className={cn(
            "relative flex h-[30px] w-[39px] flex-col items-center justify-center",
            className,
          )}
          data-figma="LOGOS logo_HM"
        >
          <FillSlotImageWithSkeleton
            src={figmaLogos.logo_HM_Vector}
            alt=""
            slotClassName="h-5 w-[39px] shrink-0"
            sizes="96px"
            imageClassName="object-contain object-center"
            unoptimized
          />
        </div>
      );
    case "logo_GN":
      return (
        <div
          className={cn(
            "relative flex h-[30px] w-[81px] flex-col items-center justify-center overflow-hidden",
            className,
          )}
          data-figma="LOGOS logo_GN"
        >
          <FillSlotImageWithSkeleton
            src={figmaLogos.logo_GN_Mask}
            alt=""
            slotClassName="h-[22px] w-[81px] shrink-0"
            sizes="180px"
            imageClassName="object-contain object-center"
            unoptimized
          />
        </div>
      );
    case "logo_KM":
      return (
        <div
          className={cn(
            "relative flex h-[30px] w-[49px] flex-col items-center justify-center",
            className,
          )}
          data-figma="LOGOS logo_KM"
        >
          <FillSlotImageWithSkeleton
            src={figmaLogos.logo_KM_Group}
            alt=""
            slotClassName="h-[14px] w-[49px] shrink-0"
            sizes="120px"
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
