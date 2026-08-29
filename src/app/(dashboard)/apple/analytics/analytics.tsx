"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  AppleShell,
  A,
  CardHead,
  ChannelRow,
  Legend,
  RangePill,
  Stat,
  stagger,
} from "../components/apple-ui";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ColumnsWithLine,
  Funnel,
  Gauge,
  StackedArea,
} from "../components/apple-charts";
import {
  ChevronDown,
  Eye,
  MousePointer,
  DollarSign,
  Linkedin,
  Mail,
  Search,
  UserCheck,
} from "lucide-react";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const kpis = [
  { icon: <DollarSign className="h-4 w-4" />, label: "Ad spend", value: "$24,380", delta: 8.4 },
  { icon: <Eye className="h-4 w-4" />, label: "Impressions", value: "1.94M", delta: 12.6 },
  { icon: <UserCheck className="h-4 w-4" />, label: "Conversions", value: "1,286", delta: 5.2 },
  { icon: <MousePointer className="h-4 w-4" />, label: "Cost per click", value: "$1.24", delta: -3.1 },
];

const funnelStages = [
  { label: "Visits", pct: 100, color: A.lime },
  { label: "Sign-ups", pct: 40, color: A.blue },
  { label: "Trials", pct: 15, color: A.purple },
  { label: "Customers", pct: 5, color: A.pink },
];

const funnelTotals = [
  { label: "Visits", value: "96.4K", color: A.lime },
  { label: "Sign-ups", value: "38.6K", color: A.blue },
  { label: "Trials", value: "14.1K", color: A.purple },
  { label: "Customers", value: "5.2K", color: A.pink },
];

const spend = [
  { label: "Paid search", pct: 46, color: A.lime, amount: "$11,400" },
  { label: "Paid social", pct: 31, color: A.blue, amount: "$7,620" },
  { label: "Email", pct: 13, color: A.purple, amount: "$3,180" },
  { label: "Affiliates", pct: 10, color: A.pink, amount: "$2,680" },
];

const channels = [
  { icon: <Search className="h-3.5 w-3.5" />, label: "Google Ads", pct: 39, color: A.blue },
  { icon: <span className="text-sm font-semibold">∞</span>, label: "Meta", pct: 25, color: A.blue },
  { icon: <span className="text-sm font-semibold">X</span>, label: "X Ads", pct: 14, color: A.blue },
  { icon: <Linkedin className="h-3.5 w-3.5" />, label: "LinkedIn", pct: 8, color: A.blue },
  { icon: <Mail className="h-3.5 w-3.5" />, label: "Email", pct: 7, color: A.blue, muted: true },
];

const campaigns = [
  { label: "Spring launch", pct: 34, color: A.purple },
  { label: "Always-on brand", pct: 27, color: A.purple },
  { label: "Retargeting · cart", pct: 18, color: A.purple },
  { label: "Developer beta", pct: 12, color: A.purple },
  { label: "Newsletter promo", pct: 9, color: A.purple, muted: true },
];

const landing = [
  { label: "/pricing", pct: 41, color: A.lime },
  { label: "/product/overview", pct: 24, color: A.lime },
  { label: "/download", pct: 16, color: A.lime },
  { label: "/blog/design-system", pct: 11, color: A.lime },
  { label: "/careers", pct: 8, color: A.lime, muted: true },
];

const adSpend = [
  { label: "Jan", bar: 9800, line: 2.9 },
  { label: "Feb", bar: 10200, line: 3.0 },
  { label: "Mar", bar: 11400, line: 2.8 },
  { label: "Apr", bar: 10900, line: 2.9 },
  { label: "May", bar: 13600, line: 3.2 },
  { label: "Jun", bar: 15200, line: 3.3 },
  { label: "Jul", bar: 14100, line: 3.2 },
  { label: "Aug", bar: 16800, line: 3.5 },
  { label: "Sep", bar: 19400, line: 3.6 },
  { label: "Oct", bar: 18200, line: 3.6 },
  { label: "Nov", bar: 21600, line: 3.7 },
  { label: "Dec", bar: 23400, line: 3.8 },
];

const visitors = [
  { name: "Direct", color: A.lime, data: [42, 44, 43, 46, 48, 47, 50, 53, 55, 54, 58, 62] },
  { name: "Organic", color: A.blue, data: [28, 30, 29, 33, 35, 34, 38, 40, 42, 41, 45, 48] },
  { name: "Referral", color: A.purple, data: [14, 16, 15, 18, 19, 21, 22, 24, 25, 27, 29, 31] },
];

export default function Analytics() {
  return (
    <AppleShell title="Marketing" action="New campaign">
      <div className="min-w-0 space-y-4">
        <motion.div
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
          {kpis.map((k) => (
            <Stat key={k.label} {...k} />
          ))}
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-3">
          {/* Funnel */}
          <Card className="min-w-0 p-5">
            <CardHead
              title="Acquisition funnel"
              value="96.4K"
              delta={5.8}
              right={<RangePill />}
            />
            <Funnel className="mt-6" stages={funnelStages} />
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {funnelTotals.map((f) => (
                <div
                  key={f.label}
                  className="rounded-md border border-border px-3 py-2.5"
                >
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: f.color }}
                    />
                    <span className="truncate text-xs text-muted-foreground">
                      {f.label}
                    </span>
                  </span>
                  <p className="mt-1 text-base font-semibold tabular-nums text-foreground">
                    {f.value}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Gauge */}
          <Card className="min-w-0 p-5">
            <CardHead
              title="Spend by channel"
              value="$24,880"
              delta={8.4}
              right={<RangePill />}
            />
            <Gauge
              className="mt-4"
              segments={spend}
              value="46%"
              caption="Paid search"
            />
            <Legend
              className="mt-2 justify-center"
              items={spend.map((s) => ({
                label: s.label,
                value: s.amount,
                color: s.color,
              }))}
            />
          </Card>

          {/* Ranked tabs */}
          <Card className="min-w-0 p-5">
            <Tabs defaultValue="Channels">
              <div className="mb-4 flex items-center justify-between gap-3">
                <TabsList className="h-9">
                  {["Channels", "Campaigns", "Landing pages"].map((t) => (
                    <TabsTrigger key={t} value={t} className="text-xs">
                      {t}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <span className="text-1xs font-medium uppercase tracking-wider text-muted-foreground">
                  Sessions
                </span>
              </div>
              {[
                { tab: "Channels", rows: channels },
                { tab: "Campaigns", rows: campaigns },
                { tab: "Landing pages", rows: landing },
              ].map(({ tab, rows }) => (
                <TabsContent key={tab} value={tab} className="space-y-1.5">
                  {rows.map((r) => (
                    <ChannelRow key={r.label} {...r} />
                  ))}
                  <div className="flex justify-center pt-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Show more ${tab.toLowerCase()}`}
                      className="h-7 w-9 rounded-full bg-muted"
                    >
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <Card className="min-w-0 p-5">
            <CardHead
              title="Ad spend · ROAS 3.6x"
              value="$217.7K"
              delta={9.4}
              right={<RangePill label="This year" />}
            />
            <ColumnsWithLine
              className="mt-6"
              data={adSpend}
              formatBar={(v) => `${(v / 1000).toFixed(0)}K`}
              formatLine={(v) => `${v.toFixed(1)}x`}
            />
          </Card>

          <Card className="min-w-0 p-5">
            <CardHead
              title="Visitors"
              value="134,400"
              delta={8.8}
              right={<RangePill label="This year" />}
            />
            <StackedArea
              className="mt-6"
              series={visitors}
              labels={MONTHS}
              format={(v) => `${(v / 1000).toFixed(0)}K`}
              height={230}
            />
            <Legend
              className="mt-3"
              items={visitors.map((v) => ({ label: v.name, color: v.color }))}
            />
          </Card>
        </div>
      </div>
    </AppleShell>
  );
}
