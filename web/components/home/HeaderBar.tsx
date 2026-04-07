"use client";

import Link from "next/link";
import { PentacoreWordmark } from "@/components/brand/PentacoreWordmark";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { HeaderMenuIcon } from "./HeaderMenuIcon";
import { HeaderNavOverlay } from "./HeaderNavOverlay";
import {
  liquidGlassInteractiveHoverDark,
  liquidGlassInteractiveHoverLight,
} from "@/lib/figma-liquid-glass";
import { cn } from "@/lib/utils";

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
  /**
   * 스크롤 시 리퀴드 글래스 쉘(반투명·블러·구분선). `overVideo`가 true면 항상 켜짐.
   */
  scrollGlass?: boolean;
};

function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}

function getScrollY() {
  return (
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

export function HeaderBar({
  compact,
  surface = "dark",
  visible = true,
  slideInFromTop = false,
  overVideo = false,
  scrollGlass = true,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [entered, setEntered] = useState(!slideInFromTop);
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => getScrollY() > 6,
    () => false,
  );

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
  const glassShell =
    onVideo || (scrollGlass && scrolled);
  const glassHover =
    onVideo || !light
      ? liquidGlassInteractiveHoverDark
      : liquidGlassInteractiveHoverLight;
  /** 홈·서브 공통 — 가장자리 패딩 1rem */
  const p = "p-4";
  const logoTone = light ? "text-zinc-950" : "text-white";

  if (!visible) return null;

  return (
    <>
    <HeaderNavOverlay
      open={menuOpen}
      onClose={() => setMenuOpen(false)}
      light={light}
    />
    <header
      className={cn(
        "fixed left-0 right-0 top-0 flex items-center justify-between transition-[transform,background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-out",
        menuOpen ? "z-[110]" : "z-[100]",
        slideInFromTop && !entered && "-translate-y-full",
        glassShell &&
          light &&
          "border-b border-zinc-900/10 bg-[rgb(229,231,235)]/82 backdrop-blur-md supports-[backdrop-filter]:bg-[rgb(229,231,235)]/68",
        glassShell &&
          !light &&
          "border-b border-white/15 bg-black/40 backdrop-blur-md supports-[backdrop-filter]:bg-black/25",
        p,
      )}
      data-figma="Header_PC | Header_PAD&Mobile"
    >
      <Link
        href="/"
        className={cn(
          "relative inline-flex shrink-0 items-center rounded-md",
          glassHover,
        )}
        aria-label="홈"
      >
        <PentacoreWordmark
          decorative
          className={cn(
            "w-auto",
            compact ? "h-3.5" : "h-[17px]",
            logoTone,
          )}
        />
      </Link>
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-controls="header-fullscreen-nav"
        onClick={() => setMenuOpen((o) => !o)}
        className={cn(
          "relative size-11 shrink-0 overflow-visible rounded-md border-0 bg-transparent",
          light
            ? "text-zinc-950 hover:bg-zinc-950/[0.08]"
            : "text-white hover:bg-white/[0.12]",
        )}
      >
        <HeaderMenuIcon open={menuOpen} light={light} />
      </Button>
    </header>
    </>
  );
}
