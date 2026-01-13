"use client";

import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
  "aria-label"?: string;
}

export function Progress({ value, className, "aria-label": ariaLabel }: ProgressProps) {
  const percentage = Math.min(Math.max(value, 0), 100);
  
  return (
    <div className={cn("w-full bg-secondary/30 rounded-full h-1.5 overflow-hidden", className)}>
      <div
        className="h-full bg-foreground transition-all duration-300"
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel || `Progression ${percentage} pourcent`}
      />
    </div>
  );
}
