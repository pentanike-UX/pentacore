"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function isInteractiveTarget(el: Element | null): boolean {
  if (!el || !(el instanceof Element)) return false;
  const node = el.closest(
    [
      "a[href]",
      "button:not([disabled])",
      '[role="button"]:not([aria-disabled="true"])',
      "input[type=\"submit\"]:not([disabled])",
      "input[type=\"button\"]:not([disabled])",
      "[data-cursor-target]",
    ].join(","),
  );
  return !!node;
}

/**
 * Figma `pointer` 근사 — 전역 커서(미세 포인터 기기만).
 * 인터랙티브 위에서 링이 살짝 커짐.
 *
 * 리퀴드 글래스(`figma-liquid-glass` 톤): blur(10px)·saturate(160%)·반투명 화이트·인셋 하이라이트.
 * `mix-blend-difference`로 배경 명도에 따라 링이 반전되어 밝/어두운 베이스 모두에서 가시성 유지.
 */
function CursorVisual({ hovering }: { hovering: boolean }) {
  return (
    <motion.div
      className="will-change-transform mix-blend-difference"
      initial={false}
      animate={{
        scale: hovering ? 1.22 : 1,
      }}
      transition={{ type: "spring", stiffness: 320, damping: 24, mass: 0.5 }}
    >
      <motion.div
        className="relative flex items-center justify-center"
        initial={false}
        animate={{
          width: hovering ? 104 : 82,
          height: hovering ? 104 : 82,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      >
        <motion.div
          className="absolute rounded-full border-2 border-white/80 bg-gradient-to-b from-white/[0.42] to-white/[0.22] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_4px_24px_rgba(15,23,42,0.1)] backdrop-blur-[10px] backdrop-saturate-[160%] [-webkit-backdrop-filter:blur(10px)_saturate(160%)]"
          initial={false}
          animate={{
            width: hovering ? 92 : 58,
            height: hovering ? 92 : 58,
            opacity: hovering ? 1 : 0.88,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        />
        <motion.div
          className="absolute rounded-full border border-white/55"
          initial={false}
          animate={{
            width: hovering ? 100 : 74,
            height: hovering ? 100 : 74,
            opacity: hovering ? 0.7 : 0.45,
            scale: hovering ? 1.05 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        <motion.div
          className="absolute rounded-full bg-white/[0.38] blur-[6px]"
          initial={false}
          animate={{
            width: hovering ? 48 : 32,
            height: hovering ? 48 : 32,
            opacity: hovering ? 0.92 : 0.55,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 18 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function GlobalCursorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [interactiveHover, setInteractiveHover] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!finePointer) return;
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setInteractiveHover(isInteractiveTarget(el));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [finePointer]);

  return (
    <>
      <div className={finePointer ? "min-h-0 cursor-none" : "min-h-0"}>
        {children}
      </div>
      {finePointer ? (
        <div className="pointer-events-none fixed inset-0 z-[200]" aria-hidden>
          <div
            className="absolute left-0 top-0 will-change-[transform]"
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
            }}
          >
            <CursorVisual hovering={interactiveHover} />
          </div>
        </div>
      ) : null}
    </>
  );
}
