"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HOME_CARDS_PAGE_BG } from "@/lib/figma-liquid-glass";
import { assets } from "./figma-assets";
import { FooterBar } from "./FooterBar";
import { HeaderBar } from "./HeaderBar";
import { HomeSectionCards } from "./HomeSectionCards";

type Phase =
  | "intro-load"
  | "intro-shrink"
  | "home-masked"
  | "home-chrome"
  | "home-cards";

const STORAGE_KEY = "pentacore_intro_done";

const TAGLINE = [
  "From the core, every connection blossoms into a unique experience.",
  "Pentacore crafts your future with technology and design.",
] as const;

const INTRO_CIRCLE_MS = 1200;
const INTRO_TEXT_FADE_DELAY_MS = Math.round(INTRO_CIRCLE_MS * 0.42);
const HOME_MASKED_MS = 3000;
const CHROME_SLIDE_MS = 450;
const VIDEO_READY_TO_SHRINK_MS = 320;

/** `web/public/video/hero.mp4` → `/video/hero.mp4` */
const DEFAULT_VIDEO =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/video/hero.mp4";

function useTyping(full: string, active: boolean, msPerChar = 36) {
  const [len, setLen] = useState(0);
  useEffect(() => {
    if (!active) {
      setLen(0);
      return;
    }
    setLen(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setLen((n) => {
        if (n >= full.length) {
          window.clearInterval(id);
          return n;
        }
        return i;
      });
      if (i >= full.length) window.clearInterval(id);
    }, msPerChar);
    return () => window.clearInterval(id);
  }, [full, active]);
  return full.slice(0, len);
}

function useBreakpoint(): "desktop" | "tablet" | "mobile" {
  const [bp, setBp] = useState<"desktop" | "tablet" | "mobile">("desktop");
  useEffect(() => {
    const run = () => {
      const w = window.innerWidth;
      if (w < 768) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    };
    run();
    window.addEventListener("resize", run);
    return () => window.removeEventListener("resize", run);
  }, []);
  return bp;
}

export function HomeExperience() {
  const bp = useBreakpoint();
  const videoRef = useRef<HTMLVideoElement>(null);
  const phaseRef = useRef<Phase>("intro-load");
  const [phase, setPhase] = useState<Phase>("intro-load");
  const [videoReady, setVideoReady] = useState(false);
  const [circleScale, setCircleScale] = useState(1);
  const [introCopyFade, setIntroCopyFade] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [roll, setRoll] = useState(0);

  phaseRef.current = phase;

  const statusPhrase =
    roll % 2 === 0 ? "LOADING..." : "화면에 감성을 더하는 중";
  const typedStatus = useTyping(statusPhrase, phase === "intro-load");

  const videoSrc = DEFAULT_VIDEO;

  /** 재방문: INTRO 생략 → HOME_LAYOUT-1(home-masked)부터 */
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") {
        setPhase("home-masked");
      }
    } catch {
      /* private mode 등 */
    }
  }, []);

  useEffect(() => {
    if (phase !== "intro-load") return;
    const id = window.setInterval(() => setRoll((r) => r + 1), 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onReady = () => setVideoReady(true);
    el.addEventListener("canplaythrough", onReady);
    el.load();
    return () => el.removeEventListener("canplaythrough", onReady);
  }, [videoSrc]);

  /** 동영상 준비 후 원형 셔rink */
  useEffect(() => {
    if (phase !== "intro-load" || !videoReady) return;
    const t = window.setTimeout(() => setPhase("intro-shrink"), VIDEO_READY_TO_SHRINK_MS);
    return () => window.clearTimeout(t);
  }, [phase, videoReady]);

  /** 원형 레이어: 첫 프레임 scale(1) → 이후 0 */
  useEffect(() => {
    if (phase !== "intro-shrink") return;
    setCircleScale(1);
    setIntroCopyFade(false);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setCircleScale(0));
    });
    const fadeT = window.setTimeout(
      () => setIntroCopyFade(true),
      INTRO_TEXT_FADE_DELAY_MS,
    );
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(fadeT);
    };
  }, [phase]);

  const onCircleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== "transform") return;
      if (phaseRef.current !== "intro-shrink") return;
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      setPhase("home-masked");
    },
    [],
  );

  /** HOME_LAYOUT-1 유지 시간 후 헤더·푸터 */
  useEffect(() => {
    if (phase !== "home-masked") return;
    const t = window.setTimeout(() => setPhase("home-chrome"), HOME_MASKED_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  /** 헤더·푸터 슬라이드 후 카드 + 로고 이동 */
  useEffect(() => {
    if (phase !== "home-chrome") return;
    const t = window.setTimeout(() => setPhase("home-cards"), CHROME_SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "home-cards") {
      setCardsVisible(false);
      return;
    }
    const v = videoRef.current;
    void v?.play().catch(() => {});
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setCardsVisible(true));
    });
    return () => cancelAnimationFrame(id);
  }, [phase]);

  useEffect(() => {
    if (
      phase !== "intro-shrink" &&
      phase !== "home-masked" &&
      phase !== "home-chrome"
    ) {
      return;
    }
    const v = videoRef.current;
    void v?.play().catch(() => {});
  }, [phase]);

  const skipToShrink = useCallback(() => {
    setVideoReady(true);
    setPhase("intro-shrink");
  }, []);

  const headerCompact = bp !== "desktop";
  const footerVariant =
    bp === "mobile" ? "mobile" : bp === "tablet" ? "tablet" : "desktop";

  const lightHomeSurface = phase === "home-cards";
  const chromeVisible = phase === "home-chrome" || phase === "home-cards";
  const chromeSlidingIn = phase === "home-chrome";
  const chromeLight = phase === "home-cards";

  const showLayout1Video =
    phase === "intro-shrink" ||
    phase === "home-masked" ||
    phase === "home-chrome" ||
    phase === "home-cards";

  const preload = phase === "intro-load";

  const maskStyle =
    showLayout1Video && !preload
      ? {
          maskImage: `url('${assets.logoMaskSvg}')`,
          WebkitMaskImage: `url('${assets.logoMaskSvg}')`,
          maskSize: "min(1000px, 92vw) auto" as const,
          WebkitMaskSize: "min(1000px, 92vw) auto" as const,
          maskRepeat: "no-repeat" as const,
          WebkitMaskRepeat: "no-repeat" as const,
          maskPosition: "center" as const,
          WebkitMaskPosition: "center" as const,
        }
      : undefined;

  const videoOpacity =
    showLayout1Video && !preload ? 1 : 0;

  const videoOpacityFinal = phase === "home-cards" ? 0 : videoOpacity;

  return (
    <div
      className={cn(
        "relative min-h-dvh overflow-hidden transition-colors duration-500",
        lightHomeSurface
          ? "text-zinc-950"
          : "bg-black text-white",
      )}
      style={
        lightHomeSurface ? { backgroundColor: HOME_CARDS_PAGE_BG } : undefined
      }
    >
      <HeaderBar
        visible={chromeVisible}
        slideInFromTop={chromeSlidingIn}
        compact={headerCompact}
        surface={chromeLight ? "light" : "dark"}
      />

      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        loop
        preload="auto"
        className={cn(
          "fixed z-30 object-cover",
          preload &&
            "pointer-events-none left-0 top-0 h-px w-px overflow-hidden",
          showLayout1Video && !preload && "inset-0 h-full w-full",
          showLayout1Video &&
            !preload &&
            "transition-[opacity,transform] duration-[600ms] ease-out",
          phase === "home-cards" && "duration-700 ease-out-quart",
        )}
        style={{
          ...(showLayout1Video && !preload ? maskStyle : {}),
          opacity: videoOpacityFinal,
          ...(phase === "home-cards"
            ? { transform: "translateY(calc(-1 * min(28vh, 320px)))" }
            : {}),
        }}
        aria-hidden
      />

      {/* HOME_LAYOUT-1 배경(라이트 전까지) */}
      {showLayout1Video && !lightHomeSurface ? (
        <div
          className="pointer-events-none fixed inset-0 z-20 bg-black"
          aria-hidden
        />
      ) : null}

      {lightHomeSurface ? (
        <div
          className="pointer-events-none fixed inset-0 z-20"
          style={{ backgroundColor: HOME_CARDS_PAGE_BG }}
          aria-hidden
        />
      ) : null}

      {/* INTRO: 검정 원형 레이어 축소 */}
      {phase === "intro-shrink" ? (
        <div
          className="pointer-events-none fixed left-1/2 top-1/2 z-[52] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black will-change-transform"
          style={{
            width: "min(320vmax, 4000px)",
            height: "min(320vmax, 4000px)",
            transform: `scale(${circleScale})`,
            transition: `transform ${INTRO_CIRCLE_MS}ms cubic-bezier(0.33, 1, 0.68, 1)`,
            transformOrigin: "center center",
          }}
          onTransitionEnd={onCircleTransitionEnd}
          aria-hidden
        />
      ) : null}

      {/* INTRO 카피 — 화면 정중앙 */}
      {phase === "intro-load" || phase === "intro-shrink" ? (
        <div className="pointer-events-none fixed inset-0 z-[58] flex items-center justify-center px-6">
          <div className="flex max-w-xl flex-col items-center gap-10 text-center">
            <div
              className={cn(
                "space-y-2 text-[16px] font-normal leading-7 text-white transition-opacity duration-500 ease-out",
                introCopyFade && "opacity-0",
              )}
            >
              <p>{TAGLINE[0]}</p>
              <p>{TAGLINE[1]}</p>
            </div>
            {phase === "intro-load" ? (
              <p className="min-h-[28px] text-[20px] font-normal leading-7 text-white">
                {typedStatus}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {phase === "intro-load" ? (
        <>
          <Button
            type="button"
            variant="link"
            onClick={skipToShrink}
            className="fixed bottom-10 left-1/2 z-[60] h-auto -translate-x-1/2 p-0 text-[14px] font-medium text-white/80 underline decoration-white/40 underline-offset-4 hover:text-white"
          >
            Skip
          </Button>
        </>
      ) : null}

      <FooterBar
        visible={chromeVisible}
        slideInFromBottom={chromeSlidingIn}
        variant={footerVariant}
        surface={chromeLight ? "light" : "dark"}
      />

      {phase === "home-cards" ? (
        <HomeSectionCards visible={cardsVisible} />
      ) : null}
    </div>
  );
}
