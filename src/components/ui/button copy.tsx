"use client";

import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid:
          "bg-gradient-to-b shadow-sm [box-shadow:rgba(255,255,255,0.25)_0px_1px_0px_0px_inset,var(--btn-border-color)_0px_0px_0px_1px] text-white hover:brightness-[1.1] transition-[filter] duration-150 ease-in-out active:brightness-95",
        outlined:
          "[--outline-radial-opacity:0.6] dark:[background-image:none] [--inner-border-color:1] dark:[--inner-border-color:0] dark:[--outline-radial-opacity:0.2] [background-image:radial-gradient(76%_151%_at_52%_-52%,rgba(255,255,255,var(--outline-radial-opacity))_0%,transparent_100%)] [box-shadow:rgba(255,255,255,var(--inner-border-color))_0px_1px_0px_0px_inset,var(--btn-border-color)_0px_0px_0px_1px,0px_1px_2px_rgba(0,0,0,0.1)] hover:brightness-[0.98] active:brightness-100 transition-[filter] ease-in-out duration-150",
        soft: "bg-secondary/10 text-secondary-foreground hover:bg-secondary/20",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        default:
          "bg-foreground font-medium text-background hover:bg-primary hover:text-primary-foreground",
        primary:
          "bg-primary font-medium text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        lightred: "bg-destructive/10 text-destructive hover:bg-destructive/90",
        outline:
          "border border-muted-background bg-background hover:bg-accent hover:text-accent-foreground",
        outline2: "border border-primary/30 bg-primary/20",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        link: "text-primary underline-offset-4 hover:underline",
        expandIcon:
          "group relative text-primary-foreground bg-primary hover:bg-primary/90",
        ringHover:
          "bg-primary text-white transition-all duration-300 hover:bg-primary/90 hover:ring-2 hover:ring-primary/90 hover:ring-offset-2",
        shine:
          "text-white animate-shine bg-gradient-to-r from-primary via-primary/75 to-primary bg-[length:400%_100%]",
        gooeyRight:
          "text-white relative bg-primary z-0 overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r from-zinc-400 before:transition-transform before:duration-1000 hover:before:translate-x-[0%] hover:before:translate-y-[0%]",
        gooeyLeft:
          "text-white relative bg-primary z-0 overflow-hidden transition-all duration-500 after:absolute after:inset-0 after:-z-10 after:translate-x-[-150%] after:translate-y-[150%] after:scale-[2.5] after:rounded-[100%] after:bg-gradient-to-l from-zinc-400 after:transition-transform after:duration-1000 hover:after:translate-x-[0%] hover:after:translate-y-[0%]",
        linkHover1:
          "relative after:absolute after:bg-primary after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-left after:scale-x-100 hover:after:origin-bottom-right hover:after:scale-x-0 after:transition-transform after:ease-in-out after:duration-300",
        linkHover2:
          "relative after:absolute after:bg-primary after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300",
      },
      intent: {
        primary: "",
        secondary: "",
        accent: "",
        danger: "",
        info: "",
        success: "",
        warning: "",
        gray: "",
        neutral: "",
      },
      size: {
        default: "h-8 p-4",
        sm: "h-8 rounded-md px-3",
        lg: "h-9 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    compoundVariants: [
      // Solid variants
      {
        intent: "primary",
        variant: "solid",
        className:
          "bg-neutral-900 [background-image:radial-gradient(76%_151%_at_52%_-52%,rgba(255,255,255,0.5)_0%,transparent_100%)] [box-shadow:rgba(255,255,255,0.3)_0px_1px_0px_0px_inset,theme(colors.neutral.950)_0px_0px_0px_1px]",
      },
      {
        intent: "secondary",
        variant: "solid",
        className:
          "from-purple-500 to-purple-600 [--btn-border-color:theme(colors.purple.700)]",
      },
      {
        intent: "accent",
        variant: "solid",
        className:
          "from-lime-500 to-lime-600 [--btn-border-color:theme(colors.lime.700)]",
      },
      {
        intent: "danger",
        variant: "solid",
        className:
          "from-red-500 to-red-600 [--btn-border-color:theme(colors.red.700)]",
      },
      {
        intent: "info",
        variant: "solid",
        className:
          "from-blue-500 to-blue-600 [--btn-border-color:theme(colors.blue.700)]",
      },
      {
        intent: "success",
        variant: "solid",
        className:
          "from-green-500 to-green-600 [--btn-border-color:theme(colors.green.700)]",
      },
      {
        intent: "warning",
        variant: "solid",
        className:
          "from-amber-400 to-amber-500 text-amber-950 [--btn-border-color:theme(colors.amber.600)]",
      },
      {
        intent: "gray",
        variant: "solid",
        className:
          "from-gray-500 to-gray-600 [--btn-border-color:theme(colors.gray.700)]",
      },
      {
        intent: "neutral",
        variant: "solid",
        className:
          "from-blue-500 to-blue-600 [--btn-border-color:theme(colors.blue.700)]",
      },
      // Outlined variants
      {
        intent: "primary",
        variant: "outlined",
        className:
          "[--btn-border-color:theme(colors.primary.200)] dark:[--btn-border-color:theme(colors.primary.500/0.3)] text-primary-800 bg-primary-50 dark:text-primary-300 dark:bg-primary-500/5 dark:hover:bg-primary-500/10 dark:active:bg-primary-500/5",
      },
      {
        intent: "secondary",
        variant: "outlined",
        className:
          "[--btn-border-color:theme(colors.secondary.200)] dark:[--btn-border-color:theme(colors.secondary.500/0.3)] text-secondary-800 bg-secondary-50 dark:text-secondary-300 dark:bg-secondary-500/5 dark:hover:bg-secondary-500/10 dark:active:bg-secondary-500/5",
      },
      {
        intent: "accent",
        variant: "outlined",
        className:
          "[--btn-border-color:theme(colors.accent.200)] dark:[--btn-border-color:theme(colors.accent.500/0.3)] text-accent-800 bg-accent-50 dark:text-accent-300 dark:bg-accent-500/5 dark:hover:bg-accent-500/10 dark:active:bg-accent-500/5",
      },
      {
        intent: "danger",
        variant: "outlined",
        className:
          "[--btn-border-color:theme(colors.red.200)] dark:[--btn-border-color:theme(colors.red.500/0.3)] text-red-800 bg-red-50 dark:text-red-300 dark:bg-red-500/5 dark:hover:bg-red-500/10 dark:active:bg-red-500/5",
      },
      {
        intent: "info",
        variant: "outlined",
        className:
          "[--btn-border-color:theme(colors.purple.200)] dark:[--btn-border-color:theme(colors.purple.500/0.3)] text-purple-800 bg-purple-50 dark:text-purple-300 dark:bg-purple-500/5 dark:hover:bg-purple-500/10 dark:active:bg-purple-500/5",
      },
      {
        intent: "success",
        variant: "outlined",
        className:
          "[--btn-border-color:theme(colors.green.200)] dark:[--btn-border-color:theme(colors.green.500/0.3)] text-green-800 bg-green-100 dark:text-green-300 dark:bg-green-500/5 dark:hover:bg-green-500/10 dark:active:bg-green-500/5",
      },
      {
        intent: "warning",
        variant: "outlined",
        className:
          "[--btn-border-color:theme(colors.amber.200)] dark:[--btn-border-color:theme(colors.amber.500/0.3)] text-amber-800 bg-amber-50 dark:text-amber-300 dark:bg-amber-500/5 dark:hover:bg-amber-500/10 dark:active:bg-amber-500/5",
      },
      {
        intent: "gray",
        variant: "outlined",
        className:
          "[--btn-border-color:theme(colors.gray.200)] dark:[--btn-border-color:theme(colors.gray.500/0.3)] text-gray-800 bg-gray-50 dark:text-gray-300 dark:bg-gray-500/5 dark:hover:bg-gray-500/10 dark:active:bg-gray-500/5",
      },
      {
        intent: "neutral",
        variant: "outlined",
        className:
          "[--btn-border-color:theme(colors.gray.300)] dark:[--btn-border-color:theme(colors.white)] text-gray-800 bg-gray-100 dark:text-white dark:bg-gray-500/5 dark:hover:bg-gray-500/10 dark:active:bg-gray-500/5",
      },
      // Soft variants
      {
        intent: "primary",
        variant: "soft",
        className: "bg-blue-50 text-blue-600 hover:bg-blue-100",
      },
      {
        intent: "secondary",
        variant: "soft",
        className: "bg-purple-50 text-purple-600 hover:bg-purple-100",
      },
      {
        intent: "accent",
        variant: "soft",
        className: "bg-lime-50 text-lime-600 hover:bg-lime-100",
      },
      {
        intent: "danger",
        variant: "soft",
        className: "bg-red-50 text-red-600 hover:bg-red-100",
      },
      {
        intent: "info",
        variant: "soft",
        className: "bg-blue-50 text-blue-600 hover:bg-blue-100",
      },
      {
        intent: "success",
        variant: "soft",
        className: "bg-green-50 text-green-600 hover:bg-green-100",
      },
      {
        intent: "warning",
        variant: "soft",
        className: "bg-amber-50 text-amber-600 hover:bg-amber-100",
      },
      {
        intent: "gray",
        variant: "soft",
        className: "bg-gray-50 text-gray-600 hover:bg-gray-100",
      },
      {
        intent: "neutral",
        variant: "soft",
        className: "bg-neutral-50 text-neutral-900 hover:bg-neutral-100",
      },
      // Ghost variants
      {
        intent: "primary",
        variant: "ghost",
        className: "text-blue-600 hover:bg-blue-50",
      },
      {
        intent: "secondary",
        variant: "ghost",
        className: "text-purple-600 hover:bg-purple-50",
      },
      {
        intent: "accent",
        variant: "ghost",
        className: "text-lime-600 hover:bg-lime-50",
      },
      {
        intent: "danger",
        variant: "ghost",
        className: "text-red-600 hover:bg-red-50",
      },
      {
        intent: "info",
        variant: "ghost",
        className: "text-blue-600 hover:bg-blue-50",
      },
      {
        intent: "success",
        variant: "ghost",
        className: "text-green-600 hover:bg-green-50",
      },
      {
        intent: "warning",
        variant: "ghost",
        className: "text-amber-600 hover:bg-amber-50",
      },
      {
        intent: "gray",
        variant: "ghost",
        className: "text-gray-600 hover:bg-gray-50",
      },
      {
        intent: "neutral",
        variant: "ghost",
        className: "text-neutral-900 hover:bg-neutral-50",
      },
    ],
    defaultVariants: {
      variant: "solid",
      intent: "primary",
      size: "default",
    },
  }
);

interface IconProps {
  Icon: React.ElementType;
  iconPlacement: "left" | "right";
}

interface IconRefProps {
  Icon?: never;
  iconPlacement?: undefined;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export type ButtonIconProps = IconProps | IconRefProps;

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonIconProps
>(
  (
    {
      className,
      variant,
      intent,
      size,
      asChild = false,
      Icon,
      iconPlacement,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, intent, size, className }))}
        ref={ref}
        {...props}
      >
        {Icon && iconPlacement === "left" && (
          <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-100 group-hover:pr-2 group-hover:opacity-100">
            <Icon />
          </div>
        )}
        <Slottable>{props.children}</Slottable>
        {Icon && iconPlacement === "right" && (
          <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
            <Icon />
          </div>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
