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
        "fixed bottom-4 left-4 right-4 p-4",
        "flex justify-between items-center lg:hidden",
        "bg-background/60 ",
        "border rounded-lg",
        "shadow",
        "z-50",
        "h-16"
      )}
      style={{
        WebkitBackdropFilter: "blur(10px)",
        backdropFilter: "blur(10px)",
      }}
    >
      <NavItem
        href="/dashboard"
        icon={Home}
        label=""
        isActive={pathname === "/dashboard"}
      />
      <NavItem
        href="/kanban"
        icon={Kanban}
        label=""
        isActive={pathname === "/kanban"}
      />
      <NavItem
        href="/users"
        icon={Plus}
        label=""
        isActive={pathname === "/users"}
      />
      <NavItem
        href="/messages"
        icon={MessageCircleMore}
        label=""
        isActive={pathname === "/messages"}
      />
      <NavItem
        href="/account"
        icon={User}
        label=""
        isActive={pathname === "/account"}
      />
    </nav>
  );
}

const NavItem = ({
  href,
  icon: Icon,
  label,
  isActive,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}) => (
  <Link href={href} className="flex flex-col items-center">
    <div
      className={cn(
        "p-1 transition-colors duration-200 rounded-lg",
        isActive ? "bg-primary p-3" : "text-muted-foreground"
      )}
    >
      <Icon
        size={22}
        className={cn(
          "transition-all duration-200",
          isActive
            ? "stroke-black stroke-[2]"
            : "stroke-[1.5] stroke-muted-foreground"
        )}
      />
    </div>
    <span className="text-[10px] font-medium">{label}</span>
  </Link>
);

export default BottomNav;
