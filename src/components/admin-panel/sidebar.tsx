import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { useTheme } from "next-themes";
import Image from "next/image";

const LogoSection = ({ logo }: { logo: string }) => (
  <div className="logo-container space-y-4 flex justify-center items-center py-4 md:block">
    <Link href="/">
      <div
        className="logo-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        <Image
          src={logo}
          alt="Pexlle Logo"
          className="logo-image py-2"
          width={150}
          height={50}
        />
      </div>
    </Link>
  </div>
);
export function Sidebar() {
  const { theme = "light", setTheme } = useTheme(); // Default to 'light' if theme is undefined
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
        sidebar?.isOpen === false ? "w-[60px]" : "w-52"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative bg-muted h-full flex flex-col pl-2 py-4 overflow-y-auto">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <LogoSection logo={logo} />
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
