import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SubPageScrollTopButton } from "@/components/layout/SubPageScrollTopButton";
import { SubPageViewportGrid } from "@/components/layout/SubPageViewportGrid";

type Props = {
  children: ReactNode;
  /** z-0 단색 베이스(페이지 배경) */
  backgroundColor: string;
  className?: string;
  /** z-2 콘텐츠 래퍼 */
  contentClassName?: string;
  as?: "main" | "div";
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">;

/**
 * 서브페이지 공통 레이어: 베이스 배경(z-0) → 12컬 그리드(z-1) → 콘텐츠(z-2).
 * `AppChrome`에서 그리드를 sibling으로 두면 `<main>` 불투명 배경이 그리드를 덮어
 * 보이지 않으므로, 그리드는 반드시 이 스캐폴드 **안**에서 베이스와 형제로 둔다.
 */
export function SubPageScaffold({
  children,
  backgroundColor,
  className,
  contentClassName,
  as: Tag = "main",
  style: userStyle,
  ...rest
}: Props) {
  return (
    <Tag
      className={cn("relative isolate min-h-dvh bg-transparent", className)}
      style={{
        ...userStyle,
        backgroundColor: "transparent",
      }}
      {...rest}
    >
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor }}
        aria-hidden
      />
      <SubPageViewportGrid className="absolute inset-0 z-[1]" />
      <div className={cn("relative z-[2] min-h-dvh", contentClassName)}>
        {children}
      </div>
      <SubPageScrollTopButton />
    </Tag>
  );
}
