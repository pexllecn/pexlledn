"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Heart,
  ImagePlus,
  MapPin,
  Share2,
  Sparkles,
  X,
} from "lucide-react";
import {
  MediaPage,
  GradientText,
  SectionHeading,
  glass,
  glassHover,
} from "../components/media-ui";

const albums = [
  { name: "Iceland 2025", count: 214, seed: "ph-alb-1" },
  { name: "City Nights", count: 88, seed: "ph-alb-2" },
  { name: "Family", count: 512, seed: "ph-alb-3" },
  { name: "Food Diary", count: 143, seed: "ph-alb-4" },
];

const people = [
  { name: "Emma", seed: "ph-p1" },
  { name: "Liam", seed: "ph-p2" },
  { name: "Olivia", seed: "ph-p3" },
  { name: "Noah", seed: "ph-p4" },
  { name: "Ava", seed: "ph-p5" },
  { name: "Mia", seed: "ph-p6" },
];

const places = [
  { name: "Reykjavík", count: 214 },
  { name: "Tokyo", count: 96 },
  { name: "Lisbon", count: 58 },
  { name: "Oslo", count: 41 },
];

const photos = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  seed: `ph-grid-${i}`,
  span: [3, 7, 11, 14, 18].includes(i) ? "row-span-2" : "row-span-1",
  place: ["Reykjavík", "Tokyo", "Lisbon", "Oslo", "Kyoto"][i % 5],
  liked: i % 4 === 0,
}));

export default function Photos() {
  const [active, setActive] = useState<number | null>(null);

  const openAt = (i: number) => setActive(i);
  const close = () => setActive(null);
  const step = (dir: number) =>
    setActive((cur) =>
      cur === null ? cur : (cur + dir + photos.length) % photos.length
    );

  return (
    <MediaPage title="Photos">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight">
            <GradientText>Photos</GradientText>
          </h2>
          <p className="text-muted-foreground mt-1.5">
            <span className="text-foreground font-medium">3,204 photos</span> ·
            42 albums · 18.4 GB
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="all">
            <TabsList className="rounded-full">
              <TabsTrigger value="all" className="rounded-full">All</TabsTrigger>
              <TabsTrigger value="fav" className="rounded-full">Favorites</TabsTrigger>
              <TabsTrigger value="rec" className="rounded-full">Recents</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button className="rounded-full bg-sky-500 text-white hover:bg-sky-600">
            <ImagePlus className="mr-2 h-4 w-4" /> Upload
          </Button>
        </div>
      </div>

      {/* Albums */}
      <SectionHeading title="Albums" subtitle="Your collections" />
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {albums.map((a) => (
          <div
            key={a.name}
            className={`group relative overflow-hidden rounded-2xl border cursor-pointer`}
          >
            <div className="relative aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${a.seed}/600/450`}
                alt={a.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/35" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-semibold leading-none">{a.name}</p>
                <p className="text-xs text-white/70 mt-1.5">{a.count} photos</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* People + Places */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className={`${glass} p-6`}>
          <SectionHeading title="People" subtitle="Grouped by faces" />
          <div className="mt-4 flex flex-wrap gap-4">
            {people.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${p.seed}/120/120`}
                  alt={p.name}
                  className="h-14 w-14 rounded-full object-cover border"
                />
                <span className="text-xs text-muted-foreground">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`${glass} p-6`}>
          <SectionHeading title="Places" subtitle="Where you've been" />
          <div className="mt-4 space-y-1">
            {places.map((pl) => (
              <div
                key={pl.name}
                className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted/50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                </div>
                <p className="flex-1 text-sm font-medium">{pl.name}</p>
                <span className="text-xs text-muted-foreground">
                  {pl.count} photos
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Memory banner (flat) */}
      <div className={`${glass} flex items-center gap-4 p-5`}>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold">On this day · One year ago</p>
          <p className="text-sm text-muted-foreground">
            24 memories from your trip to Iceland
          </p>
        </div>
        <Button variant="outline" size="sm" className="shrink-0 rounded-full">
          View memory
        </Button>
      </div>

      <SectionHeading title="All photos" subtitle="Tap any photo to expand" />

      {/* Masonry grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 auto-rows-[150px] gap-3">
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => openAt(i)}
            className={`group relative overflow-hidden rounded-2xl ${p.span}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${p.seed}/500/500`}
              alt={`Photo ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            {p.liked && (
              <span className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/30">
                <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
              </span>
            )}
            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              <MapPin className="h-3 w-3" /> {p.place}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={close}
          >
            <button
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={close}
            >
              <X className="h-5 w-5" />
            </button>
            <button
              className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <motion.div
              key={active}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-h-[80vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${photos[active].seed}/1200/800`}
                alt="Preview"
                className="max-h-[80vh] rounded-2xl object-contain"
              />
              <div className="mt-3 flex items-center justify-between text-white">
                <div className="flex items-center gap-1.5 text-sm">
                  <MapPin className="h-4 w-4" /> {photos[active].place}
                </div>
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                    <Download className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
            <button
              className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </MediaPage>
  );
}
