"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mic,
  Pause,
  Play,
  Plus,
  Rewind,
  FastForward,
} from "lucide-react";

const featured = {
  title: "The Long Game — Building for the Next Decade",
  show: "Signal & Noise",
  seed: "pod-feat",
  desc: "A wide-ranging conversation on patience, compounding and why the best products are never rushed.",
  len: "1h 04m",
};

const episodes = [
  { title: "Designing calm software", show: "Signal & Noise", len: "48:12", when: "Today", seed: "pod-1", progress: 30 },
  { title: "The economics of attention", show: "Deep Focus", len: "1:02:40", when: "Yesterday", seed: "pod-2", progress: 0 },
  { title: "Writing that lasts", show: "The Draft", len: "37:05", when: "2 days ago", seed: "pod-3", progress: 100 },
  { title: "Sound design secrets", show: "In The Mix", len: "55:20", when: "4 days ago", seed: "pod-4", progress: 0 },
  { title: "Cities of the future", show: "Blueprint", len: "1:11:00", when: "1 week ago", seed: "pod-5", progress: 0 },
];

const shows = [
  { name: "Signal & Noise", eps: 142, seed: "pod-s1" },
  { name: "Deep Focus", eps: 88, seed: "pod-s2" },
  { name: "The Draft", eps: 61, seed: "pod-s3" },
  { name: "In The Mix", eps: 204, seed: "pod-s4" },
];

export default function Podcasts() {
  const [playing, setPlaying] = useState(false);
  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Podcasts">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-5 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Podcasts</h2>
              <p className="text-muted-foreground mt-1">
                Fresh episodes from shows you follow
              </p>
            </div>
            <Button variant="outline">
              <Mic className="mr-2 h-4 w-4" /> Browse shows
            </Button>
          </div>

          {/* Featured player */}
          <Card className="border-none overflow-hidden">
            <div className="relative">
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${featured.seed}/1200/500`}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
              </div>
              <CardContent className="relative p-6 flex flex-col sm:flex-row gap-6 items-center">
                <div className="relative aspect-square w-40 shrink-0 overflow-hidden rounded-2xl shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${featured.seed}/400/400`}
                    alt={featured.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <Badge className="mb-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-none">
                    Featured episode
                  </Badge>
                  <h3 className="text-xl font-normal leading-snug">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {featured.show} · {featured.len}
                  </p>
                  <p className="text-sm text-muted-foreground mt-3 max-w-lg">
                    {featured.desc}
                  </p>

                  <div className="mt-4 flex items-center justify-center sm:justify-start gap-2">
                    <Button variant="ghost" size="icon">
                      <Rewind className="h-5 w-5" />
                    </Button>
                    <Button
                      onClick={() => setPlaying((p) => !p)}
                      className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white border-none hover:opacity-90"
                    >
                      {playing ? (
                        <Pause className="h-5 w-5 fill-current" />
                      ) : (
                        <Play className="h-5 w-5 fill-current" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon">
                      <FastForward className="h-5 w-5" />
                    </Button>
                    <div className="ml-3 flex-1 max-w-xs hidden sm:block">
                      <Slider defaultValue={[18]} max={100} step={1} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Latest episodes */}
          <h3 className="text-xl font-normal">Latest episodes</h3>
          <div className="space-y-2">
            {episodes.map((e) => (
              <Card
                key={e.seed}
                className="group bg-muted border-none transition-colors hover:bg-muted/70"
              >
                <CardContent className="p-3 flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${e.seed}/160/160`}
                      alt={e.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                      <Play className="h-5 w-5 text-white fill-current" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{e.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {e.show} · {e.when}
                    </p>
                    {e.progress > 0 && e.progress < 100 && (
                      <div className="mt-2 h-1 w-full max-w-xs rounded-full bg-background">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                          style={{ width: `${e.progress}%` }}
                        />
                      </div>
                    )}
                    {e.progress === 100 && (
                      <span className="text-1xs text-emerald-600">Played</span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums shrink-0">
                    {e.len}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Your shows */}
          <h3 className="text-xl font-normal">Your shows</h3>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {shows.map((s) => (
              <Card
                key={s.name}
                className="group bg-muted border-none overflow-hidden cursor-pointer"
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${s.seed}/300/300`}
                      alt={s.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 text-sm font-medium truncate w-full">
                    {s.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.eps} episodes</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
