"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DockContextType {
  setActiveIcon: (element: HTMLElement | null) => void;
  isPathInNavItems: boolean;
}

const DockContext = React.createContext<DockContextType | undefined>(undefined);

interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "left" | "right" | "middle";
  isPathInNavItems: boolean;
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    { className, direction = "middle", isPathInNavItems, children, ...props },
    ref
  ) => {
    const [indicatorStyle, setIndicatorStyle] = React.useState({
      left: 0,
      width: 0,
    });
    const dockRef = React.useRef<HTMLDivElement>(null);
    const [activeIcon, setActiveIcon] = React.useState<HTMLElement | null>(
      null
    );

    React.useEffect(() => {
      const updateIndicator = () => {
        if (dockRef.current && activeIcon) {
          const iconRect = activeIcon.getBoundingClientRect();
          const dockRect = dockRef.current.getBoundingClientRect();
          setIndicatorStyle({
            left: iconRect.left - dockRect.left,
            width: iconRect.width,
          });
        }
      };

      updateIndicator();
      window.addEventListener("resize", updateIndicator);
      return () => window.removeEventListener("resize", updateIndicator);
    }, [activeIcon]);

    return (
      <DockContext.Provider value={{ setActiveIcon, isPathInNavItems }}>
        <TooltipProvider>
          <div
            ref={ref}
            className={cn(
              "z-50 group flex h-16 items-center justify-center gap-1 rounded-lg border bg-background/60 p-2 shadow-xs backdrop-blur transition-all duration-300 ease-in-out",
              direction === "left" && "justify-start",
              direction === "right" && "justify-end",
              className
            )}
            {...props}
          >
            <div
              ref={dockRef}
              className="relative flex items-center transition-all duration-300 ease-in-out gap-2"
            >
              <DockIndicator
                style={indicatorStyle}
                isPathInNavItems={isPathInNavItems}
              />
              {children}
            </div>
          </div>
        </TooltipProvider>
      </DockContext.Provider>
    );
  }
);
Dock.displayName = "Dock";

const DockIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    label: string;
    isActive?: boolean;
  }
>(({ className, label, isActive, children, ...props }, ref) => {
  const iconRef = React.useRef<HTMLDivElement>(null);
  const context = React.useContext(DockContext);

  if (!context) {
    throw new Error("DockIcon must be used within a Dock");
  }

  const { setActiveIcon } = context;

  React.useEffect(() => {
    if (isActive && iconRef.current) {
      setActiveIcon(iconRef.current);
    }
  }, [isActive, setActiveIcon]);

  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <div
          ref={iconRef}
          className={cn(
            "relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-all duration-300 ease-in-out ",
            isActive
              ? "text-primary"
              : "text-muted-foreground hover:text-primary hover:bg-primary/10",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
});
DockIcon.displayName = "DockIcon";

interface DockIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  isPathInNavItems: boolean;
}

const DockIndicator: React.FC<DockIndicatorProps> = ({
  style,
  className,
  isPathInNavItems,
}) => (
  <div
    className={cn(
      "absolute h-12 rounded-lg transition-all duration-300 ease-in-out",
      isPathInNavItems ? "bg-primary/20" : "bg-transparent",
      className
    )}
    style={style}
  />
);

export { Dock, DockIcon };
