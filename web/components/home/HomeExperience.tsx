"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { cn } from "@/lib/utils";
import { FooterBar } from "./FooterBar";
import { HeaderBar } from "./HeaderBar";
import { HomeSectionCards } from "./HomeSectionCards";

type Phase = "intro-load" | "intro-shrink" | "home-chrome";

const STORAGE_KEY = "pentacore_intro_done";

const TAGLINE = [
  "From the core, every connection blossoms into a unique experience.",
  "Pentacore crafts your future with technology and design.",
] as const;

const INTRO_CIRCLE_MS = 1200;
const INTRO_TEXT_FADE_DELAY_MS = Math.round(INTRO_CIRCLE_MS * 0.42);
/** 동영상 canplay 이후 최소 지연(ms) — 너무 빨리 넘어가지 않게 */
const VIDEO_READY_TO_SHRINK_MS = 320;
/** 인트로 로드 화면 최소 체류 — Skip 시에는 무시 */
const INTRO_MIN_VISIBLE_MS = 3000;

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

export function HomeExperience() {
  const bp = useBreakpoint();
  const videoRef = useRef<HTMLVideoElement>(null);
  const phaseRef = useRef<Phase>("intro-load");
  const introStartedAtRef = useRef<number | null>(null);
  const videoReadyAtRef = useRef<number | null>(null);
  const [phase, setPhase] = useState<Phase>("intro-load");
  const [videoReady, setVideoReady] = useState(false);
  const [circleScale, setCircleScale] = useState(1);
  const [introCopyFade, setIntroCopyFade] = useState(false);
  const [roll, setRoll] = useState(0);

  phaseRef.current = phase;

  const statusPhrase =
    roll % 2 === 0 ? "LOADING..." : "화면에 감성을 더하는 중";
  const typedStatus = useTyping(statusPhrase, phase === "intro-load");

  const videoSrc = DEFAULT_VIDEO;

  /** 재방문: INTRO 생략 → HOME_LAYOUT-2(home-chrome)부터 */
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") {
        setPhase("home-chrome");
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
    if (phase === "intro-load" && introStartedAtRef.current == null) {
      introStartedAtRef.current = Date.now();
    }
  }, [phase]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onReady = () => {
      if (videoReadyAtRef.current == null) videoReadyAtRef.current = Date.now();
      setVideoReady(true);
    };
    /* canplaythrough는 대용량 파일에서 늦게 올 수 있어 canplay도 함께 사용 */
    el.addEventListener("canplaythrough", onReady);
    el.addEventListener("canplay", onReady);
    el.load();
    return () => {
      el.removeEventListener("canplaythrough", onReady);
      el.removeEventListener("canplay", onReady);
    };
  }, [videoSrc]);

  /**
   * 동영상 준비 후 shrink — `INTRO_MIN_VISIBLE_MS`와 `VIDEO_READY_TO_SHRINK_MS` 중
   * 더 늦은 시점까지 대기(Skip은 `skipToShrink`로 즉시).
   */
  useEffect(() => {
    if (phase !== "intro-load" || !videoReady) return;
    const start = introStartedAtRef.current ?? Date.now();
    if (introStartedAtRef.current == null) introStartedAtRef.current = start;
    const videoAt = videoReadyAtRef.current ?? Date.now();
    const deadline = Math.max(
      start + INTRO_MIN_VISIBLE_MS,
      videoAt + VIDEO_READY_TO_SHRINK_MS,
    );
    const delay = Math.max(0, deadline - Date.now());
    const t = window.setTimeout(() => setPhase("intro-shrink"), delay);
    return () => window.clearTimeout(t);
  }, [phase, videoReady]);

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
      setPhase("home-chrome");
    },
    [],
  );

  useEffect(() => {
    if (phase !== "intro-shrink" && phase !== "home-chrome") return;
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

  const chromeVisible = phase === "home-chrome";
  /** 헤더·푸터·카드 즉시 노출(슬라이드 인 없음) */
  const chromeSlidingIn = false;

  const showHeroVideo = phase === "intro-shrink" || phase === "home-chrome";

  const preload = phase === "intro-load";

  /** 영상 톤 다운: 살짝 어둡게 + 채도↓ + 균일 딤 오버레이(비디오·카드 사이 공간) */
  const videoDimmed = showHeroVideo && !preload;

  return (
    <div className="relative min-h-dvh overflow-hidden bg-black text-white antialiased">
      <HeaderBar
        visible={chromeVisible}
        slideInFromTop={chromeSlidingIn}
        compact={headerCompact}
        surface="dark"
        overVideo={chromeVisible}
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
          showHeroVideo && !preload && "inset-0 h-full w-full",
          showHeroVideo &&
            !preload &&
            "transition-[opacity,filter] duration-[500ms] ease-out",
        )}
        style={{
          opacity: videoDimmed ? 0.86 : 0,
          filter: videoDimmed
            ? "brightness(0.8) saturate(0.84) contrast(0.97)"
            : "none",
        }}
        aria-hidden
      />

      {videoDimmed ? (
        <div
          className="pointer-events-none fixed inset-0 z-[31] bg-black/[0.18]"
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
        <Button
          type="button"
          variant="link"
          onClick={skipToShrink}
          className="fixed bottom-10 left-1/2 z-[60] h-auto -translate-x-1/2 p-0 text-[14px] font-medium text-white/80 underline decoration-white/40 underline-offset-4 hover:text-white"
        >
          Skip
        </Button>
      ) : null}

      <FooterBar
        visible={chromeVisible}
        slideInFromBottom={chromeSlidingIn}
        variant={footerVariant}
        surface="dark"
        overVideo={chromeVisible}
        hideNav
      />

      {phase === "home-chrome" ? <HomeSectionCards /> : null}
    </div>
  );
}
