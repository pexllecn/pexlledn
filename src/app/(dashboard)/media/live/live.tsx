"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { CalendarClock, Eye, Radio, Send, Users } from "lucide-react";
import { MediaPage, SectionHeading, glass } from "../components/media-ui";

const channels = [
  { name: "City Cam · Tokyo", cat: "Travel", viewers: "12.4K", seed: "live-1", live: true },
  { name: "Lo-fi Radio", cat: "Music", viewers: "48.1K", seed: "live-2", live: true },
  { name: "Match Day", cat: "Sports", viewers: "204K", seed: "live-3", live: true },
  { name: "Cooking Live", cat: "Food", viewers: "8.9K", seed: "live-4", live: true },
  { name: "Space Launch", cat: "Science", viewers: "91K", seed: "live-5", live: true },
  { name: "Night Drive", cat: "Chill", viewers: "5.2K", seed: "live-6", live: false },
];

const schedule = [
  { time: "18:00", title: "Evening News Live", channel: "Match Day", tag: "News" },
  { time: "19:30", title: "Acoustic Sessions", channel: "Lo-fi Radio", tag: "Music" },
  { time: "20:00", title: "Champions Recap", channel: "Match Day", tag: "Sports" },
  { time: "21:15", title: "Late Night Cook-off", channel: "Cooking Live", tag: "Food" },
];

const chat = [
  { user: "mika", color: "text-fuchsia-500", msg: "this view is unreal 🌆" },
  { user: "leo", color: "text-sky-500", msg: "what camera is this?" },
  { user: "sana", color: "text-emerald-500", msg: "perfect background for work" },
  { user: "dev", color: "text-amber-500", msg: "greetings from Berlin!" },
  { user: "noor", color: "text-rose-500", msg: "the sunset though 😍" },
];

export default function Live() {
  const [active, setActive] = useState(0);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState(chat);
  const channel = channels[active];

  const send = () => {
    if (!msg.trim()) return;
    setMessages((m) => [
      ...m,
      { user: "you", color: "text-violet-500", msg: msg.trim() },
    ]);
    setMsg("");
  };

  return (
    <MediaPage title="Live TV">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Player */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-black border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${channel.seed}/1280/720`}
              alt={channel.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-1xs font-semibold text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                LIVE
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-1xs text-white">
                <Eye className="h-3 w-3" /> {channel.viewers}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11">
                <AvatarImage src="/avatar-40-02.jpg" alt={channel.name} />
                <AvatarFallback>LV</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{channel.name}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" /> {channel.viewers} watching ·{" "}
                  {channel.cat}
                </p>
              </div>
            </div>
            <Button className="rounded-full bg-emerald-500 text-white hover:bg-emerald-600">
              <Radio className="mr-2 h-4 w-4" /> Follow
            </Button>
          </div>
        </div>

        {/* Live chat */}
        <div className={`${glass} flex flex-col p-4`}>
          <div className="flex h-[440px] flex-col">
            <div className="flex items-center justify-between border-b pb-3">
              <p className="text-sm font-semibold">Live chat</p>
              <Badge variant="secondary" className="gap-1 rounded-full">
                <Users className="h-3 w-3" /> {channel.viewers}
              </Badge>
            </div>
            <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto py-3">
              {messages.map((m, i) => (
                <div key={i} className="text-sm leading-snug">
                  <span className={`font-semibold ${m.color}`}>{m.user}</span>
                  <span className="text-muted-foreground"> {m.msg}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t pt-3">
              <Input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Say something…"
                className="rounded-full bg-muted"
              />
              <Button size="icon" onClick={send} className="shrink-0 rounded-full">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Channel grid */}
      <SectionHeading title="Live channels" subtitle="Streaming now" />
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
        {channels.map((c, i) => (
          <button
            key={c.seed}
            onClick={() => setActive(i)}
            className={`group overflow-hidden rounded-2xl border text-left transition-colors ${
              i === active ? "border-emerald-500" : "hover:bg-muted/40"
            }`}
          >
            <div className="relative aspect-video overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${c.seed}/500/280`}
                alt={c.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {c.live ? (
                <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-1xs font-semibold text-white">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  LIVE
                </span>
              ) : (
                <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-1xs text-white">
                  Offline
                </span>
              )}
              <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-1xs text-white">
                <Eye className="h-3 w-3" /> {c.viewers}
              </span>
            </div>
            <div className="p-3">
              <p className="truncate text-sm font-semibold">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.cat}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Upcoming schedule */}
      <div className={`${glass} p-6`}>
        <SectionHeading
          title={
            <span className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5" /> Today&apos;s schedule
            </span>
          }
          subtitle="What's coming up"
        />
        <div className="mt-4 space-y-1">
          {schedule.map((s) => (
            <div
              key={s.title}
              className="flex items-center gap-4 rounded-xl p-2.5 transition-colors hover:bg-muted/50"
            >
              <span className="w-14 shrink-0 text-sm font-semibold tabular-nums text-muted-foreground">
                {s.time}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.channel}</p>
              </div>
              <span className="rounded-full bg-muted px-2 py-0.5 text-1xs text-muted-foreground">
                {s.tag}
              </span>
              <Button variant="outline" size="sm" className="rounded-full">
                Remind me
              </Button>
            </div>
          ))}
        </div>
      </div>
    </MediaPage>
  );
}
