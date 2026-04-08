"use client";

import { useEffect, useState } from "react";
import {
  FillSlotImageWithSkeleton,
  ShimmerOverlay,
} from "@/components/media/ImageWithSkeleton";
import { cn } from "@/lib/utils";
import { figmaLogos } from "./figma-work-assets";

/** Figma `LOGOS` COMPONENT_SET `274:22224` — `prop1` 값과 동일 */
export type FigmaLogoVariant =
  | "logo_HM"
  | "logo_GN"
  | "logo_KM"
  | "logo_HAE"
  | "logo_HMS"
  | "logo_SKE"
  | "logo_SS";

type Props = {
  variant: FigmaLogoVariant;
  className?: string;
};

/** Figma crop 좌표 고정 — `next/image` 대신 `img` + 스켈레톤 */
function LogoSsCroppedWithSkeleton() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className="relative h-4 w-[102px] shrink-0 overflow-hidden">
      {!loaded && <ShimmerOverlay className="rounded-sm" />}
      {/* eslint-disable-next-line @next/next/no-img-element -- Figma crop 좌표 고정 */}
      <img
        src={figmaLogos.logo_SS_Image}
        alt=""
        className={cn(
          "absolute left-[-6.49%] top-[-49.09%] h-[197%] w-[112.97%] max-w-none transition-opacity duration-500 ease-out motion-reduce:duration-150",
          loaded ? "opacity-100" : "opacity-0",
        )}
        draggable={false}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

/**
 * Figma `LOGOS` — Dev Mode 스펙(마스크·뷰포트) 그대로 근사.
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
            slotClassName="h-5 w-[39.255px] shrink-0"
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
          <div
            className="relative h-[23.333px] w-[90.667px] shrink-0"
            style={{
              WebkitMaskImage: `url('${figmaLogos.logo_GN_Mask}')`,
              maskImage: `url('${figmaLogos.logo_GN_Mask}')`,
              WebkitMaskSize: "81.296px 17.714px",
              maskSize: "81.296px 17.714px",
              WebkitMaskPosition: "4.667px 2.81px",
              maskPosition: "4.667px 2.81px",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              transform: "translate(-4.67px, -2.81px)",
            }}
          >
            <div className="size-full bg-black" />
          </div>
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
            slotClassName="h-[11.429px] w-[48.296px] shrink-0"
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
          <div
            className="relative h-[21.094px] w-[69.531px] shrink-0"
            style={{
              WebkitMaskImage: `url('${figmaLogos.logo_HAE_Mask}')`,
              maskImage: `url('${figmaLogos.logo_HAE_Mask}')`,
              WebkitMaskSize: "70px 20px",
              maskSize: "70px 20px",
            }}
          >
            <div className="size-full bg-black" />
          </div>
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
          <div
            className="relative h-5 w-[87px] shrink-0"
            style={{
              WebkitMaskImage: `url('${figmaLogos.logo_HMS_Mask}')`,
              maskImage: `url('${figmaLogos.logo_HMS_Mask}')`,
              WebkitMaskSize: "87px 20px",
              maskSize: "87px 20px",
            }}
          >
            <div className="size-full bg-black" />
          </div>
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
          <div
            className="relative h-[30px] w-[62.484px] shrink-0"
            style={{
              WebkitMaskImage: `url('${figmaLogos.logo_SKE_Mask}')`,
              maskImage: `url('${figmaLogos.logo_SKE_Mask}')`,
              WebkitMaskSize: "62.484px 30px",
              maskSize: "62.484px 30px",
            }}
          >
            <div className="size-full bg-black" />
          </div>
        </div>
      );
    case "logo_SS":
      return (
        <div
          className={cn(
            "relative flex h-[30px] flex-col items-center justify-center",
            className,
          )}
          data-figma="LOGOS logo_SS"
        >
          <LogoSsCroppedWithSkeleton />
        </div>
      );
    default:
      return null;
  }
}
