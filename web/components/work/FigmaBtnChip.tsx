"use client";

import Image from "next/image";
import { figmaBtnChip } from "./figma-work-assets";

type Props = {
  label: string;
  href: string;
};

/** Figma `btn_chip` (`279:23037` 등) — Gray 6 배경 + Visit Website + 외부 아이콘 */
export function FigmaBtnChip({ label, href }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full min-w-0 items-center justify-between gap-[18px] rounded-[4px] bg-[#f2f2f7] px-[10px] py-[6px] text-left transition hover:bg-[#e8e8ed]"
      data-figma="btn_chip"
    >
      <span className="min-w-0 flex-1 text-[14px] font-normal leading-[1.7] text-[#1e1e1e]">
        {label}
      </span>
      <span className="flex shrink-0 items-center gap-1">
        <span className="whitespace-nowrap text-[14px] font-bold text-[#1e1e1e]">
          Visit Website
        </span>
        <span className="relative size-5 shrink-0">
          <Image
            src={figmaBtnChip.externalIcon}
            alt=""
            fill
            className="object-contain"
            unoptimized
          />
        </span>
      </span>
    </a>
  );
}
