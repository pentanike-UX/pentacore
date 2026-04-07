"use client";

import { useEffect, useState } from "react";

/** 홈·공통 크롬과 동일: &lt;768 모바일 · &lt;1024 태블릿 · 그 외 데스크톱 */
export function useBreakpoint(): "desktop" | "tablet" | "mobile" {
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
