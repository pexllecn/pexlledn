"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircleMore, Plus, User, Kanban } from "lucide-react";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";

interface NavItem {
  href: string;
  icon: React.ComponentType<{
    className?: string;
    strokeWidth?: string | number;
  }>;
  label: string;
}

export function BottomNav() {
  const pathname = usePathname();
  const sidebar = useSidebarToggle((state) => state);

  const navItems: NavItem[] = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/messages", icon: MessageCircleMore, label: "Messages" },
    { href: "/users", icon: Plus, label: "Add" },
    { href: "/kanban", icon: Kanban, label: "Kanban" },
    { href: "/account", icon: User, label: "Account" },
  ];

  const isPathInNavItems = navItems.some((item) => item.href === pathname);

  return (
    <TooltipProvider delayDuration={50}>
      <div
        className={cn(
          "z-50 fixed bottom-4 left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out",
          sidebar?.isOpen ? "lg:ml-28" : "lg:ml-[26px]"
        )}
      >
        <Dock
          className="relative"
          isPathInNavItems={isPathInNavItems}
          iconSize={40}
          iconMagnification={60}
          iconDistance={140}
          direction="middle"
        >
          {navItems.map((item) => (
            <DockIcon
              key={item.href}
              label={item.label}
              className="relative"
              isActive={item.href !== "#" && pathname === item.href}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className="flex h-full w-full items-center justify-center relative"
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 transition-all duration-200 text-muted-foreground",
                        {
                          "text-spcolor": pathname === item.href,
                        }
                      )}
                      strokeWidth={pathname === item.href ? 2 : 1}
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent showArrow={true}>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </div>
    </TooltipProvider>
  );
}

export default BottomNav;
