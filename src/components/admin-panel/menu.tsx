"use client";
import React from "react";
import Link from "next/link";
import { Ellipsis, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const menuList = getMenuList(pathname);

  const handleSignOut = async () => {
    // Perform any sign-out logic here
    router.push("/signin");
  };

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-5 px-2 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-normal px-3 pb-2 max-w-[248px] truncate transition-none">
                  {groupLabel}
                </p>
              ) : !isOpen && groupLabel ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      sideOffset={10}
                      showArrow={true}
                    >
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                (
                  {
                    href,
                    label,
                    icon: Icon,
                    active,
                    submenus,
                    notificationCount,
                  },
                  index
                ) =>
                  submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={active ? "outline3" : "ghost"}
                              className={cn(
                                "w-full justify-start h-8 mb-1 p-3 hover:bg-muted-foreground/10 hover:text-foreground",
                                !active && "text-muted-foreground"
                              )}
                              asChild
                            >
                              <Link
                                href={href}
                                className="flex items-center w-full"
                              >
                                <span
                                  className={cn(isOpen === false ? "" : "mr-2")}
                                >
                                  <Icon size={16} />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}
                                </p>
                                {isOpen !== false && notificationCount && (
                                  <Badge
                                    variant="outline2"
                                    className={cn(
                                      "ml-auto px-2 min-w-[20px] flex items-center justify-center",
                                      typeof notificationCount === "string" &&
                                        "text-1xs"
                                    )}
                                  >
                                    {notificationCount}
                                  </Badge>
                                )}
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent
                              side="right"
                              sideOffset={10}
                              showArrow={true}
                            >
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                        notificationCount={notificationCount}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
          {/* <li className="w-full grow flex items-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full justify-center h-10"
                  >
                    <span className={cn(isOpen === false ? "" : "mr-2")}>
                      <LogOut size={16} />
                    </span>
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        isOpen === false ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right" sideOffset={10}>
                    Sign out
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li> */}
        </ul>
      </nav>
    </ScrollArea>
  );
}
