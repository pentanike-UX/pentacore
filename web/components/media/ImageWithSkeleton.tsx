"use client";

import Image, { type ImageProps } from "next/image";
import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
} from "react";
import { SUBPAGE_IMAGE_QUALITY } from "@/lib/image-presets";
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
  /** `aspectClassName`이 없을 때만 사용 */
  aspectRatio?: string;
  /** 반응형 비율(Tailwind). 지정 시 인라인 `aspectRatio` 미사용 */
  aspectClassName?: string;
  /** 부모(`relative` + 비율/높이)를 가득 채움 — `aspectRatio` / `aspectClassName` 무시 */
  coverParent?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  unoptimized?: boolean;
  quality?: number;
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
  aspectClassName,
  coverParent,
  className,
  imageClassName,
  sizes = "(max-width: 1280px) 100vw, 1280px",
  priority,
  unoptimized,
  quality = SUBPAGE_IMAGE_QUALITY,
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

  const ratioStyle =
    !coverParent && aspectClassName == null && aspectRatio != null
      ? ({ aspectRatio } as CSSProperties)
      : undefined;

  return (
    <div
      className={cn(
        coverParent
          ? "absolute inset-0 overflow-hidden bg-zinc-200/25"
          : "relative w-full overflow-hidden bg-zinc-200/25",
        !coverParent && aspectClassName,
        className,
      )}
      style={ratioStyle}
    >
      {!loaded && <ShimmerOverlay />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
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
  unoptimized?: boolean;
  quality?: number;
  objectFit?: "cover" | "contain";
  onLoadComplete?: () => void;
};

/**
 * 원본 `width`/`height`만 사용 — 풀폭 비율 박스 없이 `inline-block`(로고·썸네일 등).
 */
export function IntrinsicNaturalImageWithSkeleton({
  src,
  alt,
  width,
  height,
  className,
  imageClassName,
  sizes,
  priority,
  unoptimized,
  quality = SUBPAGE_IMAGE_QUALITY,
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
    <span className={cn("relative inline-block max-w-full", className)}>
      {!loaded && <ShimmerOverlay className="rounded-sm" />}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        quality={quality}
        unoptimized={unoptimized}
        className={cn(
          "h-auto max-w-full transition-opacity duration-700 ease-out motion-reduce:duration-150",
          objectFit === "contain" ? "object-contain" : "object-cover",
          loaded ? "opacity-100" : "opacity-0",
          imageClassName,
        )}
        onLoad={onDone}
      />
    </span>
  );
}

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
  unoptimized,
  quality = SUBPAGE_IMAGE_QUALITY,
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
        quality={quality}
        unoptimized={unoptimized}
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

/** 고정 width/height Image — 작은 로고·아이콘 등 */
export function FixedImageWithSkeleton({
  className,
  skeletonClassName,
  quality = SUBPAGE_IMAGE_QUALITY,
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
        quality={quality}
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

type FillSlotProps = {
  src: string;
  alt: string;
  /** `relative` 래퍼에 붙는 크기·레이아웃 클래스 (예: `h-5 w-[39px]`) */
  slotClassName: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  unoptimized?: boolean;
  quality?: number;
  priority?: boolean;
};

/**
 * 고정 슬롯 안 `fill` 이미지 — 소형 로고·아이콘(쉬머 + 풀 해상도 `sizes` 힌트).
 */
export function FillSlotImageWithSkeleton({
  src,
  alt,
  slotClassName,
  sizes,
  className,
  imageClassName,
  unoptimized,
  quality = SUBPAGE_IMAGE_QUALITY,
  priority,
}: FillSlotProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoaded(true);
    }
  }, []);

  return (
    <div
      className={cn("relative shrink-0 overflow-hidden", slotClassName, className)}
    >
      {!loaded && <ShimmerOverlay className="rounded-sm" />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        unoptimized={unoptimized ?? src.startsWith("https://")}
        className={cn(
          "transition-opacity duration-500 ease-out motion-reduce:duration-150",
          loaded ? "opacity-100" : "opacity-0",
          imageClassName,
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
