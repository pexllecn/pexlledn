"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AvatarGroup } from "@/components/ui/avatar-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bike,
  CalendarDays,
  Clock,
  Dumbbell,
  MapPin,
  Moon,
  Plus,
  Users,
  Zap,
} from "lucide-react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Klass = {
  title: string;
  time: string;
  duration: string;
  coach: string;
  room: string;
  spots: string;
  icon: any;
  booked: boolean;
  avatars: { src?: string; fallback: string }[];
};

const classesByDay: Record<string, Klass[]> = {
  Mon: [
    { title: "Sunrise Yoga", time: "6:30 AM", duration: "45 min", coach: "Aria Patel", room: "Studio B", spots: "8 left", icon: Moon, booked: true, avatars: [{ src: "/avatar-40-01.jpg", fallback: "KA" }, { src: "/avatar-40-02.jpg", fallback: "SL" }, { fallback: "12" }] },
    { title: "Power Lifting", time: "6:00 PM", duration: "60 min", coach: "Lena Ortiz", room: "Strength Zone", spots: "3 left", icon: Dumbbell, booked: false, avatars: [{ src: "/avatar-40-03.jpg", fallback: "MD" }, { src: "/avatar-40-04.jpg", fallback: "RD" }, { fallback: "6" }] },
  ],
  Tue: [
    { title: "Spin Class", time: "7:00 AM", duration: "45 min", coach: "Devon Park", room: "Cycle Studio", spots: "4 left", icon: Bike, booked: true, avatars: [{ src: "/avatar-40-05.jpg", fallback: "TW" }, { fallback: "18" }] },
    { title: "HIIT Circuit", time: "12:15 PM", duration: "30 min", coach: "Sam Reid", room: "Studio A", spots: "Full", icon: Zap, booked: false, avatars: [{ src: "/avatar-80-06.jpg", fallback: "GH" }, { fallback: "20" }] },
  ],
  Wed: [
    { title: "Mobility & Core", time: "6:30 PM", duration: "40 min", coach: "Aria Patel", room: "Studio B", spots: "12 left", icon: Moon, booked: true, avatars: [{ src: "/avatar-80-07.jpg", fallback: "PL" }, { fallback: "9" }] },
  ],
  Thu: [
    { title: "Tempo Run Club", time: "6:00 AM", duration: "50 min", coach: "Maya Chen", room: "Outdoor", spots: "10 left", icon: Bike, booked: false, avatars: [{ src: "/avatar-80-01.jpg", fallback: "LO" }, { fallback: "15" }] },
    { title: "Push Day Power", time: "5:30 PM", duration: "55 min", coach: "Sam Reid", room: "Strength Zone", spots: "2 left", icon: Dumbbell, booked: true, avatars: [{ src: "/avatar-80-02.jpg", fallback: "SR" }, { fallback: "8" }] },
  ],
  Fri: [
    { title: "Tabata Express", time: "12:15 PM", duration: "16 min", coach: "Maya Chen", room: "Studio A", spots: "6 left", icon: Zap, booked: false, avatars: [{ src: "/avatar-80-03.jpg", fallback: "MC" }, { fallback: "11" }] },
  ],
  Sat: [
    { title: "Weekend Warrior", time: "9:00 AM", duration: "60 min", coach: "Lena Ortiz", room: "Strength Zone", spots: "5 left", icon: Dumbbell, booked: true, avatars: [{ src: "/avatar-80-04.jpg", fallback: "DP" }, { fallback: "14" }] },
  ],
  Sun: [
    { title: "Deep Stretch", time: "10:00 AM", duration: "25 min", coach: "Aria Patel", room: "Studio B", spots: "16 left", icon: Moon, booked: false, avatars: [{ src: "/avatar-80-05.jpg", fallback: "AP" }, { fallback: "7" }] },
  ],
};

export default function SchedulePage() {
  const [day, setDay] = useState("Mon");

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const classes = classesByDay[day] ?? [];

  return (
    <ContentLayout title="Schedule">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Class Schedule</h2>
              <p className="text-muted-foreground mt-1">
                Book your week · 3 classes reserved
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add to calendar
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((d) => {
              const count = (classesByDay[d] ?? []).length;
              return (
                <button
                  key={d}
                  onClick={() => setDay(d)}
                  className={`flex flex-col items-center gap-1 rounded-lg border p-3 transition-colors ${
                    day === d
                      ? "border-primary/50 bg-primary/10"
                      : "border-transparent bg-muted hover:bg-accent"
                  }`}
                >
                  <span className="text-xs text-muted-foreground">{d}</span>
                  <span className="text-lg tabular-nums leading-none">
                    {count}
                  </span>
                  <span className="text-1xs text-muted-foreground hidden sm:block">
                    {count === 1 ? "class" : "classes"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {classes.map((c) => (
              <Card key={c.title} className="bg-muted border-none">
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{c.title}</CardTitle>
                      <CardDescription>{c.coach}</CardDescription>
                    </div>
                  </div>
                  {c.booked ? (
                    <Badge variant="success">Booked</Badge>
                  ) : (
                    <Badge variant={c.spots === "Full" ? "decline" : "secondary"}>
                      {c.spots}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {c.time} · {c.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {c.room}
                  </span>
                </CardContent>
                <CardFooter className="justify-between">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <AvatarGroup
                            avatars={c.avatars}
                            max={3}
                            className="[&>span]:h-7 [&>span]:w-7 -space-x-3"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent showArrow>
                        {c.spots === "Full"
                          ? "Class is full"
                          : `${c.spots} to join`}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button
                    variant={c.booked ? "outline" : "default"}
                    size="sm"
                    disabled={c.spots === "Full" && !c.booked}
                    onClick={() =>
                      c.booked
                        ? toast(`Cancelled ${c.title}`, {
                            description: `${c.time} · ${c.coach}`,
                          })
                        : toast.success(`Booked ${c.title}`, {
                            description: `${c.time} · ${c.room} · ${c.coach}`,
                          })
                    }
                  >
                    {c.booked ? "Cancel" : c.spots === "Full" ? "Waitlist" : "Book"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
            {classes.length === 0 && (
              <Card className="bg-muted border-none lg:col-span-2">
                <CardContent className="py-12 text-center text-muted-foreground">
                  No classes scheduled for {day}.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
