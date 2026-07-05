"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
} from "recharts";
import {
  Apple,
  Coffee,
  Droplets,
  Egg,
  Flame,
  Moon,
  Plus,
  Salad,
  UtensilsCrossed,
  Wheat,
} from "lucide-react";

const weeklyCaloriesConfig = {
  intake: {
    label: "Intake",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const weeklyCaloriesData = [
  { day: "Mon", intake: 2140 },
  { day: "Tue", intake: 2380 },
  { day: "Wed", intake: 1960 },
  { day: "Thu", intake: 2210 },
  { day: "Fri", intake: 2520 },
  { day: "Sat", intake: 2740 },
  { day: "Sun", intake: 1830 },
];

const macros = [
  {
    name: "Protein",
    eaten: 128,
    goal: 160,
    unit: "g",
    color: "hsl(var(--chart-1))",
    icon: Egg,
  },
  {
    name: "Carbs",
    eaten: 214,
    goal: 250,
    unit: "g",
    color: "hsl(var(--chart-2))",
    icon: Wheat,
  },
  {
    name: "Fat",
    eaten: 52,
    goal: 70,
    unit: "g",
    color: "hsl(var(--chart-4))",
    icon: Salad,
  },
];

const meals = [
  {
    name: "Breakfast",
    description: "Oats, blueberries, whey protein",
    time: "7:30 AM",
    kcal: 420,
    protein: 32,
    icon: Coffee,
    logged: true,
  },
  {
    name: "Lunch",
    description: "Grilled chicken bowl, brown rice",
    time: "12:45 PM",
    kcal: 640,
    protein: 48,
    icon: UtensilsCrossed,
    logged: true,
  },
  {
    name: "Snack",
    description: "Greek yogurt, almonds, honey",
    time: "4:00 PM",
    kcal: 280,
    protein: 21,
    icon: Apple,
    logged: true,
  },
  {
    name: "Dinner",
    description: "Salmon, sweet potato, greens",
    time: "Planned · 7:30 PM",
    kcal: 580,
    protein: 42,
    icon: Moon,
    logged: false,
  },
];

const eaten = meals
  .filter((m) => m.logged)
  .reduce((acc, m) => acc + m.kcal, 0);
const budget = 2300;
const burned = 645;
const remaining = budget - eaten + burned;

export default function NutritionPage() {
  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Nutrition">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Nutrition</h2>
              <p className="text-muted-foreground mt-1">
                Saturday, July 5 · Cutting plan · 2,300 kcal budget
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Log a meal
            </Button>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 md:col-span-3 bg-muted border-none">
              <CardHeader className="space-y-0 pb-2">
                <CardDescription>Remaining today</CardDescription>
                <CardTitle className="text-4xl tabular-nums">
                  {remaining.toLocaleString()}{" "}
                  <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                    kcal
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <ChartContainer
                  config={{
                    eaten: { label: "Eaten", color: "hsl(var(--chart-2))" },
                  }}
                  className="aspect-square w-full max-w-[180px]"
                >
                  <RadialBarChart
                    margin={{ left: -10, right: -10, top: -10, bottom: -10 }}
                    data={[
                      {
                        activity: "eaten",
                        value: Math.min((eaten / budget) * 100, 100),
                        fill: "var(--color-eaten)",
                      },
                    ]}
                    innerRadius="70%"
                    barSize={20}
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
                <div className="grid gap-3 flex-1">
                  <div className="grid auto-rows-min gap-0.5">
                    <div className="text-sm text-muted-foreground">Budget</div>
                    <div className="text-xl font-normal tabular-nums leading-none">
                      {budget.toLocaleString()}
                    </div>
                  </div>
                  <div className="grid auto-rows-min gap-0.5">
                    <div className="text-sm text-muted-foreground">Eaten</div>
                    <div className="text-xl font-normal tabular-nums leading-none">
                      {eaten.toLocaleString()}
                    </div>
                  </div>
                  <div className="grid auto-rows-min gap-0.5">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      Burned
                    </div>
                    <div className="text-xl font-normal tabular-nums leading-none text-[#11c678]">
                      +{burned}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start gap-1">
                <CardDescription>
                  You&apos;re{" "}
                  <span className="font-normal text-foreground">on track</span>{" "}
                  — logging dinner keeps you 120 kcal under budget.
                </CardDescription>
              </CardFooter>
            </Card>

            <Card className="col-span-4 bg-muted border-none">
              <CardHeader>
                <CardTitle>Macros</CardTitle>
                <CardDescription>
                  Daily targets from your cutting plan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {macros.map((macro) => (
                  <div key={macro.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <macro.icon className="h-4 w-4 text-muted-foreground" />
                        {macro.name}
                      </span>
                      <span className="tabular-nums text-muted-foreground">
                        <span className="text-foreground">{macro.eaten}</span>/
                        {macro.goal} {macro.unit}
                      </span>
                    </div>
                    <Progress
                      value={(macro.eaten / macro.goal) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-muted-foreground" />
                      Water
                    </span>
                    <span className="tabular-nums text-muted-foreground">
                      <span className="text-foreground">1.8</span>/2.5 L
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={72} className="h-2 flex-1" />
                    <Button variant="outline" size="sm" className="h-7 px-2">
                      <Plus className="h-3.5 w-3.5" />
                      250ml
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-muted border-none">
              <CardHeader>
                <CardTitle>Today&apos;s Meals</CardTitle>
                <CardDescription>
                  3 of 4 meals logged · 1,340 kcal so far
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {meals.map((meal, i) => (
                  <div key={meal.name}>
                    <div className="flex items-center gap-3 py-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          meal.logged
                            ? "bg-primary/10 text-primary"
                            : "bg-background text-muted-foreground"
                        }`}
                      >
                        <meal.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm leading-none">{meal.name}</p>
                          {!meal.logged && (
                            <Badge variant="outline" className="text-1xs">
                              Planned
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {meal.description} · {meal.time}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm tabular-nums leading-none">
                          {meal.kcal} kcal
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 tabular-nums">
                          {meal.protein}g protein
                        </p>
                      </div>
                    </div>
                    {i < meals.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add snack
                </Button>
              </CardFooter>
            </Card>

            <Card className="col-span-4 md:col-span-3 bg-muted border-none">
              <CardHeader>
                <CardTitle>Calories This Week</CardTitle>
                <CardDescription>
                  Daily intake against your 2,300 kcal budget
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={weeklyCaloriesConfig}
                  className="aspect-auto h-[240px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    data={weeklyCaloriesData}
                    margin={{ left: -4, right: -4 }}
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
                      content={<ChartTooltipContent hideIndicator />}
                    />
                    <Bar
                      dataKey="intake"
                      fill="var(--color-intake)"
                      radius={5}
                      fillOpacity={0.6}
                      activeBar={<Rectangle fillOpacity={0.8} />}
                    />
                    <ReferenceLine
                      y={2300}
                      stroke="hsl(var(--muted-foreground))"
                      strokeDasharray="3 3"
                      strokeWidth={1}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-1">
                <CardDescription>
                  Weekly average of{" "}
                  <span className="font-normal text-foreground">
                    2,254 kcal
                  </span>{" "}
                  — 2% under budget.
                </CardDescription>
              </CardFooter>
            </Card>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
