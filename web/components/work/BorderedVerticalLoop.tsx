"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  /** Figma: ST-FO-005/ST-FO-030 = 11, ST-FO-111 = 20 */
  borderWidth: 11 | 20;
  src: string;
  alt: string;
  aspectRatio: string;
  className?: string;
  slowDuration?: number;
  fastDuration?: number;
  /** ST-FO-005_BIC_m / ST-FO-030_m — 30px radius + 지정 드롭섀도 */
  sdsFrame?: boolean;
  /** sec_5 ST-FO-111 — Y36 / blur50 / spread0 / #0C0C0D 40% */
  stfo111Shadow?: boolean;
};

/**
 * 고정 검정 보더 안에서 긴 이미지가 세로로 느리게 올라갔다가,
 * 하단이 맞으면 더 빠르게 역방향으로 내려오는 루프.
 */
/** ST-FO-005_BIC_m, ST-FO-030_m — 위치 Y16, 흐림32, 스프레드0, #0C0C0D 40% */
const STFO_005_030_BOX_SHADOW = "0 16px 32px 0 rgba(12, 12, 13, 0.4)";
/** ST-FO-111 — 위치 Y36, 흐림50, 스프레드0, #0C0C0D 40% */
const STFO_111_BOX_SHADOW = "0 36px 50px 0 rgba(12, 12, 13, 0.4)";

export function BorderedVerticalLoop({
  borderWidth,
  src,
  alt,
  aspectRatio,
  className,
  slowDuration = 14,
  fastDuration = 3.2,
  sdsFrame = false,
  stfo111Shadow = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const [travel, setTravel] = useState(0);
  const travelRef = useRef(0);

  useEffect(() => {
    travelRef.current = travel;
  }, [travel]);

  const measure = () => {
    const box = containerRef.current;
    if (!box) return;
    const img = box.querySelector("img");
    if (!img || !img.complete) return;
    const ch = box.clientHeight;
    const ih = img.offsetHeight;
    const t = Math.max(0, ih - ch);
    y.set(0);
    setTravel(t);
  };

  useEffect(() => {
    if (travel <= 0) return;

    let cancelled = false;

    const loop = async () => {
      while (!cancelled && travelRef.current > 0) {
        const t = travelRef.current;
        await animate(y, -t, {
          duration: slowDuration,
          ease: "linear",
        });
        if (cancelled) break;
        await animate(y, 0, {
          duration: fastDuration,
          ease: "easeInOut",
        });
      }
    };

    void loop();
    return () => {
      cancelled = true;
    };
  }, [travel, y, slowDuration, fastDuration]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative box-border w-full overflow-hidden bg-transparent ${sdsFrame ? "rounded-[30px]" : ""} ${className ?? ""}`}
      style={{
        aspectRatio,
        borderWidth,
        borderStyle: "solid",
        borderColor: "#000",
        ...(sdsFrame
          ? {
              borderRadius: "30px",
              boxShadow: STFO_005_030_BOX_SHADOW,
            }
          : {}),
        ...(stfo111Shadow
          ? {
              boxShadow: STFO_111_BOX_SHADOW,
            }
          : {}),
      }}
    >
      <motion.div style={{ y }} className="will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element -- 동적 높이 측정용 */}
        <img
          src={src}
          alt={alt}
          className="pointer-events-none block h-auto w-full max-w-full select-none"
          onLoad={measure}
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
