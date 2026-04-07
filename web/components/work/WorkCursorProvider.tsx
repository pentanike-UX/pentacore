"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion } from "framer-motion";

type Ctx = {
  setPortfolioHover: (v: boolean) => void;
};

const WorkCursorContext = createContext<Ctx | null>(null);

export function useWorkCursor() {
  const c = useContext(WorkCursorContext);
  if (!c) {
    throw new Error("useWorkCursor must be used within WorkCursorProvider");
  }
  return c;
}

/**
 * Figma `pointer` — Property 1: 기본(82) / Property 2: target(104).
 * 라이트 WORK 페이지에서도 보이도록 다크 스트로크 + 호버 시 물방울이 커지는 스프링.
 */
function CursorVisual({ hovering }: { hovering: boolean }) {
  return (
    <motion.div
      className="will-change-transform"
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
          className="absolute rounded-full border-2 border-zinc-900/80 bg-gradient-to-b from-zinc-900/[0.07] to-zinc-900/[0.14] shadow-[0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-[3px]"
          initial={false}
          animate={{
            width: hovering ? 92 : 58,
            height: hovering ? 92 : 58,
            opacity: hovering ? 1 : 0.88,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        />
        <motion.div
          className="absolute rounded-full border border-zinc-900/35"
          initial={false}
          animate={{
            width: hovering ? 100 : 74,
            height: hovering ? 100 : 74,
            opacity: hovering ? 0.65 : 0.4,
            scale: hovering ? 1.05 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        <motion.div
          className="absolute rounded-full bg-zinc-900/[0.06] blur-[6px]"
          initial={false}
          animate={{
            width: hovering ? 48 : 32,
            height: hovering ? 48 : 32,
            opacity: hovering ? 0.9 : 0.5,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 18 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function WorkCursorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [portfolioHover, setPortfolioHover] = useState(false);
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
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [finePointer]);

  const setPortfolioHoverStable = useCallback((v: boolean) => {
    setPortfolioHover(v);
  }, []);

  const value = useMemo(
    () => ({ setPortfolioHover: setPortfolioHoverStable }),
    [setPortfolioHoverStable],
  );

  return (
    <WorkCursorContext.Provider value={value}>
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
            <CursorVisual hovering={portfolioHover} />
          </div>
        </div>
      ) : null}
    </WorkCursorContext.Provider>
  );
}
