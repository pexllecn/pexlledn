"use client";

import * as React from "react";
import {
  AppleShell,
  A,
  Hair,
  Stepper,
  Surface,
  seeded,
} from "../components/apple-ui";
import { MiniRings, Rings, ScoreRing, WeekBars } from "../components/apple-charts";
import {
  Activity,
  Asterisk,
  ChevronDown,
  Droplet,
  FileText,
  HeartPulse,
  PersonStanding,
  Plus,
  Search,
  Stethoscope,
} from "lucide-react";

const steps = [
  { label: "Mon", value: 5200 },
  { label: "Tue", value: 2600 },
  { label: "Wed", value: 2400 },
  { label: "Thu", value: 6100 },
  { label: "Fri", value: 6800 },
  { label: "Sat", value: 5400 },
  { label: "Sun", value: 3100 },
];

const vitals = [
  { icon: <Asterisk className="h-3.5 w-3.5" />, label: "Date of Birth", value: "28 July, 1997" },
  { icon: <PersonStanding className="h-3.5 w-3.5" />, label: "Gender", value: "Male" },
  { icon: <Droplet className="h-3.5 w-3.5" />, label: "Blood Type", value: "A rh+" },
  { icon: <Stethoscope className="h-3.5 w-3.5" />, label: "GP Doctor", value: "Mattheus Clarkson" },
];

const sleep = [
  { label: "Duration: 7h 50m", score: "49/50", pct: 50, color: A.purple },
  { label: "Bedtime: 20m earlier", score: "29/30", pct: 30, color: A.pink },
  { label: "Interruptions: 5m wake up", score: "20/20", pct: 20, color: A.blue },
];

const alerts = [
  {
    date: "June, 12",
    tint: A.pink,
    icon: <HeartPulse className="h-4 w-4" />,
    title: "High Heart rate",
    body: "Your heart rate rose above 120 BPM while you seemed to be inactive for 10 minutes starting at 8:59 AM, 12 June.",
  },
  {
    date: "June, 9",
    tint: A.orange,
    icon: <Asterisk className="h-4 w-4" />,
    title: "Medical ID",
    body: "Your emergency contact and allergy information was updated in your Medical ID.",
  },
  {
    date: "June, 4",
    tint: A.blue,
    icon: <Activity className="h-4 w-4" />,
    title: "Walking steadiness",
    body: "Your walking steadiness has stayed in the OK range for the last four weeks. Keep the balance exercises going.",
  },
];

const patients = [
  { name: "Elif Doruk", id: "PX-40921", condition: "Hypertension", status: "Stable", when: "Today, 09:20" },
  { name: "Noah Whitfield", id: "PX-40922", condition: "Type 2 diabetes", status: "Follow-up", when: "Today, 10:05" },
  { name: "Ines Marchetti", id: "PX-40923", condition: "Asthma", status: "Stable", when: "Yesterday" },
  { name: "Tomas Berg", id: "PX-40924", condition: "Arrhythmia", status: "Critical", when: "Yesterday" },
  { name: "Aisha Rahman", id: "PX-40925", condition: "Migraine", status: "Stable", when: "2 days ago" },
];

const statusTint: Record<string, string> = {
  Stable: A.green,
  "Follow-up": A.orange,
  Critical: A.red,
};

/** Three weeks of ring summaries — later days fade out, like the Fitness app. */
function useCalendar() {
  return React.useMemo(() => {
    const rand = seeded(23);
    return Array.from({ length: 21 }, (_, i) => ({
      day: i + 1,
      values: [
        30 + Math.round(rand() * 70),
        25 + Math.round(rand() * 75),
        20 + Math.round(rand() * 80),
      ],
      dim: i > 11,
    }));
  }, []);
}

export default function Health() {
  const calendar = useCalendar();

  return (
    <AppleShell title="Medical Profile" action="File a report" actionIcon={<FileText className="h-4 w-4" />}>
      <div className="min-w-0 space-y-4">
        <div className="grid gap-4 xl:grid-cols-3">
          {/* Identity */}
          <Surface className="p-5">
            <div className="flex flex-col items-center pt-2">
              <div className="relative">
                <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-black/[0.06] text-[24px] font-medium text-foreground/60 dark:bg-white/[0.08]">
                  M
                </div>
                <span className="absolute -right-0.5 -top-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-black/[0.06] text-foreground/70 dark:border-[#151517] dark:bg-white/[0.12]">
                  <Plus className="h-3 w-3" />
                </span>
              </div>
              <p className="mt-3 text-[19px] font-semibold tracking-[-0.02em] text-foreground">
                Mertcan Esmergül
              </p>
            </div>

            <div className="mt-5 space-y-2">
              {vitals.map((v) => (
                <div
                  key={v.label}
                  className="flex items-center justify-between rounded-xl bg-black/[0.035] px-3.5 py-3 dark:bg-white/[0.04]"
                >
                  <span className="flex items-center gap-2 text-[13px] text-muted-foreground">
                    {v.icon}
                    {v.label}
                  </span>
                  <span className="text-[13px] font-medium text-foreground">
                    {v.value}
                  </span>
                </div>
              ))}
            </div>
          </Surface>

          {/* Steps */}
          <Surface className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[13px] text-muted-foreground">Steps</p>
                <p className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-[26px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-foreground">
                    31,600
                  </span>
                  <span className="text-[13px] text-muted-foreground">total steps</span>
                </p>
              </div>
              <Stepper label="29 Jun – 5 Jul" />
            </div>
            <WeekBars className="mt-6" data={steps} height={230} />
          </Surface>

          {/* Sleep score */}
          <Surface className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[13px] text-muted-foreground">Sleep score</p>
                <p className="mt-1 text-[26px] font-semibold leading-none tracking-[-0.02em] text-foreground">
                  Excellent
                </p>
              </div>
              <Stepper label="29 Jun – 5 Jul" />
            </div>

            <div className="mt-4 flex justify-center">
              <ScoreRing segments={sleep} value={98} size={160} />
            </div>

            <div className="mt-4 space-y-2">
              {sleep.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between rounded-xl bg-black/[0.035] px-3.5 py-2.5 dark:bg-white/[0.04]"
                >
                  <span className="flex items-center gap-2 text-[13px] text-muted-foreground">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    {s.label}
                  </span>
                  <span className="text-[13px] font-medium tabular-nums text-foreground">
                    {s.score}
                  </span>
                </div>
              ))}
            </div>
          </Surface>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {/* Most active days */}
          <Surface className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[13px] text-muted-foreground">Most active days</p>
                <p className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-[26px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-foreground">
                    32,459
                  </span>
                  <span className="text-[13px] text-muted-foreground">total steps</span>
                </p>
              </div>
              <Stepper label="July" />
            </div>

            <div className="mt-5 rounded-2xl border border-black/[0.06] p-4 dark:border-white/[0.07]">
              <p className="mb-3 text-[15px] font-semibold text-foreground">Jul</p>
              <div className="grid grid-cols-7 gap-y-3">
                {calendar.map((c) => (
                  <div
                    key={c.day}
                    className={`flex flex-col items-center gap-1.5 rounded-xl py-1.5 ${
                      c.day === 5
                        ? "ring-1 ring-black/[0.12] dark:ring-white/20"
                        : ""
                    }`}
                  >
                    <span className="text-[12px] tabular-nums text-muted-foreground">
                      {c.day}
                    </span>
                    <MiniRings values={c.values} dim={c.dim} size={30} />
                  </div>
                ))}
              </div>
            </div>
          </Surface>

          {/* Activity rings */}
          <Surface className="p-5">
            <p className="text-[13px] text-muted-foreground">Activity for July 5, 2026</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { label: "Move", value: "1,228 kcal", color: A.pink },
                { label: "Exercise", value: "2h 2m", color: A.lime },
                { label: "Running", value: "6.0 km", color: A.blue },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-black/[0.06] px-3 py-2.5 dark:border-white/[0.07]"
                >
                  <span className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: m.color }}
                    />
                    {m.label}
                  </span>
                  <p className="mt-1 text-[14px] font-semibold tabular-nums text-foreground">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Rings values={[88, 74, 62]} size={210} />
            </div>
          </Surface>

          {/* Alerts */}
          <Surface className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[13px] text-muted-foreground">Important alerts</p>
                <p className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-[26px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-foreground">
                    12
                  </span>
                  <span className="text-[13px] text-muted-foreground">this week</span>
                </p>
              </div>
              <Stepper label="29 Jun – 5 Jul" />
            </div>

            <div className="mt-5 space-y-3">
              {alerts.map((a) => (
                <div
                  key={a.title}
                  className="rounded-2xl border border-black/[0.06] p-4 dark:border-white/[0.07]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: a.tint }}
                    >
                      {a.icon}
                    </span>
                    <span className="text-[12px] text-muted-foreground">{a.date}</span>
                  </div>
                  <p className="mt-3 text-[14px] font-semibold text-foreground">
                    {a.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                    {a.body}
                  </p>
                </div>
              ))}
            </div>
          </Surface>
        </div>

        {/* Results table */}
        <Surface className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="text-[13px] text-muted-foreground">Total Results</p>
              <p className="mt-1 flex items-baseline gap-1.5">
                <span className="text-[24px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-foreground">
                  540
                </span>
                <span className="text-[13px] text-muted-foreground">patients</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {["All statuses", "All conditions"].map((f) => (
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
                  className="w-28 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
                />
              </label>
            </div>
          </div>
          <Hair />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="text-[12px] text-muted-foreground">
                  {["Patient", "Record", "Condition", "Status", "Last visit"].map((h) => (
                    <th key={h} className="px-5 py-3 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-black/[0.06] text-[13px] transition-colors hover:bg-black/[0.02] dark:border-white/[0.07] dark:hover:bg-white/[0.03]"
                  >
                    <td className="px-5 py-3 font-medium text-foreground">{p.name}</td>
                    <td className="px-5 py-3 tabular-nums text-muted-foreground">{p.id}</td>
                    <td className="px-5 py-3 text-muted-foreground">{p.condition}</td>
                    <td className="px-5 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[12px] font-medium"
                        style={{
                          color: statusTint[p.status],
                          backgroundColor: `${statusTint[p.status]}1F`,
                        }}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{p.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Surface>
      </div>
    </AppleShell>
  );
}
