"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Kbd } from "@/components/ui/kbd";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
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
  Plane,
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
  blurb: string;
};

const places: Place[] = [
  { name: "Santorini", country: "Greece", tag: "Beaches", temp: "27°", rating: 4.9, cover: "from-sky-400 to-blue-300", saved: true, blurb: "Whitewashed cliffs and caldera sunsets over the Aegean." },
  { name: "Banff", country: "Canada", tag: "Mountains", temp: "12°", rating: 4.8, cover: "from-emerald-400 to-teal-300", saved: false, blurb: "Turquoise glacial lakes ringed by the Canadian Rockies." },
  { name: "Marrakesh", country: "Morocco", tag: "Culture", temp: "31°", rating: 4.7, cover: "from-amber-400 to-orange-300", saved: false, blurb: "Souks, riads and mint tea in the Red City." },
  { name: "Queenstown", country: "New Zealand", tag: "Mountains", temp: "9°", rating: 4.9, cover: "from-indigo-400 to-violet-300", saved: true, blurb: "Adventure capital wrapped around Lake Wakatipu." },
  { name: "Tulum", country: "Mexico", tag: "Beaches", temp: "29°", rating: 4.6, cover: "from-rose-400 to-pink-300", saved: false, blurb: "Cenotes, ruins and beach clubs on the Riviera Maya." },
  { name: "Porto", country: "Portugal", tag: "Cities", temp: "24°", rating: 4.8, cover: "from-fuchsia-400 to-purple-300", saved: false, blurb: "Port cellars and azulejo tiles along the Douro." },
];

const aiPicks = [
  { title: "Hidden onsen towns", detail: "3 spots near Kyoto locals love", icon: Sparkles },
  { title: "Best autumn foliage", detail: "Peak colours mid-November", icon: ThermometerSun },
  { title: "Walkable food streets", detail: "Nishiki & Pontocho picks", icon: Compass },
];

export default function ExplorePage() {
  const [active, setActive] = useState("Trending");
  const [saved, setSaved] = useState(places.map((p) => p.saved));
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const list =
    active === "Trending" ? places : places.filter((p) => p.tag === active);
  const savedPlaces = places.filter((_, i) => saved[i]);

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

          <button
            onClick={() => setCmdOpen(true)}
            className="flex h-11 w-full items-center gap-2 rounded-lg border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-accent"
          >
            <Search className="h-4 w-4" />
            Search destinations, cities, experiences...
            <Kbd className="ml-auto">⌘K</Kbd>
          </button>

          <CommandDialog open={cmdOpen} onOpenChange={setCmdOpen}>
            <CommandInput placeholder="Search destinations or experiences..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Destinations">
                {places.map((p) => (
                  <CommandItem
                    key={p.name}
                    onSelect={() => {
                      setCmdOpen(false);
                      toast(`Opening ${p.name}, ${p.country}`);
                    }}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    {p.name}
                    <span className="text-muted-foreground ml-1">
                      · {p.country}
                    </span>
                    <CommandShortcut>{p.temp}</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Quick actions">
                <CommandItem
                  onSelect={() => {
                    setCmdOpen(false);
                    toast.success("New trip started ✈️");
                  }}
                >
                  <Plane className="mr-2 h-4 w-4" />
                  Plan a new trip
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>

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
            {list.map((place) => {
              const idx = places.indexOf(place);
              return (
                <Card key={place.name} className="bg-muted border-none overflow-hidden">
                  <div className={`relative h-40 bg-gradient-to-br ${place.cover} p-3`}>
                    <button
                      onClick={() => {
                        setSaved((prev) =>
                          prev.map((v, j) => (j === idx ? !v : v))
                        );
                        toast[saved[idx] ? "message" : "success"](
                          saved[idx]
                            ? `Removed ${place.name}`
                            : `Saved ${place.name}`
                        );
                      }}
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
                    <div className="absolute bottom-3 left-3 text-on-media text-white">
                      <HoverCard openDelay={100}>
                        <HoverCardTrigger asChild>
                          <p className="text-lg leading-none cursor-pointer underline decoration-dotted underline-offset-4">
                            {place.name}
                          </p>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-64 text-foreground">
                          <p className="text-sm font-medium">
                            {place.name}, {place.country}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {place.blurb}
                          </p>
                        </HoverCardContent>
                      </HoverCard>
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

          <Card className="bg-muted border-none overflow-hidden">
            <CardHeader>
              <CardTitle>Trip planner</CardTitle>
              <CardDescription>
                Drag the divider to balance your map and saved list
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[280px] border-t"
              >
                <ResizablePanel defaultSize={55} minSize={30}>
                  <div className="relative h-full min-h-[280px] bg-gradient-to-br from-emerald-200/40 to-sky-200/40 dark:from-emerald-900/20 dark:to-sky-900/20 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="mx-auto h-6 w-6" />
                      <p className="text-sm mt-2">Interactive map</p>
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={45} minSize={25}>
                  <div className="p-4">
                    <p className="text-sm font-medium mb-2">
                      Saved places ({savedPlaces.length})
                    </p>
                    <ScrollArea className="h-[220px] pr-3">
                      <div className="space-y-2">
                        {savedPlaces.length ? (
                          savedPlaces.map((p) => (
                            <div
                              key={p.name}
                              className="flex items-center gap-3 rounded-lg bg-background/60 p-2.5"
                            >
                              <div
                                className={`h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br ${p.cover}`}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm leading-none">{p.name}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {p.country}
                                </p>
                              </div>
                              <Badge variant="secondary" className="text-1xs">
                                {p.temp}
                              </Badge>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Tap the heart on a destination to save it here.
                          </p>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
