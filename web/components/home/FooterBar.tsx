"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
};

function Divider({ light }: { light?: boolean }) {
  if (light) {
    return (
      <span
        className="inline-block h-3 w-px shrink-0 bg-zinc-300"
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
}: Props) {
  const [entered, setEntered] = useState(!slideInFromBottom);

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

  return (
    <footer
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 transition-transform duration-[450ms] ease-out",
        slideInFromBottom && !entered && "translate-y-full",
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
                {i > 0 ? <Divider light={light} /> : null}
                <Link href={item.href} className="whitespace-nowrap hover:opacity-80">
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
