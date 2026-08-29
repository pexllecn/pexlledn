"use client";

import * as React from "react";
import {
  AppleShell,
  A,
  CardHead,
  ChannelRow,
  Hair,
  RangePill,
  Segmented,
  Stat,
  Surface,
} from "../components/apple-ui";
import { Columns, Gauge, Heatmap, Meter } from "../components/apple-charts";
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

const statusTint: Record<string, string> = {
  Active: A.green,
  "On leave": A.orange,
};

export default function Team() {
  return (
    <AppleShell title="HR Team" action="Invite" actionIcon={<UserPlus className="h-4 w-4" />}>
      <div className="min-w-0 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat icon={<Users className="h-4 w-4" />} label="Headcount" value="56" delta={7.7} />
          <Stat icon={<UserPlus className="h-4 w-4" />} label="New hires" value="12" hint="last 90 days" delta={22.4} />
          <Stat icon={<Plane className="h-4 w-4" />} label="On leave" value="3" hint="this week" delta={-12.5} />
          <Stat icon={<Building2 className="h-4 w-4" />} label="Offices" value="4" hint="plus 9 remote" />
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Surface className="p-5">
            <CardHead
              title="Headcount"
              value="56"
              delta={7.7}
              right={<Segmented options={["Monthly", "Yearly"]} />}
            />
            <Columns
              className="mt-6"
              data={headcount}
              ticks={["60", "40", "20", "0"]}
              height={230}
            />
          </Surface>

          <Surface className="p-5">
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
                  className="flex items-center justify-between rounded-xl border border-black/[0.06] px-3 py-2 dark:border-white/[0.07]"
                >
                  <span className="flex min-w-0 items-center gap-1.5">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="truncate text-[12px] text-muted-foreground">
                      {d.label}
                    </span>
                  </span>
                  <span className="text-[13px] font-semibold tabular-nums text-foreground">
                    {d.amount}
                  </span>
                </div>
              ))}
            </div>
          </Surface>

          <div className="min-w-0 space-y-4">
            <Surface className="p-5">
              <CardHead title="By location" value="56 people" />
              <div className="mt-4 space-y-1.5">
                {locations.map((l) => (
                  <ChannelRow key={l.label} {...l} />
                ))}
              </div>
            </Surface>

            <Surface className="p-5">
              <CardHead title="Team activity" value="958" delta={14.8} />
              <Heatmap className="mt-4" weeks={30} seed={41} />
            </Surface>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* Directory */}
          <Surface className="overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div>
                <p className="text-[13px] text-muted-foreground">Directory</p>
                <p className="mt-0.5 text-[18px] font-semibold tracking-[-0.02em] text-foreground">
                  56 people
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {["All departments", "All locations"].map((f) => (
                  <button
                    key={f}
                    className="flex h-9 items-center gap-2 rounded-full border border-black/[0.07] px-3.5 text-[13px] font-medium text-foreground/80 transition-colors hover:bg-black/[0.03] dark:border-white/[0.08] dark:hover:bg-white/[0.06]"
                  >
                    {f}
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                ))}
                <label className="flex h-9 items-center gap-2 rounded-full border border-black/[0.07] px-3.5 dark:border-white/[0.08]">
                  <Search className="h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    placeholder="Search"
                    className="w-24 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
                  />
                </label>
              </div>
            </div>
            <Hair />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left">
                <thead>
                  <tr className="text-[12px] text-muted-foreground">
                    {["Name", "Role", "Department", "Location", "Status", ""].map((h) => (
                      <th key={h} className="px-5 py-2.5 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {people.map((p) => (
                    <tr
                      key={p.name}
                      className="border-t border-black/[0.06] text-[13px] transition-colors hover:bg-black/[0.02] dark:border-white/[0.07] dark:hover:bg-white/[0.03]"
                    >
                      <td className="px-5 py-2.5">
                        <span className="flex items-center gap-2.5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://i.pravatar.cc/80?img=${p.img}`}
                            alt=""
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <span>
                            <span className="block font-medium text-foreground">
                              {p.name}
                            </span>
                            <span className="block text-[11px] text-muted-foreground">
                              Joined {p.since}
                            </span>
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-2.5 text-muted-foreground">{p.role}</td>
                      <td className="px-5 py-2.5">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: p.tint }}
                          />
                          {p.dept}
                        </span>
                      </td>
                      <td className="px-5 py-2.5 text-muted-foreground">{p.loc}</td>
                      <td className="px-5 py-2.5">
                        <span
                          className="inline-flex rounded-md px-2 py-0.5 text-[12px] font-medium"
                          style={{
                            color: statusTint[p.status],
                            backgroundColor: `${statusTint[p.status]}1F`,
                          }}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-2.5">
                        <span className="flex items-center gap-1">
                          <button className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.07]">
                            <Mail className="h-3.5 w-3.5" />
                          </button>
                          <button className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.07]">
                            <MessageSquare className="h-3.5 w-3.5" />
                          </button>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Surface>

          {/* Time off */}
          <div className="min-w-0 space-y-4">
            <Surface className="overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4">
                <p className="text-[14px] font-medium text-foreground">Time off</p>
                <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" /> July
                </span>
              </div>
              <Hair />
              {timeOff.map((t, i) => (
                <React.Fragment key={t.name}>
                  {i > 0 && <Hair className="ml-14" />}
                  <div className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://i.pravatar.cc/80?img=${t.img}`}
                        alt=""
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[14px] font-medium text-foreground">
                          {t.name}
                        </p>
                        <p className="truncate text-[12px] text-muted-foreground">
                          {t.reason} · {t.when}
                        </p>
                      </div>
                    </div>
                    <Meter className="ml-12 mt-2 w-[calc(100%-3rem)]" pct={t.pct} color={A.orange} />
                  </div>
                </React.Fragment>
              ))}
            </Surface>

            <Surface className="p-5">
              <p className="text-[14px] font-medium text-foreground">Open roles</p>
              <div className="mt-4 space-y-3">
                {[
                  { role: "Senior iOS Engineer", dept: "Engineering", apps: 42, color: A.lime },
                  { role: "Motion Designer", dept: "Design", apps: 28, color: A.blue },
                  { role: "Research Lead", dept: "Research", apps: 16, color: A.purple },
                ].map((r) => (
                  <div
                    key={r.role}
                    className="rounded-2xl border border-black/[0.06] p-3.5 dark:border-white/[0.07]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-medium text-foreground">
                          {r.role}
                        </p>
                        <p className="text-[12px] text-muted-foreground">{r.dept}</p>
                      </div>
                      <span className="shrink-0 text-[13px] font-semibold tabular-nums text-foreground">
                        {r.apps}
                      </span>
                    </div>
                    <Meter className="mt-2.5" pct={r.apps} color={r.color} />
                  </div>
                ))}
              </div>
            </Surface>
          </div>
        </div>
      </div>
    </AppleShell>
  );
}
