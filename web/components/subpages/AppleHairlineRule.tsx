import { cn } from "@/lib/utils";

/** 애플스러운 1px 구분 — works_view 중간구분과 별도(가정) */
export function AppleHairlineRule({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)} aria-hidden>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-900/12 to-transparent" />
    </div>
  );
}
