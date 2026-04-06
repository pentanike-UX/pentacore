"use client";

import Image from "next/image";
import Link from "next/link";
import { assets } from "./figma-assets";

const nav = [
  { href: "/about", label: "ABOUT" },
  { href: "/work", label: "WORK" },
  { href: "/hiring", label: "HIRING" },
  { href: "/inquiry", label: "PROJECT INQUIRY" },
] as const;

type Props = {
  visible?: boolean;
  /** 모바일 푸터: 세로 스택·카피라이트 위치 조정 */
  variant?: "desktop" | "tablet" | "mobile";
};

function Divider() {
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

export function FooterBar({ visible = true, variant = "desktop" }: Props) {
  if (!visible) return null;

  const isMobile = variant === "mobile";
  const pad = isMobile ? "px-6 pb-8 pt-4" : "px-10 pb-10 pt-4";

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 z-50 ${pad}`}
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
          <nav className="flex flex-wrap items-center gap-3 text-[16px] font-bold leading-4 text-white">
            {nav.map((item, i) => (
              <span key={item.href} className="flex items-center gap-3">
                {i > 0 ? <Divider /> : null}
                <Link href={item.href} className="whitespace-nowrap hover:opacity-80">
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
          <p className="text-[14px] font-medium leading-[14px] text-white">
            Pentacore weaves the essence of users, partners, and businesses into
            transformative experiences, connecting today to tomorrow with trust and
            innovation.
          </p>
        </div>
        <p className="text-[12px] font-medium leading-5 text-white md:text-right">
          ⓒ PENTACORE.
        </p>
      </div>
    </footer>
  );
}
