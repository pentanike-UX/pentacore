"use client";

import { ImageFillWithSkeleton } from "@/components/media/ImageWithSkeleton";
import { IMAGE_SIZES_FULL_BLEED } from "@/lib/image-presets";
import { SUB_WORK_PAGE_BG } from "@/lib/figma-liquid-glass";
import { cn } from "@/lib/utils";
import { ParallaxLayer } from "./Parallax";

/** SUB_WORK `thumb_HMG` — 로컬 PNG(알파 유지), 1024×429 근사 비율 */
export function WorkThumbHmg({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-visible",
        className,
      )}
      style={{ backgroundColor: SUB_WORK_PAGE_BG }}
      data-figma="thumb_HMG"
    >
      <ParallaxLayer yRange={[-12, 12]} className="w-full">
        <div
          className="relative w-full"
          style={{ backgroundColor: SUB_WORK_PAGE_BG }}
          data-figma="img_thumb_HMG"
        >
          <ImageFillWithSkeleton
            src="/work/img_thumb_HMG.png"
            alt=""
            aspectRatio="1024/429"
            className="bg-transparent"
            imageClassName="object-center"
            objectFit="contain"
            sizes={IMAGE_SIZES_FULL_BLEED}
            priority
            unoptimized
          />
        </div>
      </ParallaxLayer>
    </section>
  );
}
