"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bell,
  Play,
  Share2,
  ThumbsDown,
  ThumbsUp,
  Bookmark,
  CheckCircle2,
} from "lucide-react";

const chips = [
  "All",
  "Music",
  "Live",
  "Gaming",
  "Nature",
  "Coding",
  "Travel",
  "Podcasts",
  "News",
  "Design",
];

const main = {
  title: "Aurora Borealis in 4K — A Night Under the Northern Lights",
  channel: "Wild Frame",
  subs: "2.4M",
  views: "1,284,552",
  when: "3 days ago",
  seed: "vid-main",
  avatar: "/avatar-40-01.jpg",
};

const upNext = [
  { title: "Milky Way Timelapse over the Alps", channel: "Wild Frame", views: "842K", len: "12:04", when: "1 week ago", seed: "vid-1" },
  { title: "Lofi Beats to Focus — 3 Hour Mix", channel: "Neon Fields", views: "5.1M", len: "3:02:10", when: "2 months ago", seed: "vid-2" },
  { title: "How Great Interfaces Are Built", channel: "Designly", views: "312K", len: "18:47", when: "5 days ago", seed: "vid-3" },
  { title: "Coastal Drone Cinematics", channel: "SkyLine", views: "998K", len: "08:22", when: "3 weeks ago", seed: "vid-4" },
  { title: "The Art of Slow Living", channel: "Kinfolk", views: "221K", len: "22:15", when: "1 month ago", seed: "vid-5" },
  { title: "Deep Ocean — Bioluminescence", channel: "BlueWorld", views: "1.9M", len: "15:33", when: "6 days ago", seed: "vid-6" },
];

export default function Videos() {
  const [chip, setChip] = useState("All");
  const [liked, setLiked] = useState(false);
  const [sub, setSub] = useState(false);

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Videos">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          {/* Category chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {chips.map((c) => (
              <button
                key={c}
                onClick={() => setChip(c)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  chip === c
                    ? "bg-foreground text-background"
                    : "bg-muted hover:bg-muted/70"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main player column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="group relative aspect-video overflow-hidden rounded-2xl bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${main.seed}/1280/720`}
                  alt={main.title}
                  className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-black shadow-xl transition-transform group-hover:scale-110">
                    <Play className="h-7 w-7 fill-current" />
                  </div>
                </div>
                {/* Fake scrubber */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="h-1 w-full rounded-full bg-white/30">
                    <div className="h-full w-1/3 rounded-full bg-red-500" />
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-xl font-medium leading-snug">{main.title}</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {main.views} views · {main.when}
                </p>
              </div>

              {/* Channel + actions */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={main.avatar} alt={main.channel} />
                    <AvatarFallback>WF</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium flex items-center gap-1">
                      {main.channel}
                      <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {main.subs} subscribers
                    </p>
                  </div>
                  <Button
                    onClick={() => setSub((s) => !s)}
                    className={
                      sub
                        ? "ml-2 bg-muted text-foreground hover:bg-muted/70"
                        : "ml-2 bg-gradient-to-r from-rose-500 to-orange-400 text-white border-none hover:opacity-90"
                    }
                  >
                    {sub ? (
                      <>
                        <Bell className="mr-2 h-4 w-4" /> Subscribed
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-full bg-muted">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLiked((l) => !l)}
                      className="rounded-l-full"
                    >
                      <ThumbsUp
                        className={`mr-1.5 h-4 w-4 ${
                          liked ? "fill-current" : ""
                        }`}
                      />
                      12K
                    </Button>
                    <div className="h-5 w-px bg-border" />
                    <Button variant="ghost" size="sm" className="rounded-r-full">
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-full bg-muted">
                    <Share2 className="mr-1.5 h-4 w-4" /> Share
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full bg-muted">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Description */}
              <Card className="bg-muted border-none">
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary">#nature</Badge>
                    <Badge variant="secondary">#4k</Badge>
                    <Badge variant="secondary">#relax</Badge>
                  </div>
                  <p className="text-sm leading-relaxed">
                    Filmed across three nights in the Arctic Circle, this is a
                    quiet celebration of the northern lights. Shot in 4K with no
                    music — just the wind and the sky. Grab a warm drink and
                    breathe.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Up next column */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                Up next
              </h3>
              {upNext.map((v) => (
                <div
                  key={v.seed}
                  className="group flex gap-3 cursor-pointer rounded-xl p-1 transition-colors hover:bg-muted"
                >
                  <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${v.seed}/320/180`}
                      alt={v.title}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-1xs text-white tabular-nums">
                      {v.len}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-snug line-clamp-2">{v.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {v.channel}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {v.views} views · {v.when}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
