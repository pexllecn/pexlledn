"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumbs } from "@/components/breadcrumb-context";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarToggle } from "./sidebar-toggle";
import { useTheme } from "next-themes";
import { useStore } from "@/hooks/use-store";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NotificationsPopover } from "./notifications";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const { breadcrumbs } = useBreadcrumbs();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const sidebar = useSidebarToggle();
  const [open, setOpen] = React.useState(false);
  const { setTheme, theme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setTheme(theme === "light" ? "dark" : "light");
      }
      if (e.key === "." && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        sidebar?.setIsOpen();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setTheme, theme, sidebar]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-10 w-full",
        "bg-background/50 backdrop-blur"
      )}
      style={{
        WebkitBackdropFilter: "blur(10px)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="mx-4 sm:mx-8 h-14 flex items-center">
        <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex items-center space-x-4">
            <SheetMenu />
            <SidebarToggle
              isOpen={sidebar?.isOpen ?? false}
              setIsOpen={sidebar?.setIsOpen ?? (() => {})}
            />

            <Separator
              orientation="vertical"
              className="hidden lg:block ml-4 h-4"
            />
            <div className="hidden md:block overflow-hidden">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((item, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        {index < breadcrumbs.length - 1 ? (
                          <BreadcrumbLink asChild>
                            <Link href={item.href}>{item.label}</Link>
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>
                            <span className="font-medium">{item.label}</span>
                          </BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          <div className="flex-1 flex justify-center items-center px-4">
            <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 bg-muted border-none shadow-none dark:shadow-none lg:w-[600px] h-9"
                onClick={() => setOpen(true)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="sr-only">
                Search
              </Button>
              <Kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded-lg border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </Kbd>
            </form>
          </div>

          <div className="flex items-center space-x-2 justify-end">
            <Popover>
              <TooltipProvider>
                <Tooltip delayDuration={50}>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="relative rounded-lg w-8 h-8"
                      >
                        <Bell
                          className="text-muted-foreground h-4 w-4"
                          strokeWidth={1}
                        />
                        <span className="absolute right-2 top-1 h-2 w-2 rounded-full bg-red-500" />
                        <span className="sr-only">Toggle notifications</span>
                      </Button>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent showArrow={true}>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <PopoverContent className="w-80 p-0" align="end">
                <NotificationsPopover />
              </PopoverContent>
            </Popover>
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Dashboard</CommandItem>
            <CommandItem>Users</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}

export default Navbar;
