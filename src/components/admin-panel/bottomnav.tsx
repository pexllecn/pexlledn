"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageCircleMore,
  Plus,
  User,
  Kanban,
  Settings,
} from "lucide-react";
import { Dock, DockIcon } from "@/components/ui/dock";
import { cn } from "@/lib/utils";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { ThemeCustomizer } from "../theme-customizer";

export function BottomNav() {
  const pathname = usePathname();
  const sidebar = useSidebarToggle((state) => state);
  const [themeCustomizerOpen, setThemeCustomizerOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/messages", icon: MessageCircleMore, label: "Messages" },
    { href: "/users", icon: Plus, label: "Add" },
    { href: "/kanban", icon: Kanban, label: "Kanban" },
    { href: "/account", icon: User, label: "Account" },
    {
      href: "#",
      icon: Settings,
      label: "Theme",
      onClick: () => setThemeCustomizerOpen(true),
    },
  ];

  const isPathInNavItems = navItems.some((item) => item.href === pathname);

  return (
    <div
      className={cn(
        "z-50 fixed bottom-4 left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out",
        sidebar?.isOpen ? "lg:ml-28" : "lg:ml-[26px]"
      )}
    >
      <Dock isPathInNavItems={isPathInNavItems}>
        {navItems.map((item) => (
          <DockIcon
            key={item.href}
            label={item.label}
            isActive={item.href !== "#" && pathname === item.href}
          >
            {item.onClick ? (
              <button
                onClick={item.onClick}
                className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground rounded-lg"
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 ",
                    item.label === "Theme" && "animate-spin-slow"
                  )}
                  strokeWidth={1}
                />
              </button>
            ) : (
              <Link
                href={item.href}
                className="flex h-full w-full items-center justify-center"
              >
                <item.icon
                  className="h-5 w-5"
                  strokeWidth={pathname === item.href ? 2 : 1}
                />
              </Link>
            )}
          </DockIcon>
        ))}
      </Dock>
      <ThemeCustomizer
        open={themeCustomizerOpen}
        onOpenChange={setThemeCustomizerOpen}
      />
    </div>
  );
}

export default BottomNav;
