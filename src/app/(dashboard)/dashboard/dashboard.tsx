"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { Toaster, toast } from "sonner";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CircleCheck,
  CreditCard,
  DollarSign,
  Download,
  Package,
  ShoppingCart,
  Star,
  Users,
  X,
} from "lucide-react";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { EASE_OUT, SPRING_PRESS, rise, stagger } from "@/lib/apple-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

/* -------------------------------------------------------------------------- */
/*  Colour                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Only TWO categorical hues are ever used at once, and they are always the
 * first two chart tokens. That is not a stylistic preference - the theme's full
 * five-token ramp was run through a CVD validator and fails as a categorical
 * palette in light mode: chart-4 and chart-5 sit at deltaE 7.9 for normal vision
 * and 4.7 under deuteranopia, which is "cannot tell these apart". chart-1 and
 * chart-2 pass every check (deltaE 25.3 normal, 9.1 protan, contrast >= 3:1).
 *
 * Everywhere a breakdown needs more than two parts, magnitude is encoded by BAR
 * LENGTH in a single hue with the value written next to it, so identity never
 * rests on colour at all. Which is also how Apple draws these.
 */
const SERIES_1 = "hsl(var(--chart-1))";
const SERIES_2 = "hsl(var(--chart-2))";

/**
 * Magnitude marks use the chart token, NOT --primary. In the active theme
 * --primary is #facc15, which measures 1.53:1 against the white card - a 2px
 * sparkline in it is effectively invisible. --chart-1 measures 3.11:1 in light
 * and 3.10:1 in dark, clearing the 3:1 floor for a non-text mark in both.
 * --primary stays where it belongs: interactive fills, which ship paired with
 * --primary-foreground and are sized far above a hairline.
 */
const MAGNITUDE = "hsl(var(--chart-1))";

const chartConfig = {
  desktop: { label: "Desktop", color: SERIES_1 },
  mobile: { label: "Mobile", color: SERIES_2 },
} satisfies ChartConfig;

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const monthly = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const daily = [
  { day: "Mon", desktop: 222, mobile: 150 },
  { day: "Tue", desktop: 97, mobile: 180 },
  { day: "Wed", desktop: 167, mobile: 120 },
  { day: "Thu", desktop: 242, mobile: 260 },
  { day: "Fri", desktop: 373, mobile: 290 },
];

const kpis = [
  {
    label: "Total revenue",
    value: "$45,231.89",
    delta: "+20.1%",
    up: true,
    icon: DollarSign,
    spark: [12, 18, 14, 22, 20, 28, 26, 34],
  },
  {
    label: "Subscriptions",
    value: "+2,350",
    delta: "+180.1%",
    up: true,
    icon: Users,
    spark: [8, 12, 10, 16, 22, 20, 28, 32],
  },
  {
    label: "Sales",
    value: "+12,234",
    delta: "+19%",
    up: true,
    icon: CreditCard,
    spark: [20, 18, 24, 22, 28, 26, 30, 33],
  },
  {
    label: "Active now",
    value: "+573",
    delta: "-4.5%",
    up: false,
    icon: Activity,
    spark: [30, 26, 28, 22, 24, 20, 18, 16],
  },
];

const categories = [
  { name: "Electronics", value: 42 },
  { name: "Fashion", value: 26 },
  { name: "Home", value: 18 },
  { name: "Other", value: 14 },
];

const traffic = [
  { name: "Direct", value: 38 },
  { name: "Organic search", value: 27 },
  { name: "Referral", value: 19 },
  { name: "Social", value: 16 },
];

const regions = [
  { name: "United States", value: 46, flag: "\u{1F1FA}\u{1F1F8}" },
  { name: "United Kingdom", value: 21, flag: "\u{1F1EC}\u{1F1E7}" },
  { name: "Germany", value: 16, flag: "\u{1F1E9}\u{1F1EA}" },
  { name: "Japan", value: 11, flag: "\u{1F1EF}\u{1F1F5}" },
  { name: "Other", value: 6, flag: "\u{1F30D}" },
];

const topProducts = [
  { name: "Aurora Wireless Buds", sold: 1284, revenue: "$38,520", trend: 12 },
  { name: "Nomad Leather Wallet", sold: 964, revenue: "$21,208", trend: 8 },
  { name: "Lumen Desk Lamp", sold: 742, revenue: "$18,550", trend: -3 },
  { name: "Terra Running Shoes", sold: 631, revenue: "$44,170", trend: 21 },
];

const activityFeed = [
  {
    icon: ShoppingCart,
    title: "New order #4821",
    desc: "Olivia Martin · $1,999.00",
    time: "2m",
  },
  {
    icon: Users,
    title: "New customer signed up",
    desc: "jackson.lee@email.com",
    time: "18m",
  },
  {
    icon: Star,
    title: "5-star review received",
    desc: "Aurora Wireless Buds",
    time: "1h",
  },
  {
    icon: CreditCard,
    title: "Payout processed",
    desc: "$12,480 to bank ••4291",
    time: "3h",
  },
  {
    icon: Package,
    title: "Restock alert",
    desc: "Lumen Desk Lamp · 8 left",
    time: "5h",
  },
];

const team = [
  { name: "Sofia Davis", role: "Sales", value: "$48.2k", avatar: "/avatar-40-01.jpg", pct: 92 },
  { name: "Jackson Lee", role: "Sales", value: "$41.9k", avatar: "/avatar-40-02.jpg", pct: 80 },
  { name: "Isabella Nguyen", role: "Support", value: "$33.4k", avatar: "/avatar-40-03.jpg", pct: 64 },
  { name: "William Kim", role: "Sales", value: "$28.7k", avatar: "/avatar-40-04.jpg", pct: 55 },
];

const tasks = [
  { title: "Approve Q3 marketing budget", due: "Today", done: false },
  { title: "Review new supplier contracts", due: "Tomorrow", done: false },
  { title: "Ship holiday campaign assets", due: "Fri", done: false },
  { title: "Reconcile March invoices", due: "Done", done: true },
];

const goals = [
  { label: "Revenue", value: 78, text: "$45k / $58k" },
  { label: "New users", value: 64, text: "2.3k / 3.6k" },
  { label: "Retention", value: 91, text: "91% / 95%" },
];

const recentSales = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00", avatar: "/avatar-40-01.jpg" },
  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00", avatar: "/avatar-40-02.jpg" },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00", avatar: "/avatar-40-03.jpg" },
  { name: "William Kim", email: "will@email.com", amount: "+$99.00", avatar: "/avatar-40-04.jpg" },
  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00", avatar: "/avatar-40-05.jpg" },
];

/* -------------------------------------------------------------------------- */
/*  Small marks                                                               */
/* -------------------------------------------------------------------------- */

/**
 * A KPI's trend line. There is no sparkline in the component library and this
 * is a data mark rather than a control, so it is drawn here - everything that
 * does exist as a component (Card, Badge, Progress, Tabs) is used as-is.
 */
function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map(
      (d, i) =>
        `${(i / (data.length - 1)) * 100},${26 - ((d - min) / range) * 24}`,
    )
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 28"
      preserveAspectRatio="none"
      className="h-7 w-full overflow-visible"
      aria-hidden
    >
      <motion.polyline
        points={points}
        fill="none"
        stroke={MAGNITUDE}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
      />
    </svg>
  );
}

/**
 * Change against the previous period, as a Badge in the library's own success
 * and decline variants. Direction is carried by the arrow and the sign as well
 * as the colour, so it never rests on colour alone.
 */
function Delta({ value, up }: { value: string; up: boolean }) {
  const Icon = up ? ArrowUpRight : ArrowDownRight;

  return (
    <Badge variant={up ? "success" : "decline"} className="gap-0.5 py-0.5 tabular-nums">
      <Icon className="size-3" aria-hidden />
      {value}
    </Badge>
  );
}

/** A single gauge. One hue for all three - they are not competing categories. */
function Ring({ value, label }: { value: number; label: string }) {
  const r = 26;
  const c = 2 * Math.PI * r;

  return (
    <svg
      viewBox="0 0 64 64"
      className="size-16 -rotate-90"
      role="img"
      aria-label={`${label}: ${value}%`}
    >
      <circle cx="32" cy="32" r={r} className="fill-none stroke-muted" strokeWidth="6" />

      <motion.circle
        cx="32"
        cy="32"
        r={r}
        className="fill-none"
        stroke={MAGNITUDE}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c - (value / 100) * c }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.2 }}
      />
    </svg>
  );
}

/**
 * Ranked magnitude, drawn with the library's Progress. Bar length is the
 * encoding and the value is written at the end of every row, so this stays
 * readable with no colour vision at all.
 */
function RankedBars({
  rows,
  unit = "%",
}: {
  rows: { name: string; value: number; flag?: string }[];
  unit?: string;
}) {
  const max = Math.max(...rows.map((r) => r.value));

  return (
    <motion.ul variants={stagger(0.04)} initial="hidden" animate="show" className="space-y-3">
      {rows.map((row) => (
        <motion.li key={row.name} variants={rise}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="flex min-w-0 items-center gap-1.5 truncate">
              {row.flag && <span aria-hidden>{row.flag}</span>}
              <span className="truncate">{row.name}</span>
            </span>

            <span className="shrink-0 font-medium tabular-nums text-muted-foreground">
              {row.value}
              {unit}
            </span>
          </div>

          <Progress value={(row.value / max) * 100} className="mt-1.5 h-1.5" />
        </motion.li>
      ))}
    </motion.ul>
  );
}

/** Legend for the two-series charts. Identity is never colour-alone. */
function Legend() {
  return (
    <div className="flex items-center gap-4">
      {(["desktop", "mobile"] as const).map((key) => (
        <span key={key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: chartConfig[key].color }}
            aria-hidden
          />
          {chartConfig[key].label}
        </span>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const totals = useMemo(
    () => ({
      desktop: monthly.reduce((a, c) => a + c.desktop, 0),
      mobile: monthly.reduce((a, c) => a + c.mobile, 0),
    }),
    [],
  );

  function TodoForm({ className }: React.ComponentProps<"form">) {
    return (
      <form className={className}>
        <div className="grid gap-4 py-4">
          <Input id="title" placeholder="Todo title..." />
          <Textarea id="description" placeholder="Description..." />
        </div>

        <div className={isDesktop ? "flex justify-end" : ""}>
          <Button type="submit">Confirm</Button>
        </div>
      </form>
    );
  }

  const ComposeAction = () =>
    isDesktop ? (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Download className="mr-2 size-4" />
            New todo
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm</DialogTitle>
            <DialogDescription>
              What do you want to get done today?
            </DialogDescription>
          </DialogHeader>

          <TodoForm />
        </DialogContent>
      </Dialog>
    ) : (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <Download className="mr-2 size-4" />
            New todo
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Confirm</DrawerTitle>
            <DrawerDescription>
              What do you want to get done today?
            </DrawerDescription>
          </DrawerHeader>

          <TodoForm className="px-4" />

          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );

  return (
    <ContentLayout title="Dashboard">
      <Toaster position="top-center" />

      <div className="mx-auto max-w-[1400px] space-y-6 px-1 pb-16 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <Heading
            title="Good morning, Kay"
            description="Here is how the store is doing today."
          />

          <div className="flex flex-wrap items-center gap-2">
            <CalendarDateRangePicker />

            <Button
              variant="outline"
              onClick={() =>
                toast.custom((t) => <ToastContent dismiss={() => toast.dismiss(t)} />)
              }
            >
              Export
            </Button>

            <ComposeAction />
          </div>
        </motion.div>

        {/* The library's Tabs already ships the sliding indicator, and sizes it
            from --radius, so there is nothing to hand-roll here. */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Reports
            </TabsTrigger>
            <TabsTrigger value="summary" disabled>
              Summary
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <motion.div variants={stagger()} initial="hidden" animate="show" className="space-y-6">
              {/* ---------------------------- KPIs ---------------------- */}

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {kpis.map((kpi) => (
                  <motion.div key={kpi.label} variants={rise}>
                    <Card className="h-full p-5">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <kpi.icon className="size-4" aria-hidden />
                          {kpi.label}
                        </span>

                        <Delta value={kpi.delta} up={kpi.up} />
                      </div>

                      <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">
                        {kpi.value}
                      </p>

                      <div className="mt-3">
                        <Sparkline data={kpi.spark} />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* ---------------------- Hero + sales -------------------- */}

              <div className="grid gap-4 lg:grid-cols-3">
                <motion.div variants={rise} className="lg:col-span-2">
                  <Card className="h-full">
                    <CardHeader className="flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>Visitors</CardTitle>
                        <CardDescription>Last six months</CardDescription>
                      </div>

                      <Legend />
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-wrap gap-6">
                        <div>
                          <p className="text-xs text-muted-foreground">Desktop</p>
                          <p className="text-2xl font-semibold tabular-nums">
                            {totals.desktop.toLocaleString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground">Mobile</p>
                          <p className="text-2xl font-semibold tabular-nums">
                            {totals.mobile.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <ChartContainer config={chartConfig} className="mt-4 h-[260px] w-full">
                        <AreaChart data={monthly} margin={{ left: 4, right: 12, top: 8 }}>
                          <defs>
                            {(["desktop", "mobile"] as const).map((key) => (
                              <linearGradient
                                key={key}
                                id={`fill-${key}`}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop offset="0%" stopColor={chartConfig[key].color} stopOpacity={0.28} />
                                <stop offset="100%" stopColor={chartConfig[key].color} stopOpacity={0.02} />
                              </linearGradient>
                            ))}
                          </defs>

                          <CartesianGrid vertical={false} strokeOpacity={0.25} />

                          <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            className="text-xs"
                          />

                          <YAxis tickLine={false} axisLine={false} width={34} className="text-xs" />

                          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />

                          <Area
                            dataKey="mobile"
                            type="monotone"
                            stroke={SERIES_2}
                            strokeWidth={2}
                            fill="url(#fill-mobile)"
                          />

                          <Area
                            dataKey="desktop"
                            type="monotone"
                            stroke={SERIES_1}
                            strokeWidth={2}
                            fill="url(#fill-desktop)"
                          />
                        </AreaChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={rise}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Recent sales</CardTitle>
                      <CardDescription>265 this month</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-4">
                        {recentSales.map((sale) => (
                          <li key={sale.email} className="flex items-center gap-3">
                            <Avatar className="size-9">
                              <AvatarImage src={sale.avatar} alt="" />
                              <AvatarFallback>{sale.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium">{sale.name}</p>
                              <p className="truncate text-xs text-muted-foreground">{sale.email}</p>
                            </div>

                            <span className="shrink-0 text-sm font-medium tabular-nums">
                              {sale.amount}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* ------------------------ Breakdowns -------------------- */}

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <motion.div variants={rise}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Sales by category</CardTitle>
                      <CardDescription>Share of revenue</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <RankedBars rows={categories} />
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={rise}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Traffic sources</CardTitle>
                      <CardDescription>Share of sessions</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <RankedBars rows={traffic} />
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={rise}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Top regions</CardTitle>
                      <CardDescription>Share of orders</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <RankedBars rows={regions} />
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={rise}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Goals</CardTitle>
                      <CardDescription>This quarter</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex justify-between gap-2">
                        {goals.map((goal) => (
                          <div key={goal.label} className="flex flex-col items-center gap-2 text-center">
                            <div className="relative">
                              <Ring value={goal.value} label={goal.label} />
                              <span className="absolute inset-0 grid place-items-center text-sm font-semibold tabular-nums">
                                {goal.value}
                              </span>
                            </div>

                            <div>
                              <p className="text-xs font-medium">{goal.label}</p>
                              <p className="text-1xs text-muted-foreground">{goal.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={rise}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Top products</CardTitle>
                      <CardDescription>By units sold</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-4">
                        {topProducts.map((product) => (
                          <li key={product.name} className="flex items-center gap-3">
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium">{product.name}</p>
                              <p className="text-xs tabular-nums text-muted-foreground">
                                {product.sold.toLocaleString()} sold
                              </p>
                            </div>

                            <div className="shrink-0 text-right">
                              <p className="text-sm font-medium tabular-nums">{product.revenue}</p>
                              <Delta
                                value={`${product.trend > 0 ? "+" : ""}${product.trend}%`}
                                up={product.trend > 0}
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={rise}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Top performers</CardTitle>
                      <CardDescription>Revenue booked</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-4">
                        {team.map((person) => (
                          <li key={person.name} className="flex items-center gap-3">
                            <Avatar className="size-9">
                              <AvatarImage src={person.avatar} alt="" />
                              <AvatarFallback>{person.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium">{person.name}</p>
                              <Progress value={person.pct} className="mt-1 h-1" />
                            </div>

                            <span className="shrink-0 text-sm font-medium tabular-nums">
                              {person.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* ------------------------ Feed + tasks ------------------ */}

              <div className="grid gap-4 lg:grid-cols-2">
                <motion.div variants={rise}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Recent activity</CardTitle>
                      <CardDescription>Across the workspace</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-1">
                        {activityFeed.map((item) => (
                          <li
                            key={item.title}
                            className="flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted/60"
                          >
                            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                              <item.icon className="size-4" aria-hidden />
                            </span>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium">{item.title}</p>
                              <p className="truncate text-xs text-muted-foreground">{item.desc}</p>
                            </div>

                            <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                              {item.time}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={rise}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Your tasks</CardTitle>
                      <CardDescription>3 open</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-1">
                        {tasks.map((task) => (
                          <li
                            key={task.title}
                            className="flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted/60"
                          >
                            <Checkbox
                              checked={task.done}
                              aria-label={task.title}
                              className="shrink-0"
                            />

                            <span
                              className={cn(
                                "min-w-0 flex-1 truncate text-sm",
                                task.done && "text-muted-foreground line-through",
                              )}
                            >
                              {task.title}
                            </span>

                            <span className="shrink-0 text-xs text-muted-foreground">
                              {task.due}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6 space-y-6">
            <motion.div variants={stagger()} initial="hidden" animate="show" className="space-y-6">
              <motion.div variants={rise}>
                <Card>
                  <CardHeader className="flex-row items-start justify-between space-y-0">
                    <div>
                      <CardTitle>This week</CardTitle>
                      <CardDescription>Visitors by device</CardDescription>
                    </div>

                    <Legend />
                  </CardHeader>

                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[320px] w-full">
                      <BarChart data={daily} margin={{ left: 4, right: 12, top: 8 }}>
                        <CartesianGrid vertical={false} strokeOpacity={0.25} />

                        <XAxis
                          dataKey="day"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={10}
                          className="text-xs"
                        />

                        <YAxis tickLine={false} axisLine={false} width={34} className="text-xs" />

                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />

                        <Bar dataKey="desktop" fill={SERIES_1} radius={[4, 4, 0, 0]} barSize={18} />
                        <Bar dataKey="mobile" fill={SERIES_2} radius={[4, 4, 0, 0]} barSize={18} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid gap-4 md:grid-cols-2">
                <motion.div variants={rise}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Sales by category</CardTitle>
                      <CardDescription>Share of revenue</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <RankedBars rows={categories} />
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={rise}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Traffic sources</CardTitle>
                      <CardDescription>Share of sessions</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <RankedBars rows={traffic} />
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </ContentLayout>
  );
}

/* -------------------------------------------------------------------------- */
/*  Toast                                                                     */
/* -------------------------------------------------------------------------- */

function ToastContent({ dismiss }: { dismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      className="flex items-center gap-3 rounded-lg bg-foreground py-2.5 pl-4 pr-2.5 text-background shadow-lg"
    >
      <CircleCheck className="size-4 shrink-0 text-emerald-400" aria-hidden />

      <p className="text-sm">Export started</p>

      <Button
        variant="ghost"
        onClick={dismiss}
        aria-label="Dismiss"
        className="ml-2 size-7 shrink-0 p-0 text-background opacity-60 hover:bg-transparent hover:opacity-100"
      >
        <X className="size-4" />
      </Button>
    </motion.div>
  );
}
