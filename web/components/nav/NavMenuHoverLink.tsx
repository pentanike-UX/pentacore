"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * `HeaderNavOverlay` 링크의 `clamp(..., 4.5rem)` 상한과 동일해야 함.
 * 라인 두께 = `calc(1em / 이 값)` → 최대 폰트에서 약 1rem.
 */
export const NAV_MENU_HOVER_LINE_REF_REM = 4.5;

const lineTransition =
  "transition-transform duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:duration-0";

type Props = ComponentProps<typeof Link> & {
  lineClassName?: string;
};

export function NavMenuHoverLink({
  className,
  lineClassName,
  children,
  ...props
}: Props) {
  return (
    <Link
      {...props}
      className={cn(
        "group relative inline-block no-underline outline-none",
        className,
      )}
    >
      <span className="relative inline-block">
        <span className="relative z-10">{children}</span>
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute bottom-0 left-0 right-0 z-0 origin-center scale-x-0 rounded-none bg-current",
            lineTransition,
            "group-hover:scale-x-100 group-focus-visible:scale-x-100",
            lineClassName,
          )}
          style={{
            height: `calc(1em / ${NAV_MENU_HOVER_LINE_REF_REM})`,
          }}
        />
      </span>
    </Link>
  );
}
