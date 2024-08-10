"use client";

import React from "react";
import Link from "next/link";
import { Home, Search, Heart, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary border-t border-border/40 py-2 px-4 flex justify-between items-center lg:hidden">
      <NavItem href="/dashboard" icon={<Home size={24} />} label="Home" />
      <NavItem href="/search" icon={<Search size={24} />} label="Search" />
      <PostButton />
      <NavItem href="/favorites" icon={<Heart size={24} />} label="Favorites" />
      <NavItem href="/profile" icon={<User size={24} />} label="Profile" />
    </nav>
  );
}

const NavItem: React.FC<{
  href: string;
  icon: React.ReactElement;
  label: string;
}> = ({ href, icon, label }) => (
  <Link href={href} className="flex flex-col items-center">
    <div className="p-3 rounded-xl ">{icon}</div>
  </Link>
);

const PostButton = () => (
  <Link href="/post" className="flex flex-col items-center -mt-6">
    <div
      className={cn(
        "p-4 rounded-full bg-primary text-primary-foreground shadow-lg",
        "transition-transform duration-200 ease-in-out transform hover:scale-110"
      )}
    >
      <Plus size={24} />
    </div>
  </Link>
);
