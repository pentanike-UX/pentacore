"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  liquidGlassInteractiveHoverDark,
  liquidGlassInteractiveHoverLight,
} from "@/lib/figma-liquid-glass";
import { cn } from "@/lib/utils";
import { assets } from "./figma-assets";

type Props = {
  /** 패드/모바일 헤더 높이·패딩 축소 */
  compact?: boolean;
  /**
   * 라이트 페이지(SUB_WORK 등): 다크와 **동일 레이아웃**, 색만 반전
   * (메뉴 bg / 테두리 / 라인 — Figma Header_PC)
   */
  surface?: "dark" | "light";
  /** false면 렌더하지 않음 (INTRO·HOME_LAYOUT-1 초기 구간) */
  visible?: boolean;
  /** true면 첫 프레임은 화면 위 밖, 이후 위에서 아래로 슬라이드 인 */
  slideInFromTop?: boolean;
  /** 풀스크린 동영상 위 — 로고 반전·반투명·블러로 대비 확보 */
  overVideo?: boolean;
};

export function HeaderBar({
  compact,
  surface = "dark",
  visible = true,
  slideInFromTop = false,
  overVideo = false,
}: Props) {
  const [entered, setEntered] = useState(!slideInFromTop);

  useEffect(() => {
    if (!visible) {
      setEntered(!slideInFromTop);
      return;
    }
    if (!slideInFromTop) {
      setEntered(true);
      return;
    }
    setEntered(false);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });
    return () => cancelAnimationFrame(id);
  }, [visible, slideInFromTop]);

  const light = surface === "light";
  const onVideo = overVideo && !light;
  const glassHover =
    onVideo || !light
      ? liquidGlassInteractiveHoverDark
      : liquidGlassInteractiveHoverLight;
  const p = compact ? "px-6 py-5" : "px-10 py-10";
  const logoH = compact ? 14 : 17;
  const logoW = compact ? 118 : 143;

  if (!visible) return null;

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] flex items-center justify-between transition-transform duration-[450ms] ease-out",
        slideInFromTop && !entered && "-translate-y-full",
        onVideo &&
          "border-b border-white/15 bg-black/40 backdrop-blur-md supports-[backdrop-filter]:bg-black/25",
        p,
      )}
      data-figma="Header_PC | Header_PAD&Mobile"
    >
      <Link
        href="/"
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-md",
          glassHover,
        )}
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
            onVideo && "brightness-0 invert",
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
          "relative size-11 shrink-0 overflow-hidden rounded-md border-0",
          glassHover,
          light
            ? "bg-zinc-950/10 text-zinc-950 hover:bg-zinc-950/[0.14] hover:text-zinc-950"
            : "bg-white/20 text-white hover:bg-white/30 hover:text-white",
        )}
      >
        <span
          className={cn(
            "absolute left-1 top-1 size-9 border-2",
            light ? "border-zinc-950" : "border-white",
          )}
        />
        <Image
          src={assets.homeMenuUnion}
          alt=""
          width={16}
          height={2}
          className={cn("absolute left-[14px] top-[14px]", light && "brightness-0")}
          unoptimized
        />
        <Image
          src={assets.homeMenuUnion}
          alt=""
          width={16}
          height={2}
          className={cn("absolute left-[14px] top-[21px]", light && "brightness-0")}
          unoptimized
        />
        <Image
          src={assets.homeMenuUnion}
          alt=""
          width={16}
          height={2}
          className={cn("absolute left-[14px] top-[28px]", light && "brightness-0")}
          unoptimized
        />
      </Button>
    </header>
  );
}
