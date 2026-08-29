"use client";

import * as React from "react";
import {
  AppleShell,
  A,
  CardHead,
  Segmented,
} from "../components/apple-ui";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Columns, Meter, Spark } from "../components/apple-charts";
import {
  Heart,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";

const rails = [
  {
    title: "Made for you",
    items: [
      { seed: "ap-m1", name: "Chill Mix", sub: "Updated Monday" },
      { seed: "ap-m2", name: "Focus Flow", sub: "Instrumental" },
      { seed: "ap-m3", name: "New Music", sub: "24 tracks" },
      { seed: "ap-m4", name: "Late Night", sub: "Ambient" },
      { seed: "ap-m5", name: "Favourites", sub: "218 songs" },
    ],
  },
  {
    title: "Recently played",
    items: [
      { seed: "ap-r1", name: "Neon Fields", sub: "Midnight City" },
      { seed: "ap-r2", name: "Wild Frame", sub: "Coastline" },
      { seed: "ap-r3", name: "Signal & Noise", sub: "The Long Game" },
      { seed: "ap-r4", name: "Berried Alive", sub: "Blood Orange" },
      { seed: "ap-r5", name: "Make Them Suffer", sub: "Soul Decay" },
    ],
  },
];

const top = [
  { n: 1, title: "Midnight City", artist: "Neon Fields", plays: "1.2M", len: "4:02" },
  { n: 2, title: "Blood Orange", artist: "Berried Alive", plays: "842K", len: "3:18" },
  { n: 3, title: "Soul Decay", artist: "Make Them Suffer", plays: "512K", len: "3:44" },
  { n: 4, title: "A Little Bit Off", artist: "FFDP", plays: "324K", len: "4:31" },
  { n: 5, title: "Coastline", artist: "Wild Frame", plays: "218K", len: "5:06" },
  { n: 6, title: "The Long Game", artist: "Signal & Noise", plays: "184K", len: "3:52" },
];

const listening = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 68 },
  { label: "Wed", value: 34 },
  { label: "Thu", value: 76 },
  { label: "Fri", value: 92 },
  { label: "Sat", value: 58 },
  { label: "Sun", value: 64 },
];

const genres = [
  { label: "Electronic", pct: 38, color: A.purple },
  { label: "Rock", pct: 26, color: A.pink },
  { label: "Ambient", pct: 20, color: A.blue },
  { label: "Jazz", pct: 16, color: A.teal },
];

export default function Music() {
  const [playing, setPlaying] = React.useState(true);

  return (
    <AppleShell title="Music" action="New playlist" actionIcon={<ListMusic className="h-4 w-4" />}>
      <div className="min-w-0 space-y-4">
        {/* Now playing */}
        <Card className="min-w-0 overflow-hidden">
          <div className="grid gap-5 p-5 lg:grid-cols-[220px_minmax(0,1fr)]">
            <div className="relative overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/ap-now/500/500"
                alt="Album art"
                className="aspect-square w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Now playing
                </p>
                <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-foreground">
                  Midnight City
                </h2>
                <p className="mt-1 text-base text-muted-foreground">
                  Neon Fields — Aurora, Vol. 2
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {["Lossless", "Dolby Atmos", "2024"].map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Meter pct={42} color={A.pink} />
                <div className="mt-1.5 flex justify-between text-xs tabular-nums text-muted-foreground">
                  <span>1:42</span>
                  <span>-2:20</span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <Shuffle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <SkipBack className="h-5 w-5 fill-current" />
                  </Button>
                  <Button variant="ghost" onClick={() => setPlaying((p) => !p)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105"
                  >
                    {playing ? (
                      <Pause className="h-5 w-5 fill-current" />
                    ) : (
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <SkipForward className="h-5 w-5 fill-current" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <Repeat className="h-4 w-4" />
                  </Button>

                  <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <div className="w-20">
                      <Meter pct={68} color={A.gray} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Rails */}
        {rails.map((rail) => (
          <div key={rail.title}>
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-base font-semibold tracking-tight text-foreground">
                {rail.title}
              </p>
              <Button variant="link" className="text-primary">
                See all
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {rail.items.map((it) => (
                <div key={it.seed} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${it.seed}/400/400`}
                      alt={it.name}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Button variant="outline3" size="icon" className="absolute bottom-2 right-2 h-9 w-9 rounded-full text-neutral-900 opacity-0 backdrop-blur group-hover:opacity-100">
                      <Play className="ml-0.5 h-4 w-4 fill-current" />
                    </Button>
                  </div>
                  <p className="mt-2 truncate text-base font-medium text-foreground">
                    {it.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{it.sub}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Charts + stats */}
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <Card className="min-w-0 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4">
              <p className="text-base font-medium text-foreground">Top songs</p>
              <Segmented options={["Week", "Month", "Year"]} />
            </div>
            <Separator />
            {top.map((t, i) => (
              <React.Fragment key={t.title}>
                {i > 0 && <Separator className="ml-14 w-auto" />}
                <div className="group flex items-center gap-3 px-5 py-3 transition-colors hover:bg-muted/50">
                  <span className="w-5 text-sm tabular-nums text-muted-foreground">
                    {t.n}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-medium text-foreground">
                      {t.title}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {t.artist}
                    </p>
                  </div>
                  <span className="hidden text-xs tabular-nums text-muted-foreground sm:block">
                    {t.plays} plays
                  </span>
                  <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                    {t.len}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </Card>

          <div className="min-w-0 space-y-4">
            <Card className="min-w-0 p-5">
              <CardHead title="Listening time" value="14h 22m" delta={6.8} />
              <Columns
                className="mt-5"
                data={listening}
                color={A.pink}
                height={180}
              />
            </Card>

            <Card className="min-w-0 p-5">
              <p className="text-base font-medium text-foreground">Top genres</p>
              <div className="mt-4 space-y-3">
                {genres.map((g) => (
                  <div key={g.label}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-foreground">{g.label}</span>
                      <span className="tabular-nums text-muted-foreground">
                        {g.pct}%
                      </span>
                    </div>
                    <Meter pct={g.pct} color={g.color} />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="min-w-0 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mic2 className="h-4 w-4 text-[#8E5BF6]" />
                  <p className="text-base font-medium text-foreground">
                    Top artist
                  </p>
                </div>
                <Spark data={[12, 18, 15, 24, 28, 26, 34]} color={A.purple} />
              </div>
              <p className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                Neon Fields
              </p>
              <p className="text-sm text-muted-foreground">
                284 plays this month
              </p>
            </Card>
          </div>
        </div>
      </div>
    </AppleShell>
  );
}
