"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { NavMenuHoverLink } from "@/components/nav/NavMenuHoverLink";
import { cn } from "@/lib/utils";

const MENU_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/work", label: "WORK" },
  { href: "/hiring", label: "HIRING" },
  { href: "/inquiry", label: "PROJECT INQUIRY" },
] as const;

const curtainTransition = {
  type: "spring" as const,
  damping: 28,
  stiffness: 220,
  mass: 0.92,
};

type Props = {
  open: boolean;
  onClose: () => void;
  /** 라이트 서브페이지 톤 */
  light: boolean;
};

export function HeaderNavOverlay({ open, onClose, light }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  if (!mounted) return null;

  const glassBackground = light
    ? "rgba(255, 255, 255, 0.78)"
    : "rgba(8, 8, 10, 0.62)";

  const glassStyle: CSSProperties = light
    ? {
        background: glassBackground,
        backdropFilter: "blur(28px) saturate(165%)",
        WebkitBackdropFilter: "blur(28px) saturate(165%)",
      }
    : {
        background: glassBackground,
        backdropFilter: "blur(28px) saturate(140%)",
        WebkitBackdropFilter: "blur(28px) saturate(140%)",
      };

  /** 좁은 뷰포트에서 오버플로 방지: vmin + clamp로 타입·간격 동시 스케일. 상한 4.5rem = `NavMenuHoverLink` 라인 두께 기준. */
  const linkClass = cn(
    "max-w-full py-1 text-center font-black uppercase leading-[0.95] tracking-tight",
    "text-[clamp(1.125rem,min(5.5vmin,11vw),4.5rem)]",
    "font-display",
    "break-words [overflow-wrap:anywhere]",
    light ? "text-zinc-950" : "text-white",
  );

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="전체 메뉴"
          id="header-fullscreen-nav"
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto overscroll-y-contain p-4"
          style={glassStyle}
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={curtainTransition}
          onClick={onClose}
        >
          <nav
            className="pointer-events-auto flex w-full max-w-[min(100%,56rem)] flex-col items-center gap-[clamp(0.75rem,min(3.5vmin,1.25rem),2.5rem)] text-center md:gap-[clamp(1rem,min(4vmin,1.75rem),4rem)] lg:gap-[clamp(1.25rem,min(4.5vmin,2rem),6rem)]"
            onClick={(e) => e.stopPropagation()}
            aria-label="주요 메뉴"
          >
            {MENU_LINKS.map((item, i) => (
              <motion.div
                key={item.href}
                className="flex justify-center"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{
                  type: "spring",
                  damping: 22,
                  stiffness: 200,
                  mass: 0.85,
                  delay: 0.05 + i * 0.055,
                }}
              >
                <NavMenuHoverLink
                  href={item.href}
                  className={linkClass}
                  onClick={onClose}
                >
                  {item.label}
                </NavMenuHoverLink>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
