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

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 border-t border-border py-2 px-4",
        "flex justify-between items-center lg:hidden",
        "bg-background/95 backdrop-blur-lg",
        "dark:bg-background/95 dark:backdrop-blur-lg",
        "dark:shadow-secondary",
        "z-50",
        "h-16" // Set a fixed height for the bottom nav
      )}
      style={{
        WebkitBackdropFilter: "blur(16px)",
        backdropFilter: "blur(16px)",
      }}
    >
      <NavItem
        href="/dashboard"
        icon={<Home size={24} />}
        label="Home"
        isActive={pathname === "/dashboard"}
      />
      <NavItem
        href="/kanban"
        icon={<Kanban size={24} />}
        label="Kanban"
        isActive={pathname === "/kanban"}
      />
      <NavItem
        href="/users"
        icon={<Plus size={24} />}
        label="Users"
        isActive={pathname === "/users"}
      />
      <NavItem
        href="/messages"
        icon={<MessageCircleMore size={24} />}
        label="Messages"
        isActive={pathname === "/messages"}
      />
      <NavItem
        href="/account"
        icon={<User size={24} />}
        label="Account"
        isActive={pathname === "/account"}
      />
    </nav>
  );
}

const NavItem = ({
  href,
  icon,
  label,
  isActive,
}: {
  href: string;
  icon: React.ReactElement;
  label: string;
  isActive: boolean;
}) => (
  <Link href={href} className="flex flex-col items-center">
    <div
      className={cn(
        "p-1 transition-colors duration-200",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      {React.cloneElement(icon, {
        className: cn(
          "transition-all duration-200",
          isActive ? "stroke-[2.0]" : "stroke-[1.0] stroke-muted-foreground"
        ),
      })}
    </div>
    <span className="text-xs mt-1">{label}</span>
  </Link>
);

export default BottomNav;
