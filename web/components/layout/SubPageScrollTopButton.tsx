"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** 서브페이지용 맨 위로 — 그림자: Y 10px, blur 10px, #000 20% (원형 요소에 적용) */
function BtnTopIcon({ className }: { className?: string }) {
  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx={32} cy={22} r={21.5} fill="white" stroke="black" />
      <path
        d="M32.7071 12.2929C32.3166 11.9024 31.6834 11.9024 31.2929 12.2929L24.9289 18.6569C24.5384 19.0474 24.5384 19.6805 24.9289 20.0711C25.3195 20.4616 25.9526 20.4616 26.3431 20.0711L32 14.4142L37.6569 20.0711C38.0474 20.4616 38.6805 20.4616 39.0711 20.0711C39.4616 19.6805 39.4616 19.0474 39.0711 18.6569L32.7071 12.2929ZM32 32L33 32L33 13L32 13L31 13L31 32L32 32Z"
        fill="black"
      />
    </svg>
  );
}

export function SubPageScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="맨 위로"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed z-[95] size-16 overflow-hidden rounded-full border-0 bg-transparent p-0",
        "bottom-4 right-4 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-zinc-950",
        "shadow-[0_10px_10px_rgba(0,0,0,0.2)]",
        "origin-center transition-[transform,opacity] duration-200 ease-out",
        "hover:scale-110 active:scale-100",
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
    >
      <BtnTopIcon className="block size-full" />
    </button>
  );
}
