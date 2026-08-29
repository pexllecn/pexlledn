"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  AppleShell,
  A,
  CardHead,
  Delta,
  Legend,
  MiniStat,
  Segmented,
  Stat,
  initials,
  stagger,
} from "./components/apple-ui";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Area, Columns, Heatmap } from "./components/apple-charts";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  MessageSquare,
  Package,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const earnings = [
  3240, 7100, 8600, 6900, 3600, 2900, 4100, 4800, 6600, 4300, 9400, 7200,
].map((value, i) => ({ label: MONTHS[i], value }));

const revenue = [1800, 2500, 2600, 2400, 2900, 3900, 3400, 3200, 4600, 3800, 3600, 5600];

const hires = [
  { name: "Livia Saris", when: "Joined today", role: "Backend Engineer", img: 5 },
  { name: "Jaydon Aminoff", when: "2 days ago", role: "UI Designer", img: 12 },
  { name: "Maria Lubin", when: "5 days ago", role: "User Researcher", img: 45 },
  { name: "Ann Press", when: "A week ago", role: "DevOps Engineer", img: 32 },
];

const tiles = [
  { icon: <Users className="h-4 w-4" />, label: "Customers", value: "12,480", delta: 6.2 },
  { icon: <Package className="h-4 w-4" />, label: "Units sold", value: "38,204", delta: 4.1 },
  { icon: <ShoppingBag className="h-4 w-4" />, label: "Orders", value: "9,145", delta: -1.8 },
  { icon: <MessageSquare className="h-4 w-4" />, label: "Support tickets", value: "312", delta: -7.4 },
];

export default function Overview() {
  return (
    <AppleShell title="Welcome Mertcan" action="Create ticket">
      <div className="min-w-0 space-y-4">
        {/* Recent hires + monthly earnings */}
        <div className="grid gap-4 xl:grid-cols-2">
          <Card className="min-w-0 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Recent hires</p>
                <p className="mt-1 text-2xl font-semibold leading-none tracking-tight tabular-nums text-foreground">
                  56
                </p>
              </div>
              <Button variant="ghost" className="h-8 gap-1.5 rounded-full px-2.5">
                Board team
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {hires.map((h) => (
                <div
                  key={h.name}
                  className="rounded-lg border border-border p-3 transition-colors hover:bg-muted"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={`https://i.pravatar.cc/80?img=${h.img}`} alt="" />
                    <AvatarFallback>{initials(h.name)}</AvatarFallback>
                  </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-base font-medium text-foreground">
                        {h.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {h.when}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 rounded-md bg-muted py-2 text-center text-xs text-muted-foreground">
                    {h.role}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-10 gap-2 rounded-md">
                <ArrowLeft className="h-3.5 w-3.5" /> Previous
              </Button>
              <Button variant="outline" className="h-10 gap-2 rounded-md">
                Next <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Card>

          <Card className="min-w-0 p-5">
            <CardHead
              title="January"
              value="$3,240"
              right={<Segmented options={["Weekly", "Monthly", "Yearly"]} />}
            />
            <Columns
              className="mt-6"
              data={earnings}
              highlight={0}
              format={(v) => `$${v / 1000}K`}
              height={250}
            />
          </Card>
        </div>

        {/* Revenue + contributions */}
        <div className="grid gap-4 xl:grid-cols-2">
          <Card className="min-w-0 p-5">
            <CardHead
              title="Revenue"
              value="$18,240"
              delta={9.4}
              right={<Segmented options={["Weekly", "Monthly", "Yearly"]} />}
            />
            <Area
              className="mt-6"
              data={revenue}
              labels={MONTHS}
              format={(v) => `$${v / 1000}K`}
              height={250}
            />
          </Card>

          <Card className="min-w-0 p-5">
            <CardHead title="Contributions this year" value="958" delta={14.8} />

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MiniStat value="9B" label="Lifetime tokens" />
              <MiniStat value="562.7M" label="Peak tokens" />
              <MiniStat value="12h 54m" label="Longest task" />
              <MiniStat value="62 days" label="Top streak" />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Activity</p>
              <Segmented options={["Weekly", "Monthly", "Yearly"]} />
            </div>
            <Heatmap className="mt-4" weeks={52} seed={11} labels={MONTHS} />
          </Card>
        </div>

        {/* Bottom KPI row */}
        <motion.div
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
          {tiles.map((t) => (
            <Stat key={t.label} {...t} />
          ))}
        </motion.div>

        {/* Cross-links into the rest of the app */}
        <Card className="min-w-0 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="text-base font-medium text-foreground">
                Continue where you left off
              </p>
            </div>
            <Legend
              items={[
                { label: "Analytics", color: A.lime },
                { label: "Health", color: A.pink },
                { label: "Finance", color: A.blue },
              ]}
              className="hidden sm:flex"
            />
          </div>
          <Separator />
          <div className="grid sm:grid-cols-3">
            {[
              { href: "/apple/analytics", title: "Marketing analytics", sub: "Funnel · spend · channels" },
              { href: "/apple/health", title: "Health report", sub: "Rings · sleep · alerts" },
              { href: "/apple/finance", title: "Wallet", sub: "Cards · spending · transfers" },
            ].map((c, i) => (
              <Link
                key={c.href}
                href={c.href}
                className={`px-5 py-4 transition-colors hover:bg-muted/50 ${
                  i > 0 ? "sm:border-l sm:border-border sm:" : ""
                }`}
              >
                <p className="text-base font-medium text-foreground">{c.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{c.sub}</p>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </AppleShell>
  );
}
