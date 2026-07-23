"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Clock,
  Download,
  Heart,
  ListVideo,
  Play,
  Plus,
} from "lucide-react";
import { MediaPage, GradientText, glass, glassHover } from "../components/media-ui";

const summary = [
  { label: "Playlists", value: "24", icon: ListVideo },
  { label: "Liked", value: "312", icon: Heart },
  { label: "Downloaded", value: "48", icon: Download },
  { label: "Hours saved", value: "126", icon: Clock },
];

const playlists = [
  { name: "Focus Flow", items: 42, kind: "Music", seed: "lib-1", tint: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  { name: "Weekend Watch", items: 18, kind: "Video", seed: "lib-2", tint: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  { name: "Travel Shots", items: 214, kind: "Album", seed: "lib-3", tint: "bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  { name: "Deep Talks", items: 26, kind: "Podcast", seed: "lib-4", tint: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  { name: "Late Night", items: 33, kind: "Music", seed: "lib-5", tint: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
  { name: "Nature 4K", items: 12, kind: "Video", seed: "lib-6", tint: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
];

const liked = [
  { title: "Midnight City", meta: "Neon Fields · Music", seed: "lib-l1" },
  { title: "Aurora Borealis 4K", meta: "Wild Frame · Video", seed: "lib-l2" },
  { title: "The Long Game", meta: "Signal & Noise · Podcast", seed: "lib-l3" },
  { title: "Iceland 2025", meta: "214 photos · Album", seed: "lib-l4" },
];

const recents = [
  { title: "Design Systems Talk", meta: "Watched 2h ago", seed: "lib-r1" },
  { title: "Golden Hour", meta: "Played yesterday", seed: "lib-r2" },
  { title: "Coastline Timelapse", meta: "Watched 2 days ago", seed: "lib-r3" },
  { title: "Deep Focus Mix", meta: "Played 3 days ago", seed: "lib-r4" },
];

const downloads = [
  { title: "Lo-fi Sunset Mix", meta: "Music · 48 MB", seed: "lib-d1" },
  { title: "Milky Way Timelapse", meta: "Video · 240 MB", seed: "lib-d2" },
  { title: "The Draft — Ep 61", meta: "Podcast · 62 MB", seed: "lib-d3" },
];

function MediaRow({
  items,
  icon: Icon,
}: {
  items: { title: string; meta: string; seed: string }[];
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="space-y-2">
      {items.map((it) => (
        <div
          key={it.seed}
          className={`group ${glass} ${glassHover} flex items-center gap-4 p-3`}
        >
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${it.seed}/120/120`}
              alt={it.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <Play className="h-4 w-4 fill-current text-white" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{it.title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{it.meta}</p>
          </div>
          <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
        </div>
      ))}
    </div>
  );
}

export default function Library() {
  const [tab, setTab] = useState("playlists");

  return (
    <MediaPage title="Library">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight">
            Your <GradientText>library</GradientText>
          </h2>
          <p className="mt-1.5 text-muted-foreground">
            Playlists, favorites and downloads — all in one place
          </p>
        </div>
        <Button className="rounded-full bg-violet-600 text-white hover:bg-violet-700">
          <Plus className="mr-2 h-4 w-4" /> New playlist
        </Button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {summary.map((s) => (
          <div key={s.label} className={`${glass} flex items-center gap-3 p-4`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums leading-none">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="rounded-full">
          <TabsTrigger value="playlists" className="rounded-full">
            <ListVideo className="mr-1.5 h-4 w-4" /> Playlists
          </TabsTrigger>
          <TabsTrigger value="liked" className="rounded-full">
            <Heart className="mr-1.5 h-4 w-4" /> Liked
          </TabsTrigger>
          <TabsTrigger value="recent" className="rounded-full">
            <Clock className="mr-1.5 h-4 w-4" /> Recents
          </TabsTrigger>
          <TabsTrigger value="downloads" className="rounded-full">
            <Download className="mr-1.5 h-4 w-4" /> Downloads
          </TabsTrigger>
        </TabsList>

        <TabsContent value="playlists" className="mt-5">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
            {playlists.map((p) => (
              <div
                key={p.name}
                className="group cursor-pointer overflow-hidden rounded-2xl border"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${p.seed}/600/380`}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <span
                    className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-1xs font-medium ${p.tint}`}
                  >
                    {p.kind}
                  </span>
                  <div className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-violet-600 text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <Play className="h-5 w-5 fill-current" />
                  </div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-sm font-semibold leading-none">{p.name}</p>
                    <p className="mt-1 text-1xs text-white/70">{p.items} items</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="liked" className="mt-5">
          <MediaRow items={liked} icon={Heart} />
        </TabsContent>

        <TabsContent value="recent" className="mt-5">
          <MediaRow items={recents} icon={Clock} />
        </TabsContent>

        <TabsContent value="downloads" className="mt-5">
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm">
            <Download className="h-4 w-4 text-emerald-500" />
            <span>
              <span className="font-semibold">3 items</span> available offline ·
              350 MB used
            </span>
            <Badge variant="secondary" className="ml-auto rounded-full">
              Auto-download on
            </Badge>
          </div>
          <MediaRow items={downloads} icon={Download} />
        </TabsContent>
      </Tabs>
    </MediaPage>
  );
}
