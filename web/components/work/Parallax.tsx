"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ParallaxProps = {
  children: React.ReactNode;
  /** 스크롤 구간에서 Y 이동량(px) — 양수면 아래로, 음수면 위로 */
  yRange?: readonly [number, number];
  className?: string;
};

/**
 * 스크롤 진행도에 따라 자식을 Y로 이동 (시차). Figma SUB_WORK 페럴렉스 대응.
 */
export function ParallaxLayer({
  children,
  yRange = [48, -48] as const,
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [yRange[0], yRange[1]]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ y }}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

/** 루트 스크롤 기준 페럴렉스 (히어로 등 전체 뷰포트) */
export function ParallaxViewport({
  children,
  yRange = [30, -30] as const,
  className,
}: ParallaxProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.35], [yRange[0], yRange[1]]);
  return (
    <motion.div
      style={{ y }}
      className={["will-change-transform", className].filter(Boolean).join(" ")}
    >
      {children}
    </motion.div>
  );
}
