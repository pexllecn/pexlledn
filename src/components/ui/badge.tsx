import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-1.5 text-xs font-medium leading-normal transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground dark:shadow",
        primary:
          "border-transparent bg-primary/20 border-primary/20 text-primary dark:text-primary font-medium",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        outline2:
          "border-transparent bg-primary/10 border-primary/5 text-primary",
        success:
          "border-transparent bg-emerald-500/10 border-emerald-500/5 text-emerald-500",
        decline: "border-transparent bg-red-500/10 text-red-500",
        info: "border-transparent bg-purple-500/10 border-purple-500/10 text-purple-500",
        teal: "border-transparent bg-teal-500/10 border-teal-500/5 text-teal-500 ",
        blue: "border-transparent bg-blue-500/10 border-blue-500/5 text-blue-500",
        cyan: "border-transparent bg-cyan-500/10 border-cyan-500/5 text-cyan-500 ",
        yellow:
          "border-transparent bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-500 ",
        black: "border-transparent bg-foreground text-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
