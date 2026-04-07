"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  light: boolean;
};

/** 햄버거 ↔ X 스프링 변형 — 라인만 (테두리·글래스 박스 없음), 부모 버튼 중앙 정렬 */
export function HeaderMenuIcon({ open, light }: Props) {
  const bar = cn(
    "absolute left-[calc(50%-0.625rem)] h-0.5 w-5 rounded-full",
    light ? "bg-zinc-950" : "bg-white",
  );
  /** 3줄 스택 높이: bar 2px × 3 + 간격 6px × 2 */
  const stackH = 18;

  return (
    <span
      className="pointer-events-none flex size-full items-center justify-center"
      aria-hidden
    >
      <span
        className="relative shrink-0"
        style={{ width: "1.25rem", height: stackH }}
      >
        <motion.span
          className={cn(bar, "top-0")}
          style={{ transformOrigin: "50% 50%" }}
          animate={{
            rotate: open ? 45 : 0,
            y: open ? 8 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 28,
          }}
        />
        <motion.span
          className={cn(bar, "top-[8px]")}
          animate={{
            opacity: open ? 0 : 1,
            scaleX: open ? 0.4 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 32,
          }}
        />
        <motion.span
          className={cn(bar, "top-[16px]")}
          style={{ transformOrigin: "50% 50%" }}
          animate={{
            rotate: open ? -45 : 0,
            y: open ? -8 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 28,
          }}
        />
      </span>
    </span>
  );
}
