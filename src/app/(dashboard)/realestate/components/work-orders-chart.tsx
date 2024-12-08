"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

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

const chartData = [
  { type: "New", count: 9, fill: "hsl(var(--chart-1))" },
  { type: "Open", count: 34, fill: "hsl(var(--chart-2))" },
  { type: "In Progress", count: 18, fill: "hsl(var(--chart-3))" },
  { type: "Delayed", count: 3, fill: "hsl(var(--chart-4))" },
];

const chartConfig = {
  count: {
    label: "Count",
  },
  new: {
    label: "New",
    color: "hsl(var(--chart-1))",
  },
  open: {
    label: "Open",
    color: "hsl(var(--chart-2))",
  },
  inProgress: {
    label: "In Progress",
    color: "hsl(var(--chart-3))",
  },
  delayed: {
    label: "Delayed",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function WorkOrdersChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Work Orders</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 80 }}
          >
            <CartesianGrid horizontal={false} />
            <XAxis type="number" hide />
            <YAxis
              dataKey="type"
              type="category"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              width={80}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total work orders for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
