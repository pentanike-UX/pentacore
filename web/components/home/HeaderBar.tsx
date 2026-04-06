"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { assets } from "./figma-assets";

type Props = {
  /** 패드/모바일 헤더 높이·패딩 축소 */
  compact?: boolean;
};

export function HeaderBar({ compact }: Props) {
  const p = compact ? "px-6 py-5" : "px-10 py-10";
  const logoH = compact ? 14 : 17;
  const logoW = compact ? 118 : 143;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 flex items-center justify-between ${p}`}
      data-figma="Header_PC | Header_PAD&Mobile"
    >
      <div className="relative shrink-0" style={{ width: logoW, height: logoH }}>
        <Image
          src={assets.homeHeaderLogo}
          alt="PENTACORE"
          width={143}
          height={17}
          className="h-full w-auto object-contain object-left"
          priority
          unoptimized
        />
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        aria-label="메뉴"
        className="relative size-11 shrink-0 overflow-hidden rounded-none border-0 bg-white/20 text-white hover:bg-white/30 hover:text-white"
      >
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
      </Button>
    </header>
  );
}
