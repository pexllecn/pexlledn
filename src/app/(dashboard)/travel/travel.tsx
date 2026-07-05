"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AvatarGroup } from "@/components/ui/avatar-group";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ArrowRight,
  CalendarDays,
  Compass,
  MapPin,
  Plane,
  Plus,
  Sparkles,
  Sun,
  Wallet,
} from "lucide-react";

const spendConfig = {
  spend: { label: "Spend", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

const spendData = [
  { cat: "Flights", spend: 1840 },
  { cat: "Stays", spend: 1420 },
  { cat: "Food", spend: 680 },
  { cat: "Tours", spend: 520 },
  { cat: "Transit", spend: 240 },
];

const upcoming = {
  city: "Kyoto, Japan",
  dates: "Aug 12 – Aug 20, 2026",
  countdown: 38,
  progress: 72,
  travellers: [
    { src: "/avatar-40-01.jpg", fallback: "KA" },
    { src: "/avatar-40-02.jpg", fallback: "SL" },
    { src: "/avatar-40-03.jpg", fallback: "MD" },
  ],
};

const trips = [
  { city: "Lisbon", country: "Portugal", dates: "Sep 3 – Sep 9", status: "Planning", nights: 6, icon: Sun },
  { city: "Reykjavik", country: "Iceland", dates: "Oct 18 – Oct 24", status: "Booked", nights: 6, icon: Compass },
  { city: "Marrakesh", country: "Morocco", dates: "Nov 10 – Nov 15", status: "Idea", nights: 5, icon: MapPin },
];

const statusVariant: Record<string, "success" | "yellow" | "secondary"> = {
  Booked: "success",
  Planning: "yellow",
  Idea: "secondary",
};

export default function TravelPage() {
  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Travel">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Where to next, Khaled? ✈️</h2>
              <p className="text-muted-foreground mt-1">
                <span className="text-foreground">3 trips</span> planned · next
                departure in 38 days
              </p>
            </div>
            <Button
              onClick={() =>
                toast.success("Let's plan something ✈️", {
                  description: "Pick a destination to start a new trip.",
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Plan a trip
            </Button>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-primary text-primary-foreground border-none">
              <CardHeader>
                <Badge className="w-fit bg-background/20 text-primary-foreground border-none">
                  Next trip
                </Badge>
                <CardTitle className="text-3xl pt-1">{upcoming.city}</CardTitle>
                <CardDescription className="text-primary-foreground/80 flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {upcoming.dates}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary-foreground/80">
                    Trip readiness
                  </span>
                  <span className="tabular-nums">{upcoming.progress}%</span>
                </div>
                <Progress
                  value={upcoming.progress}
                  className="h-2 bg-background/20"
                />
              </CardContent>
              <CardFooter className="justify-between">
                <AvatarGroup
                  avatars={upcoming.travellers}
                  max={3}
                  className="[&>span]:h-8 [&>span]:w-8 [&_span]:border-primary -space-x-3"
                />
                <Button variant="outline3" size="sm">
                  Open itinerary
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="col-span-4 md:col-span-3 bg-muted border-none">
              <CardHeader>
                <CardTitle>Trip Budget</CardTitle>
                <CardDescription>Kyoto · $4,700 planned</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={spendConfig}
                  className="aspect-auto h-[180px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    data={spendData}
                    layout="vertical"
                    margin={{ left: 8, right: 8 }}
                  >
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" dataKey="spend" hide />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="spend" fill="var(--color-spend)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-1">
                <CardDescription>
                  <span className="text-foreground tabular-nums">$3,900</span>{" "}
                  committed · $800 remaining
                </CardDescription>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((t) => (
              <Card key={t.city} className="bg-muted border-none">
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <t.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{t.city}</CardTitle>
                      <CardDescription>{t.country}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={statusVariant[t.status]}>{t.status}</Badge>
                </CardHeader>
                <CardContent className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {t.dates}
                  </span>
                  <span>{t.nights} nights</span>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View trip
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg">Need inspiration?</h3>
                <p className="text-sm text-muted-foreground">
                  Trending destinations for your dates
                </p>
              </div>
            </div>
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-2">
                {[
                  { city: "Kyoto", tag: "Culture", cover: "from-rose-400 to-orange-300" },
                  { city: "Lisbon", tag: "City break", cover: "from-sky-400 to-cyan-300" },
                  { city: "Reykjavik", tag: "Nature", cover: "from-indigo-400 to-violet-300" },
                  { city: "Marrakesh", tag: "Culture", cover: "from-amber-400 to-yellow-300" },
                  { city: "Bali", tag: "Beaches", cover: "from-emerald-400 to-teal-300" },
                ].map((d) => (
                  <CarouselItem
                    key={d.city}
                    className="pl-2 basis-4/5 sm:basis-1/2 lg:basis-1/3"
                  >
                    <div
                      className={`relative h-36 rounded-2xl bg-gradient-to-br ${d.cover} p-4 flex flex-col justify-end`}
                    >
                      <Badge className="absolute right-3 top-3 bg-background/80 text-foreground border-none">
                        {d.tag}
                      </Badge>
                      <p className="text-white text-lg leading-none">
                        {d.city}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>

          <Card className="bg-muted border-none">
            <CardContent className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm">AI trip suggestions are ready</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on your saved places, we found 4 hidden gems near Kyoto.
                  </p>
                </div>
              </div>
              <Button asChild>
                <Link href="/travel/explore">Explore ideas</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
