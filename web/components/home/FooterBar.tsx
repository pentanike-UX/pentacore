"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  liquidGlassInteractiveHoverDark,
  liquidGlassInteractiveHoverLight,
} from "@/lib/figma-liquid-glass";
import { cn } from "@/lib/utils";
import { assets } from "./figma-assets";

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

function Divider({ light, onVideo }: { light?: boolean; onVideo?: boolean }) {
  if (light) {
    return (
      <span
        className="inline-block h-3 w-px shrink-0 bg-zinc-300"
        aria-hidden
      />
    );
  }
  if (onVideo) {
    return (
      <span
        className="inline-block h-3 w-px shrink-0 bg-white/35"
        aria-hidden
      />
    );
  }
  return (
    <div className="flex h-2.5 w-0 items-center justify-center">
      <div className="h-px w-2.5 rotate-90">
        <Image
          src={assets.footerDivider}
          alt=""
          width={10}
          height={1}
          className="block h-px w-2.5"
          unoptimized
        />
      </div>
    </div>
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
          <nav
            className={
              light
                ? "flex flex-wrap items-center gap-3 text-[16px] font-bold leading-4 text-zinc-950"
                : "flex flex-wrap items-center gap-3 text-[16px] font-bold leading-4 text-white"
            }
          >
            {nav.map((item, i) => (
              <span key={item.href} className="flex items-center gap-3">
                {i > 0 ? <Divider light={light} onVideo={onVideo} /> : null}
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
            className={
              light
                ? "text-[14px] font-medium leading-snug text-zinc-600"
                : "text-[14px] font-medium leading-[14px] text-white"
            }
          >
            Pentacore weaves the essence of users, partners, and businesses into
            transformative experiences, connecting today to tomorrow with trust and
            innovation.
          </p>
        </div>
        <p
          className={
            light
              ? "text-[12px] font-medium leading-5 text-zinc-500 md:text-right"
              : "text-[12px] font-medium leading-5 text-white md:text-right"
          }
        >
          ⓒ PENTACORE.
        </p>
      </div>
    </footer>
  );
}
