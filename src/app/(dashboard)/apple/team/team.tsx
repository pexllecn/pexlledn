"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  AppleShell,
  A,
  CardHead,
  ChannelRow,
  RangePill,
  Segmented,
  Stat,
  initials,
  stagger,
} from "../components/apple-ui";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Area, Gauge, Heatmap, Meter } from "../components/apple-charts";
import {
  Building2,
  CalendarDays,
  ChevronDown,
  Mail,
  MessageSquare,
  Plane,
  Search,
  UserPlus,
  Users,
} from "lucide-react";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const headcount = [
  { label: "Jan", value: 38 },
  { label: "Feb", value: 41 },
  { label: "Mar", value: 43 },
  { label: "Apr", value: 44 },
  { label: "May", value: 47 },
  { label: "Jun", value: 49 },
  { label: "Jul", value: 52 },
  { label: "Aug", value: 53 },
  { label: "Sep", value: 55 },
  { label: "Oct", value: 56 },
  { label: "Nov", value: 56 },
  { label: "Dec", value: 56 },
];

const departments = [
  { label: "Engineering", pct: 42, color: A.lime, amount: "24" },
  { label: "Design", pct: 25, color: A.blue, amount: "14" },
  { label: "Research", pct: 18, color: A.purple, amount: "10" },
  { label: "Operations", pct: 15, color: A.pink, amount: "8" },
];

const locations = [
  { label: "Istanbul", pct: 46, color: A.blue },
  { label: "Berlin", pct: 24, color: A.blue },
  { label: "Lisbon", pct: 16, color: A.blue },
  { label: "Remote", pct: 9, color: A.blue },
  { label: "Tokyo", pct: 5, color: A.blue, muted: true },
];

const people = [
  { name: "Livia Saris", img: 5, role: "Backend Engineer", dept: "Engineering", loc: "Istanbul", status: "Active", tint: A.lime, since: "Today" },
  { name: "Jaydon Aminoff", img: 12, role: "UI Designer", dept: "Design", loc: "Berlin", status: "Active", tint: A.blue, since: "2 days ago" },
  { name: "Maria Lubin", img: 45, role: "User Researcher", dept: "Research", loc: "Lisbon", status: "Active", tint: A.purple, since: "5 days ago" },
  { name: "Ann Press", img: 32, role: "DevOps Engineer", dept: "Engineering", loc: "Remote", status: "On leave", tint: A.lime, since: "A week ago" },
  { name: "Tomas Berg", img: 60, role: "Type Designer", dept: "Design", loc: "Istanbul", status: "Active", tint: A.blue, since: "2 weeks ago" },
  { name: "Aisha Rahman", img: 27, role: "Ops Lead", dept: "Operations", loc: "Berlin", status: "Active", tint: A.pink, since: "1 month ago" },
  { name: "Noah Whitfield", img: 15, role: "Platform Engineer", dept: "Engineering", loc: "Tokyo", status: "Active", tint: A.lime, since: "2 months ago" },
];

const timeOff = [
  { name: "Ann Press", img: 32, reason: "Parental leave", when: "Jul 1 – Sep 30", pct: 34 },
  { name: "Ines Marchetti", img: 48, reason: "Annual leave", when: "Jul 8 – Jul 19", pct: 62 },
  { name: "Tomas Berg", img: 60, reason: "Conference", when: "Jul 22 – Jul 24", pct: 12 },
];

const statusVariant: Record<string, "success" | "yellow" | "decline"> = {
  Active: "success",
  "On leave": "yellow",
};

export default function Team() {
  return (
    <AppleShell title="HR Team" action="Invite" actionIcon={<UserPlus className="h-4 w-4" />}>
      <div className="min-w-0 space-y-4">
        <motion.div
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
          <Stat icon={<Users className="h-4 w-4" />} label="Headcount" value="56" delta={7.7} />
          <Stat icon={<UserPlus className="h-4 w-4" />} label="New hires" value="12" hint="last 90 days" delta={22.4} />
          <Stat icon={<Plane className="h-4 w-4" />} label="On leave" value="3" hint="this week" delta={-12.5} />
          <Stat icon={<Building2 className="h-4 w-4" />} label="Offices" value="4" hint="plus 9 remote" />
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Card className="min-w-0 p-5">
            <CardHead
              title="Headcount"
              value="56"
              delta={7.7}
              right={<Segmented options={["Monthly", "Yearly"]} />}
            />
            {/* A 38 -> 56 climb reads as a trend; columns from zero would make
                every month look the same height. */}
            <Area
              className="mt-6"
              data={headcount.map((h) => h.value)}
              labels={headcount.map((h) => h.label)}
              height={230}
            />
          </Card>

          <Card className="min-w-0 p-5">
            <CardHead
              title="By department"
              value="4 teams"
              right={<RangePill label="This year" />}
            />
            <Gauge
              className="mt-4"
              segments={departments}
              value="42%"
              caption="Engineering"
            />
            <div className="mt-2 grid grid-cols-2 gap-2">
              {departments.map((d) => (
                <div
                  key={d.label}
                  className="flex items-center justify-between rounded-md border border-border px-3 py-2"
                >
                  <span className="flex min-w-0 items-center gap-1.5">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="truncate text-xs text-muted-foreground">
                      {d.label}
                    </span>
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-foreground">
                    {d.amount}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <div className="min-w-0 space-y-4">
            <Card className="min-w-0 p-5">
              <CardHead title="By location" value="56 people" />
              <div className="mt-4 space-y-1.5">
                {locations.map((l) => (
                  <ChannelRow key={l.label} {...l} />
                ))}
              </div>
            </Card>

            <Card className="min-w-0 p-5">
              <CardHead title="Team activity" value="958" delta={14.8} />
              <Heatmap className="mt-4" weeks={30} seed={41} />
            </Card>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* Directory */}
          <Card className="min-w-0 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div>
                <p className="text-sm text-muted-foreground">Directory</p>
                <p className="mt-0.5 text-xl font-semibold tracking-tight text-foreground">
                  56 people
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {["All departments", "All locations"].map((f) => (
                  <Button variant="outline" className="h-9 gap-2 rounded-full px-3.5" key={f}>
                    {f}
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                ))}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search" className="rounded-full pl-8" />
                </div>
              </div>
            </div>
            <Separator />
            <div className="overflow-x-auto">
              <Table className="min-w-[720px]">
                <TableHeader>
                  <TableRow>
                    {["Name", "Role", "Department", "Location", "Status", ""].map((h) => (
                      <TableHead key={h}>
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {people.map((p) => (
                    <TableRow key={p.name}>
                      <TableCell>
                        <span className="flex items-center gap-2.5">
                          <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={`https://i.pravatar.cc/80?img=${p.img}`} alt="" />
                    <AvatarFallback>{initials(p.name)}</AvatarFallback>
                  </Avatar>
                          <span>
                            <span className="block font-medium text-foreground">
                              {p.name}
                            </span>
                            <span className="block text-xs text-muted-foreground">
                              Joined {p.since}
                            </span>
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{p.role}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: p.tint }}
                          />
                          {p.dept}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{p.loc}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[p.status]}>{p.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                            <Mail className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                            <MessageSquare className="h-3.5 w-3.5" />
                          </Button>
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Time off */}
          <div className="min-w-0 space-y-4">
            <Card className="min-w-0 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4">
                <p className="text-base font-medium text-foreground">Time off</p>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" /> July
                </span>
              </div>
              <Separator />
              {timeOff.map((t, i) => (
                <React.Fragment key={t.name}>
                  {i > 0 && <Separator className="ml-14 w-auto" />}
                  <div>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 shrink-0">
                    <AvatarImage src={`https://i.pravatar.cc/80?img=${t.img}`} alt="" />
                    <AvatarFallback>{initials(t.name)}</AvatarFallback>
                  </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-medium text-foreground">
                          {t.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {t.reason} · {t.when}
                        </p>
                      </div>
                    </div>
                    <Meter className="ml-12 mt-2 w-[calc(100%-3rem)]" pct={t.pct} color={A.orange} />
                  </div>
                </React.Fragment>
              ))}
            </Card>

            <Card className="min-w-0 p-5">
              <p className="text-base font-medium text-foreground">Open roles</p>
              <div className="mt-4 space-y-3">
                {[
                  { role: "Senior iOS Engineer", dept: "Engineering", apps: 42, color: A.lime },
                  { role: "Motion Designer", dept: "Design", apps: 28, color: A.blue },
                  { role: "Research Lead", dept: "Research", apps: 16, color: A.purple },
                ].map((r) => (
                  <div
                    key={r.role}
                    className="rounded-lg border border-border p-3.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-base font-medium text-foreground">
                          {r.role}
                        </p>
                        <p className="text-xs text-muted-foreground">{r.dept}</p>
                      </div>
                      <span className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
                        {r.apps}
                      </span>
                    </div>
                    <Meter className="mt-2.5" pct={r.apps} color={r.color} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppleShell>
  );
}
