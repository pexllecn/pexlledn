"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import {
  Award,
  Dumbbell,
  Flame,
  Medal,
  Moon,
  Ruler,
  Scale,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";

const weightConfig = {
  weight: {
    label: "Weight",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const weightData = [
  { week: "Apr 1", weight: 84.2 },
  { week: "Apr 15", weight: 83.4 },
  { week: "May 1", weight: 82.9 },
  { week: "May 15", weight: 82.1 },
  { week: "Jun 1", weight: 81.2 },
  { week: "Jun 15", weight: 80.8 },
  { week: "Jul 1", weight: 79.9 },
];

const monthlySessionsConfig = {
  sessions: {
    label: "Sessions",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const monthlySessionsData = [
  { month: "Feb", sessions: 12 },
  { month: "Mar", sessions: 15 },
  { month: "Apr", sessions: 14 },
  { month: "May", sessions: 18 },
  { month: "Jun", sessions: 20 },
  { month: "Jul", sessions: 3 },
];

const personalRecords = [
  {
    exercise: "Barbell Back Squat",
    value: "120 kg",
    previous: "112.5 kg",
    date: "Jun 28",
    isNew: true,
  },
  {
    exercise: "Deadlift",
    value: "150 kg",
    previous: "145 kg",
    date: "Jun 21",
    isNew: true,
  },
  {
    exercise: "Bench Press",
    value: "92.5 kg",
    previous: "90 kg",
    date: "Jun 14",
    isNew: false,
  },
  {
    exercise: "5K Run",
    value: "23:41",
    previous: "24:32",
    date: "Jun 8",
    isNew: false,
  },
  {
    exercise: "Plank Hold",
    value: "3:20",
    previous: "2:55",
    date: "May 30",
    isNew: false,
  },
];

const measurements = [
  { name: "Weight", value: "79.9 kg", change: "-4.3 kg", down: true, icon: Scale },
  { name: "Body Fat", value: "16.2%", change: "-2.1%", down: true, icon: Target },
  { name: "Waist", value: "82 cm", change: "-4 cm", down: true, icon: Ruler },
  { name: "Chest", value: "104 cm", change: "+2 cm", down: false, icon: Ruler },
];

const goals = [
  { name: "Reach 78 kg", progress: 78, detail: "1.9 kg to go" },
  { name: "Squat 130 kg", progress: 84, detail: "10 kg to go" },
  { name: "Run a sub-23:00 5K", progress: 62, detail: "41 seconds to shave" },
  { name: "20 sessions / month", progress: 100, detail: "Hit in June 🎉" },
];

const achievements = [
  { name: "12-Day Streak", detail: "Longest streak yet", icon: Flame },
  { name: "100 Workouts", detail: "Unlocked in June", icon: Trophy },
  { name: "First Race", detail: "City 10K finisher", icon: Medal },
  { name: "Early Bird", detail: "20 sessions before 8 AM", icon: Moon },
  { name: "PR Machine", detail: "5 records this cycle", icon: Award },
  { name: "HIIT Hero", detail: "25 HIIT sessions", icon: Zap },
];

export default function ProgressTracker() {
  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Progress">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Progress</h2>
              <p className="text-muted-foreground mt-1">
                12 weeks into your cut — down 4.3 kg with strength still
                climbing
              </p>
            </div>
            <Button variant="outline">
              <Scale className="mr-2 h-4 w-4" />
              Log measurement
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {measurements.map((m) => (
              <Card key={m.name} className="bg-muted border-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-normal">
                    {m.name}
                  </CardTitle>
                  <m.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-normal tabular-nums">
                    {m.value}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    {m.down ? (
                      <TrendingDown className="h-3 w-3 text-[#11c678]" />
                    ) : (
                      <TrendingUp className="h-3 w-3 text-[#11c678]" />
                    )}
                    {m.change} in 12 weeks
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-muted border-none">
              <CardHeader>
                <CardTitle>Weight Trend</CardTitle>
                <CardDescription>
                  Weekly average weight against your 78 kg goal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={weightConfig}
                  className="aspect-auto h-[260px] w-full"
                >
                  <LineChart
                    accessibilityLayer
                    data={weightData}
                    margin={{ left: 12, right: 12, top: 10 }}
                  >
                    <CartesianGrid vertical={false} />
                    <YAxis hide domain={["dataMin - 2", "dataMax + 1"]} />
                    <XAxis
                      dataKey="week"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <ReferenceLine
                      y={78}
                      stroke="hsl(var(--muted-foreground))"
                      strokeDasharray="3 3"
                      strokeWidth={1}
                    />
                    <Line
                      dataKey="weight"
                      type="natural"
                      stroke="var(--color-weight)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2 text-sm leading-none">
                  Losing 0.4 kg / week on average
                  <TrendingDown className="h-4 w-4 text-[#11c678]" />
                </div>
              </CardFooter>
            </Card>

            <Card className="col-span-4 md:col-span-3 bg-muted border-none">
              <CardHeader>
                <CardTitle>Sessions Per Month</CardTitle>
                <CardDescription>
                  Consistency is trending in the right direction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={monthlySessionsConfig}
                  className="aspect-auto h-[260px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    data={monthlySessionsData}
                    margin={{ left: -4, right: -4 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideIndicator />}
                    />
                    <Bar
                      dataKey="sessions"
                      fill="var(--color-sessions)"
                      radius={5}
                      fillOpacity={0.6}
                      activeBar={<Rectangle fillOpacity={0.8} />}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2 text-sm leading-none">
                  Best month ever in June — 20 sessions
                  <TrendingUp className="h-4 w-4" />
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-muted border-none">
              <CardHeader>
                <CardTitle>Personal Records</CardTitle>
                <CardDescription>
                  2 new records set in the last month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Exercise</TableHead>
                      <TableHead>Best</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Previous
                      </TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {personalRecords.map((pr) => (
                      <TableRow key={pr.exercise}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Dumbbell className="h-4 w-4 text-muted-foreground" />
                            {pr.exercise}
                            {pr.isNew && <Badge>New PR</Badge>}
                          </div>
                        </TableCell>
                        <TableCell className="tabular-nums">
                          {pr.value}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell tabular-nums text-muted-foreground">
                          {pr.previous}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {pr.date}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="col-span-4 md:col-span-3 bg-muted border-none">
              <CardHeader>
                <CardTitle>Goals</CardTitle>
                <CardDescription>
                  Your active goals for this training cycle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {goals.map((goal) => (
                  <div key={goal.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{goal.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {goal.detail}
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Target className="mr-2 h-4 w-4" />
                  Set a new goal
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="bg-muted border-none">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                6 of 24 badges unlocked — keep going
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {achievements.map((badge) => (
                  <div
                    key={badge.name}
                    className="rounded-lg bg-background/60 p-4 flex flex-col items-center text-center gap-2"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <badge.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm leading-none">{badge.name}</p>
                      <p className="text-1xs text-muted-foreground mt-1">
                        {badge.detail}
                      </p>
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
