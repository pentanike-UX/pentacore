"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { figmaAboutPentagram } from "./figma-about-assets";

type Props = {
  className?: string;
};

/**
 * Figma `PENTAGRAM` 인스턴스 `315:78000` — opacity·듀얼 벡터 레이어.
 */
export function AboutPentagramFigma({ className }: Props) {
  return (
    <div
      className={cn(
        "relative size-full opacity-[0.14] md:opacity-[0.11]",
        className,
      )}
      data-figma="PENTAGRAM"
      data-node-id="315:78000"
    >
      <div className="absolute left-0 top-0 flex h-[47px] w-[91px] items-center justify-center">
        <div className="flex-none rotate-180">
          <div className="relative h-[47px] w-[91px]">
            <Image
              src={figmaAboutPentagram.vector11}
              alt=""
              fill
              className="object-contain"
              sizes="120px"
              unoptimized
            />
          </div>
        </div>
      </div>
      <div className="absolute left-[0.5px] top-[0.5px] h-[46px] w-[90.5px]">
        <Image
          src={figmaAboutPentagram.vector37}
          alt=""
          fill
          className="object-contain"
          sizes="120px"
          unoptimized
        />
      </div>
    </div>
  );
}
