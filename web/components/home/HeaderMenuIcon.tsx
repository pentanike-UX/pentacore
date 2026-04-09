"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  light: boolean;
};

/** 햄버거 ↔ X 스프링 변형 — 라인만 (테두리·글래스 박스 없음), 부모 버튼 중앙 정렬 */
export function HeaderMenuIcon({ open, light }: Props) {
  /** 닫기(X) 상태는 오버레이·글래스 맥락에서 항상 흰 라인으로 통일. 햄버거만 서피스 톤 반전. */
  const barTone = open ? "bg-white" : light ? "bg-zinc-950" : "bg-white";
  const bar = cn(
    "absolute left-[calc(50%-0.625rem)] h-0.5 w-5 rounded-full",
    barTone,
  );
  /** 3줄 스택 높이: bar 2px × 3 + 간격 6px × 2 */
  const stackH = 18;

  return (
    <span
      className="pointer-events-none flex size-full items-center justify-center [&_*]:pointer-events-none"
      aria-hidden
    >
      {/*
        바깥만 pointer-events-none이면 자식 motion.span은 기본 auto라 햄버거 막대가
        히트 타깃이 됨(transform·서브픽셀로 시각과 어긋남). 모든 자손에 none을 걸어
        클릭이 부모 <button>으로 일관되게 전달되게 함.
      */}
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
