"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Heart,
  User,
  Plus,
  MessageCircleMore,
  Kanban,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/kanban", icon: Kanban, label: "Kanban" },
    { href: "/users", icon: Plus, label: "Add" },
    { href: "/messages", icon: MessageCircleMore, label: "Messages" },
    { href: "/account", icon: User, label: "Account" },
  ];

  return (
    <TooltipProvider>
      <Dock className="md:hidden">
        {" "}
        {/* Hide on medium screens and larger */}
        {navItems.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300 ease-in-out",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground transition-all duration-300 ease-in-out"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 ease-in-out"
                  )}
                >
                  <item.icon className="h-6 w-6" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
      </Dock>
    </TooltipProvider>
  );
}

export default BottomNav;
