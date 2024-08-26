import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "rounded-full border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "rounded-full border-transparent bg-secondary border-grey-200 text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "rounded-full border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "rounded-full text-foreground",
        success:
          "rounded-full border-transparent bg-emerald-400/10 border-emerald-400/20 text-emerald-400 ",
        decline:
          "rounded-full border-transparent bg-red-400/10 border-red-400/20 text-red-400",
        info: "rounded-full border-transparent bg-purple-400/10 border-purple-400/20 text-purple-400",
        teal: "rounded-full border-transparent bg-teal-400/10 border-teal-400/20 text-teal-400 ",
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
