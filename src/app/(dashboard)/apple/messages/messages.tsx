"use client";

import * as React from "react";
import {
  AppleShell,
  A,
  initials,
} from "../components/apple-ui";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Check,
  CheckCheck,
  Image as ImageIcon,
  Info,
  Mic,
  Phone,
  Plus,
  Search,
  Send,
  Smile,
  Video,
} from "lucide-react";

type Thread = {
  id: string;
  name: string;
  img: number;
  preview: string;
  when: string;
  unread?: number;
  pinned?: boolean;
};

const threads: Thread[] = [
  { id: "livia", name: "Livia Saris", img: 5, preview: "The tokens branch is green ✅", when: "09:41", unread: 2, pinned: true },
  { id: "design", name: "Design Team", img: 12, preview: "Jaydon: pushed the new rings", when: "09:12", unread: 5, pinned: true },
  { id: "maria", name: "Maria Lubin", img: 45, preview: "Research readout at 3?", when: "Yesterday" },
  { id: "ann", name: "Ann Press", img: 32, preview: "Deploy is out to staging", when: "Yesterday" },
  { id: "tomas", name: "Tomas Berg", img: 60, preview: "Sent you the type specimen", when: "Friday" },
  { id: "family", name: "Family", img: 24, preview: "Mum: don't forget Sunday 🙂", when: "Friday" },
  { id: "noah", name: "Noah Whitfield", img: 15, preview: "Thanks — that fixed it", when: "Thursday" },
];

type Bubble = {
  from: "me" | "them";
  text: string;
  time: string;
  read?: boolean;
  reaction?: string;
};

const conversation: Bubble[] = [
  { from: "them", text: "Morning! Did the funnel land in the analytics build?", time: "09:21" },
  { from: "me", text: "Yes — merged last night. The spill effect behind each stage is SVG now, so it stays crisp at any width.", time: "09:23", read: true },
  { from: "them", text: "Nice. And the gauge caps?", time: "09:24", reaction: "👍" },
  { from: "me", text: "Rounded, with a 5° gap between segments. Matches the mock exactly.", time: "09:25", read: true },
  { from: "them", text: "The tokens branch is green ✅", time: "09:41" },
];

export default function Messages() {
  const [active, setActive] = React.useState("livia");
  const current = threads.find((t) => t.id === active) ?? threads[0];

  return (
    <AppleShell title="Messages" showFilters={false} action="New message">
      <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        {/* Conversation list */}
        <Card className="min-w-0 overflow-hidden">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search" className="rounded-full pl-8" />
            </div>
          </div>
          <Separator />
          <ScrollArea className="h-[620px]">
            {threads.map((t, i) => (
              <React.Fragment key={t.id}>
                {i > 0 && <Separator className="ml-[68px] w-auto" />}
                <button
                  onClick={() => setActive(t.id)}
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors",
                    active === t.id ? "bg-primary/10" : "hover:bg-muted/50"
                  )}
                >
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={`https://i.pravatar.cc/80?img=${t.img}`} alt="" />
                    <AvatarFallback>{initials(t.name)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-base font-medium text-foreground">
                        {t.name}
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {t.when}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                      {t.preview}
                    </p>
                  </div>
                  {t.unread && (
                    <Badge className="mt-1 h-[18px] min-w-[18px] px-1">
                      {t.unread}
                    </Badge>
                  )}
                </button>
              </React.Fragment>
            ))}
          </ScrollArea>
        </Card>

        {/* Thread */}
        <Card className="min-w-0 flex min-h-[680px] flex-col overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3.5">
            <Avatar className="h-9 w-9 shrink-0">
                    <AvatarImage src={`https://i.pravatar.cc/80?img=${current.img}`} alt="" />
                    <AvatarFallback>{initials(current.name)}</AvatarFallback>
                  </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold text-foreground">
                {current.name}
              </p>
              <p className="text-xs text-muted-foreground">Active now</p>
            </div>
            {[Phone, Video, Info].map((Icon, i) => (
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" key={i}>
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
          <Separator />

          <div className="flex-1 space-y-3 overflow-y-auto p-5">
            <p className="text-center text-xs text-muted-foreground">
              Today 09:21
            </p>
            {conversation.map((b, i) => (
              <div
                key={i}
                className={`flex ${b.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className="relative max-w-[76%]">
                  <div
                    className={`rounded-lg px-3.5 py-2 text-base leading-snug ${
                      b.from === "me"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {b.text}
                  </div>
                  {b.reaction && (
                    <span className="absolute -top-3 left-2 rounded-full border border-border bg-white px-1.5 py-0.5 text-xs shadow-sm">
                      {b.reaction}
                    </span>
                  )}
                  <p
                    className={`mt-1 flex items-center gap-1 text-xs text-muted-foreground ${
                      b.from === "me" ? "justify-end" : ""
                    }`}
                  >
                    {b.time}
                    {b.from === "me" &&
                      (b.read ? (
                        <CheckCheck className="h-3 w-3" />
                      ) : (
                        <Check className="h-3 w-3" />
                      ))}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-lg bg-muted px-4 py-3">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground"
                    style={{ animationDelay: `${d * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <Separator />
          <div className="flex items-center gap-2 p-3">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-muted">
              <Plus className="h-4 w-4 text-muted-foreground" />
            </Button>
            <div className="relative flex-1">
              <Input placeholder="iMessage" className="rounded-full pr-16" />
              <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <Smile className="h-4 w-4 text-muted-foreground" />
              </span>
            </div>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <Mic className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button size="icon" className="h-9 w-9 rounded-full">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </AppleShell>
  );
}
