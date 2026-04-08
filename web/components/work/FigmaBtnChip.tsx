"use client";

import { FillSlotImageWithSkeleton } from "@/components/media/ImageWithSkeleton";
import { liquidGlassInteractiveHoverLight } from "@/lib/figma-liquid-glass";
import { cn } from "@/lib/utils";
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
      className={cn(
        "flex w-full min-w-0 items-center justify-between gap-[18px] rounded-[6px] bg-[#f2f2f7] px-[10px] py-[6px] text-left",
        "transition-[background-color,transform,backdrop-filter,box-shadow] duration-300 ease-out",
        "hover:bg-[#e8e8ed]/80 hover:scale-105 active:scale-[0.98]",
        liquidGlassInteractiveHoverLight,
      )}
      data-figma="btn_chip"
    >
      <span className="min-w-0 flex-1 text-[14px] font-normal leading-[1.7] text-[#1e1e1e]">
        {label}
      </span>
      <span className="flex shrink-0 items-center gap-1">
        <span className="whitespace-nowrap text-[14px] font-bold text-[#1e1e1e]">
          Visit Website
        </span>
        <FillSlotImageWithSkeleton
          src={figmaBtnChip.externalIcon}
          alt=""
          slotClassName="size-5"
          sizes="48px"
          imageClassName="object-contain"
          unoptimized
        />
      </span>
    </a>
  );
}
