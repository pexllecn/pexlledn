import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border font-normal px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-foreground text-background dark:shadow",
        primary: "border-transparent bg-primary text-white",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-emerald-400/10 border-emerald-400/20 text-emerald-400",
        decline:
          "border-transparent bg-red-400/10 border-red-400/20 text-red-400",
        info: "border-transparent bg-purple-400/10 border-purple-400/20 text-purple-400",
        teal: "border-transparent bg-teal-400/10 border-teal-400/20 text-teal-400 ",
        blue: "border-transparent bg-primary/10 border-primary/20 text-primary",
        cyan: "border-transparent bg-cyan-400/10 border-cyan-400/20 text-cyan-400 ",
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
