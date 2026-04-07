"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
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

  const glassStyle: CSSProperties = light
    ? {
        background: "rgba(255, 255, 255, 0.78)",
        backdropFilter: "blur(28px) saturate(165%)",
        WebkitBackdropFilter: "blur(28px) saturate(165%)",
      }
    : {
        background: "rgba(8, 8, 10, 0.62)",
        backdropFilter: "blur(28px) saturate(140%)",
        WebkitBackdropFilter: "blur(28px) saturate(140%)",
      };

  /** 라인 두께: 최대 10px, 뷰포트에 맞게 축소 */
  const lineThickness = "clamp(4px, 2.2vw, 10px)";

  const linkClass = cn(
    "group relative inline-block py-1 text-[clamp(2rem,10vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tight",
    "font-display",
    light ? "text-zinc-950" : "text-white",
  );

  const lineClass = cn(
    "pointer-events-none absolute left-0 right-0 top-1/2 z-0 origin-center -translate-y-1/2 scale-x-0 rounded-full",
    "transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] motion-reduce:duration-0",
    "group-hover:scale-x-100",
    light ? "bg-zinc-950/80" : "bg-white/85",
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
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center px-6 py-28"
          style={glassStyle}
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={curtainTransition}
          onClick={onClose}
        >
          <nav
            className="pointer-events-auto flex max-w-4xl flex-col items-center gap-10 text-center md:gap-16 lg:gap-24"
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
                <Link
                  href={item.href}
                  className={linkClass}
                  onClick={onClose}
                >
                  <span
                    aria-hidden
                    className={lineClass}
                    style={{ height: lineThickness }}
                  />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
