"use client";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
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
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import {
  CircleCheck,
  TrendingUp,
  TrendingDown,
  X,
  DollarSign,
  Users,
  CreditCard,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Package,
  Globe,
  Clock,
  CheckCircle2,
  ShoppingCart,
  Star,
  Zap,
  MoreHorizontal,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster, toast } from "sonner";
import { Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import { Separator } from "@/components/ui/separator";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  views: {
    label: "Page Views",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
];

/* ---------------------------------------------------------------- widget data */

const kpis = [
  { label: "Total Revenue", value: "$45,231.89", delta: "+20.1%", up: true, icon: DollarSign, grad: "from-emerald-500 to-teal-500", spark: [12, 18, 14, 22, 20, 28, 26, 34] },
  { label: "Subscriptions", value: "+2,350", delta: "+180.1%", up: true, icon: Users, grad: "from-violet-500 to-fuchsia-500", spark: [8, 12, 10, 16, 22, 20, 28, 32] },
  { label: "Sales", value: "+12,234", delta: "+19%", up: true, icon: CreditCard, grad: "from-sky-500 to-indigo-500", spark: [20, 18, 24, 22, 28, 26, 30, 33] },
  { label: "Active Now", value: "+573", delta: "-4.5%", up: false, icon: Activity, grad: "from-amber-500 to-orange-500", spark: [30, 26, 28, 22, 24, 20, 18, 16] },
];

const categories = [
  { name: "Electronics", value: 42, color: "#8b5cf6" },
  { name: "Fashion", value: 26, color: "#0ea5e9" },
  { name: "Home", value: 18, color: "#10b981" },
  { name: "Other", value: 14, color: "#f59e0b" },
];

const topProducts = [
  { name: "Aurora Wireless Buds", sold: 1284, revenue: "$38,520", seed: "dash-p1", trend: 12 },
  { name: "Nomad Leather Wallet", sold: 964, revenue: "$21,208", seed: "dash-p2", trend: 8 },
  { name: "Lumen Desk Lamp", sold: 742, revenue: "$18,550", seed: "dash-p3", trend: -3 },
  { name: "Terra Running Shoes", sold: 631, revenue: "$44,170", seed: "dash-p4", trend: 21 },
];

const traffic = [
  { name: "Direct", pct: 38, color: "bg-violet-500" },
  { name: "Organic search", pct: 27, color: "bg-sky-500" },
  { name: "Referral", pct: 19, color: "bg-emerald-500" },
  { name: "Social", pct: 16, color: "bg-amber-500" },
];

const activity = [
  { icon: ShoppingCart, title: "New order #4821", desc: "Olivia Martin · $1,999.00", time: "2m ago", c: "bg-emerald-500" },
  { icon: Users, title: "New customer signed up", desc: "jackson.lee@email.com", time: "18m ago", c: "bg-violet-500" },
  { icon: Star, title: "5-star review received", desc: "Aurora Wireless Buds", time: "1h ago", c: "bg-amber-500" },
  { icon: CreditCard, title: "Payout processed", desc: "$12,480 to bank ••4291", time: "3h ago", c: "bg-sky-500" },
  { icon: Package, title: "Restock alert", desc: "Lumen Desk Lamp · 8 left", time: "5h ago", c: "bg-rose-500" },
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
  { label: "Revenue", value: 78, color: "stroke-emerald-500", text: "$45k / $58k" },
  { label: "New users", value: 64, color: "stroke-violet-500", text: "2.3k / 3.6k" },
  { label: "Retention", value: 91, color: "stroke-sky-500", text: "91% / 95%" },
];

const regions = [
  { name: "United States", pct: 46, flag: "🇺🇸" },
  { name: "United Kingdom", pct: 21, flag: "🇬🇧" },
  { name: "Germany", pct: 16, flag: "🇩🇪" },
  { name: "Japan", pct: 11, flag: "🇯🇵" },
  { name: "Other", pct: 6, flag: "🌍" },
];

/* ---------------------------------------------------------------- widget helpers */

function Sparkline({ data, up }: { data: number[]; up: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data
    .map((d, i) => `${(i / (data.length - 1)) * 100},${28 - ((d - min) / range) * 26}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="h-8 w-full">
      <polyline
        points={pts}
        fill="none"
        strokeWidth="2.5"
        className={up ? "stroke-emerald-500" : "stroke-rose-500"}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Ring({ value, color }: { value: number; color: string }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
      <circle cx="32" cy="32" r={r} className="fill-none stroke-muted" strokeWidth="6" />
      <circle
        cx="32" cy="32" r={r}
        className={`fill-none ${color}`}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (value / 100) * c}
      />
    </svg>
  );
}

export default function DashboardPage() {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("desktop");
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const total = useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  );

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  function TodoForm({ className }: React.ComponentProps<"form">) {
    return (
      <form className={className}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input id="title" placeholder="Todo title..." />
          </div>
          <div className="grid gap-2">
            <Textarea id="description" placeholder="Description..." />
          </div>
        </div>
        <div className={isDesktop ? "flex justify-end" : ""}>
          <Button type="submit">Confirm</Button>
        </div>
      </form>
    );
  }

  const DrawerDialogDemo = () => {
    if (isDesktop) {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button size="default">
              <Download className="mr-2 h-4 w-4" />
              Click here!
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
      );
    }
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
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
  };

  return (
    <ContentLayout title="Dashboard">
      <PlaceholderContent />
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants1}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-normal">Hi Khaled, Welcome back 👋</h2>
            <div className="hidden md:flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button
                variant="outline"
                onClick={() => {
                  toast.custom((t) => (
                    <ToastContent dismiss={() => toast.dismiss(t)} />
                  ));
                }}
              >
                Custom sonner
              </Button>
              <DrawerDialogDemo />
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports" disabled={true}>
                Reports
              </TabsTrigger>
              <TabsTrigger value="summary" disabled={true}>
                Summary
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {kpis.map((k) => (
                  <Card key={k.label} className="relative overflow-hidden border-none bg-muted">
                    <div className={`pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${k.grad} opacity-20 blur-2xl`} />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {k.label}
                      </CardTitle>
                      <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${k.grad} text-white shadow-md`}>
                        <k.icon className="h-4 w-4" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-semibold tracking-tight tabular-nums">
                        {k.value}
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-xs font-medium ${k.up ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"}`}>
                          {k.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {k.delta}
                        </span>
                        <div className="h-8 w-24">
                          <Sparkline data={k.spark} up={k.up} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-muted border-none ">
                  <CardHeader>
                    <CardTitle>Area Chart - Gradient</CardTitle>
                    <CardDescription>
                      Showing total visitors for the last 6 months
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig}>
                      <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                          left: 12,
                          right: 12,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent />}
                        />
                        <defs>
                          <linearGradient
                            id="fillDesktop"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="var(--color-desktop)"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-desktop)"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                          <linearGradient
                            id="fillMobile"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="var(--color-mobile)"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-mobile)"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          dataKey="mobile"
                          type="natural"
                          fill="url(#fillMobile)"
                          fillOpacity={0.4}
                          stroke="var(--color-mobile)"
                          stackId="a"
                        />
                        <Area
                          dataKey="desktop"
                          type="natural"
                          fill="url(#fillDesktop)"
                          fillOpacity={0.4}
                          stroke="var(--color-desktop)"
                          stackId="a"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter>
                    <div className="flex w-full items-start gap-2 text-sm">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                          Trending up by 5.2% this month{" "}
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                          January - June 2024
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
                <Card className="col-span-4 bg-muted border-none md:col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                      <CardTitle>Line Chart - Interactive</CardTitle>
                      <CardDescription>
                        Showing total visitors for the last 3 months
                      </CardDescription>
                    </div>
                    <div className="flex">
                      {["desktop", "mobile"].map((key) => {
                        const chart = key as keyof typeof chartConfig;
                        return (
                          <button
                            key={chart}
                            data-active={activeChart === chart}
                            className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                            onClick={() => setActiveChart(chart)}
                          >
                            <span className="text-xs text-muted-foreground">
                              {chartConfig[chart].label}
                            </span>
                            <span className="text-lg font-normal leading-none sm:text-3xl">
                              {total[
                                key as keyof typeof total
                              ].toLocaleString()}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </CardHeader>
                  <CardContent className="px-2 sm:p-6">
                    <ChartContainer
                      config={chartConfig}
                      className="aspect-auto h-[250px] w-full"
                    >
                      <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                          left: 12,
                          right: 12,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          minTickGap={32}
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            });
                          }}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              className="w-[150px]"
                              nameKey="views"
                              labelFormatter={(value) => {
                                return new Date(value).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                );
                              }}
                            />
                          }
                        />
                        <Line
                          dataKey={activeChart}
                          type="monotone"
                          stroke={`var(--color-${activeChart})`}
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
                <Card className="col-span-4 md:col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>

              {/* ============================ RICH WIDGETS ============================ */}
              <div className="grid gap-4 lg:grid-cols-3">
                {/* revenue target */}
                <Card className="relative overflow-hidden border-none bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium text-white/90">
                      <Target className="h-4 w-4" /> Monthly target
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-semibold tabular-nums">$45,231</div>
                    <p className="mt-1 text-sm text-white/70">of $58,000 goal · 78%</p>
                    <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/20">
                      <div className="h-full rounded-full bg-white" style={{ width: "78%" }} />
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-white/90">
                      <Sparkles className="h-4 w-4" /> On track to beat last month by 12%
                    </div>
                  </CardContent>
                </Card>

                {/* sales by category donut */}
                <Card className="border-none bg-muted">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Sales by category</CardTitle>
                    <CardDescription>This month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-5">
                      <div className="relative h-28 w-28 shrink-0">
                        <div
                          className="h-full w-full rounded-full"
                          style={{ background: `conic-gradient(${(() => { let a = 0; return categories.map((c) => { const s = a; a += c.value; return `${c.color} ${s}% ${a}%`; }).join(", "); })()})` }}
                        />
                        <div className="absolute inset-[20%] flex flex-col items-center justify-center rounded-full bg-muted">
                          <span className="text-lg font-semibold tabular-nums">$92k</span>
                          <span className="text-1xs text-muted-foreground">total</span>
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        {categories.map((c) => (
                          <div key={c.name} className="flex items-center gap-2 text-sm">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                            <span className="flex-1">{c.name}</span>
                            <span className="tabular-nums text-muted-foreground">{c.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* goals rings */}
                <Card className="border-none bg-muted">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Goals</CardTitle>
                    <CardDescription>Progress to targets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {goals.map((g) => (
                        <div key={g.label} className="flex flex-col items-center">
                          <div className="relative">
                            <Ring value={g.value} color={g.color} />
                            <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold tabular-nums">
                              {g.value}%
                            </span>
                          </div>
                          <p className="mt-2 text-xs font-medium">{g.label}</p>
                          <p className="text-1xs text-muted-foreground">{g.text}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 lg:grid-cols-7">
                {/* top products */}
                <Card className="border-none bg-muted lg:col-span-4">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle className="text-base">Top products</CardTitle>
                      <CardDescription>Best sellers this month</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="rounded-full">
                      View all <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {topProducts.map((p, i) => (
                      <div key={p.name} className="flex items-center gap-4">
                        <span className="w-4 text-center text-sm font-semibold text-muted-foreground tabular-nums">{i + 1}</span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`https://picsum.photos/seed/${p.seed}/80/80`} alt={p.name} className="h-11 w-11 rounded-xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.sold.toLocaleString()} sold</p>
                        </div>
                        <span className={`flex items-center gap-0.5 text-xs font-medium ${p.trend >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                          {p.trend >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                          {Math.abs(p.trend)}%
                        </span>
                        <span className="w-20 text-right text-sm font-semibold tabular-nums">{p.revenue}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* traffic sources */}
                <Card className="border-none bg-muted lg:col-span-3">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Traffic sources</CardTitle>
                    <CardDescription>Where visitors come from</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-2">
                    {traffic.map((t) => (
                      <div key={t.name}>
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span>{t.name}</span>
                          <span className="tabular-nums text-muted-foreground">{t.pct}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-background">
                          <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} />
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 rounded-xl bg-background/60 p-3 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Bounce rate</span>
                      <span className="ml-auto font-semibold">32.4%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {/* activity feed */}
                <Card className="border-none bg-muted">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Recent activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative space-y-4 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border">
                      {activity.map((a, i) => (
                        <div key={i} className="relative flex gap-3">
                          <div className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${a.c} text-white ring-4 ring-muted`}>
                            <a.icon className="h-3.5 w-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium leading-tight">{a.title}</p>
                            <p className="truncate text-xs text-muted-foreground">{a.desc}</p>
                          </div>
                          <span className="shrink-0 text-1xs text-muted-foreground">{a.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* team leaderboard */}
                <Card className="border-none bg-muted">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Top performers</CardTitle>
                    <CardDescription>By revenue closed</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {team.map((m, i) => (
                      <div key={m.name} className="flex items-center gap-3">
                        <span className="w-4 text-center text-sm font-bold text-muted-foreground/50 tabular-nums">{i + 1}</span>
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={m.avatar} alt={m.name} />
                          <AvatarFallback>{m.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{m.name}</p>
                          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-background">
                            <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" style={{ width: `${m.pct}%` }} />
                          </div>
                        </div>
                        <span className="shrink-0 text-sm font-semibold tabular-nums">{m.value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* tasks + regions */}
                <div className="space-y-4">
                  <Card className="border-none bg-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Your tasks</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {tasks.map((t) => (
                        <div key={t.title} className="flex items-center gap-3 rounded-lg bg-background/60 p-2.5">
                          <CheckCircle2 className={`h-4 w-4 shrink-0 ${t.done ? "text-emerald-500" : "text-muted-foreground/40"}`} />
                          <span className={`flex-1 text-sm ${t.done ? "text-muted-foreground line-through" : "font-medium"}`}>{t.title}</span>
                          <span className="text-1xs text-muted-foreground">{t.due}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  <Card className="border-none bg-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Top regions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2.5">
                      {regions.map((r) => (
                        <div key={r.name} className="flex items-center gap-3 text-sm">
                          <span className="text-base">{r.flag}</span>
                          <span className="flex-1">{r.name}</span>
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-background">
                            <div className="h-full rounded-full bg-sky-500" style={{ width: `${r.pct * 2}%` }} />
                          </div>
                          <span className="w-8 text-right tabular-nums text-muted-foreground">{r.pct}%</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <div className="chart-wrapper flex max-w-6xl flex-col flex-wrap items-start gap-6 sm:flex-row ">
                <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
                  <Card
                    className="lg:max-w-md bg-muted/50 border-none"
                    x-chunk="charts-01-chunk-0"
                  >
                    <CardHeader className="space-y-0 pb-2">
                      <CardDescription>Today</CardDescription>
                      <CardTitle className="text-4xl tabular-nums">
                        12,584{" "}
                        <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                          steps
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          steps: {
                            label: "Steps",
                            color: "hsl(var(--chart-1))",
                          },
                        }}
                      >
                        <BarChart
                          accessibilityLayer
                          margin={{
                            left: -4,
                            right: -4,
                          }}
                          data={[
                            {
                              date: "2024-01-01",
                              steps: 2000,
                            },
                            {
                              date: "2024-01-02",
                              steps: 2100,
                            },
                            {
                              date: "2024-01-03",
                              steps: 2200,
                            },
                            {
                              date: "2024-01-04",
                              steps: 1300,
                            },
                            {
                              date: "2024-01-05",
                              steps: 1400,
                            },
                            {
                              date: "2024-01-06",
                              steps: 2500,
                            },
                            {
                              date: "2024-01-07",
                              steps: 1600,
                            },
                          ]}
                        >
                          <Bar
                            dataKey="steps"
                            fill="var(--color-steps)"
                            radius={5}
                            fillOpacity={0.6}
                            activeBar={<Rectangle fillOpacity={0.8} />}
                          />
                          <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={4}
                            tickFormatter={(value) => {
                              return new Date(value).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                }
                              );
                            }}
                          />
                          <ChartTooltip
                            defaultIndex={2}
                            content={
                              <ChartTooltipContent
                                hideIndicator
                                labelFormatter={(value) => {
                                  return new Date(value).toLocaleDateString(
                                    "en-US",
                                    {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    }
                                  );
                                }}
                              />
                            }
                            cursor={false}
                          />
                          <ReferenceLine
                            y={1200}
                            stroke="hsl(var(--muted-foreground))"
                            strokeDasharray="3 3"
                            strokeWidth={1}
                          >
                            <Label
                              position="insideBottomLeft"
                              value="Average Steps"
                              offset={10}
                              fill="hsl(var(--foreground))"
                            />
                            <Label
                              position="insideTopLeft"
                              value="12,343"
                              className="text-lg"
                              fill="hsl(var(--foreground))"
                              offset={10}
                              startOffset={100}
                            />
                          </ReferenceLine>
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-1">
                      <CardDescription>
                        Over the past 7 days, you have walked{" "}
                        <span className="font-normal text-foreground">
                          53,305
                        </span>{" "}
                        steps.
                      </CardDescription>
                      <CardDescription>
                        You need{" "}
                        <span className="font-normal text-foreground">
                          12,584
                        </span>{" "}
                        more steps to reach your goal.
                      </CardDescription>
                    </CardFooter>
                  </Card>
                  <Card
                    className="flex flex-col lg:max-w-md bg-muted/50 border-none"
                    x-chunk="charts-01-chunk-1"
                  >
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
                      <div>
                        <CardDescription>Resting HR</CardDescription>
                        <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                          62
                          <span className="text-sm font-normal tracking-normal text-muted-foreground">
                            bpm
                          </span>
                        </CardTitle>
                      </div>
                      <div>
                        <CardDescription>Variability</CardDescription>
                        <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                          35
                          <span className="text-sm font-normal tracking-normal text-muted-foreground">
                            ms
                          </span>
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-1 items-center">
                      <ChartContainer
                        config={{
                          resting: {
                            label: "Resting",
                            color: "hsl(var(--chart-1))",
                          },
                        }}
                        className="w-full"
                      >
                        <LineChart
                          accessibilityLayer
                          margin={{
                            left: 14,
                            right: 14,
                            top: 10,
                          }}
                          data={[
                            {
                              date: "2024-01-01",
                              resting: 62,
                            },
                            {
                              date: "2024-01-02",
                              resting: 72,
                            },
                            {
                              date: "2024-01-03",
                              resting: 35,
                            },
                            {
                              date: "2024-01-04",
                              resting: 62,
                            },
                            {
                              date: "2024-01-05",
                              resting: 52,
                            },
                            {
                              date: "2024-01-06",
                              resting: 62,
                            },
                            {
                              date: "2024-01-07",
                              resting: 70,
                            },
                          ]}
                        >
                          <CartesianGrid
                            strokeDasharray="4 4"
                            vertical={false}
                            stroke="hsl(var(--muted-foreground))"
                            strokeOpacity={0.5}
                          />
                          <YAxis
                            hide
                            domain={["dataMin - 10", "dataMax + 10"]}
                          />
                          <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => {
                              return new Date(value).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                }
                              );
                            }}
                          />
                          <Line
                            dataKey="resting"
                            type="natural"
                            fill="var(--color-resting)"
                            stroke="var(--color-resting)"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                              fill: "var(--color-resting)",
                              stroke: "var(--color-resting)",
                              r: 4,
                            }}
                          />
                          <ChartTooltip
                            content={
                              <ChartTooltipContent
                                indicator="line"
                                labelFormatter={(value) => {
                                  return new Date(value).toLocaleDateString(
                                    "en-US",
                                    {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    }
                                  );
                                }}
                              />
                            }
                            cursor={false}
                          />
                        </LineChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
                  <Card
                    className="max-w-xs bg-muted/50 border-none"
                    x-chunk="charts-01-chunk-2"
                  >
                    <CardHeader>
                      <CardTitle>Progress</CardTitle>
                      <CardDescription>
                        Youre average more steps a day this year than last year.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="grid auto-rows-min gap-2">
                        <div className="flex items-baseline gap-1 text-2xl font-normal tabular-nums leading-none">
                          12,453
                          <span className="text-sm font-normal text-muted-foreground">
                            steps/day
                          </span>
                        </div>
                        <ChartContainer
                          config={{
                            steps: {
                              label: "Steps",
                              color: "hsl(var(--chart-1))",
                            },
                          }}
                          className="aspect-auto h-[32px] w-full"
                        >
                          <BarChart
                            accessibilityLayer
                            layout="vertical"
                            margin={{
                              left: 0,
                              top: 0,
                              right: 0,
                              bottom: 0,
                            }}
                            data={[
                              {
                                date: "2024",
                                steps: 12435,
                              },
                            ]}
                          >
                            <Bar
                              dataKey="steps"
                              fill="var(--color-steps)"
                              radius={4}
                              barSize={32}
                            >
                              <LabelList
                                position="insideLeft"
                                dataKey="date"
                                offset={8}
                                fontSize={12}
                                fill="white"
                              />
                            </Bar>
                            <YAxis
                              dataKey="date"
                              type="category"
                              tickCount={1}
                              hide
                            />
                            <XAxis dataKey="steps" type="number" hide />
                          </BarChart>
                        </ChartContainer>
                      </div>
                      <div className="grid auto-rows-min gap-2">
                        <div className="flex items-baseline gap-1 text-2xl font-normal tabular-nums leading-none">
                          10,103
                          <span className="text-sm font-normal text-muted-foreground">
                            steps/day
                          </span>
                        </div>
                        <ChartContainer
                          config={{
                            steps: {
                              label: "Steps",
                              color: "hsl(var(--muted))",
                            },
                          }}
                          className="aspect-auto h-[32px] w-full"
                        >
                          <BarChart
                            accessibilityLayer
                            layout="vertical"
                            margin={{
                              left: 0,
                              top: 0,
                              right: 0,
                              bottom: 0,
                            }}
                            data={[
                              {
                                date: "2023",
                                steps: 10103,
                              },
                            ]}
                          >
                            <Bar
                              dataKey="steps"
                              fill="var(--color-steps)"
                              radius={4}
                              barSize={32}
                            >
                              <LabelList
                                position="insideLeft"
                                dataKey="date"
                                offset={8}
                                fontSize={12}
                                fill="hsl(var(--muted-foreground))"
                              />
                            </Bar>
                            <YAxis
                              dataKey="date"
                              type="category"
                              tickCount={1}
                              hide
                            />
                            <XAxis dataKey="steps" type="number" hide />
                          </BarChart>
                        </ChartContainer>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className="max-w-xs bg-muted/50 border-none"
                    x-chunk="charts-01-chunk-3"
                  >
                    <CardHeader className="p-4 pb-0">
                      <CardTitle>Walking Distance</CardTitle>
                      <CardDescription>
                        Over the last 7 days, your distance walked and run was
                        12.5 miles per day.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
                      <div className="flex items-baseline gap-1 text-3xl font-normal tabular-nums leading-none">
                        12.5
                        <span className="text-sm font-normal text-muted-foreground">
                          miles/day
                        </span>
                      </div>
                      <ChartContainer
                        config={{
                          steps: {
                            label: "Steps",
                            color: "hsl(var(--chart-1))",
                          },
                        }}
                        className="ml-auto w-[72px]"
                      >
                        <BarChart
                          accessibilityLayer
                          margin={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                          }}
                          data={[
                            {
                              date: "2024-01-01",
                              steps: 2000,
                            },
                            {
                              date: "2024-01-02",
                              steps: 2100,
                            },
                            {
                              date: "2024-01-03",
                              steps: 2200,
                            },
                            {
                              date: "2024-01-04",
                              steps: 1300,
                            },
                            {
                              date: "2024-01-05",
                              steps: 1400,
                            },
                            {
                              date: "2024-01-06",
                              steps: 2500,
                            },
                            {
                              date: "2024-01-07",
                              steps: 1600,
                            },
                          ]}
                        >
                          <Bar
                            dataKey="steps"
                            fill="var(--color-steps)"
                            radius={2}
                            fillOpacity={0.2}
                            activeIndex={6}
                            activeBar={<Rectangle fillOpacity={0.8} />}
                          />
                          <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={4}
                            hide
                          />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                  <Card
                    className="max-w-xs bg-muted/50 border-none"
                    x-chunk="charts-01-chunk-4"
                  >
                    <CardContent className="flex gap-4 p-4 pb-2">
                      <ChartContainer
                        config={{
                          move: {
                            label: "Move",
                            color: "hsl(var(--chart-1))",
                          },
                          stand: {
                            label: "Stand",
                            color: "hsl(var(--chart-2))",
                          },
                          exercise: {
                            label: "Exercise",
                            color: "hsl(var(--chart-3))",
                          },
                        }}
                        className="h-[140px] w-full"
                      >
                        <BarChart
                          margin={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 10,
                          }}
                          data={[
                            {
                              activity: "stand",
                              value: (8 / 12) * 100,
                              label: "8/12 hr",
                              fill: "var(--color-stand)",
                            },
                            {
                              activity: "exercise",
                              value: (46 / 60) * 100,
                              label: "46/60 min",
                              fill: "var(--color-exercise)",
                            },
                            {
                              activity: "move",
                              value: (245 / 360) * 100,
                              label: "245/360 kcal",
                              fill: "var(--color-move)",
                            },
                          ]}
                          layout="vertical"
                          barSize={32}
                          barGap={2}
                        >
                          <XAxis type="number" dataKey="value" hide />
                          <YAxis
                            dataKey="activity"
                            type="category"
                            tickLine={false}
                            tickMargin={4}
                            axisLine={false}
                            className="capitalize"
                          />
                          <Bar dataKey="value" radius={5}>
                            <LabelList
                              position="insideLeft"
                              dataKey="label"
                              fill="white"
                              offset={8}
                              fontSize={12}
                            />
                          </Bar>
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex flex-row border-t p-4">
                      <div className="flex w-full items-center gap-2">
                        <div className="grid flex-1 auto-rows-min gap-0.5">
                          <div className="text-xs text-muted-foreground">
                            Move
                          </div>
                          <div className="flex items-baseline gap-1 text-2xl font-normal tabular-nums leading-none">
                            562
                            <span className="text-sm font-normal text-muted-foreground">
                              kcal
                            </span>
                          </div>
                        </div>
                        <Separator
                          orientation="vertical"
                          className="mx-2 h-10 w-px"
                        />
                        <div className="grid flex-1 auto-rows-min gap-0.5">
                          <div className="text-xs text-muted-foreground">
                            Exercise
                          </div>
                          <div className="flex items-baseline gap-1 text-2xl font-normal tabular-nums leading-none">
                            73
                            <span className="text-sm font-normal text-muted-foreground">
                              min
                            </span>
                          </div>
                        </div>
                        <Separator
                          orientation="vertical"
                          className="mx-2 h-10 w-px"
                        />
                        <div className="grid flex-1 auto-rows-min gap-0.5">
                          <div className="text-xs text-muted-foreground">
                            Stand
                          </div>
                          <div className="flex items-baseline gap-1 text-2xl font-normal tabular-nums leading-none">
                            14
                            <span className="text-sm font-normal text-muted-foreground">
                              hr
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
                <div className="grid w-full flex-1 gap-6">
                  <Card
                    className="max-w-xs bg-muted/50 border-none"
                    x-chunk="charts-01-chunk-5"
                  >
                    <CardContent className="flex gap-4 p-4">
                      <div className="grid items-center gap-2">
                        <div className="grid flex-1 auto-rows-min gap-0.5">
                          <div className="text-sm text-muted-foreground">
                            Move
                          </div>
                          <div className="flex items-baseline gap-1 text-xl font-normal tabular-nums leading-none">
                            562/600
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
                            73/120
                            <span className="text-sm font-normal text-muted-foreground">
                              min
                            </span>
                          </div>
                        </div>
                        <div className="grid flex-1 auto-rows-min gap-0.5">
                          <div className="text-sm text-muted-foreground">
                            Stand
                          </div>
                          <div className="flex items-baseline gap-1 text-xl font-normal tabular-nums leading-none">
                            8/12
                            <span className="text-sm font-normal text-muted-foreground">
                              hr
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChartContainer
                        config={{
                          move: {
                            label: "Move",
                            color: "hsl(var(--chart-1))",
                          },
                          exercise: {
                            label: "Exercise",
                            color: "hsl(var(--chart-2))",
                          },
                          stand: {
                            label: "Stand",
                            color: "hsl(var(--chart-3))",
                          },
                        }}
                        className="mx-auto aspect-square w-full max-w-[80%]"
                      >
                        <RadialBarChart
                          margin={{
                            left: -10,
                            right: -10,
                            top: -10,
                            bottom: -10,
                          }}
                          data={[
                            {
                              activity: "stand",
                              value: (8 / 12) * 100,
                              fill: "var(--color-stand)",
                            },
                            {
                              activity: "exercise",
                              value: (46 / 60) * 100,
                              fill: "var(--color-exercise)",
                            },
                            {
                              activity: "move",
                              value: (245 / 360) * 100,
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
                          <RadialBar
                            dataKey="value"
                            background
                            cornerRadius={5}
                          />
                        </RadialBarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                  <Card
                    className="max-w-xs bg-muted/50 border-none"
                    x-chunk="charts-01-chunk-6"
                  >
                    <CardHeader className="p-4 pb-0">
                      <CardTitle>Active Energy</CardTitle>
                      <CardDescription>
                        Youre burning an average of 754 calories per day. Good
                        job!
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
                      <div className="flex items-baseline gap-2 text-3xl font-normal tabular-nums leading-none">
                        1,254
                        <span className="text-sm font-normal text-muted-foreground">
                          kcal/day
                        </span>
                      </div>
                      <ChartContainer
                        config={{
                          calories: {
                            label: "Calories",
                            color: "hsl(var(--chart-1))",
                          },
                        }}
                        className="ml-auto w-[64px]"
                      >
                        <BarChart
                          accessibilityLayer
                          margin={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                          }}
                          data={[
                            {
                              date: "2024-01-01",
                              calories: 354,
                            },
                            {
                              date: "2024-01-02",
                              calories: 514,
                            },
                            {
                              date: "2024-01-03",
                              calories: 345,
                            },
                            {
                              date: "2024-01-04",
                              calories: 734,
                            },
                            {
                              date: "2024-01-05",
                              calories: 645,
                            },
                            {
                              date: "2024-01-06",
                              calories: 456,
                            },
                            {
                              date: "2024-01-07",
                              calories: 345,
                            },
                          ]}
                        >
                          <Bar
                            dataKey="calories"
                            fill="var(--color-calories)"
                            radius={2}
                            fillOpacity={0.2}
                            activeIndex={6}
                            activeBar={<Rectangle fillOpacity={0.8} />}
                          />
                          <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={4}
                            hide
                          />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                  <Card
                    className="max-w-xs bg-muted/50 border-none"
                    x-chunk="charts-01-chunk-7"
                  >
                    <CardHeader className="space-y-0 pb-0">
                      <CardDescription>Time in Bed</CardDescription>
                      <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                        8
                        <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                          hr
                        </span>
                        35
                        <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                          min
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ChartContainer
                        config={{
                          time: {
                            label: "Time",
                            color: "hsl(var(--chart-2))",
                          },
                        }}
                      >
                        <AreaChart
                          accessibilityLayer
                          data={[
                            {
                              date: "2024-01-01",
                              time: 8.5,
                            },
                            {
                              date: "2024-01-02",
                              time: 7.2,
                            },
                            {
                              date: "2024-01-03",
                              time: 8.1,
                            },
                            {
                              date: "2024-01-04",
                              time: 6.2,
                            },
                            {
                              date: "2024-01-05",
                              time: 5.2,
                            },
                            {
                              date: "2024-01-06",
                              time: 8.1,
                            },
                            {
                              date: "2024-01-07",
                              time: 7.0,
                            },
                          ]}
                          margin={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                          }}
                        >
                          <XAxis dataKey="date" hide />
                          <YAxis domain={["dataMin - 5", "dataMax + 2"]} hide />
                          <defs>
                            <linearGradient
                              id="fillTime"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="var(--color-time)"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="var(--color-time)"
                                stopOpacity={0.1}
                              />
                            </linearGradient>
                          </defs>
                          <Area
                            dataKey="time"
                            type="natural"
                            fill="url(#fillTime)"
                            fillOpacity={0.4}
                            stroke="var(--color-time)"
                          />
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                            formatter={(value) => (
                              <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                                Time in bed
                                <div className="ml-auto flex items-baseline gap-0.5 font-mono font-normal tabular-nums text-foreground">
                                  {value}
                                  <span className="font-normal text-muted-foreground">
                                    hr
                                  </span>
                                </div>
                              </div>
                            )}
                          />
                        </AreaChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </ContentLayout>
  );
}

function ToastContent({ dismiss }: { dismiss: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      dismiss();
    }, 200); // Match this with your CSS animation duration
  };

  return (
    <div
      className={`rounded-lg border border-muted/20 bg-foreground text-background px-4 py-3 ${
        isExiting ? "toast-exit" : "toast-enter"
      }`}
    >
      <div className="flex gap-2 ">
        <div className="flex grow gap-3">
          <CircleCheck
            className="mt-0.5 shrink-0 text-emerald-500"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          <div className="flex grow justify-between gap-12">
            <p className="text-sm">Message sent</p>
            <div className="whitespace-nowrap text-sm">
              <button className="text-sm font-medium hover:underline">
                View
              </button>{" "}
              <span className="mx-1 text-muted-foreground">·</span>{" "}
              <button
                className="text-sm font-medium hover:underline"
                onClick={handleDismiss}
              >
                Undo
              </button>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 p-0"
          onClick={handleDismiss}
          aria-label="Close banner"
        >
          <X
            size={16}
            strokeWidth={2}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  );
}
