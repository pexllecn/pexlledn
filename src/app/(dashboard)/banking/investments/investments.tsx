"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  XAxis,
} from "recharts";
import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";

const portfolioData = [
  { month: "Jan", value: 42000 },
  { month: "Feb", value: 44500 },
  { month: "Mar", value: 43800 },
  { month: "Apr", value: 47200 },
  { month: "May", value: 49100 },
  { month: "Jun", value: 52840 },
];

const allocation = [
  { name: "Stocks", value: 58, fill: "hsl(var(--chart-1))" },
  { name: "Crypto", value: 18, fill: "hsl(var(--chart-2))" },
  { name: "Bonds", value: 14, fill: "hsl(var(--chart-3))" },
  { name: "Cash", value: 10, fill: "hsl(var(--chart-4))" },
];

const allocationConfig = {
  value: { label: "Allocation" },
  Stocks: { label: "Stocks", color: "hsl(var(--chart-1))" },
  Crypto: { label: "Crypto", color: "hsl(var(--chart-2))" },
  Bonds: { label: "Bonds", color: "hsl(var(--chart-3))" },
  Cash: { label: "Cash", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

const holdings = [
  { symbol: "AAPL", name: "Apple Inc.", shares: 42, price: "$228.10", value: "$9,580", change: 1.8, up: true },
  { symbol: "MSFT", name: "Microsoft", shares: 18, price: "$451.30", value: "$8,123", change: 0.9, up: true },
  { symbol: "BTC", name: "Bitcoin", shares: 0.12, price: "$68,420", value: "$8,210", change: 3.4, up: true },
  { symbol: "NVDA", name: "NVIDIA", shares: 22, price: "$132.40", value: "$2,912", change: -2.1, up: false },
  { symbol: "VOO", name: "Vanguard S&P 500", shares: 15, price: "$512.80", value: "$7,692", change: 0.4, up: true },
  { symbol: "ETH", name: "Ethereum", shares: 2.4, price: "$3,540", value: "$8,496", change: -1.2, up: false },
];

const watchlist = [
  { symbol: "TSLA", price: "$248.50", change: 2.6, up: true },
  { symbol: "AMZN", price: "$186.20", change: -0.8, up: false },
  { symbol: "GOOGL", price: "$174.90", change: 1.1, up: true },
];

export default function InvestmentsPage() {
  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Investments">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Investments</h2>
              <p className="text-muted-foreground mt-1">
                Portfolio up{" "}
                <span className="text-emerald-500">+$3,740 (7.6%)</span> this
                month
              </p>
            </div>
            <Button>
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Trade
            </Button>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-muted border-none">
              <CardHeader>
                <CardDescription>Portfolio value</CardDescription>
                <CardTitle className="text-4xl tabular-nums">
                  $52,840.00
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{ value: { label: "Value", color: "hsl(var(--chart-2))" } }}
                  className="aspect-auto h-[220px] w-full"
                >
                  <AreaChart
                    accessibilityLayer
                    data={portfolioData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <defs>
                      <linearGradient id="fillPort" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <Area
                      dataKey="value"
                      type="natural"
                      fill="url(#fillPort)"
                      fillOpacity={0.4}
                      stroke="var(--color-value)"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2 text-sm">
                  Up 25.8% year to date <TrendingUp className="h-4 w-4" />
                </div>
              </CardFooter>
            </Card>

            <Card className="col-span-4 md:col-span-3 bg-muted border-none flex flex-col">
              <CardHeader>
                <CardTitle>Allocation</CardTitle>
                <CardDescription>By asset class</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ChartContainer
                  config={allocationConfig}
                  className="mx-auto aspect-square max-h-[220px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={allocation}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      strokeWidth={4}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-2xl tabular-nums"
                                >
                                  4
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 20}
                                  className="fill-muted-foreground text-xs"
                                >
                                  classes
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-x-4 gap-y-1">
                {allocation.map((a) => (
                  <div key={a.name} className="flex items-center gap-1.5 text-xs">
                    <span
                      className="h-2.5 w-2.5 rounded-sm"
                      style={{ background: a.fill }}
                    />
                    {a.name} · {a.value}%
                  </div>
                ))}
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-muted border-none">
              <CardHeader>
                <CardTitle>Holdings</CardTitle>
                <CardDescription>{holdings.length} positions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Asset</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Price
                      </TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead className="text-right">24h</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {holdings.map((h) => (
                      <TableRow key={h.symbol}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-1xs font-medium">
                              {h.symbol.slice(0, 3)}
                            </div>
                            <div>
                              <p className="leading-none">{h.symbol}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {h.shares} · {h.name}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell tabular-nums text-muted-foreground">
                          {h.price}
                        </TableCell>
                        <TableCell className="tabular-nums">{h.value}</TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`inline-flex items-center gap-1 tabular-nums ${
                              h.up ? "text-emerald-500" : "text-red-500"
                            }`}
                          >
                            {h.up ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {h.change > 0 ? "+" : ""}
                            {h.change}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="col-span-4 md:col-span-3 bg-muted border-none">
              <CardHeader>
                <CardTitle>Watchlist</CardTitle>
                <CardDescription>Tracking 3 assets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {watchlist.map((w) => (
                  <div
                    key={w.symbol}
                    className="flex items-center justify-between rounded-lg bg-background/60 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-1xs font-medium">
                        {w.symbol.slice(0, 3)}
                      </div>
                      <span className="text-sm">{w.symbol}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm tabular-nums leading-none">
                        {w.price}
                      </p>
                      <p
                        className={`text-xs tabular-nums mt-1 ${
                          w.up ? "text-emerald-500" : "text-red-500"
                        }`}
                      >
                        {w.change > 0 ? "+" : ""}
                        {w.change}%
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">
                  Manage watchlist
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
