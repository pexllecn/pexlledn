"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, Radio, Send, Users } from "lucide-react";

const channels = [
  { name: "City Cam · Tokyo", cat: "Travel", viewers: "12.4K", seed: "live-1", live: true },
  { name: "Lo-fi Radio", cat: "Music", viewers: "48.1K", seed: "live-2", live: true },
  { name: "Match Day", cat: "Sports", viewers: "204K", seed: "live-3", live: true },
  { name: "Cooking Live", cat: "Food", viewers: "8.9K", seed: "live-4", live: true },
  { name: "Space Launch", cat: "Science", viewers: "91K", seed: "live-5", live: true },
  { name: "Night Drive", cat: "Chill", viewers: "5.2K", seed: "live-6", live: false },
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

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Live TV">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Player */}
            <div className="lg:col-span-2 space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${channel.seed}/1280/720`}
                  alt={channel.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <Badge className="bg-red-600 text-white border-none gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    LIVE
                  </Badge>
                  <Badge className="bg-black/60 text-white border-none gap-1.5">
                    <Eye className="h-3 w-3" /> {channel.viewers}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatar-40-02.jpg" alt={channel.name} />
                    <AvatarFallback>LV</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{channel.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" /> {channel.viewers} watching ·{" "}
                      {channel.cat}
                    </p>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-400 text-white border-none hover:opacity-90">
                  <Radio className="mr-2 h-4 w-4" /> Follow
                </Button>
              </div>
            </div>

            {/* Live chat */}
            <Card className="bg-muted border-none flex flex-col">
              <CardContent className="p-4 flex flex-col h-[440px]">
                <div className="flex items-center justify-between pb-3 border-b">
                  <p className="text-sm font-medium">Live chat</p>
                  <Badge variant="secondary" className="gap-1">
                    <Users className="h-3 w-3" /> {channel.viewers}
                  </Badge>
                </div>
                <div className="flex-1 space-y-3 overflow-y-auto py-3 no-scrollbar">
                  {messages.map((m, i) => (
                    <div key={i} className="text-sm leading-snug">
                      <span className={`font-medium ${m.color}`}>{m.user}</span>
                      <span className="text-muted-foreground"> {m.msg}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-3 border-t">
                  <Input
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Say something…"
                    className="bg-background"
                  />
                  <Button size="icon" onClick={send} className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Channel grid */}
          <h3 className="text-xl font-normal">Live channels</h3>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
            {channels.map((c, i) => (
              <button
                key={c.seed}
                onClick={() => setActive(i)}
                className={`group text-left rounded-2xl overflow-hidden border transition-all ${
                  i === active
                    ? "border-emerald-500 ring-2 ring-emerald-500/30"
                    : "border-transparent"
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
                    <Badge className="absolute top-2 left-2 bg-red-600 text-white border-none text-1xs gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      LIVE
                    </Badge>
                  ) : (
                    <Badge className="absolute top-2 left-2 bg-black/60 text-white border-none text-1xs">
                      Offline
                    </Badge>
                  )}
                  <Badge className="absolute bottom-2 right-2 bg-black/70 text-white border-none text-1xs gap-1">
                    <Eye className="h-3 w-3" /> {c.viewers}
                  </Badge>
                </div>
                <div className="p-3 bg-muted">
                  <p className="text-sm font-medium truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.cat}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
