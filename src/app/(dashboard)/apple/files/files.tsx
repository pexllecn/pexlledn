"use client";

import * as React from "react";
import {
  AppleShell,
  A,
  Hair,
  Row,
  Segmented,
  Surface,
} from "../components/apple-ui";
import { Donut, Meter } from "../components/apple-charts";
import {
  Clock,
  Cloud,
  FileArchive,
  FileCode2,
  FileText,
  Film,
  Folder,
  HardDrive,
  Image as ImageIcon,
  Music2,
  Share2,
  Star,
  Tag,
  Trash2,
  Upload,
} from "lucide-react";

const places = [
  { icon: <Cloud className="h-3.5 w-3.5" />, tint: A.blue, label: "iCloud Drive", meta: "184 GB of 2 TB" },
  { icon: <HardDrive className="h-3.5 w-3.5" />, tint: A.gray, label: "On My Mac", meta: "412 GB free" },
  { icon: <Share2 className="h-3.5 w-3.5" />, tint: A.teal, label: "Shared", meta: "12 items" },
  { icon: <Clock className="h-3.5 w-3.5" />, tint: A.orange, label: "Recents", meta: "Last 30 days" },
  { icon: <Star className="h-3.5 w-3.5" />, tint: A.pink, label: "Favorites", meta: "9 items" },
  { icon: <Trash2 className="h-3.5 w-3.5" />, tint: A.gray, label: "Trash", meta: "2.4 GB" },
];

const tags = [
  { label: "Design system", color: A.purple },
  { label: "Handoff", color: A.blue },
  { label: "Archive", color: A.gray },
  { label: "Urgent", color: A.red },
];

const folders = [
  { name: "Design System", items: 248, size: "4.2 GB", color: A.blue },
  { name: "Marketing", items: 96, size: "1.8 GB", color: A.lime },
  { name: "Research", items: 142, size: "820 MB", color: A.purple },
  { name: "Brand Assets", items: 512, size: "12.4 GB", color: A.pink },
];

type FileRow = {
  icon: React.ReactNode;
  tint: string;
  name: string;
  kind: string;
  size: string;
  when: string;
};

const files: FileRow[] = [
  { icon: <FileText className="h-3.5 w-3.5" />, tint: A.blue, name: "tokens-v3.pdf", kind: "PDF Document", size: "2.4 MB", when: "Today, 09:41" },
  { icon: <ImageIcon className="h-3.5 w-3.5" />, tint: A.purple, name: "ramp-dark.png", kind: "PNG Image", size: "840 KB", when: "Today, 09:12" },
  { icon: <FileCode2 className="h-3.5 w-3.5" />, tint: A.teal, name: "apple-charts.tsx", kind: "TypeScript", size: "24 KB", when: "Today, 08:04" },
  { icon: <Film className="h-3.5 w-3.5" />, tint: A.pink, name: "rings-motion.mov", kind: "QuickTime", size: "148 MB", when: "Yesterday" },
  { icon: <Music2 className="h-3.5 w-3.5" />, tint: A.orange, name: "haptics-tap.wav", kind: "Audio", size: "1.1 MB", when: "Yesterday" },
  { icon: <FileArchive className="h-3.5 w-3.5" />, tint: A.gray, name: "handoff-jul.zip", kind: "Archive", size: "312 MB", when: "Friday" },
  { icon: <FileText className="h-3.5 w-3.5" />, tint: A.blue, name: "research-notes.md", kind: "Markdown", size: "18 KB", when: "Friday" },
];

const storage = [
  { label: "Photos", pct: 42, size: "78 GB", color: A.lime },
  { label: "Documents", pct: 24, size: "44 GB", color: A.blue },
  { label: "Backups", pct: 19, size: "35 GB", color: A.purple },
  { label: "Mail", pct: 9, size: "17 GB", color: A.pink },
  { label: "Other", pct: 6, size: "10 GB", color: A.gray },
];

export default function Files() {
  return (
    <AppleShell
      title="Files"
      action="Upload"
      actionIcon={<Upload className="h-4 w-4" />}
      aside={<Segmented options={["Icons", "List", "Columns"]} value="List" />}
    >
      <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
        {/* Sidebar */}
        <div className="min-w-0 space-y-4">
          <Surface className="overflow-hidden">
            <p className="px-4 py-3 text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
              Locations
            </p>
            <Hair />
            {places.map((p, i) => (
              <React.Fragment key={p.label}>
                {i > 0 && <Hair className="ml-14" />}
                <Row icon={p.icon} tint={p.tint} title={p.label} subtitle={p.meta} />
              </React.Fragment>
            ))}
          </Surface>

          <Surface className="overflow-hidden">
            <p className="px-4 py-3 text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
              Tags
            </p>
            <Hair />
            {tags.map((t, i) => (
              <React.Fragment key={t.label}>
                {i > 0 && <Hair className="ml-4" />}
                <div className="flex items-center gap-2.5 px-4 py-2.5">
                  <Tag className="h-3.5 w-3.5" style={{ color: t.color }} />
                  <span className="text-[13px] text-foreground">{t.label}</span>
                </div>
              </React.Fragment>
            ))}
          </Surface>

          <Surface className="p-5">
            <p className="text-[14px] font-medium text-foreground">iCloud storage</p>
            <div className="mt-4 flex items-center gap-4">
              <Donut pct={64} color={A.blue} size={92} label="64%" />
              <div className="min-w-0">
                <p className="text-[18px] font-semibold tabular-nums text-foreground">
                  184 GB
                </p>
                <p className="text-[12px] text-muted-foreground">used of 2 TB</p>
              </div>
            </div>
            <div className="mt-5 space-y-2.5">
              {storage.map((s) => (
                <div key={s.label}>
                  <div className="mb-1 flex items-center justify-between text-[12px]">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      {s.label}
                    </span>
                    <span className="tabular-nums text-muted-foreground">{s.size}</span>
                  </div>
                  <Meter pct={s.pct} color={s.color} />
                </div>
              ))}
            </div>
          </Surface>
        </div>

        {/* Browser */}
        <div className="min-w-0 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {folders.map((f) => (
              <Surface key={f.name} className="p-4 transition-colors hover:bg-black/[0.015] dark:hover:bg-white/[0.05]">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: f.color }}
                >
                  <Folder className="h-5 w-5" />
                </span>
                <p className="mt-3 truncate text-[14px] font-medium text-foreground">
                  {f.name}
                </p>
                <p className="mt-0.5 text-[12px] tabular-nums text-muted-foreground">
                  {f.items} items · {f.size}
                </p>
              </Surface>
            ))}
          </div>

          <Surface className="overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-[13px] text-muted-foreground">iCloud Drive</p>
                <p className="mt-0.5 text-[18px] font-semibold tracking-[-0.02em] text-foreground">
                  Recents
                </p>
              </div>
              <span className="text-[13px] tabular-nums text-muted-foreground">
                {files.length} items
              </span>
            </div>
            <Hair />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left">
                <thead>
                  <tr className="text-[12px] text-muted-foreground">
                    {["Name", "Kind", "Size", "Date modified"].map((h) => (
                      <th key={h} className="px-5 py-2.5 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {files.map((f) => (
                    <tr
                      key={f.name}
                      className="border-t border-black/[0.06] text-[13px] transition-colors hover:bg-black/[0.02] dark:border-white/[0.07] dark:hover:bg-white/[0.03]"
                    >
                      <td className="px-5 py-2.5">
                        <span className="flex items-center gap-2.5">
                          <span
                            className="flex h-7 w-7 items-center justify-center rounded-[8px] text-white"
                            style={{ backgroundColor: f.tint }}
                          >
                            {f.icon}
                          </span>
                          <span className="font-medium text-foreground">{f.name}</span>
                        </span>
                      </td>
                      <td className="px-5 py-2.5 text-muted-foreground">{f.kind}</td>
                      <td className="px-5 py-2.5 tabular-nums text-muted-foreground">
                        {f.size}
                      </td>
                      <td className="px-5 py-2.5 text-muted-foreground">{f.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Surface>
        </div>
      </div>
    </AppleShell>
  );
}
