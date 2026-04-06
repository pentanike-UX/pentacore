"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { assets } from "./figma-assets";

type Props = {
  /** 패드/모바일 헤더 높이·패딩 축소 */
  compact?: boolean;
  /** SUB_WORK 등 라이트 배경 — Figma Header_PC (검정 로고·메뉴) */
  surface?: "dark" | "light";
};

export function HeaderBar({ compact, surface = "dark" }: Props) {
  const light = surface === "light";
  const p = compact ? "px-6 py-5" : "px-10 py-10";
  const logoH = compact ? 14 : 17;
  const logoW = compact ? 118 : 143;

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-40 flex items-center justify-between",
        p,
        light && "text-zinc-950",
      )}
      data-figma={light ? "Header_PC (light surface)" : "Header_PC | Header_PAD&Mobile"}
    >
      <Link
        href="/"
        className="relative block shrink-0"
        style={{ width: logoW, height: logoH }}
        aria-label="홈"
      >
        <Image
          src={assets.homeHeaderLogo}
          alt="PENTACORE"
          width={143}
          height={17}
          className={cn(
            "h-full w-auto object-contain object-left",
            light && "brightness-0",
          )}
          priority
          unoptimized
        />
      </Link>
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        aria-label="메뉴"
        className={cn(
          "relative size-11 shrink-0 overflow-hidden rounded-none",
          light
            ? "border-2 border-zinc-950 bg-white text-zinc-950 hover:bg-zinc-50 hover:text-zinc-950"
            : "border-0 bg-white/20 text-white hover:bg-white/30 hover:text-white",
        )}
      >
        {!light ? (
          <>
            <span className="absolute left-1 top-1 size-9 border-2 border-white" />
            <Image
              src={assets.homeMenuUnion}
              alt=""
              width={16}
              height={2}
              className="absolute left-[14px] top-[14px]"
              unoptimized
            />
            <Image
              src={assets.homeMenuUnion}
              alt=""
              width={16}
              height={2}
              className="absolute left-[14px] top-[21px]"
              unoptimized
            />
            <Image
              src={assets.homeMenuUnion}
              alt=""
              width={16}
              height={2}
              className="absolute left-[14px] top-[28px]"
              unoptimized
            />
          </>
        ) : (
          <span className="absolute left-[14px] top-[14px] flex w-4 flex-col gap-[7px]">
            <span className="h-0.5 w-full bg-zinc-950" />
            <span className="h-0.5 w-full bg-zinc-950" />
            <span className="h-0.5 w-full bg-zinc-950" />
          </span>
        )}
      </Button>
    </header>
  );
}
