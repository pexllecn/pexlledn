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
        "fixed bottom-0 left-0 right-0 border-t border-border py-1 px-4",
        "flex justify-between items-center lg:hidden",
        "bg-background/70 backdrop-blur-lg",
        "dark:bg-background/70 dark:backdrop-blur-lg",
        "dark:shadow-secondary",
        "z-50" // Add a high z-index to ensure it stays on top
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
        href="/search"
        icon={<Search size={24} />}
        label="Search"
        isActive={pathname === "/search"}
      />
      <NavItem
        href="/chat"
        icon={<MessageCircleMore size={24} />}
        label="Messages"
        isActive={pathname === "/chat"}
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
        "p-2 transition-colors duration-200",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      {React.cloneElement(icon, {
        className: cn(
          "transition-all duration-200",
          isActive ? "stroke-[2.5]" : "stroke-[2.0] stroke-muted-foreground"
        ),
      })}
    </div>
  </Link>
);

export default BottomNav;
