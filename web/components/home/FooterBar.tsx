"use client";

import Link from "next/link";
import { PentacoreWordmark } from "@/components/brand/PentacoreWordmark";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  liquidGlassInteractiveHoverDark,
  liquidGlassInteractiveHoverLight,
} from "@/lib/figma-liquid-glass";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/about", label: "ABOUT" },
  { href: "/work", label: "WORK" },
  { href: "/hiring", label: "HIRING" },
  { href: "/inquiry", label: "PROJECT INQUIRY" },
] as const;

type Props = {
  visible?: boolean;
  /** true면 첫 프레임은 화면 아래 밖, 이후 아래에서 위로 슬라이드 인 */
  slideInFromBottom?: boolean;
  /** 모바일 푸터: 세로 스택·카피라이트 위치 조정 */
  variant?: "desktop" | "tablet" | "mobile";
  /** HOME_LAYOUT-2 라이트 베이스 — 링크·본문 다크 톤 */
  surface?: "dark" | "light";
  /** 풀스크린 동영상 위 — 푸터 가독성(반투명·블러·구분선 밝게) */
  overVideo?: boolean;
  /** 스크롤 시 리퀴드 글래스 쉘. `overVideo`가 true면 항상 켜짐 */
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

function Divider({ light }: { light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-block h-3 w-px shrink-0",
        light ? "bg-zinc-900/20" : "bg-white/40",
      )}
      aria-hidden
    />
  );
}

export function FooterBar({
  visible = true,
  slideInFromBottom = false,
  variant = "desktop",
  surface = "dark",
  overVideo = false,
  scrollGlass = true,
}: Props) {
  const [entered, setEntered] = useState(!slideInFromBottom);
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => getScrollY() > 6,
    () => false,
  );

  useEffect(() => {
    if (!visible) {
      setEntered(!slideInFromBottom);
      return;
    }
    if (!slideInFromBottom) {
      setEntered(true);
      return;
    }
    setEntered(false);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });
    return () => cancelAnimationFrame(id);
  }, [visible, slideInFromBottom]);

  if (!visible) return null;

  const isMobile = variant === "mobile";
  const pad = isMobile ? "px-6 pb-8 pt-4" : "px-10 pb-10 pt-4";
  const light = surface === "light";
  const onVideo = overVideo && !light;
  const glassShell = onVideo || (scrollGlass && scrolled);
  const glassHover =
    onVideo || !light
      ? liquidGlassInteractiveHoverDark
      : liquidGlassInteractiveHoverLight;
  const logoTone = light ? "text-zinc-950" : "text-white";
  const navTone = light ? "text-zinc-950" : "text-white";
  const bodyTone = light ? "text-zinc-800" : "text-white/90";
  const fineTone = light ? "text-zinc-600" : "text-white/80";

  return (
    <footer
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[100] transition-[transform,background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-out",
        slideInFromBottom && !entered && "translate-y-full",
        glassShell &&
          light &&
          "border-t border-zinc-900/10 bg-[rgb(229,231,235)]/82 backdrop-blur-md supports-[backdrop-filter]:bg-[rgb(229,231,235)]/68",
        glassShell &&
          !light &&
          "border-t border-white/15 bg-black/40 backdrop-blur-md supports-[backdrop-filter]:bg-black/25",
        pad,
      )}
      data-figma="#Footer_home_PC | #Footer_home_PAD | #Footer_home_M"
    >
      <div
        className={
          isMobile
            ? "flex flex-col gap-4"
            : "flex items-end justify-between gap-8"
        }
      >
        <div className="flex max-w-xl flex-col gap-5">
          <Link
            href="/"
            className={cn("inline-flex w-fit rounded-sm", glassHover)}
            aria-label="PENTACORE 홈"
          >
            <PentacoreWordmark
              decorative
              className={cn("h-3.5 w-auto sm:h-4", logoTone)}
            />
          </Link>
          <nav
            className={cn(
              "flex flex-wrap items-center gap-3 text-[16px] font-bold leading-4",
              navTone,
            )}
          >
            {nav.map((item, i) => (
              <span key={item.href} className="flex items-center gap-3">
                {i > 0 ? <Divider light={light} /> : null}
                <Link
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap rounded-sm px-1.5 py-1 -my-1 hover:opacity-90",
                    glassHover,
                  )}
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
          <p
            className={cn(
              "text-[14px] font-medium leading-snug",
              bodyTone,
            )}
          >
            Pentacore weaves the essence of users, partners, and businesses into
            transformative experiences, connecting today to tomorrow with trust and
            innovation.
          </p>
        </div>
        <p
          className={cn(
            "text-[12px] font-medium leading-5 md:text-right",
            fineTone,
          )}
        >
          ⓒ PENTACORE.
        </p>
      </div>
    </footer>
  );
}
