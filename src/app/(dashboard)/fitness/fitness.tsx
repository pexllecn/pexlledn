"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  XAxis,
} from "recharts";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock,
  Dumbbell,
  Flame,
  Footprints,
  HeartPulse,
  Moon,
  Play,
  Timer,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";

const weeklyBurnConfig = {
  burned: {
    label: "Burned",
    color: "hsl(var(--chart-1))",
  },
  goal: {
    label: "Goal",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const weeklyBurnData = [
  { day: "Mon", burned: 540, goal: 600 },
  { day: "Tue", burned: 720, goal: 600 },
  { day: "Wed", burned: 380, goal: 600 },
  { day: "Thu", burned: 645, goal: 600 },
  { day: "Fri", burned: 812, goal: 600 },
  { day: "Sat", burned: 460, goal: 600 },
  { day: "Sun", burned: 692, goal: 600 },
];

const heartRateData = [
  { time: "6am", bpm: 58 },
  { time: "9am", bpm: 74 },
  { time: "12pm", bpm: 88 },
  { time: "3pm", bpm: 71 },
  { time: "6pm", bpm: 132 },
  { time: "9pm", bpm: 64 },
];

const todaysPlan = [
  {
    name: "Barbell Back Squat",
    detail: "4 sets × 8 reps · 80 kg",
    done: true,
  },
  {
    name: "Romanian Deadlift",
    detail: "3 sets × 10 reps · 60 kg",
    done: true,
  },
  {
    name: "Walking Lunges",
    detail: "3 sets × 12 reps · bodyweight",
    done: false,
  },
  {
    name: "Leg Press",
    detail: "3 sets × 12 reps · 140 kg",
    done: false,
  },
  {
    name: "Standing Calf Raise",
    detail: "4 sets × 15 reps · 40 kg",
    done: false,
  },
];

const recentSessions = [
  {
    title: "Upper Body Power",
    type: "Strength",
    date: "Yesterday",
    duration: "52 min",
    kcal: 486,
    icon: Dumbbell,
  },
  {
    title: "Tempo Run",
    type: "Cardio",
    date: "2 days ago",
    duration: "38 min",
    kcal: 412,
    icon: Footprints,
  },
  {
    title: "Morning Flow",
    type: "Yoga",
    date: "3 days ago",
    duration: "30 min",
    kcal: 148,
    icon: Moon,
  },
  {
    title: "HIIT Circuit",
    type: "HIIT",
    date: "4 days ago",
    duration: "25 min",
    kcal: 355,
    icon: Zap,
  },
];

const upcomingClasses = [
  {
    title: "Spin Class",
    time: "Tomorrow · 7:00 AM",
    coach: "Coach Lena",
    spots: "4 spots left",
    avatars: [
      { src: "/avatar-40-01.jpg", fallback: "AL" },
      { src: "/avatar-40-02.jpg", fallback: "MK" },
      { src: "/avatar-40-03.jpg", fallback: "JS" },
      { src: "/avatar-40-04.jpg", fallback: "RD" },
      { src: "/avatar-40-05.jpg", fallback: "TW" },
      { fallback: "PB" },
    ],
  },
  {
    title: "Mobility & Core",
    time: "Wed · 6:30 PM",
    coach: "Coach Sam",
    spots: "12 spots left",
    avatars: [
      { src: "/avatar-80-01.jpg", fallback: "KA" },
      { src: "/avatar-80-02.jpg", fallback: "NF" },
      { src: "/avatar-80-03.jpg", fallback: "OD" },
    ],
  },
];

export default function FitnessPage() {
  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const completed = todaysPlan.filter((e) => e.done).length;
  const planProgress = Math.round((completed / todaysPlan.length) * 100);

  return (
    <ContentLayout title="Fitness">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">
                Good morning, Khaled 👋
              </h2>
              <p className="text-muted-foreground mt-1">
                You&apos;re on a{" "}
                <span className="text-foreground">12-day streak</span> — one
                session away from your weekly goal.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1 px-3 py-1.5">
                <Flame className="h-3.5 w-3.5 text-[#ff646c]" />
                12-day streak
              </Badge>
              <Button asChild>
                <Link href="/fitness/workouts">
                  <Play className="mr-2 h-4 w-4" />
                  Start workout
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-muted border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-normal">
                  Calories Burned
                </CardTitle>
                <Flame className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-normal tabular-nums">
                  645{" "}
                  <span className="text-sm text-muted-foreground">kcal</span>
                </div>
                <Progress value={81} className="mt-3 h-1.5" />
                <p className="text-xs text-muted-foreground mt-2">
                  81% of your 800 kcal goal
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-normal">Steps</CardTitle>
                <Footprints className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-normal tabular-nums">
                  9,482
                </div>
                <Progress value={95} className="mt-3 h-1.5" />
                <p className="text-xs text-muted-foreground mt-2">
                  518 steps to your 10k goal
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-normal">
                  Active Minutes
                </CardTitle>
                <Timer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-normal tabular-nums text-[#11c678]">
                  74{" "}
                  <span className="text-sm text-muted-foreground">min</span>
                </div>
                <Progress value={100} className="mt-3 h-1.5" />
                <p className="text-xs text-muted-foreground mt-2">
                  Goal reached — nice work!
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-normal">
                  Resting Heart Rate
                </CardTitle>
                <HeartPulse className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-normal tabular-nums">
                  58{" "}
                  <span className="text-sm text-muted-foreground">bpm</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-[#11c678]" />
                  Down 3 bpm from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-muted border-none">
              <CardHeader>
                <CardTitle>Energy Burned This Week</CardTitle>
                <CardDescription>
                  Daily calories burned against your 600 kcal target
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={weeklyBurnConfig}
                  className="aspect-auto h-[260px] w-full"
                >
                  <AreaChart
                    accessibilityLayer
                    data={weeklyBurnData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <defs>
                      <linearGradient
                        id="fillBurned"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-burned)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-burned)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      dataKey="burned"
                      type="natural"
                      fill="url(#fillBurned)"
                      fillOpacity={0.4}
                      stroke="var(--color-burned)"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2 text-sm leading-none">
                  Trending up 8.4% vs last week
                  <TrendingUp className="h-4 w-4" />
                </div>
              </CardFooter>
            </Card>

            <Card className="col-span-4 md:col-span-3 bg-muted border-none">
              <CardHeader>
                <CardTitle>Activity Rings</CardTitle>
                <CardDescription>
                  Move, exercise and stand goals for today
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <div className="grid items-center gap-3">
                  <div className="grid flex-1 auto-rows-min gap-0.5">
                    <div className="text-sm text-muted-foreground">Move</div>
                    <div className="flex items-baseline gap-1 text-xl font-normal tabular-nums leading-none">
                      645/800
                      <span className="text-sm font-normal text-muted-foreground">
                        kcal
                      </span>
                    </div>
                  </div>
                  <div className="grid flex-1 auto-rows-min gap-0.5">
                    <div className="text-sm text-muted-foreground">
                      Exercise
                    </div>
                    <div className="flex items-baseline gap-1 text-xl font-normal tabular-nums leading-none">
                      74/60
                      <span className="text-sm font-normal text-muted-foreground">
                        min
                      </span>
                    </div>
                  </div>
                  <div className="grid flex-1 auto-rows-min gap-0.5">
                    <div className="text-sm text-muted-foreground">Stand</div>
                    <div className="flex items-baseline gap-1 text-xl font-normal tabular-nums leading-none">
                      9/12
                      <span className="text-sm font-normal text-muted-foreground">
                        hr
                      </span>
                    </div>
                  </div>
                </div>
                <ChartContainer
                  config={{
                    move: { label: "Move", color: "hsl(var(--chart-1))" },
                    exercise: {
                      label: "Exercise",
                      color: "hsl(var(--chart-2))",
                    },
                    stand: { label: "Stand", color: "hsl(var(--chart-3))" },
                  }}
                  className="mx-auto aspect-square w-full max-w-[240px]"
                >
                  <RadialBarChart
                    margin={{ left: -10, right: -10, top: -10, bottom: -10 }}
                    data={[
                      {
                        activity: "stand",
                        value: (9 / 12) * 100,
                        fill: "var(--color-stand)",
                      },
                      {
                        activity: "exercise",
                        value: 100,
                        fill: "var(--color-exercise)",
                      },
                      {
                        activity: "move",
                        value: (645 / 800) * 100,
                        fill: "var(--color-move)",
                      },
                    ]}
                    innerRadius="20%"
                    barSize={24}
                    startAngle={90}
                    endAngle={450}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      dataKey="value"
                      tick={false}
                    />
                    <RadialBar dataKey="value" background cornerRadius={5} />
                  </RadialBarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-1">
                <CardDescription>
                  You&apos;ve closed your exercise ring{" "}
                  <span className="font-normal text-foreground">
                    5 days in a row
                  </span>
                  .
                </CardDescription>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 md:col-span-3 bg-muted border-none">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="space-y-1.5">
                  <CardTitle>Today&apos;s Session</CardTitle>
                  <CardDescription>
                    Lower Body Strength · 45 min · Week 3 of 8
                  </CardDescription>
                </div>
                <Badge>{planProgress}% done</Badge>
              </CardHeader>
              <CardContent className="space-y-1">
                <Progress value={planProgress} className="h-1.5 mb-4" />
                {todaysPlan.map((exercise, i) => (
                  <div key={exercise.name}>
                    <div className="flex items-center gap-3 py-2.5">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                          exercise.done
                            ? "bg-primary text-primary-foreground"
                            : "bg-background text-muted-foreground"
                        }`}
                      >
                        {exercise.done ? (
                          <Dumbbell className="h-4 w-4" />
                        ) : (
                          <span className="text-sm tabular-nums">{i + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm leading-none ${
                            exercise.done
                              ? "line-through text-muted-foreground"
                              : ""
                          }`}
                        >
                          {exercise.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {exercise.detail}
                        </p>
                      </div>
                      {!exercise.done && (
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Start ${exercise.name}`}
                          className="h-8 w-8"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {i < todaysPlan.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Resume session
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="col-span-4 bg-muted border-none">
              <CardHeader>
                <CardTitle>Heart Rate Today</CardTitle>
                <CardDescription>
                  Peak of 132 bpm during your evening session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    bpm: { label: "BPM", color: "hsl(var(--chart-1))" },
                  }}
                  className="aspect-auto h-[180px] w-full"
                >
                  <BarChart accessibilityLayer data={heartRateData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="time"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideIndicator />}
                    />
                    <Bar
                      dataKey="bpm"
                      fill="var(--color-bpm)"
                      radius={5}
                      fillOpacity={0.6}
                      activeBar={<Rectangle fillOpacity={0.8} />}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-stretch gap-3">
                <Separator />
                <div className="space-y-3">
                  {upcomingClasses.map((cls) => (
                    <div
                      key={cls.title}
                      className="flex items-center justify-between gap-3 rounded-lg bg-background/60 p-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <CalendarDays className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm leading-none truncate">
                            {cls.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {cls.time} · {cls.coach}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <AvatarGroup
                          avatars={cls.avatars}
                          max={3}
                          className="[&>span]:h-7 [&>span]:w-7 -space-x-3"
                        />
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </div>

          <Card className="bg-muted border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="space-y-1.5">
                <CardTitle>Recent Sessions</CardTitle>
                <CardDescription>
                  You completed 4 workouts in the last 5 days
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/fitness/progress">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                {recentSessions.map((session) => (
                  <div
                    key={session.title}
                    className="rounded-lg bg-background/60 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <session.icon className="h-4 w-4" />
                      </div>
                      <Badge variant="secondary">{session.type}</Badge>
                    </div>
                    <div>
                      <p className="text-sm leading-none">{session.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {session.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {session.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="h-3 w-3" />
                        {session.kcal} kcal
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
