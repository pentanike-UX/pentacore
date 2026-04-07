"use client";

import Image from "next/image";
import { SUB_WORK_PAGE_BG } from "@/lib/figma-liquid-glass";
import { cn } from "@/lib/utils";
import { ParallaxLayer } from "./Parallax";

/** SUB_WORK `thumb_HMG` — 로컬 PNG(알파 유지), 1024×429 근사 비율 */
export function WorkThumbHmg({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden",
        className,
      )}
      style={{ backgroundColor: SUB_WORK_PAGE_BG }}
      data-figma="thumb_HMG"
    >
      <ParallaxLayer yRange={[-12, 12]} className="w-full">
        <div
          className="relative aspect-[1024/429] w-full"
          style={{ backgroundColor: SUB_WORK_PAGE_BG }}
        >
          <Image
            src="/work/img_thumb_HMG.png"
            alt=""
            fill
            className="object-contain object-center"
            data-figma="img_thumb_HMG"
            sizes="100vw"
            priority
            unoptimized
          />
        </div>
      </ParallaxLayer>
    </section>
  );
}
