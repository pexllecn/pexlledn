"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Home, DollarSign, Clock, Percent } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const kpis = [
  { label: "Avg sale price", value: "$684k", delta: "+6.2%", up: true, icon: DollarSign },
  { label: "Listings sold", value: "312", delta: "+18", up: true, icon: Home },
  { label: "Avg days on market", value: "28", delta: "-4 days", up: true, icon: Clock },
  { label: "List-to-sale ratio", value: "98.4%", delta: "-0.3%", up: false, icon: Percent },
];

const months = [
  { m: "Oct", v: 58 },
  { m: "Nov", v: 71 },
  { m: "Dec", v: 49 },
  { m: "Jan", v: 82 },
  { m: "Feb", v: 66 },
  { m: "Mar", v: 94 },
];

const types = [
  { name: "Single-family", pct: 46, color: "bg-sky-500" },
  { name: "Condos", pct: 27, color: "bg-violet-500" },
  { name: "Townhouses", pct: 18, color: "bg-emerald-500" },
  { name: "Commercial", pct: 9, color: "bg-amber-500" },
];

const neighborhoods = [
  { name: "Waterfront", price: "$1.2M", change: "+8.1%", up: true },
  { name: "Downtown", price: "$820k", change: "+5.4%", up: true },
  { name: "Midtown", price: "$610k", change: "+2.1%", up: true },
  { name: "Suburban North", price: "$540k", change: "-1.2%", up: false },
];

export default function Analytics() {
  const max = Math.max(...months.map((x) => x.v));
  return (
    <ContentLayout title="Analytics">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Market analytics</h2>
            <p className="text-muted-foreground mt-1">Portfolio performance overview</p>
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
                <CardTitle>Sales volume</CardTitle>
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
                <CardTitle>Property types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {types.map((t) => (
                  <div key={t.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span>{t.name}</span>
                      <span className="tabular-nums text-muted-foreground">{t.pct}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-background">
                      <div
                        className={`h-full rounded-full ${t.color}`}
                        style={{ width: `${t.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="border-none bg-muted">
            <CardHeader>
              <CardTitle>By neighborhood</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {neighborhoods.map((n) => (
                <div
                  key={n.name}
                  className="flex items-center justify-between border-b px-6 py-4 last:border-0"
                >
                  <span className="text-sm font-medium">{n.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold tabular-nums">{n.price}</span>
                    <Badge
                      className={`border-none ${
                        n.up
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-rose-500/10 text-rose-600"
                      }`}
                    >
                      {n.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
