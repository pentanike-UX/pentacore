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
        /* shrink-0: 푸터 flex 행에서 기본 flex-shrink로 너비가 0에 가깝게 줄어드는 것 방지 */
        "flex max-w-full shrink-0 flex-row flex-nowrap items-center gap-3 overflow-x-auto overscroll-x-contain sm:gap-5 md:gap-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        justifyCls,
        className,
      )}
      data-figma="footer iso_badges"
    >
      {HOME_ISO_BADGE_SRCS.map((src) => (
        <img
          key={src}
          src={src}
          alt=""
          width={180}
          height={180}
          loading="lazy"
          decoding="async"
          className="h-auto w-auto max-h-[3.5rem] max-w-[3.5rem] shrink-0 object-contain"
          aria-hidden
        />
      ))}
    </div>
  );
}
