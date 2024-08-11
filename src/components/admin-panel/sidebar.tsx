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
  const { theme = "light", setTheme } = useTheme();
  const [logo, setLogo] = useState("/pexlleh.png");

  useEffect(() => {
    const effectiveTheme = theme === "system" ? "light" : theme;
    setLogo(effectiveTheme === "light" ? "/pexlleh.png" : "/pexllelight.png");
  }, [theme]);

  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[60px]" : "w-52",
        "hidden lg:block"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative bg-muted h-full flex flex-col pl-2 pt-4 overflow-y-auto">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <LogoSection logo={logo} isOpen={sidebar?.isOpen} />
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
