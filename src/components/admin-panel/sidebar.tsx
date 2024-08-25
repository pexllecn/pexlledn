"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";

const LogoSection: React.FC<{ logo: string; isOpen: boolean }> = ({
  logo,
  isOpen
}) => (
  <div className="logo-container space-y-4 flex justify-center items-center py-4 md:block">
    <Link href="/">
      <div
        className="logo-container relative"
        style={{
          width: isOpen ? "160px" : "20px",
          height: "30px",
          overflow: "hidden",
          transition: "width 0.3s ease-in-out"
        }}
      >
        <Image
          src={logo}
          alt="Pexlle Logo"
          layout="fill"
          objectFit="cover"
          objectPosition="left"
          className="logo-image"
        />
      </div>
    </Link>
  </div>
);

export function Sidebar() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [logo, setLogo] = useState("/pexlleh.png");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const effectiveTheme = resolvedTheme || theme;
      setLogo(effectiveTheme === "dark" ? "/pexllelight.png" : "/pexlleh.png");
    }
  }, [theme, resolvedTheme, mounted]);

  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!mounted || !sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen transition-all duration-300 ease-in-out",
        sidebar.isOpen ? "w-52" : "w-[60px]",
        "hidden lg:block"
      )}
    >
      <SidebarToggle isOpen={sidebar.isOpen} setIsOpen={sidebar.setIsOpen} />
      <div className="relative bg-muted h-full flex flex-col overflow-hidden pl-3 pr-1 pt-4">
        <Button
          className={cn(
            "transition-all ease-in-out duration-300 mb-1",
            sidebar.isOpen ? "px-4" : "px-2"
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center">
            <LogoSection logo={logo} isOpen={sidebar.isOpen} />
          </Link>
        </Button>
        <Menu isOpen={sidebar.isOpen} />
      </div>
    </aside>
  );
}
