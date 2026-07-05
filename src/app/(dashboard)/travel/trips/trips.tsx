"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bed,
  CalendarDays,
  Camera,
  MapPin,
  Plane,
  Plus,
  Utensils,
} from "lucide-react";

type Trip = {
  city: string;
  country: string;
  dates: string;
  nights: number;
  budget: string;
  status: "Upcoming" | "Draft" | "Past";
  cover: string;
};

const trips: Trip[] = [
  { city: "Kyoto", country: "Japan", dates: "Aug 12 – 20, 2026", nights: 8, budget: "$4,700", status: "Upcoming", cover: "from-rose-400 to-orange-300" },
  { city: "Lisbon", country: "Portugal", dates: "Sep 3 – 9, 2026", nights: 6, budget: "$2,900", status: "Draft", cover: "from-sky-400 to-cyan-300" },
  { city: "Reykjavik", country: "Iceland", dates: "Oct 18 – 24, 2026", nights: 6, budget: "$3,600", status: "Upcoming", cover: "from-indigo-400 to-violet-300" },
  { city: "Barcelona", country: "Spain", dates: "Apr 4 – 10, 2026", nights: 6, budget: "$2,400", status: "Past", cover: "from-amber-400 to-yellow-300" },
  { city: "Cape Town", country: "South Africa", dates: "Jan 9 – 18, 2026", nights: 9, budget: "$3,100", status: "Past", cover: "from-emerald-400 to-teal-300" },
];

const itinerary = [
  { day: "Day 1", title: "Arrival & Gion district", detail: "Check in, evening walk", icon: Plane },
  { day: "Day 2", title: "Fushimi Inari & tea house", detail: "Sunrise hike, matcha tasting", icon: Camera },
  { day: "Day 3", title: "Arashiyama bamboo grove", detail: "Boat ride, riverside lunch", icon: Utensils },
  { day: "Day 4", title: "Nishiki market & cooking class", detail: "Local street food tour", icon: Utensils },
];

const statusVariant: Record<Trip["status"], "success" | "yellow" | "secondary"> = {
  Upcoming: "success",
  Draft: "yellow",
  Past: "secondary",
};

export default function TripsPage() {
  const [filter, setFilter] = useState("all");

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const list = trips.filter((t) =>
    filter === "all" ? true : t.status.toLowerCase() === filter
  );

  return (
    <ContentLayout title="Trips">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">My Trips</h2>
              <p className="text-muted-foreground mt-1">
                {trips.length} trips · 2 upcoming
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New trip
            </Button>
          </div>

          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.map((t) => (
              <Card key={t.city} className="bg-muted border-none overflow-hidden">
                <div
                  className={`relative h-32 bg-gradient-to-br ${t.cover} p-4 flex items-end`}
                >
                  <Badge
                    variant={statusVariant[t.status]}
                    className="absolute right-3 top-3"
                  >
                    {t.status}
                  </Badge>
                  <div className="text-white">
                    <p className="text-lg leading-none">{t.city}</p>
                    <p className="text-xs opacity-90 mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {t.country}
                    </p>
                  </div>
                </div>
                <CardContent className="flex items-center justify-between p-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {t.dates}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bed className="h-3.5 w-3.5" />
                    {t.nights}
                  </span>
                </CardContent>
                <CardFooter className="justify-between p-4 pt-0">
                  <span className="text-sm tabular-nums">{t.budget}</span>
                  <Button variant="outline" size="sm">
                    Open
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card className="bg-muted border-none">
            <CardHeader>
              <CardTitle>Kyoto itinerary</CardTitle>
              <CardDescription>Day-by-day plan · 8 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {itinerary.map((it, i) => (
                <div key={it.day}>
                  <div className="flex items-center gap-3 py-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <it.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-1xs">
                          {it.day}
                        </Badge>
                        <p className="text-sm leading-none">{it.title}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {it.detail}
                      </p>
                    </div>
                  </div>
                  {i < itinerary.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
