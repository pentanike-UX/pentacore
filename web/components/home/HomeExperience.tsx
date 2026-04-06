"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { assets } from "./figma-assets";
import { FooterBar } from "./FooterBar";
import { HeaderBar } from "./HeaderBar";
import { HomeSectionCards } from "./HomeSectionCards";

type Phase =
  | "intro-load"
  | "intro-ready"
  | "intro-reveal"
  | "home-masked"
  | "home-cards";

const TAGLINE = [
  "From the core, every connection blossoms into a unique experience.",
  "Pentacore crafts your future with technology and design.",
] as const;

/** `web/public/video/hero.mp4` → `/video/hero.mp4`. 배포/스테이징은 `NEXT_PUBLIC_HERO_VIDEO_URL`로 덮어쓸 수 있음. */
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
  const [phase, setPhase] = useState<Phase>("intro-load");
  const [videoReady, setVideoReady] = useState(false);
  const [roll, setRoll] = useState(0);
  const [readyTypedDone, setReadyTypedDone] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  /** 풀스크린 인트로 구간: 크기 키우지 않고 페이드인만 */
  const [revealFadeIn, setRevealFadeIn] = useState(false);
  /** 로고 마스크 구간: 마스크 영상 페이드인 */
  const [maskFadeIn, setMaskFadeIn] = useState(false);

  const statusPhrase = roll % 2 === 0 ? "LOADING..." : "화면에 감성을 더하는 중";
  const typedStatus = useTyping(statusPhrase, phase === "intro-load");
  const typedReady = useTyping("READY!", phase === "intro-ready", 42);

  const videoSrc = useMemo(() => DEFAULT_VIDEO, []);

  const goPastIntroLoad = useCallback(() => {
    setPhase("intro-ready");
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

  useEffect(() => {
    if (phase === "intro-load" && videoReady) goPastIntroLoad();
  }, [phase, videoReady, goPastIntroLoad]);

  useEffect(() => {
    if (phase !== "intro-ready") {
      setReadyTypedDone(false);
      return;
    }
    if (typedReady === "READY!") setReadyTypedDone(true);
  }, [phase, typedReady]);

  useEffect(() => {
    if (phase !== "intro-ready" || !readyTypedDone) return;
    const t = window.setTimeout(() => setPhase("intro-reveal"), 520);
    return () => window.clearTimeout(t);
  }, [phase, readyTypedDone]);

  useEffect(() => {
    if (phase !== "intro-reveal") return;
    setRevealFadeIn(false);
    setMaskFadeIn(false);
    const v = videoRef.current;
    void v?.play().catch(() => {});
    const fadeStart = requestAnimationFrame(() => {
      requestAnimationFrame(() => setRevealFadeIn(true));
    });
    const t = window.setTimeout(() => setPhase("home-masked"), 820);
    return () => {
      cancelAnimationFrame(fadeStart);
      window.clearTimeout(t);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "home-masked" && phase !== "home-cards") return;
    if (phase === "home-masked") {
      setMaskFadeIn(false);
      const start = requestAnimationFrame(() => {
        requestAnimationFrame(() => setMaskFadeIn(true));
      });
      const v = videoRef.current;
      void v?.play().catch(() => {});
      return () => cancelAnimationFrame(start);
    }
    setMaskFadeIn(true);
  }, [phase]);

  useEffect(() => {
    if (phase !== "home-masked") return;
    const t = window.setTimeout(() => setPhase("home-cards"), 3000);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "home-cards") {
      setCardsVisible(false);
      return;
    }
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setCardsVisible(true));
    });
    return () => cancelAnimationFrame(id);
  }, [phase]);

  const headerCompact = bp !== "desktop";
  const footerVariant =
    bp === "mobile" ? "mobile" : bp === "tablet" ? "tablet" : "desktop";

  const preload = phase === "intro-load" || phase === "intro-ready";
  const reveal = phase === "intro-reveal";
  const home = phase === "home-masked" || phase === "home-cards";

  /** Figma `HOME_LAYOUT-1` Mask group — 표기 1000×114, export viewBox 1001×115 */
  const maskStyle =
    home
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

  const videoOpacity = preload
    ? 0
    : reveal
      ? revealFadeIn
        ? 1
        : 0
      : home
        ? maskFadeIn
          ? 1
          : 0
        : 0;

  return (
    <div className="relative min-h-dvh overflow-hidden bg-black text-white">
      <HeaderBar compact={headerCompact} />

      {/* 단일 비디오: 풀스크린/마스크 전환 시 크기 애니메이션 없음 — opacity 페이드만 */}
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
            !(reveal || home) &&
            "pointer-events-none left-0 top-0 h-px w-px overflow-hidden",
          (reveal || home) && "inset-0 h-full w-full",
          (reveal || home) && "transition-opacity duration-[600ms] ease-out",
          home &&
            phase === "home-cards" &&
            "transition-transform duration-700 ease-out-quart",
        )}
        style={{
          ...(home ? maskStyle : {}),
          opacity: videoOpacity,
          ...(home && phase === "home-cards"
            ? { transform: "translateY(calc(-1 * min(28vh, 320px)))" }
            : {}),
        }}
        aria-hidden
      />

      {phase === "intro-load" ? (
        <>
          <div className="relative z-10 flex min-h-dvh flex-col items-center px-6 pb-32 pt-32 text-center">
            <div className="mt-[min(20vh,160px)] max-w-xl space-y-2 text-[16px] font-normal leading-7 text-white">
              <p>{TAGLINE[0]}</p>
              <p>{TAGLINE[1]}</p>
            </div>
            <p className="mt-10 min-h-[28px] text-[20px] font-normal leading-7 text-white">
              {typedStatus}
            </p>
          </div>
          <Button
            type="button"
            variant="link"
            onClick={goPastIntroLoad}
            className="fixed bottom-10 left-1/2 z-50 h-auto -translate-x-1/2 p-0 text-[14px] font-medium text-white/80 underline decoration-white/40 underline-offset-4 hover:text-white"
          >
            Skip
          </Button>
        </>
      ) : null}

      {phase === "intro-ready" ? (
        <div className="relative z-10 min-h-dvh bg-black">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(120,80,255,0.35), transparent 55%), radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,200,255,0.2), transparent 50%), #000",
            }}
          />
          <Image
            src={assets.heroStill}
            alt=""
            fill
            className="object-cover opacity-25 mix-blend-screen"
            unoptimized
            priority
          />
          <div className="relative flex min-h-dvh flex-col items-center px-6 pb-32 pt-32 text-center">
            <div className="mt-[min(18vh,140px)] max-w-xl space-y-2 text-[16px] font-normal leading-7 text-white">
              <p>{TAGLINE[0]}</p>
              <p>{TAGLINE[1]}</p>
            </div>
            <p className="mt-10 min-h-[28px] text-[20px] font-normal leading-7 text-white">
              {typedReady}
            </p>
          </div>
        </div>
      ) : null}

      {reveal || home ? (
        <div
          className={`pointer-events-none fixed inset-0 z-20 bg-black ${
            home ? "bg-black" : ""
          }`}
          aria-hidden
        />
      ) : null}

      {home ? <FooterBar visible variant={footerVariant} /> : null}

      {phase === "home-cards" ? (
        <HomeSectionCards visible={cardsVisible} />
      ) : null}
    </div>
  );
}
