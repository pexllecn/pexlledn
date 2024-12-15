"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Dock = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    direction?: "left" | "right" | "middle";
  }
>(({ className, direction = "middle", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "group fixed bottom-4 left-1/2 -translate-x-1/2 flex h-16 items-center justify-center gap-1 rounded-lg border bg-background/60 p-2 shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out",
      direction === "left" && "justify-start",
      direction === "right" && "justify-end",
      className
    )}
    {...props}
  />
));
Dock.displayName = "Dock";

const DockIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-full w-12 items-center justify-center transition-all duration-300 ease-in-out group-hover:w-16 hover:mx-3",
      className
    )}
    {...props}
  />
));
DockIcon.displayName = "DockIcon";

export { Dock, DockIcon };
