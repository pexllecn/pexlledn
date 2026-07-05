"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Clock,
  Dumbbell,
  Flame,
  Footprints,
  Moon,
  Play,
  Plus,
  Search,
  Star,
  Users,
  Zap,
} from "lucide-react";

type Workout = {
  title: string;
  category: "Strength" | "Cardio" | "HIIT" | "Yoga";
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  kcal: number;
  exercises: number;
  coach: { name: string; avatar?: string; fallback: string };
  icon: any;
};

const workouts: Workout[] = [
  {
    title: "Full Body Foundations",
    category: "Strength",
    level: "Beginner",
    duration: "40 min",
    kcal: 380,
    exercises: 8,
    coach: { name: "Lena Ortiz", avatar: "/avatar-80-01.jpg", fallback: "LO" },
    icon: Dumbbell,
  },
  {
    title: "Push Day Power",
    category: "Strength",
    level: "Intermediate",
    duration: "55 min",
    kcal: 520,
    exercises: 10,
    coach: { name: "Sam Reid", avatar: "/avatar-80-02.jpg", fallback: "SR" },
    icon: Dumbbell,
  },
  {
    title: "5K Tempo Builder",
    category: "Cardio",
    level: "Intermediate",
    duration: "35 min",
    kcal: 410,
    exercises: 5,
    coach: { name: "Maya Chen", avatar: "/avatar-80-03.jpg", fallback: "MC" },
    icon: Footprints,
  },
  {
    title: "Endurance Ride",
    category: "Cardio",
    level: "Advanced",
    duration: "60 min",
    kcal: 640,
    exercises: 4,
    coach: { name: "Devon Park", avatar: "/avatar-80-04.jpg", fallback: "DP" },
    icon: Bike,
  },
  {
    title: "20-Minute Burner",
    category: "HIIT",
    level: "Advanced",
    duration: "20 min",
    kcal: 310,
    exercises: 6,
    coach: { name: "Sam Reid", avatar: "/avatar-80-02.jpg", fallback: "SR" },
    icon: Zap,
  },
  {
    title: "Tabata Express",
    category: "HIIT",
    level: "Intermediate",
    duration: "16 min",
    kcal: 240,
    exercises: 4,
    coach: { name: "Maya Chen", avatar: "/avatar-80-03.jpg", fallback: "MC" },
    icon: Zap,
  },
  {
    title: "Sunrise Flow",
    category: "Yoga",
    level: "Beginner",
    duration: "30 min",
    kcal: 140,
    exercises: 12,
    coach: { name: "Aria Patel", avatar: "/avatar-80-05.jpg", fallback: "AP" },
    icon: Moon,
  },
  {
    title: "Deep Stretch & Recover",
    category: "Yoga",
    level: "Beginner",
    duration: "25 min",
    kcal: 110,
    exercises: 10,
    coach: { name: "Aria Patel", avatar: "/avatar-80-05.jpg", fallback: "AP" },
    icon: Moon,
  },
];

const programs = [
  {
    title: "Stronger in 8 Weeks",
    description: "Progressive strength block · 4 sessions / week",
    week: 3,
    totalWeeks: 8,
    members: [
      { src: "/avatar-40-01.jpg", fallback: "AL" },
      { src: "/avatar-40-02.jpg", fallback: "MK" },
      { src: "/avatar-40-03.jpg", fallback: "JS" },
      { src: "/avatar-40-04.jpg", fallback: "RD" },
      { src: "/avatar-40-05.jpg", fallback: "TW" },
      { fallback: "128" },
    ],
  },
  {
    title: "Couch to 10K",
    description: "Run programme · 3 sessions / week",
    week: 6,
    totalWeeks: 12,
    members: [
      { src: "/avatar-80-06.jpg", fallback: "GH" },
      { src: "/avatar-80-07.jpg", fallback: "PL" },
      { src: "/avatar-80-08.jpg", fallback: "VW" },
    ],
  },
];

const coaches = [
  {
    name: "Lena Ortiz",
    specialty: "Strength & Conditioning",
    rating: 4.9,
    sessions: 320,
    avatar: "/avatar-80-01.jpg",
    fallback: "LO",
  },
  {
    name: "Sam Reid",
    specialty: "HIIT & Power",
    rating: 4.8,
    sessions: 275,
    avatar: "/avatar-80-02.jpg",
    fallback: "SR",
  },
  {
    name: "Maya Chen",
    specialty: "Running & Endurance",
    rating: 4.9,
    sessions: 412,
    avatar: "/avatar-80-03.jpg",
    fallback: "MC",
  },
  {
    name: "Aria Patel",
    specialty: "Yoga & Mobility",
    rating: 5.0,
    sessions: 198,
    avatar: "/avatar-80-05.jpg",
    fallback: "AP",
  },
];

const levelVariant: Record<Workout["level"], "secondary" | "default" | "destructive"> = {
  Beginner: "secondary",
  Intermediate: "default",
  Advanced: "destructive",
};

export default function WorkoutsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("all");

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const filtered = workouts.filter((w) => {
    const matchesQuery = w.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || w.category === category;
    const matchesLevel = level === "all" || w.level === level;
    return matchesQuery && matchesCategory && matchesLevel;
  });

  return (
    <ContentLayout title="Workouts">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Workout Library</h2>
              <p className="text-muted-foreground mt-1">
                {workouts.length} guided sessions across strength, cardio, HIIT
                and yoga
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Build custom workout
            </Button>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search workouts..."
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Tabs value={category} onValueChange={setCategory}>
              <TabsList>
                <TabsTrigger value="All">All</TabsTrigger>
                <TabsTrigger value="Strength">Strength</TabsTrigger>
                <TabsTrigger value="Cardio">Cardio</TabsTrigger>
                <TabsTrigger value="HIIT">HIIT</TabsTrigger>
                <TabsTrigger value="Yoga">Yoga</TabsTrigger>
              </TabsList>
            </Tabs>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {filtered.map((workout) => (
              <Card
                key={workout.title}
                className="bg-muted border-none flex flex-col"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <workout.icon className="h-5 w-5" />
                    </div>
                    <Badge variant={levelVariant[workout.level]}>
                      {workout.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-base pt-2">
                    {workout.title}
                  </CardTitle>
                  <CardDescription>
                    {workout.exercises} exercises · {workout.category}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-3 text-xs text-muted-foreground pb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {workout.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="h-3 w-3" />~{workout.kcal} kcal
                  </span>
                </CardContent>
                <CardFooter className="mt-auto flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={workout.coach.avatar} />
                      <AvatarFallback>{workout.coach.fallback}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground truncate">
                      {workout.coach.name}
                    </span>
                  </div>
                  <Button size="sm">
                    <Play className="mr-1.5 h-3.5 w-3.5" />
                    Start
                  </Button>
                </CardFooter>
              </Card>
            ))}
            {filtered.length === 0 && (
              <Card className="bg-muted border-none md:col-span-2 lg:col-span-4">
                <CardContent className="py-12 text-center text-muted-foreground">
                  No workouts match your filters.
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            {programs.map((program) => (
              <Card key={program.title} className="bg-muted border-none">
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1.5">
                    <CardTitle>{program.title}</CardTitle>
                    <CardDescription>{program.description}</CardDescription>
                  </div>
                  <Badge variant="outline">
                    Week {program.week} of {program.totalWeeks}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <Progress
                    value={(program.week / program.totalWeeks) * 100}
                    className="h-1.5"
                  />
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AvatarGroup
                      avatars={program.members}
                      max={4}
                      className="[&>span]:h-8 [&>span]:w-8 -space-x-3"
                    />
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      training with you
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Continue
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card className="bg-muted border-none">
            <CardHeader>
              <CardTitle>Coaches</CardTitle>
              <CardDescription>
                Book a 1-on-1 session with a KayFitness coach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                {coaches.map((coach) => (
                  <div
                    key={coach.name}
                    className="rounded-lg bg-background/60 p-4 flex flex-col items-center text-center gap-2"
                  >
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={coach.avatar} />
                      <AvatarFallback>{coach.fallback}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm leading-none">{coach.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {coach.specialty}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-current text-[#f5a623]" />
                      {coach.rating} · {coach.sessions} sessions
                    </div>
                    <Button variant="outline" size="sm" className="mt-1">
                      Book session
                    </Button>
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
