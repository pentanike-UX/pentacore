"use client";

import { Toast } from "@base-ui/react/toast";
import { cn } from "@/lib/utils";

/**
 * SUB_WORK `portfolio_group` 등 — Base UI Toast 스택 (기본 스타일).
 */
export function WorkToastStack() {
  const { toasts } = Toast.useToastManager();

  return (
    <Toast.Portal>
      <Toast.Viewport
        className={cn(
          "fixed top-4 z-[300] flex max-h-dvh w-full max-w-sm flex-col gap-2 p-4 outline-none",
          "left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0",
        )}
      >
        {toasts.map((toast) => (
          <Toast.Root
            key={toast.id}
            toast={toast}
            className="z-[calc(300-var(--toast-index,0))] rounded-lg border border-border bg-popover text-popover-foreground shadow-lg"
          >
            <Toast.Content className="flex items-start gap-3 px-4 py-3 pr-2">
              <Toast.Title className="min-w-0 flex-1 text-sm font-medium leading-snug" />
              <Toast.Close
                className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="닫기"
              />
            </Toast.Content>
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}
