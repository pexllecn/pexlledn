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
import { TrendingUp } from "lucide-react";
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
import { toast } from "sonner";
import { Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/registry/default/ui/textarea";
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
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
];

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
        <Dialog open={open} onOpenChange={setOpen}>
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
        transition={{ duration: 0.75 }}
        variants={variants1}
      >
        <div className="flex-1 space-y-4 p-4 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-normal">Hi Khaled, Welcome back 👋</h2>
            <div className="hidden md:flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button
                className="shadow-none"
                variant="outline"
                onClick={() =>
                  toast("Event has been created", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                    action: {
                      label: "Undo",
                      onClick: () => console.log("Undo"),
                    },
                    classNames: {
                      toast: "bg-background border-none",
                      title: "font-normal text-foreground",
                      description: "font-light text-muted-foreground",
                      actionButton: "bg-primary text-primary-foreground",
                      cancelButton: "bg-muted text-muted-foreground",
                    },
                  })
                }
              >
                Add to Calendar
              </Button>
              <DrawerDialogDemo />
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-muted border-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal">
                      Total Revenue
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-normal">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-muted border-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal">
                      Subscriptions
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-normal text-[#ff646c]">
                      -350
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-muted border-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal">Sales</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-normal text-[#11c678]">
                      +12,234
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-muted border-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal">
                      Active Now
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-normal">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +21 since last hour
                    </p>
                  </CardContent>
                </Card>
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
