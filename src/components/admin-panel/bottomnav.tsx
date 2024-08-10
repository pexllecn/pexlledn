"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiHome4Line,
  RiHome4Fill,
  RiSearch2Line,
  RiSearch2Fill,
  RiHeartLine,
  RiHeartFill,
  RiUser3Line,
  RiUser3Fill
} from "react-icons/ri";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 border-t border-border py-1 px-4",
        "flex justify-between items-center lg:hidden",
        "bg-background/80 backdrop-blur-sm",
        "dark:bg-background/80 dark:backdrop-blur-sm",
        "dark:shadow-secondary",
        "z-50" // Add a high z-index to ensure it stays on top
      )}
      style={{
        WebkitBackdropFilter: "blur(8px)",
        backdropFilter: "blur(8px)"
      }}
    >
      <NavItem
        href="/dashboard"
        icon={<RiHome4Line size={24} />}
        activeIcon={<RiHome4Fill size={24} />}
        label="Home"
        isActive={pathname === "/dashboard"}
      />
      <NavItem
        href="/search"
        icon={<RiSearch2Line size={24} />}
        activeIcon={<RiSearch2Fill size={24} />}
        label="Search"
        isActive={pathname === "/search"}
      />
      <NavItem
        href="/favorites"
        icon={<RiHeartLine size={24} />}
        activeIcon={<RiHeartFill size={24} />}
        label="Favorites"
        isActive={pathname === "/favorites"}
      />
      <NavItem
        href="/account"
        icon={<RiUser3Line size={24} />}
        activeIcon={<RiUser3Fill size={24} />}
        label="Account"
        isActive={pathname === "/account"}
      />
    </nav>
  );
}

const NavItem = ({
  href,
  icon,
  activeIcon,
  label,
  isActive
}: {
  href: string;
  icon: React.ReactElement;
  activeIcon: React.ReactElement;
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
      {isActive ? activeIcon : icon}
    </div>
    <span
      className={cn(
        "text-xs transition-colors duration-200",
        isActive ? "text-primary font-semibold" : "text-muted-foreground"
      )}
    >
      {label}
    </span>
  </Link>
);

export default BottomNav;
