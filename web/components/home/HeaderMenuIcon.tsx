"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  light: boolean;
};

/** 햄버거 ↔ X 스프링 변형 (헤더 메뉴 버튼) */
export function HeaderMenuIcon({ open, light }: Props) {
  const bar = cn(
    "absolute left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full",
    light ? "bg-zinc-950" : "bg-white",
  );

  return (
    <span className="relative block size-9" aria-hidden>
      <motion.span
        className={cn(bar, "top-[13px]")}
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
        className={cn(bar, "top-[21px]")}
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
        className={cn(bar, "top-[29px]")}
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
  );
}
