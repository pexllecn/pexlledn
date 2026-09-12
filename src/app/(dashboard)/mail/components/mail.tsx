"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { SPRING_PRESS } from "@/lib/apple-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AccountSwitcher } from "@/app/(dashboard)/mail/components/account-switcher";
import { MailDisplay } from "@/app/(dashboard)/mail/components/mail-display";
import { MailList } from "@/app/(dashboard)/mail/components/mail-list";
import { Nav } from "@/app/(dashboard)/mail/components/nav";
import { type Mail } from "@/app/(dashboard)/mail/data";
import { useMail } from "@/app/(dashboard)/mail/use-mail";

interface MailProps {
  accounts: { label: string; email: string; icon: React.ReactNode }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

const FILTERS = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
] as const;

export function Mail({
  accounts,
  mails,
  defaultLayout = [16, 30, 54],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [filter, setFilter] = React.useState<string>("all");
  const [query, setQuery] = React.useState("");
  const [mail] = useMail();

  const unreadCount = React.useMemo(
    () => mails.filter((m) => !m.read).length,
    [mails],
  );

  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase();

    return mails.filter((item) => {
      if (filter === "unread" && item.read) return false;

      if (!q) return true;

      return (
        item.name.toLowerCase().includes(q) ||
        item.subject.toLowerCase().includes(q) ||
        item.text.toLowerCase().includes(q)
      );
    });
  }, [mails, filter, query]);

  const selected = mails.find((item) => item.id === mail.selected) ?? null;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="mx-auto max-w-[1600px] px-1 py-4">
        <Card className="overflow-hidden">
          <ResizablePanelGroup
            direction="horizontal"
            onLayout={(sizes: number[]) => {
              document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`;
            }}
            className="h-[calc(100vh-10rem)] items-stretch"
          >
            {/* ----------------------------- rail ----------------------- */}

            <ResizablePanel
              defaultSize={defaultLayout[0]}
              collapsedSize={navCollapsedSize}
              collapsible
              minSize={15}
              maxSize={20}
              onCollapse={() => {
                setIsCollapsed(true);
                document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
              }}
              onResize={() => {
                setIsCollapsed(false);
                document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
              }}
              className={cn(
                "hidden md:block",
                isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out",
              )}
            >
              <div
                className={cn(
                  "flex h-[52px] items-center justify-center",
                  isCollapsed ? "h-[52px]" : "px-2",
                )}
              >
                <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
              </div>

              <Separator />

              <Nav
                isCollapsed={isCollapsed}
                links={[
                  { title: "Inbox", label: String(unreadCount), icon: Inbox, variant: "default" },
                  { title: "Drafts", label: "9", icon: File, variant: "ghost" },
                  { title: "Sent", label: "", icon: Send, variant: "ghost" },
                  { title: "Junk", label: "23", icon: ArchiveX, variant: "ghost" },
                  { title: "Trash", label: "", icon: Trash2, variant: "ghost" },
                  { title: "Archive", label: "", icon: Archive, variant: "ghost" },
                ]}
              />

              <Separator />

              <Nav
                isCollapsed={isCollapsed}
                links={[
                  { title: "Social", label: "972", icon: Users2, variant: "ghost" },
                  { title: "Updates", label: "342", icon: File, variant: "ghost" },
                  { title: "Forums", label: "128", icon: MessagesSquare, variant: "ghost" },
                  { title: "Shopping", label: "8", icon: ShoppingCart, variant: "ghost" },
                  { title: "Promotions", label: "21", icon: Archive, variant: "ghost" },
                ]}
              />
            </ResizablePanel>

            <ResizableHandle withHandle className="hidden md:flex" />

            {/* ----------------------------- list ----------------------- */}

            <ResizablePanel defaultSize={defaultLayout[1]} minSize={26}>
              <div className="flex h-full flex-col">
                <div className="px-4 pb-2 pt-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <h1 className="text-xl font-semibold tracking-tight">Inbox</h1>

                    <span className="text-xs tabular-nums text-muted-foreground">
                      {visible.length} of {mails.length}
                    </span>
                  </div>

                  {/* The library's Tabs already ships the sliding indicator
                      and sizes it from --radius. */}
                  <Tabs value={filter} onValueChange={setFilter} className="mt-3">
                    <TabsList className="h-8">
                      {FILTERS.map((entry) => (
                        <TabsTrigger key={entry.id} value={entry.id} className="text-xs">
                          {entry.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>

                  <div className="relative mt-3">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search mail"
                      className="h-9 pl-9"
                    />
                  </div>
                </div>

                <Separator className="mt-1" />

                <div className="min-h-0 flex-1">
                  <MailList items={visible} />
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* ---------------------------- reader ---------------------- */}

            <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
              <MailDisplay mail={selected} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </Card>
      </div>
    </TooltipProvider>
  );
}
