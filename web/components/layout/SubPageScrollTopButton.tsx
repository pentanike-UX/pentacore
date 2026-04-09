"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

function subscribeHeaderNavOpen(onStoreChange: () => void) {
  const el = document.documentElement;
  const obs = new MutationObserver(onStoreChange);
  obs.observe(el, { attributes: true, attributeFilter: ["data-header-nav-open"] });
  return () => obs.disconnect();
}

function snapshotHeaderNavOpen() {
  return document.documentElement.hasAttribute("data-header-nav-open");
}

function serverHeaderNavOpen() {
  return false;
}

/** 서브페이지용 맨 위로 — 그림자: Y 10px, blur 10px, #000 20% (원형 요소에 적용) */
function BtnTopIcon({ className }: { className?: string }) {
  return (
    <svg
      width={44}
      height={44}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx={22} cy={22} r={21.5} fill="white" stroke="black" />
      <path
        d="M22.7071 12.2929C22.3166 11.9024 21.6834 11.9024 21.2929 12.2929L14.9289 18.6569C14.5384 19.0474 14.5384 19.6805 14.9289 20.0711C15.3195 20.4616 15.9526 20.4616 16.3431 20.0711L22 14.4142L27.6569 20.0711C28.0474 20.4616 28.6805 20.4616 29.0711 20.0711C29.4616 19.6805 29.4616 19.0474 29.0711 18.6569L22.7071 12.2929ZM22 32L23 32L23 13L22 13L21 13L21 32L22 32Z"
        fill="black"
      />
    </svg>
  );
}

/**
 * 딤: 헤더 풀스크린 메뉴 `z-[90]` 아래.
 * 비딤: `z-[280]` — 푸터 `z-10`·헤더 `z-[100–110]`·커서 오버레이 `z-[200]` 위, 토스트 `z-[300]` 아래.
 * `fixed` 단일 버튼 대신 전역 셸로 쌓임 맥락 고정 + 모바일 하단 여백으로 인라인 푸터와 겹침 완화.
 */
const Z_DIMMED = 85;
const Z_TOP = 280;

export function SubPageScrollTopButton() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const navDimmed = useSyncExternalStore(
    subscribeHeaderNavOpen,
    snapshotHeaderNavOpen,
    serverHeaderNavOpen,
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const node = (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 flex items-end justify-end",
        "p-4 pr-[max(1rem,env(safe-area-inset-right,0px))] pb-[max(1rem,env(safe-area-inset-bottom,0px))]",
        /* 인라인 푸터(모바일) 높이만큼 위로 — 시각·탭 여유 */
        "max-md:pb-[max(6.5rem,env(safe-area-inset-bottom,0px))]",
      )}
      style={{ zIndex: navDimmed ? Z_DIMMED : Z_TOP }}
      aria-hidden={!visible}
    >
      <button
        type="button"
        onClick={scrollTop}
        aria-label="맨 위로"
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        className={cn(
          "pointer-events-auto size-11 shrink-0 overflow-hidden rounded-full border-0 bg-transparent p-0",
          "outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-zinc-950",
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
    </div>
  );

  if (!mounted || typeof document === "undefined") return null;
  return createPortal(node, document.body);
}
