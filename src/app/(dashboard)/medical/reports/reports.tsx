"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, Activity, DollarSign, Clock } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const kpis = [
  { label: "Patient visits", value: "1,842", delta: "+12%", up: true, icon: Users },
  { label: "Avg wait time", value: "14 min", delta: "-3 min", up: true, icon: Clock },
  { label: "Bed occupancy", value: "78%", delta: "+4%", up: false, icon: Activity },
  { label: "Revenue", value: "$248k", delta: "+9%", up: true, icon: DollarSign },
];

const months = [
  { m: "Oct", v: 62 },
  { m: "Nov", v: 78 },
  { m: "Dec", v: 54 },
  { m: "Jan", v: 88 },
  { m: "Feb", v: 71 },
  { m: "Mar", v: 96 },
];

const departments = [
  { name: "Cardiology", pct: 84, color: "bg-rose-500" },
  { name: "Neurology", pct: 62, color: "bg-violet-500" },
  { name: "Orthopedics", pct: 71, color: "bg-sky-500" },
  { name: "Pediatrics", pct: 48, color: "bg-emerald-500" },
  { name: "General", pct: 93, color: "bg-amber-500" },
];

export default function Reports() {
  const max = Math.max(...months.map((x) => x.v));
  return (
    <ContentLayout title="Reports">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Reports &amp; analytics</h2>
            <p className="text-muted-foreground mt-1">Performance over the last 6 months</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kpis.map((k) => (
              <Card key={k.label} className="border-none bg-muted">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{k.label}</p>
                    <k.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="mt-2 text-3xl font-semibold tabular-nums">{k.value}</p>
                  <p
                    className={`mt-1 flex items-center gap-1 text-xs ${
                      k.up ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {k.up ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {k.delta} vs last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
            <Card className="border-none bg-muted">
              <CardHeader>
                <CardTitle>Monthly visits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex h-56 items-end justify-between gap-3">
                  {months.map((x) => (
                    <div key={x.m} className="flex flex-1 flex-col items-center gap-2">
                      <span className="text-xs font-medium tabular-nums text-muted-foreground">
                        {x.v}
                      </span>
                      <div
                        className="w-full rounded-t-md bg-primary/80"
                        style={{ height: `${(x.v / max) * 100}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{x.m}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-muted">
              <CardHeader>
                <CardTitle>By department</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {departments.map((d) => (
                  <div key={d.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span>{d.name}</span>
                      <span className="tabular-nums text-muted-foreground">{d.pct}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-background">
                      <div
                        className={`h-full rounded-full ${d.color}`}
                        style={{ width: `${d.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
                <Badge variant="secondary" className="mt-2">Updated 2h ago</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
