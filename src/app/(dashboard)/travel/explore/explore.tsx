"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Compass,
  Heart,
  MapPin,
  Search,
  Sparkles,
  Star,
  ThermometerSun,
} from "lucide-react";

const categories = ["Trending", "Beaches", "Cities", "Mountains", "Culture"];

type Place = {
  name: string;
  country: string;
  tag: string;
  temp: string;
  rating: number;
  cover: string;
  saved: boolean;
};

const places: Place[] = [
  { name: "Santorini", country: "Greece", tag: "Beaches", temp: "27°", rating: 4.9, cover: "from-sky-400 to-blue-300", saved: true },
  { name: "Banff", country: "Canada", tag: "Mountains", temp: "12°", rating: 4.8, cover: "from-emerald-400 to-teal-300", saved: false },
  { name: "Marrakesh", country: "Morocco", tag: "Culture", temp: "31°", rating: 4.7, cover: "from-amber-400 to-orange-300", saved: false },
  { name: "Queenstown", country: "New Zealand", tag: "Mountains", temp: "9°", rating: 4.9, cover: "from-indigo-400 to-violet-300", saved: true },
  { name: "Tulum", country: "Mexico", tag: "Beaches", temp: "29°", rating: 4.6, cover: "from-rose-400 to-pink-300", saved: false },
  { name: "Porto", country: "Portugal", tag: "Cities", temp: "24°", rating: 4.8, cover: "from-fuchsia-400 to-purple-300", saved: false },
];

const aiPicks = [
  { title: "Hidden onsen towns", detail: "3 spots near Kyoto locals love", icon: Sparkles },
  { title: "Best autumn foliage", detail: "Peak colours mid-November", icon: ThermometerSun },
  { title: "Walkable food streets", detail: "Nishiki & Pontocho picks", icon: Compass },
];

export default function ExplorePage() {
  const [active, setActive] = useState("Trending");
  const [saved, setSaved] = useState(places.map((p) => p.saved));

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const list =
    active === "Trending" ? places : places.filter((p) => p.tag === active);

  return (
    <ContentLayout title="Explore">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div>
            <h2 className="text-3xl font-normal">Explore destinations</h2>
            <p className="text-muted-foreground mt-1">
              Discover your next adventure
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search destinations, cities, experiences..."
              className="pl-9 h-11"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((c) => (
              <Button
                key={c}
                variant={active === c ? "default" : "outline"}
                size="sm"
                onClick={() => setActive(c)}
                className="shrink-0"
              >
                {c}
              </Button>
            ))}
          </div>

          <Card className="bg-muted border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                AI picks for you
              </CardTitle>
              <CardDescription>Based on your Kyoto trip</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              {aiPicks.map((p) => (
                <div
                  key={p.title}
                  className="rounded-lg bg-background/60 p-4 flex items-start gap-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <p.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm leading-none">{p.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {p.detail}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.map((place, i) => {
              const idx = places.indexOf(place);
              return (
                <Card key={place.name} className="bg-muted border-none overflow-hidden">
                  <div className={`relative h-40 bg-gradient-to-br ${place.cover} p-3`}>
                    <button
                      onClick={() =>
                        setSaved((prev) =>
                          prev.map((v, j) => (j === idx ? !v : v))
                        )
                      }
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80"
                      aria-label="Save"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          saved[idx]
                            ? "fill-red-500 text-red-500"
                            : "text-foreground"
                        }`}
                      />
                    </button>
                    <Badge className="absolute left-3 top-3 bg-background/80 text-foreground border-none gap-1">
                      <ThermometerSun className="h-3 w-3" />
                      {place.temp}
                    </Badge>
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-lg leading-none">{place.name}</p>
                      <p className="text-xs opacity-90 mt-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {place.country}
                      </p>
                    </div>
                  </div>
                  <CardFooter className="justify-between p-4">
                    <span className="flex items-center gap-1 text-sm">
                      <Star className="h-3.5 w-3.5 fill-current text-[#f5a623]" />
                      {place.rating}
                      <Badge variant="secondary" className="ml-1 text-1xs">
                        {place.tag}
                      </Badge>
                    </span>
                    <Button variant="outline" size="sm">
                      Discover
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
