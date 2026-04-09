"use client";

import { IntrinsicNaturalImageWithSkeleton } from "@/components/media/ImageWithSkeleton";
import { cn } from "@/lib/utils";

/** `public/home/home-cert-*.svg` — 푸터·레이아웃 공통 */
export const HOME_ISO_BADGE_SRCS = [
  "/home/home-cert-1.svg",
  "/home/home-cert-2.svg",
  "/home/home-cert-3.svg",
] as const;

type IsoBadgesProps = {
  className?: string;
  /** flex 정렬: 홈 푸터는 start, 서브는 end */
  justify?: "start" | "end" | "center";
};

export function HomeIsoBadges({
  className,
  justify = "center",
}: IsoBadgesProps) {
  const justifyCls =
    justify === "start"
      ? "justify-start"
      : justify === "end"
        ? "justify-end"
        : "justify-center";

  return (
    <div
      className={cn(
        "flex max-w-full min-w-max shrink-0 flex-row flex-wrap items-center gap-1.5 sm:flex-nowrap sm:gap-2.5 md:gap-4",
        justifyCls,
        className,
      )}
      data-figma="footer iso_badges"
    >
      {HOME_ISO_BADGE_SRCS.map((src) => (
        <span key={src} className="shrink-0" aria-hidden>
          <IntrinsicNaturalImageWithSkeleton
            src={src}
            alt=""
            width={180}
            height={180}
            sizes="56px"
            unoptimized
            imageClassName="max-h-[3.5rem] max-w-[3.5rem] object-contain"
          />
        </span>
      ))}
    </div>
  );
}
