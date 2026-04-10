"use client";

import { IntrinsicNaturalImageWithSkeleton } from "@/components/media/ImageWithSkeleton";
import { cn } from "@/lib/utils";

/** 푸터 인증 뱃지 — `public/home/` (순서: IAF → KAB → KQA). Next `width`/`height`는 원본 비율용. */
export const HOME_FOOTER_BADGES = [
  { src: "/home/badge_iaf.svg", width: 152, height: 95 },
  { src: "/home/badge_kab.png", width: 2286, height: 1539 },
  { src: "/home/badge_kqa.svg", width: 736, height: 365 },
] as const;

/** @deprecated `HOME_FOOTER_BADGES` 사용 권장 */
export const HOME_ISO_BADGE_SRCS = HOME_FOOTER_BADGES.map((b) => b.src);

export function HomeIsoBadges({
  className,
  justify = "center",
}: {
  className?: string;
  /** flex 정렬: 홈 푸터는 start, 서브는 end */
  justify?: "start" | "end" | "center";
}) {
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
      {HOME_FOOTER_BADGES.map((badge) => (
        <span key={badge.src} className="inline-flex shrink-0 items-center" aria-hidden>
          <IntrinsicNaturalImageWithSkeleton
            src={badge.src}
            alt=""
            width={badge.width}
            height={badge.height}
            sizes="50px"
            unoptimized
            className="max-w-none"
            imageClassName="h-[50px] max-h-[50px] w-auto max-w-none object-contain"
          />
        </span>
      ))}
    </div>
  );
}
