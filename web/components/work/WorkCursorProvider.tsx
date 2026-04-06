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
 * Figma `pointer` 인스턴스(82 / 104) — 기본이 너무 작지 않게, 호버 시 확장.
 */
function CursorVisual({ hovering }: { hovering: boolean }) {
  return (
    <motion.div
      className="-translate-x-1/2 -translate-y-1/2"
      initial={false}
      animate={{
        scale: hovering ? 1.12 : 1,
      }}
      transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.6 }}
    >
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          width: hovering ? 104 : 82,
          height: hovering ? 104 : 82,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      >
        <motion.div
          className="absolute rounded-full border-2 border-white bg-white/10 backdrop-blur-[2px]"
          animate={{
            width: hovering ? 88 : 56,
            height: hovering ? 88 : 56,
            opacity: hovering ? 1 : 0.92,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        />
        <motion.div
          className="absolute rounded-full border border-white/70"
          animate={{
            width: hovering ? 100 : 76,
            height: hovering ? 100 : 76,
            opacity: hovering ? 0.55 : 0.4,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
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
        <div
          className="pointer-events-none fixed inset-0 z-[200]"
          aria-hidden
        >
          <motion.div
            className="absolute left-0 top-0"
            style={{ x: pos.x, y: pos.y }}
          >
            <CursorVisual hovering={portfolioHover} />
          </motion.div>
        </div>
      ) : null}
    </WorkCursorContext.Provider>
  );
}
