"use client";

import * as React from "react";
import {
  AppleShell,
  A,
  CardHead,
  Hair,
  Legend,
  RangePill,
  Row,
  Segmented,
  Stat,
  Surface,
} from "../components/apple-ui";
import { Columns, Meter as Bar, Rings, Spark } from "../components/apple-charts";
import {
  Award,
  Bike,
  Flame,
  Footprints,
  Heart,
  Medal,
  Mountain,
  Timer,
  Waves,
} from "lucide-react";

const week = [
  { label: "Mon", value: 540 },
  { label: "Tue", value: 720 },
  { label: "Wed", value: 380 },
  { label: "Thu", value: 645 },
  { label: "Fri", value: 812 },
  { label: "Sat", value: 460 },
  { label: "Sun", value: 692 },
];

const goals = [
  { label: "Move", value: "512/580 KCAL", pct: 88, color: A.pink },
  { label: "Exercise", value: "22/30 MIN", pct: 74, color: A.lime },
  { label: "Stand", value: "9/12 HRS", pct: 62, color: A.blue },
];

const workouts = [
  { icon: <Footprints className="h-3.5 w-3.5" />, tint: A.lime, name: "Outdoor Walk", meta: "48 min · 4.6 km · 214 kcal", pct: 78 },
  { icon: <Bike className="h-3.5 w-3.5" />, tint: A.blue, name: "Indoor Cycle", meta: "35 min · 18.2 km · 402 kcal", pct: 92 },
  { icon: <Waves className="h-3.5 w-3.5" />, tint: A.teal, name: "Pool Swim", meta: "26 min · 1,200 m · 310 kcal", pct: 64 },
  { icon: <Mountain className="h-3.5 w-3.5" />, tint: A.orange, name: "Hiking", meta: "1h 42m · 7.9 km · 688 kcal", pct: 100 },
];

const trends = [
  { label: "Resting heart rate", value: "54 BPM", data: [58, 57, 56, 56, 55, 54, 54], color: A.pink },
  { label: "VO₂ max", value: "48.2", data: [44, 45, 45, 46, 47, 48, 48], color: A.blue },
  { label: "Walking pace", value: "9'12\"", data: [10, 10, 9.8, 9.6, 9.4, 9.2, 9.2], color: A.lime },
  { label: "Sleep", value: "7h 50m", data: [6.8, 7.1, 7, 7.4, 7.6, 7.8, 7.9], color: A.purple },
];

const awards = [
  { icon: <Medal className="h-4 w-4" />, tint: A.orange, title: "Perfect Week", sub: "Jul 1 – 7" },
  { icon: <Flame className="h-4 w-4" />, tint: A.red, title: "62 Day Streak", sub: "Personal best" },
  { icon: <Award className="h-4 w-4" />, tint: A.purple, title: "Longest Move", sub: "1,840 kcal" },
  { icon: <Timer className="h-4 w-4" />, tint: A.blue, title: "Fastest 5K", sub: "24:08" },
];

export default function Fitness() {
  return (
    <AppleShell title="Activity" action="Log workout">
      <div className="min-w-0 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat icon={<Flame className="h-4 w-4" />} label="Move" value="512" hint="kcal of 580 goal" delta={12.4} />
          <Stat icon={<Timer className="h-4 w-4" />} label="Exercise" value="22m" hint="of 30 min goal" delta={4.8} />
          <Stat icon={<Footprints className="h-4 w-4" />} label="Steps" value="8,412" hint="6.1 km walked" delta={-2.6} />
          <Stat icon={<Heart className="h-4 w-4" />} label="Avg heart rate" value="72" hint="BPM today" delta={1.2} />
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Surface className="p-5">
            <CardHead title="Today" value="July 5" right={<RangePill label="Day" />} />
            <div className="mt-6 flex justify-center">
              <Rings values={[88, 74, 62]} size={220} />
            </div>
            <div className="mt-6 space-y-3">
              {goals.map((g) => (
                <div key={g.label}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[13px] font-medium text-foreground">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: g.color }}
                      />
                      {g.label}
                    </span>
                    <span className="text-[12px] tabular-nums text-muted-foreground">
                      {g.value}
                    </span>
                  </div>
                  <Bar pct={g.pct} color={g.color} />
                </div>
              ))}
            </div>
          </Surface>

          <Surface className="p-5 xl:col-span-2">
            <CardHead
              title="Calories burned"
              value="4,249"
              delta={7.9}
              right={<Segmented options={["Weekly", "Monthly", "Yearly"]} />}
            />
            <Columns
              className="mt-6"
              data={week}
              ticks={["900", "600", "300", "0"]}
              height={260}
            />
            <Legend
              className="mt-4"
              items={[{ label: "Daily goal 600 kcal", color: A.lime }]}
            />
          </Surface>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <Surface className="overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4">
              <p className="text-[14px] font-medium text-foreground">Recent workouts</p>
              <span className="text-[13px] text-muted-foreground">This week</span>
            </div>
            <Hair />
            {workouts.map((w, i) => (
              <React.Fragment key={w.name}>
                {i > 0 && <Hair className="ml-14" />}
                <div className="px-4 py-3">
                  <Row
                    className="px-0 py-0 hover:bg-transparent dark:hover:bg-transparent"
                    icon={w.icon}
                    tint={w.tint}
                    title={w.name}
                    subtitle={w.meta}
                    right={
                      <span className="text-[13px] font-medium tabular-nums text-muted-foreground">
                        {w.pct}%
                      </span>
                    }
                  />
                  <Bar className="ml-10 mt-2 w-[calc(100%-2.5rem)]" pct={w.pct} color={w.tint} />
                </div>
              </React.Fragment>
            ))}
          </Surface>

          <div className="min-w-0 space-y-4">
            <Surface className="overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4">
                <p className="text-[14px] font-medium text-foreground">Trends</p>
                <span className="text-[13px] text-muted-foreground">90 days</span>
              </div>
              <Hair />
              {trends.map((t, i) => (
                <React.Fragment key={t.label}>
                  {i > 0 && <Hair className="ml-5" />}
                  <div className="flex items-center gap-4 px-5 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] text-muted-foreground">
                        {t.label}
                      </p>
                      <p className="text-[15px] font-semibold tabular-nums text-foreground">
                        {t.value}
                      </p>
                    </div>
                    <Spark data={t.data} color={t.color} />
                  </div>
                </React.Fragment>
              ))}
            </Surface>

            <Surface className="p-5">
              <p className="text-[14px] font-medium text-foreground">Awards</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {awards.map((a) => (
                  <div
                    key={a.title}
                    className="flex flex-col items-center rounded-2xl border border-black/[0.06] p-3 text-center dark:border-white/[0.07]"
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: a.tint }}
                    >
                      {a.icon}
                    </span>
                    <p className="mt-2 text-[12px] font-medium leading-tight text-foreground">
                      {a.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{a.sub}</p>
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
