"use client";

import * as React from "react";
import {
  AppleShell,
  A,
  Delta,
  Hair,
  MiniStat,
  Row,
  Segmented,
  Stepper,
  Surface,
  seeded,
} from "../components/apple-ui";
import { Columns, Heatmap, Spark } from "../components/apple-charts";
import {
  Bot,
  Github,
  Globe,
  MapPin,
  PencilLine,
  Share,
  Sparkles,
  Terminal,
} from "lucide-react";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const agentBars = (() => {
  const rand = seeded(91);
  return Array.from({ length: 31 }, (_, i) => ({
    label: `${i + 1}`,
    value: Math.round(rand() * 90) + 10,
  }));
})();

const pinned = [
  { icon: <Terminal className="h-3.5 w-3.5" />, name: "design-tokens", desc: "Typed design tokens for the system", trend: [4, 6, 5, 9, 8, 12, 14] },
  { icon: <Bot className="h-3.5 w-3.5" />, name: "agent-runner", desc: "Long-running task orchestration", trend: [9, 7, 8, 6, 9, 11, 10] },
  { icon: <Sparkles className="h-3.5 w-3.5" />, name: "motion-kit", desc: "Spring presets and easing curves", trend: [2, 4, 3, 6, 7, 7, 9] },
];

export default function Profile() {
  return (
    <AppleShell title="Profile" showFilters={false} notifications={3}>
      <div className="mx-auto max-w-[840px] space-y-4">
        <Surface className="overflow-hidden">
          <div className="relative h-[190px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/apple-cover/1200/380"
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute -bottom-9 left-5">
              <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full border-4 border-white bg-black/[0.06] text-[30px] font-medium text-foreground/60 dark:border-[#151517] dark:bg-white/[0.1]">
                M
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 px-5 pt-3">
            <button className="flex h-9 items-center gap-2 rounded-full border border-black/[0.07] px-3.5 text-[13px] font-medium text-foreground/80 transition-colors hover:bg-black/[0.03] dark:border-white/[0.08] dark:hover:bg-white/[0.06]">
              <Share className="h-3.5 w-3.5" /> Share
            </button>
            <button className="flex h-9 items-center gap-2 rounded-full border border-black/[0.07] px-3.5 text-[13px] font-medium text-foreground/80 transition-colors hover:bg-black/[0.03] dark:border-white/[0.08] dark:hover:bg-white/[0.06]">
              <PencilLine className="h-3.5 w-3.5" /> Edit
            </button>
          </div>

          <div className="px-5 pb-5 pt-4">
            <h2 className="text-[24px] font-semibold tracking-[-0.02em] text-foreground">
              Mertcan Esmergül
            </h2>
            <p className="mt-1 flex items-center gap-2 text-[14px] text-muted-foreground">
              @sitenley
              <span className="rounded-md bg-black/[0.06] px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-foreground/70 dark:bg-white/[0.1]">
                Pro
              </span>
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Istanbul, Türkiye
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" /> boardui.com
              </span>
              <span className="flex items-center gap-1.5">
                <Github className="h-3.5 w-3.5" /> sitenley
              </span>
            </div>

            <p className="mt-6 text-[13px] text-muted-foreground">
              Contributions this year
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-[26px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-foreground">
                $7,462
              </span>
              <span className="rounded-md bg-[#8E5BF6]/12 px-1.5 py-0.5 text-[12px] font-medium tabular-nums text-[#7C3AED] dark:text-[#B99AFB]">
                +14.8%
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MiniStat value="9B" label="Lifetime tokens" />
              <MiniStat value="562.7M" label="Peak tokens" />
              <MiniStat value="12h 54m" label="Longest task" />
              <MiniStat value="62 days" label="Top streak" />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-[13px] text-muted-foreground">Activity</p>
              <Segmented options={["Weekly", "Monthly", "Yearly"]} />
            </div>
            <Heatmap className="mt-4" weeks={52} seed={5} />
          </div>
        </Surface>

        <Surface className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[13px] text-muted-foreground">Agents</p>
              <p className="mt-1 text-[24px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-foreground">
                32 agents
              </p>
            </div>
            <Stepper label="December" />
          </div>
          <Columns
            className="mt-6"
            data={agentBars}
            color="#C9A7FB"
            height={220}
          />
        </Surface>

        <Surface className="overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <p className="text-[14px] font-medium text-foreground">Pinned</p>
            <span className="text-[13px] text-muted-foreground">Last 7 days</span>
          </div>
          <Hair />
          {pinned.map((p, i) => (
            <React.Fragment key={p.name}>
              {i > 0 && <Hair className="ml-14" />}
              <Row
                icon={p.icon}
                tint={A.blue}
                title={p.name}
                subtitle={p.desc}
                right={<Spark data={p.trend} color={A.green} />}
              />
            </React.Fragment>
          ))}
        </Surface>
      </div>
    </AppleShell>
  );
}
