import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface GlassCardProps extends ComponentProps<"div"> {
  /** Use the heavier `.glass-strong` variant — for nav bars and modals. */
  strong?: boolean;
}

export function GlassCard({
  strong,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        strong ? "glass-strong" : "glass",
        "rounded-2xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
