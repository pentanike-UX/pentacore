"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { NavMenuHoverLink } from "@/components/nav/NavMenuHoverLink";
import { HomeIsoBadges } from "@/components/home/home-iso-badges";
import { PENTACORE_MANIFESTO_PARAGRAPH } from "@/components/home/home-manifesto";
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
  /**
   * `fixed` — 홈형 하단 고정 글래스.
   * `inline` — 서브페이지 문서 흐름, `bg-white`·relative (공통 푸터 대신 서브 푸터).
   */
  placement?: "fixed" | "inline";
  /** true면 ABOUT / WORK 등 하단 내비 링크 숨김 (홈 전용) */
  hideNav?: boolean;
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
  placement = "fixed",
  hideNav = false,
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
  const light = surface === "light";
  const onVideo = overVideo && !light;
  const isFixed = placement === "fixed";
  /** 인라인 서브 푸터는 항상 흰 배경·다크 타이포 */
  const inlineSub = !isFixed;
  /** 홈·서브 공통 — 가장자리 패딩 1rem */
  const pad = "p-4";
  const glassShell =
    isFixed && (onVideo || (scrollGlass && scrolled));
  const glassHover =
    onVideo || !light
      ? liquidGlassInteractiveHoverDark
      : liquidGlassInteractiveHoverLight;
  const navTone = inlineSub || light ? "text-zinc-950" : "text-white";
  const bodyTone = inlineSub || light ? "text-zinc-800" : "text-white/90";
  const fineTone = inlineSub || light ? "text-zinc-600" : "text-white/80";
  const dividerLight = inlineSub || light;
  /** 홈 고정 푸터: 뱃지 좌·저작권 우 유지, 세로는 `items-center`로 맞춤 */
  const isoHomeFooter = isFixed && hideNav;

  return (
    <footer
      className={cn(
        "transition-[transform,background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-out",
        isFixed &&
          "fixed bottom-0 left-0 right-0 z-[100]",
        !isFixed &&
          "relative z-10 mt-auto w-full border-t border-zinc-200 bg-white",
        isFixed && slideInFromBottom && !entered && "translate-y-full",
        glassShell &&
          light &&
          "border-t border-zinc-900/10 bg-[rgb(229,231,235)]/82 backdrop-blur-md supports-[backdrop-filter]:bg-[rgb(229,231,235)]/68",
        glassShell &&
          !light &&
          "border-t border-white/15 bg-black/40 backdrop-blur-md supports-[backdrop-filter]:bg-black/25",
        pad,
      )}
      data-figma={
        inlineSub
          ? "SubFooter_SUB_WORK"
          : "#Footer_home_PC | #Footer_home_PAD | #Footer_home_M"
      }
    >
      <div
        className={cn(
          isoHomeFooter &&
            (isMobile
              ? "flex items-center justify-between gap-4"
              : "flex items-center justify-between gap-8"),
          !isoHomeFooter &&
            (isMobile ? "flex flex-col gap-4" : "flex items-end justify-between gap-8"),
        )}
      >
        {isoHomeFooter ? (
          <>
            <HomeIsoBadges justify="start" className="flex-nowrap" />
            <p
              className={cn(
                "shrink-0 text-right text-[12px] font-medium leading-5",
                fineTone,
              )}
            >
              ⓒ PENTACORE.
            </p>
          </>
        ) : (
          <>
            <div className="flex max-w-xl flex-col gap-5">
              {!hideNav ? (
                <nav
                  className={cn(
                    "flex min-w-0 flex-nowrap items-center gap-1 overflow-x-auto overflow-y-hidden text-[13px] font-bold leading-none tracking-tight [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2 sm:text-base sm:leading-4 sm:tracking-normal [&::-webkit-scrollbar]:hidden",
                    navTone,
                  )}
                  aria-label="하단 내비게이션"
                >
                  {nav.map((item, i) => (
                    <span
                      key={item.href}
                      className="flex shrink-0 items-center gap-1 sm:gap-2"
                    >
                      {i > 0 ? <Divider light={dividerLight} /> : null}
                      <NavMenuHoverLink
                        href={item.href}
                        className={cn(
                          "whitespace-nowrap rounded-sm px-0.5 py-1 sm:px-1.5 -my-1 hover:opacity-90",
                          glassHover,
                        )}
                      >
                        {item.label}
                      </NavMenuHoverLink>
                    </span>
                  ))}
                </nav>
              ) : null}
              <p
                className={cn(
                  "text-[14px] font-medium leading-snug",
                  bodyTone,
                )}
              >
                {PENTACORE_MANIFESTO_PARAGRAPH}
              </p>
            </div>
            <p
              className={cn(
                "shrink-0 text-[12px] font-medium leading-5 md:text-right",
                fineTone,
              )}
            >
              ⓒ PENTACORE.
            </p>
          </>
        )}
      </div>

      {inlineSub ? (
        <div className="mt-8 border-t border-zinc-200 pt-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
            <address className="min-w-0 flex-1 not-italic">
              <p className="whitespace-pre-line text-[13px] font-normal leading-relaxed text-zinc-600">
                {`Suite 2403, Bldg. B
Boutique Monaco
397 Seocho-daero, Seocho-gu
Seoul 06616,
Republic of Korea`}
              </p>
              <p className="mt-4 text-[13px] font-normal leading-relaxed text-zinc-600">
                (우) 06616 서울특별시 서초구 서초대로 397, B동 2403호
              </p>
            </address>
            <HomeIsoBadges
              justify="start"
              className="w-full shrink-0 md:w-auto md:justify-end"
            />
          </div>
        </div>
      ) : null}
    </footer>
  );
}
