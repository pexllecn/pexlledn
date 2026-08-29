"use client";

import * as React from "react";
import { AppleShell, A, Hair, Surface } from "../components/apple-ui";
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
    <AppleShell title="Messages" showFilters={false} action="New message" notifications={7}>
      <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        {/* Conversation list */}
        <Surface className="overflow-hidden">
          <div className="p-4">
            <label className="flex h-9 items-center gap-2 rounded-full bg-black/[0.045] px-3.5 dark:bg-white/[0.06]">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                placeholder="Search"
                className="w-full bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
              />
            </label>
          </div>
          <Hair />
          <div className="max-h-[620px] overflow-y-auto">
            {threads.map((t, i) => (
              <React.Fragment key={t.id}>
                {i > 0 && <Hair className="ml-[68px]" />}
                <button
                  onClick={() => setActive(t.id)}
                  className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
                    active === t.id
                      ? "bg-[#0A6CFF]/[0.08]"
                      : "hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.pravatar.cc/80?img=${t.img}`}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-[14px] font-medium text-foreground">
                        {t.name}
                      </span>
                      <span className="shrink-0 text-[11px] text-muted-foreground">
                        {t.when}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[13px] text-muted-foreground">
                      {t.preview}
                    </p>
                  </div>
                  {t.unread && (
                    <span className="mt-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#0A6CFF] px-1 text-[11px] font-semibold text-white">
                      {t.unread}
                    </span>
                  )}
                </button>
              </React.Fragment>
            ))}
          </div>
        </Surface>

        {/* Thread */}
        <Surface className="flex min-h-[680px] flex-col overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.pravatar.cc/80?img=${current.img}`}
              alt=""
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold text-foreground">
                {current.name}
              </p>
              <p className="text-[12px] text-muted-foreground">Active now</p>
            </div>
            {[Phone, Video, Info].map((Icon, i) => (
              <button
                key={i}
                className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.07]"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
          <Hair />

          <div className="flex-1 space-y-3 overflow-y-auto p-5">
            <p className="text-center text-[11px] text-muted-foreground">
              Today 09:21
            </p>
            {conversation.map((b, i) => (
              <div
                key={i}
                className={`flex ${b.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className="relative max-w-[76%]">
                  <div
                    className={`rounded-[20px] px-3.5 py-2 text-[14px] leading-snug ${
                      b.from === "me"
                        ? "bg-[#0A6CFF] text-white"
                        : "bg-black/[0.05] text-foreground dark:bg-white/[0.08]"
                    }`}
                  >
                    {b.text}
                  </div>
                  {b.reaction && (
                    <span className="absolute -top-3 left-2 rounded-full border border-black/[0.06] bg-white px-1.5 py-0.5 text-[11px] shadow-sm dark:border-white/10 dark:bg-[#26262A]">
                      {b.reaction}
                    </span>
                  )}
                  <p
                    className={`mt-1 flex items-center gap-1 text-[11px] text-muted-foreground ${
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
              <div className="flex items-center gap-1 rounded-[20px] bg-black/[0.05] px-4 py-3 dark:bg-white/[0.08]">
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

          <Hair />
          <div className="flex items-center gap-2 p-3">
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.05] text-foreground/70 transition-colors hover:bg-black/[0.08] dark:bg-white/[0.07] dark:hover:bg-white/[0.1]">
              <Plus className="h-4 w-4" />
            </button>
            <div className="flex h-10 flex-1 items-center gap-2 rounded-full border border-black/[0.08] px-4 dark:border-white/[0.1]">
              <input
                placeholder="iMessage"
                className="w-full bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
              />
              <ImageIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <Smile className="h-4 w-4 shrink-0 text-muted-foreground" />
            </div>
            <button className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.07]">
              <Mic className="h-4 w-4" />
            </button>
            <button
              style={{ backgroundColor: A.blue }}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-opacity hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </Surface>
      </div>
    </AppleShell>
  );
}
