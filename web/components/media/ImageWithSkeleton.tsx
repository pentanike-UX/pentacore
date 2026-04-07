"use client";

import Image, { type ImageProps } from "next/image";
import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
} from "react";
import { cn } from "@/lib/utils";

export function ShimmerOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit] bg-zinc-200/[0.65]",
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute inset-y-0 left-0 w-[200%] animate-skeleton-shimmer bg-gradient-to-r from-zinc-200/0 via-white/55 to-zinc-200/0 motion-reduce:animate-none motion-reduce:opacity-80"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}

type FillProps = {
  src: string;
  alt: string;
  /** 예: "964/731" */
  aspectRatio: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  unoptimized?: boolean;
  objectFit?: "cover" | "contain";
  onLoadComplete?: () => void;
};

/**
 * `fill` + 고정 비율 박스 — 로드 전 쉬머, 로드 후 부드럽게 페이드인.
 */
export function ImageFillWithSkeleton({
  src,
  alt,
  aspectRatio,
  className,
  imageClassName,
  sizes = "(max-width: 1280px) 100vw, 1280px",
  priority,
  unoptimized,
  objectFit = "cover",
  onLoadComplete,
}: FillProps) {
  const [loaded, setLoaded] = useState(false);
  const onDone = useCallback(() => {
    setLoaded(true);
    onLoadComplete?.();
  }, [onLoadComplete]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setLoaded(true);
      onLoadComplete?.();
    }
  }, [onLoadComplete]);

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-zinc-200/25", className)}
      style={{ aspectRatio } as CSSProperties}
    >
      {!loaded && <ShimmerOverlay />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized ?? src.startsWith("https://")}
        className={cn(
          objectFit === "contain" ? "object-contain" : "object-cover",
          "object-center transition-opacity duration-700 ease-out motion-reduce:duration-150",
          loaded ? "opacity-100" : "opacity-0",
          imageClassName,
        )}
        onLoad={onDone}
      />
    </div>
  );
}

type IntrinsicProps = {
  src: string;
  alt: string;
  /** 파일 원본 픽셀 — 레이아웃·해상도 힌트 */
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
  sizes: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
  onLoadComplete?: () => void;
};

/**
 * 풀 너비, 원본 비율 유지 — Next `width`/`height`로 디코딩 크기 고정.
 */
export function IntrinsicWidthImageWithSkeleton({
  src,
  alt,
  width,
  height,
  className,
  imageClassName,
  sizes,
  priority,
  objectFit = "contain",
  onLoadComplete,
}: IntrinsicProps) {
  const [loaded, setLoaded] = useState(false);
  const onDone = useCallback(() => {
    setLoaded(true);
    onLoadComplete?.();
  }, [onLoadComplete]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoaded(true);
      onLoadComplete?.();
    }
  }, [onLoadComplete]);

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-zinc-200/20", className)}
      style={{ aspectRatio: `${width} / ${height}` } as CSSProperties}
    >
      {!loaded && <ShimmerOverlay />}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className={cn(
          "h-auto w-full transition-opacity duration-700 ease-out motion-reduce:duration-150",
          objectFit === "contain" ? "object-contain" : "object-cover",
          loaded ? "opacity-100" : "opacity-0",
          imageClassName,
        )}
        onLoad={onDone}
      />
    </div>
  );
}

type FixedImageProps = Omit<ImageProps, "onLoad"> & {
  skeletonClassName?: string;
};

/** 고정 width/height Image — 작은 로고 등 */
export function FixedImageWithSkeleton({
  className,
  skeletonClassName,
  ...props
}: FixedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const { width, height } = props;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoaded(true);
    }
  }, []);

  const w = typeof width === "number" ? width : 48;
  const h = typeof height === "number" ? height : 48;

  return (
    <span
      className={cn("relative inline-block overflow-hidden", skeletonClassName)}
      style={{ width: w, height: h }}
    >
      {!loaded && (
        <ShimmerOverlay className="rounded-md" />
      )}
      <Image
        {...props}
        className={cn(
          "transition-opacity duration-500 ease-out motion-reduce:duration-150",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
        onLoad={() => setLoaded(true)}
      />
    </span>
  );
}
