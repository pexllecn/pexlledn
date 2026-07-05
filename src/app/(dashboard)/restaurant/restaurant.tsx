"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ArrowRight,
  ChefHat,
  Clock,
  DollarSign,
  Info,
  Plus,
  Soup,
  Star,
  Timer,
  TrendingUp,
  TriangleAlert,
  Utensils,
} from "lucide-react";

const salesConfig = {
  sales: { label: "Sales", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

const salesData = [
  { hour: "11a", sales: 320 },
  { hour: "12p", sales: 880 },
  { hour: "1p", sales: 1240 },
  { hour: "2p", sales: 640 },
  { hour: "5p", sales: 420 },
  { hour: "6p", sales: 1180 },
  { hour: "7p", sales: 1560 },
  { hour: "8p", sales: 1320 },
];

const liveOrders = [
  { id: "#1042", table: "Table 6", items: 4, status: "Cooking", time: "6 min", tint: "bg-yellow-500/10 text-yellow-600" },
  { id: "#1043", table: "Takeaway", items: 2, status: "Ready", time: "now", tint: "bg-emerald-500/10 text-emerald-600" },
  { id: "#1044", table: "Table 2", items: 6, status: "Cooking", time: "12 min", tint: "bg-yellow-500/10 text-yellow-600" },
  { id: "#1045", table: "Table 9", items: 3, status: "Served", time: "—", tint: "bg-muted text-muted-foreground" },
];

const topDishes = [
  { name: "Truffle Tagliatelle", sold: 42, revenue: "$798", icon: Soup },
  { name: "Wagyu Burger", sold: 38, revenue: "$684", icon: Utensils },
  { name: "Miso Salmon", sold: 29, revenue: "$725", icon: ChefHat },
];

export default function RestaurantPage() {
  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Restaurant">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Service is live 🍽️</h2>
              <p className="text-muted-foreground mt-1">
                <span className="text-foreground">18 tables</span> seated ·{" "}
                4 orders in the kitchen
              </p>
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Table status"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent showArrow>
                    18 of 24 tables currently seated
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button
                onClick={() =>
                  toast.success("New order", {
                    description: "Pick a table or channel to start.",
                  })
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                New order
              </Button>
            </div>
          </div>

          <Alert variant="destructive">
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>2 items are running low</AlertTitle>
            <AlertDescription>
              Miso Salmon is 86&apos;d and Wagyu Burger has 4 portions left.
              Update the menu so servers don&apos;t oversell.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Today's revenue", value: "$7,580", sub: "+14% vs yesterday", icon: DollarSign },
              { label: "Orders", value: "142", sub: "38 in progress", icon: Utensils },
              { label: "Avg ticket", value: "$53.40", sub: "+$4 vs last week", icon: TrendingUp },
              { label: "Avg prep time", value: "18 min", sub: "-2 min today", icon: Timer },
            ].map((s) => (
              <Card key={s.label} className="bg-muted border-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-normal">
                    {s.label}
                  </CardTitle>
                  <s.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-normal tabular-nums">
                    {s.value}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{s.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-muted border-none">
              <CardHeader>
                <CardTitle>Sales Today</CardTitle>
                <CardDescription>Revenue by hour</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={salesConfig}
                  className="aspect-auto h-[240px] w-full"
                >
                  <AreaChart
                    accessibilityLayer
                    data={salesData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <defs>
                      <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-sales)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-sales)" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <Area dataKey="sales" type="natural" fill="url(#fillSales)" fillOpacity={0.4} stroke="var(--color-sales)" />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2 text-sm">
                  Dinner rush peaked at 7pm <TrendingUp className="h-4 w-4" />
                </div>
              </CardFooter>
            </Card>

            <Card className="col-span-4 md:col-span-3 bg-muted border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="space-y-1.5">
                  <CardTitle>Live Orders</CardTitle>
                  <CardDescription>Kitchen queue</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/restaurant/orders">
                    All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-1">
                {liveOrders.map((o, i) => (
                  <div key={o.id}>
                    <div className="flex items-center gap-3 py-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background text-sm tabular-nums text-muted-foreground">
                        {o.items}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-none">{o.table}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {o.id} · {o.time}
                        </p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-1xs ${o.tint}`}>
                        {o.status}
                      </span>
                    </div>
                    {i < liveOrders.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-muted border-none">
            <CardHeader>
              <CardTitle>Top dishes today</CardTitle>
              <CardDescription>By units sold</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              {topDishes.map((d) => (
                <div key={d.name} className="rounded-lg bg-background/60 p-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <d.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-none truncate">{d.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {d.sold} sold
                    </p>
                  </div>
                  <span className="text-sm tabular-nums">{d.revenue}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
