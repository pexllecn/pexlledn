"use client";

import * as React from "react";
import {
  AppleShell,
  A,
  Row,
  Segmented,
  initials,
  tone,
} from "../components/apple-ui";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Camera,
  Heart,
  Image as ImageIcon,
  MapPin,
  Play,
  Share,
  Sparkles,
  Trash2,
  Users,
  Video,
} from "lucide-react";

const memories = [
  { seed: "ap-mem1", title: "Bosphorus Mornings", sub: "12 photos · June" },
  { seed: "ap-mem2", title: "Studio Days", sub: "34 photos · May" },
  { seed: "ap-mem3", title: "Coastline", sub: "58 photos · April" },
];

const grid = Array.from({ length: 24 }, (_, i) => ({
  seed: `ap-g${i}`,
  fav: i % 7 === 0,
  video: i % 9 === 4,
  span: i % 11 === 0 ? "row-span-2 col-span-2" : "",
}));

const albums = [
  { seed: "ap-al1", name: "Recents", count: 3204 },
  { seed: "ap-al2", name: "Favorites", count: 218 },
  { seed: "ap-al3", name: "Travel", count: 642 },
  { seed: "ap-al4", name: "Design refs", count: 96 },
  { seed: "ap-al5", name: "Screenshots", count: 1180 },
];

const people = [
  { img: 5, name: "Livia" },
  { img: 12, name: "Jaydon" },
  { img: 45, name: "Maria" },
  { img: 32, name: "Ann" },
  { img: 60, name: "Tomas" },
];

const mediaTypes = [
  { icon: <Video className="h-3.5 w-3.5" />, tint: A.blue, label: "Videos", count: "148" },
  { icon: <Sparkles className="h-3.5 w-3.5" />, tint: A.purple, label: "Live Photos", count: "412" },
  { icon: <Heart className="h-3.5 w-3.5" />, tint: A.pink, label: "Favorites", count: "218" },
  { icon: <Camera className="h-3.5 w-3.5" />, tint: A.orange, label: "Portrait", count: "96" },
  { icon: <Trash2 className="h-3.5 w-3.5" />, tint: A.gray, label: "Recently Deleted", count: "12" },
];

export default function Photos() {
  return (
    <AppleShell
      title="Photos"
      action="Import"
      aside={<Segmented options={["Years", "Months", "Days", "All"]} value="Days" />}
    >
      <div className="min-w-0 space-y-4">
        {/* Memories */}
        <div className="grid gap-4 md:grid-cols-3">
          {memories.map((m, i) => (
            <div
              key={m.seed}
              className="group relative overflow-hidden rounded-lg"
              style={{ aspectRatio: i === 0 ? "16/10" : "16/10" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${m.seed}/800/500`}
                alt={m.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-lg font-semibold tracking-tight text-white">
                  {m.title}
                </p>
                <p className="text-xs text-white/70">{m.sub}</p>
              </div>
              <Button size="icon" className="absolute right-3 top-3 h-8 w-8 rounded-full text-white opacity-0 backdrop-blur group-hover:opacity-100">
                <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
              </Button>
            </div>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          {/* Library grid */}
          <Card className="min-w-0 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Library</p>
                <p className="mt-0.5 text-2xl font-semibold tracking-tight tabular-nums text-foreground">
                  3,204 items
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="h-9 gap-2 rounded-full px-3.5">
                  <Share className="h-3.5 w-3.5" /> Share
                </Button>
              </div>
            </div>

            <div className="grid auto-rows-[92px] grid-cols-4 gap-1.5 sm:grid-cols-6">
              {grid.map((g) => (
                <div
                  key={g.seed}
                  className={`group relative overflow-hidden rounded-md ${g.span}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${g.seed}/400/400`}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {g.fav && (
                    <Heart className="absolute bottom-1.5 left-1.5 h-3.5 w-3.5 fill-white text-white drop-shadow" />
                  )}
                  {g.video && (
                    <span className="absolute bottom-1.5 right-1.5 rounded bg-black/45 px-1 text-1xs font-medium text-white backdrop-blur">
                      0:24
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center">
              <Button variant="outline" className="rounded-full px-4 py-2">
                Load more
              </Button>
            </div>
          </Card>

          {/* Rail */}
          <div className="min-w-0 space-y-4">
            <Card className={cn("min-w-0 p-5", tone.plain)}>
              <p className="text-base font-medium text-foreground">People</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {people.map((p) => (
                  <div key={p.name} className="flex w-[56px] flex-col items-center">
                    <Avatar className="h-12 w-12 shrink-0">
                    <AvatarImage src={`https://i.pravatar.cc/80?img=${p.img}`} alt="" />
                    <AvatarFallback>{initials(p.name)}</AvatarFallback>
                  </Avatar>
                    <span className="mt-1.5 truncate text-xs text-muted-foreground">
                      {p.name}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className={cn("min-w-0 overflow-hidden", tone.plain)}>
              <p className="px-5 py-4 text-base font-medium text-foreground">Albums</p>
              <Separator />
              {albums.map((a, i) => (
                <React.Fragment key={a.name}>
                  {i > 0 && <Separator className="ml-[68px] w-auto" />}
                  <div className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-muted/50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${a.seed}/120/120`}
                      alt=""
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-medium text-foreground">
                        {a.name}
                      </p>
                      <p className="text-xs tabular-nums text-muted-foreground">
                        {a.count.toLocaleString()} items
                      </p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </Card>

            <Card className={cn("min-w-0 overflow-hidden", tone.plain)}>
              <p className="px-5 py-4 text-base font-medium text-foreground">
                Media types
              </p>
              <Separator />
              {mediaTypes.map((m, i) => (
                <React.Fragment key={m.label}>
                  {i > 0 && <Separator className="ml-14 w-auto" />}
                  <Row
                    interactive
                    icon={m.icon}
                    tint={m.tint}
                    title={m.label}
                    right={
                      <span className="text-sm tabular-nums text-muted-foreground">
                        {m.count}
                      </span>
                    }
                  />
                </React.Fragment>
              ))}
            </Card>

            <Card className={cn("min-w-0 p-5", tone.plain)}>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <p className="text-base font-medium text-foreground">Places</p>
              </div>
              <div className="mt-3 overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://picsum.photos/seed/ap-map/600/360"
                  alt="Map of photo locations"
                  className="h-[150px] w-full object-cover"
                />
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <ImageIcon className="h-3 w-3" /> 1,842 photos across 34 places
              </p>
            </Card>
          </div>
        </div>
      </div>
    </AppleShell>
  );
}
