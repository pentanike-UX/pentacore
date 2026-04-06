"use client";

import Image from "next/image";
import { ParallaxLayer } from "./Parallax";
import { figmaThumbHmg } from "./figma-work-assets";

/** SUB_WORK `thumb_HMG` — 전폭 2560×1073 이중 이미지 + dim */
export function WorkThumbHmg() {
  return (
    <section
      className="relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden"
      data-figma="thumb_HMG"
    >
      <ParallaxLayer
        yRange={[-12, 12]}
        className="relative aspect-[2560/1073] w-full"
      >
        <Image
          src={figmaThumbHmg.image13}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
          unoptimized
        />
        <Image
          src={figmaThumbHmg.image14}
          alt=""
          fill
          className="object-cover object-center opacity-85 mix-blend-multiply"
          style={{ objectPosition: "center 40%" }}
          sizes="100vw"
          unoptimized
        />
        <div
          className="pointer-events-none absolute inset-0 bg-black/20"
          aria-hidden
        />
      </ParallaxLayer>
    </section>
  );
}
