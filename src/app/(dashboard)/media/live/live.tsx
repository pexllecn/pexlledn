"use client";

import { useState } from "react";
import { Cinema, Label, card } from "../components/media-ui";
import { Eye, Radio, Send, Users, CalendarClock } from "lucide-react";

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

const seedChat = [
  { user: "mika", color: "text-fuchsia-500", msg: "this view is unreal 🌆" },
  { user: "leo", color: "text-sky-500", msg: "what camera is this?" },
  { user: "sana", color: "text-emerald-500", msg: "perfect background for work" },
  { user: "dev", color: "text-amber-500", msg: "greetings from Berlin!" },
  { user: "noor", color: "text-rose-500", msg: "the sunset though 😍" },
];

export default function Live() {
  const [active, setActive] = useState(0);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState(seedChat);
  const channel = channels[active];

  const send = () => {
    if (!msg.trim()) return;
    setMessages((m) => [...m, { user: "you", color: "text-orange-500", msg: msg.trim() }]);
    setMsg("");
  };

  return (
    <Cinema title="Live TV">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* player (always-dark media) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video overflow-hidden rounded-3xl bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://picsum.photos/seed/${channel.seed}/1280/720`} alt={channel.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-1xs font-semibold text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> LIVE
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-1xs text-white backdrop-blur">
                <Eye className="h-3 w-3" /> {channel.viewers}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/avatar-40-02.jpg" alt={channel.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{channel.name}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" /> {channel.viewers} watching · {channel.cat}
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">
              <Radio className="h-4 w-4" /> Follow
            </button>
          </div>
        </div>

        {/* chat */}
        <div className={`${card} flex h-[440px] flex-col p-4`}>
          <div className="flex items-center justify-between border-b border-border pb-3 dark:border-white/5">
            <p className="text-sm font-semibold text-foreground">Live chat</p>
            <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground dark:bg-white/5">
              <Users className="h-3 w-3" /> {channel.viewers}
            </span>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {messages.map((m, i) => (
              <div key={i} className="text-sm leading-snug">
                <span className={`font-semibold ${m.color}`}>{m.user}</span>
                <span className="text-muted-foreground"> {m.msg}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-border pt-3 dark:border-white/5">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Say something…"
              className="h-9 flex-1 rounded-full border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-orange-500 dark:bg-white/5"
            />
            <button onClick={send} className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* channel grid */}
      <div className="mt-8">
        <Label action="See all">Live channels</Label>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {channels.map((c, i) => (
            <button
              key={c.seed}
              onClick={() => setActive(i)}
              className={`group overflow-hidden rounded-2xl border text-left transition-colors ${
                i === active ? "border-orange-500" : "border-border hover:bg-muted/60 dark:hover:bg-white/[0.03]"
              }`}
            >
              <div className="relative aspect-video overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://picsum.photos/seed/${c.seed}/500/280`} alt={c.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {c.live ? (
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-1xs font-semibold text-white">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> LIVE
                  </span>
                ) : (
                  <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-1xs text-white">Offline</span>
                )}
                <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-1xs text-white">
                  <Eye className="h-3 w-3" /> {c.viewers}
                </span>
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-semibold text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.cat}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* schedule */}
      <div className={`${card} mt-8 p-6`}>
        <Label action={null}>
          <span className="flex items-center gap-2"><CalendarClock className="h-4 w-4" /> Today&apos;s schedule</span>
        </Label>
        <div className="space-y-1">
          {schedule.map((s) => (
            <div key={s.title} className="flex items-center gap-4 rounded-xl p-2.5 transition-colors hover:bg-muted/60 dark:hover:bg-white/[0.03]">
              <span className="w-14 shrink-0 text-sm font-semibold tabular-nums text-muted-foreground">{s.time}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.channel}</p>
              </div>
              <span className="rounded-full bg-muted px-2 py-0.5 text-1xs text-muted-foreground dark:bg-white/5">{s.tag}</span>
              <button className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted dark:hover:bg-white/5">Remind me</button>
            </div>
          ))}
        </div>
      </div>
    </Cinema>
  );
}
