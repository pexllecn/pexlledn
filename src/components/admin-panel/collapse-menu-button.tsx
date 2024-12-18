import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Dot, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  notificationCount?: string | number;
};

interface CollapseMenuButtonProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  submenus: Submenu[];
  isOpen: boolean | undefined;
  notificationCount?: string | number;
}

export function CollapseMenuButton({
  icon: Icon,
  label,
  active,
  submenus,
  isOpen,
  notificationCount,
}: CollapseMenuButtonProps) {
  const isSubmenuActive = submenus.some((submenu) => submenu.active);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

  const renderNotificationBadge = (count?: string | number) => {
    if (!count) return null;
    return (
      <Badge
        variant="decline"
        className={cn(
          "ml-auto px-2 min-w-[20px] flex items-center justify-center",
          typeof notificationCount === "string" && "text-1xs"
        )}
      >
        {notificationCount}
      </Badge>
    );
  };

  return isOpen ? (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className="w-full"
    >
      <CollapsibleTrigger className="w-full mb-1 cursor-pointer" asChild>
        <Button
          variant={active ? "outline3" : "ghost"}
          className={cn(
            "w-full justify-start h-8 mb-1 px-3 py-1 hover:bg-muted-foreground/10",
            !active && "text-muted-foreground font-normal"
          )}
        >
          <div className="w-full items-center flex justify-between">
            <div className="flex items-center">
              <span className="mr-2">
                <Icon size={16} />
              </span>
              <p
                className={cn(
                  "max-w-[150px] truncate",
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-96 opacity-0"
                )}
              >
                {label}
              </p>
            </div>
            <div className="flex items-center">
              {renderNotificationBadge(notificationCount)}
              <ChevronRight
                size={16}
                className={cn(
                  "transition-transform duration-200 ml-2",
                  isCollapsed ? "rotate-90" : "rotate-0"
                )}
              />
            </div>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {submenus.map(({ href, label, active, notificationCount }, index) => (
          <Button
            key={index}
            variant={active ? "outline3" : "ghost"}
            className={cn(
              "w-full justify-start h-8 mb-1 p-3 hover:bg-muted-foreground/10",
              !active && "text-muted-foreground"
            )}
            asChild
          >
            <Link href={href} className="flex items-center">
              <span className="mr-4 ml-2">
                <Dot size={18} />
              </span>
              <p
                className={cn(
                  "max-w-[170px] truncate",
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-96 opacity-0"
                )}
              >
                {label}
              </p>
              {renderNotificationBadge(notificationCount)}
            </Link>
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={active ? "outline3" : "ghost"}
                className="w-full justify-start h-8 mb-1 hover:bg-muted p-3 text-muted-foreground"
              >
                <div className="w-full items-center flex justify-between">
                  <div className="flex items-center">
                    <span
                      className={cn(
                        isOpen === false ? "text-muted-background" : "mr-2"
                      )}
                    >
                      <Icon size={16} />
                    </span>
                    <p
                      className={cn(
                        "max-w-[200px] truncate",
                        isOpen === false ? "opacity-0" : "opacity-100"
                      )}
                    >
                      {label}
                    </p>
                  </div>
                  {renderNotificationBadge(notificationCount)}
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            align="start"
            alignOffset={2}
            sideOffset={10}
          >
            <div className="flex items-center">
              {label}
              {renderNotificationBadge(notificationCount)}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side="right" sideOffset={25} align="start">
        <DropdownMenuLabel className="max-w-[190px] truncate flex items-center justify-between">
          {label}
          {renderNotificationBadge(notificationCount)}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {submenus.map(({ href, label, notificationCount }, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link
              className="cursor-pointer flex items-center justify-between"
              href={href}
            >
              <p className="max-w-[180px] truncate">{label}</p>
              {renderNotificationBadge(notificationCount)}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
