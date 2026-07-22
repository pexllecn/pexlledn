"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Clock,
  Download,
  Heart,
  ListVideo,
  Play,
  Plus,
} from "lucide-react";

const playlists = [
  { name: "Focus Flow", items: 42, kind: "Music", seed: "lib-1", tint: "from-violet-500 to-fuchsia-500" },
  { name: "Weekend Watch", items: 18, kind: "Video", seed: "lib-2", tint: "from-rose-500 to-orange-400" },
  { name: "Travel Shots", items: 214, kind: "Album", seed: "lib-3", tint: "from-sky-500 to-cyan-400" },
  { name: "Deep Talks", items: 26, kind: "Podcast", seed: "lib-4", tint: "from-amber-500 to-yellow-400" },
  { name: "Late Night", items: 33, kind: "Music", seed: "lib-5", tint: "from-indigo-500 to-purple-500" },
  { name: "Nature 4K", items: 12, kind: "Video", seed: "lib-6", tint: "from-emerald-500 to-teal-400" },
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
        <Card
          key={it.seed}
          className="group bg-muted border-none transition-colors hover:bg-muted/70"
        >
          <CardContent className="p-3 flex items-center gap-4">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${it.seed}/120/120`}
                alt={it.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                <Play className="h-4 w-4 text-white fill-current" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{it.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{it.meta}</p>
            </div>
            <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function Library() {
  const [tab, setTab] = useState("playlists");
  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Library">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-5 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Your library</h2>
              <p className="text-muted-foreground mt-1">
                Playlists, favorites and downloads — all in one place
              </p>
            </div>
            <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-none hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" /> New playlist
            </Button>
          </div>

          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="playlists">
                <ListVideo className="mr-1.5 h-4 w-4" /> Playlists
              </TabsTrigger>
              <TabsTrigger value="liked">
                <Heart className="mr-1.5 h-4 w-4" /> Liked
              </TabsTrigger>
              <TabsTrigger value="recent">
                <Clock className="mr-1.5 h-4 w-4" /> Recents
              </TabsTrigger>
              <TabsTrigger value="downloads">
                <Download className="mr-1.5 h-4 w-4" /> Downloads
              </TabsTrigger>
            </TabsList>

            <TabsContent value="playlists" className="mt-5">
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
                {playlists.map((p) => (
                  <Card
                    key={p.name}
                    className="group bg-muted border-none overflow-hidden cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://picsum.photos/seed/${p.seed}/600/380`}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div
                        className={`absolute top-3 left-3 rounded-lg bg-gradient-to-r ${p.tint} px-2 py-0.5 text-1xs font-medium text-white`}
                      >
                        {p.kind}
                      </div>
                      <div className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100">
                        <Play className="h-5 w-5 fill-current" />
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {p.items} items
                      </p>
                    </CardContent>
                  </Card>
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
              <div className="mb-4 flex items-center gap-3 rounded-xl bg-emerald-500/10 p-3 text-sm">
                <Download className="h-4 w-4 text-emerald-600" />
                <span>
                  <span className="font-medium">3 items</span> available offline ·
                  350 MB used
                </span>
                <Badge variant="secondary" className="ml-auto">
                  Auto-download on
                </Badge>
              </div>
              <MediaRow items={downloads} icon={Download} />
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
