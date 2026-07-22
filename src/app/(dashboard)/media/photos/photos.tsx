"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Grid3x3,
  Heart,
  ImagePlus,
  MapPin,
  Share2,
  Sparkles,
  X,
} from "lucide-react";

const albums = [
  { name: "Iceland 2025", count: 214, seed: "ph-alb-1" },
  { name: "City Nights", count: 88, seed: "ph-alb-2" },
  { name: "Family", count: 512, seed: "ph-alb-3" },
  { name: "Food Diary", count: 143, seed: "ph-alb-4" },
];

const photos = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  seed: `ph-grid-${i}`,
  // Vary the visual weight for a masonry feel
  span: [3, 7, 11, 14].includes(i) ? "row-span-2" : "row-span-1",
  place: ["Reykjavík", "Tokyo", "Lisbon", "Oslo", "Kyoto"][i % 5],
  liked: i % 4 === 0,
}));

export default function Photos() {
  const [active, setActive] = useState<number | null>(null);
  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const openAt = (i: number) => setActive(i);
  const close = () => setActive(null);
  const step = (dir: number) => {
    setActive((cur) => {
      if (cur === null) return cur;
      return (cur + dir + photos.length) % photos.length;
    });
  };

  return (
    <ContentLayout title="Photos">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-5 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Photos</h2>
              <p className="text-muted-foreground mt-1">
                <span className="text-foreground">3,204 photos</span> · 42 albums
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="fav">Favorites</TabsTrigger>
                  <TabsTrigger value="rec">Recents</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white border-none hover:opacity-90">
                <ImagePlus className="mr-2 h-4 w-4" /> Upload
              </Button>
            </div>
          </div>

          {/* Albums */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {albums.map((a) => (
              <Card
                key={a.name}
                className="group relative overflow-hidden border-none cursor-pointer"
              >
                <div className="relative aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${a.seed}/600/450`}
                    alt={a.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <p className="font-medium leading-none">{a.name}</p>
                    <p className="text-xs text-white/70 mt-1">{a.count} photos</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Memory banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500/15 via-cyan-500/10 to-transparent p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 text-white">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium">On this day · One year ago</p>
              <p className="text-sm text-muted-foreground">
                24 memories from your trip to Iceland
              </p>
            </div>
            <Button variant="outline" size="sm" className="shrink-0">
              View memory
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-xl font-normal">All photos</h3>
            <Badge variant="secondary" className="gap-1">
              <Grid3x3 className="h-3 w-3" /> Grid
            </Badge>
          </div>

          {/* Masonry-ish grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 auto-rows-[140px] gap-3">
            {photos.map((p, i) => (
              <button
                key={p.id}
                onClick={() => openAt(i)}
                className={`group relative overflow-hidden rounded-xl ${p.span}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${p.seed}/500/500`}
                  alt={`Photo ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                {p.liked && (
                  <Heart className="absolute top-2 right-2 h-4 w-4 fill-rose-500 text-rose-500" />
                )}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <MapPin className="h-3 w-3" /> {p.place}
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

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
                className="max-h-[80vh] rounded-xl object-contain"
              />
              <div className="mt-3 flex items-center justify-between text-white">
                <div className="flex items-center gap-1.5 text-sm">
                  <MapPin className="h-4 w-4" /> {photos[active].place}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                  >
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
    </ContentLayout>
  );
}
