"use client";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
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
          height: "100%",
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

export function SheetMenu() {
  const { theme = "light", setTheme } = useTheme();
  const [logo, setLogo] = useState("/pexlleh.png");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const effectiveTheme = theme === "system" ? "light" : theme;
    setLogo(effectiveTheme === "light" ? "/pexlleh.png" : "/pexllelight.png");
  }, [theme]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="rounded-full w-8 h-8" variant="outline" size="icon">
          <MenuIcon size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="bg-muted w-52 sm:w-52 h-full flex flex-col p-3"
        side="left"
      >
        <SheetHeader className="p-4">
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <LogoSection logo={logo} />
            </Link>
          </Button>
        </SheetHeader>
        <div className="flex-grow overflow-y-auto">
          <Menu isOpen={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
