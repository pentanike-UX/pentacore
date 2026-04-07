"use client";

import Image from "next/image";
import { SUB_WORK_PAGE_BG } from "@/lib/figma-liquid-glass";
import { ParallaxLayer } from "./Parallax";
import { figmaImgThumbHmg } from "./figma-work-assets";

/** SUB_WORK `thumb_HMG` — `img_thumb_HMG` 전폭, 2560×1073 근사 비율 */
export function WorkThumbHmg() {
  return (
    <section
      className="relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden"
      style={{ backgroundColor: SUB_WORK_PAGE_BG }}
      data-figma="thumb_HMG"
    >
      <ParallaxLayer yRange={[-12, 12]} className="w-full">
        <div
          className="relative aspect-[2560/1073] w-full"
          style={{ backgroundColor: SUB_WORK_PAGE_BG }}
        >
          <Image
            src={figmaImgThumbHmg}
            alt=""
            fill
            className="object-cover object-center"
            data-figma="img_thumb_HMG"
            sizes="100vw"
            priority
            unoptimized
          />
          <div
            className="pointer-events-none absolute inset-0 bg-black/15"
            aria-hidden
          />
        </div>
      </ParallaxLayer>
    </section>
  );
}
