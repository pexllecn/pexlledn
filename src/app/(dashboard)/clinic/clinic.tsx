"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  HeartPulse,
  Plus,
  Stethoscope,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";

const visitsConfig = {
  visits: { label: "Visits", color: "hsl(var(--chart-1))" },
  newp: { label: "New patients", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const visitsData = [
  { day: "Mon", visits: 42, newp: 8 },
  { day: "Tue", visits: 51, newp: 12 },
  { day: "Wed", visits: 38, newp: 6 },
  { day: "Thu", visits: 47, newp: 9 },
  { day: "Fri", visits: 58, newp: 14 },
  { day: "Sat", visits: 22, newp: 4 },
];

const satisfaction = [
  { month: "Feb", score: 92 },
  { month: "Mar", score: 93 },
  { month: "Apr", score: 91 },
  { month: "May", score: 95 },
  { month: "Jun", score: 96 },
];

const todaysAppointments = [
  { patient: "Emma Johnson", reason: "Annual check-up", time: "09:00", doctor: "Dr. Reyes", avatar: "/avatar-40-01.jpg", fallback: "EJ", status: "Confirmed" },
  { patient: "Liam Chen", reason: "Follow-up · cardiology", time: "09:45", doctor: "Dr. Osei", avatar: "/avatar-40-02.jpg", fallback: "LC", status: "Confirmed" },
  { patient: "Sofia Rossi", reason: "Blood work", time: "10:30", doctor: "Dr. Reyes", avatar: "/avatar-40-03.jpg", fallback: "SR", status: "Waiting" },
  { patient: "Noah Patel", reason: "Dermatology consult", time: "11:15", doctor: "Dr. Kaur", avatar: "/avatar-40-04.jpg", fallback: "NP", status: "Confirmed" },
];

const statusVariant: Record<string, "success" | "yellow"> = {
  Confirmed: "success",
  Waiting: "yellow",
};

export default function ClinicPage() {
  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Clinic">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Good morning, Dr. Reyes 👋</h2>
              <p className="text-muted-foreground mt-1">
                You have <span className="text-foreground">12 appointments</span>{" "}
                and 3 new patients today.
              </p>
            </div>
            <Button asChild>
              <Link href="/clinic/appointments">
                <Plus className="mr-2 h-4 w-4" />
                New appointment
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Today's patients", value: "38", sub: "+6 walk-ins", icon: Users },
              { label: "Appointments", value: "12", sub: "3 remaining", icon: CalendarCheck },
              { label: "Avg wait time", value: "14 min", sub: "-3 min vs last week", icon: Clock },
              { label: "Bed occupancy", value: "82%", sub: "24 of 30 beds", icon: HeartPulse },
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
                <CardTitle>Patient Visits</CardTitle>
                <CardDescription>Visits and new patients this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={visitsConfig}
                  className="aspect-auto h-[240px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    data={visitsData}
                    margin={{ left: -4, right: -4 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="visits" fill="var(--color-visits)" radius={4} />
                    <Bar dataKey="newp" fill="var(--color-newp)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="col-span-4 md:col-span-3 bg-muted border-none">
              <CardHeader>
                <CardTitle>Patient Satisfaction</CardTitle>
                <CardDescription>Monthly average score</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{ score: { label: "Score", color: "hsl(var(--chart-2))" } }}
                  className="aspect-auto h-[240px] w-full"
                >
                  <LineChart
                    accessibilityLayer
                    data={satisfaction}
                    margin={{ left: 12, right: 12, top: 10 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <Line
                      dataKey="score"
                      type="natural"
                      stroke="var(--color-score)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2 text-sm">
                  Up 4 points since February <TrendingUp className="h-4 w-4" />
                </div>
              </CardFooter>
            </Card>
          </div>

          <Card className="bg-muted border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="space-y-1.5">
                <CardTitle>Today&apos;s Schedule</CardTitle>
                <CardDescription>Next appointments in your queue</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/clinic/appointments">
                  View all
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-1">
              {todaysAppointments.map((a, i) => (
                <div key={a.patient}>
                  <div className="flex items-center gap-3 py-3">
                    <div className="text-center w-12 shrink-0">
                      <p className="text-sm tabular-nums">{a.time}</p>
                    </div>
                    <Separator orientation="vertical" className="h-8" />
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={a.avatar} />
                      <AvatarFallback>{a.fallback}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-none">{a.patient}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {a.reason} · {a.doctor}
                      </p>
                    </div>
                    <Badge variant={statusVariant[a.status]}>{a.status}</Badge>
                  </div>
                  {i < todaysAppointments.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
