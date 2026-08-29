"use client";

import * as React from "react";
import {
  AppleShell,
  A,
  initials,
} from "../components/apple-ui";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Archive,
  CornerUpLeft,
  CornerUpRight,
  FileText,
  Flag,
  Inbox,
  Paperclip,
  PenSquare,
  Search,
  Send,
  Star,
  Tag,
  Trash2,
} from "lucide-react";

const boxes = [
  { icon: <Inbox className="h-3.5 w-3.5" />, label: "Inbox", count: 91, tint: A.blue },
  { icon: <Star className="h-3.5 w-3.5" />, label: "Starred", count: 6, tint: A.orange },
  { icon: <Send className="h-3.5 w-3.5" />, label: "Sent", tint: A.teal },
  { icon: <FileText className="h-3.5 w-3.5" />, label: "Drafts", count: 3, tint: A.gray },
  { icon: <Flag className="h-3.5 w-3.5" />, label: "Flagged", count: 2, tint: A.red },
  { icon: <Archive className="h-3.5 w-3.5" />, label: "Archive", tint: A.purple },
  { icon: <Trash2 className="h-3.5 w-3.5" />, label: "Trash", tint: A.gray },
];

const labels = [
  { label: "Design system", color: A.purple },
  { label: "Hiring", color: A.lime },
  { label: "Invoices", color: A.blue },
  { label: "Travel", color: A.pink },
];

type Mail = {
  id: string;
  from: string;
  img: number;
  subject: string;
  preview: string;
  when: string;
  unread?: boolean;
  starred?: boolean;
  attachments?: number;
};

const mails: Mail[] = [
  {
    id: "1",
    from: "Livia Saris",
    img: 5,
    subject: "Design tokens v3 — ready for review",
    preview: "I rebuilt the scale so every step is a multiple of 4. The ramp now holds up in dark mode without a second palette…",
    when: "09:41",
    unread: true,
    starred: true,
    attachments: 2,
  },
  {
    id: "2",
    from: "Jaydon Aminoff",
    img: 12,
    subject: "Activity rings — rounded caps landed",
    preview: "Caps are rounded and the track sits at 20% opacity. Wrapping past 100% works the same way the Fitness app does…",
    when: "09:12",
    unread: true,
  },
  {
    id: "3",
    from: "Board Team",
    img: 24,
    subject: "Weekly digest · 12 shipped changes",
    preview: "Funnel spill, gauge caps, heatmap scale, and the new grouped-list rows across settings…",
    when: "08:30",
    unread: true,
  },
  {
    id: "4",
    from: "Maria Lubin",
    img: 45,
    subject: "Research readout — navigation study",
    preview: "Nine of twelve participants found the grouped sidebar faster than the flat list. Full notes attached…",
    when: "Yesterday",
    attachments: 1,
  },
  {
    id: "5",
    from: "Ann Press",
    img: 32,
    subject: "Staging deploy is green",
    preview: "All checks passed on the release branch. Nothing blocking the Thursday cut…",
    when: "Yesterday",
  },
  {
    id: "6",
    from: "Tomas Berg",
    img: 60,
    subject: "Type specimen for the new display face",
    preview: "Tighter tracking at display sizes, looser at body. Compare the two proofs and tell me which reads better…",
    when: "Friday",
    starred: true,
  },
];

export default function Mail() {
  const [active, setActive] = React.useState("1");
  const open = mails.find((m) => m.id === active) ?? mails[0];

  return (
    <AppleShell title="Mail" action="Compose" actionIcon={<PenSquare className="h-4 w-4" />} notifications={91}>
      <div className="grid gap-4 xl:grid-cols-[220px_320px_minmax(0,1fr)]">
        {/* Mailboxes */}
        <div className="min-w-0 space-y-4">
          <Card className="min-w-0 overflow-hidden py-2">
            {boxes.map((b) => (
              <Button variant="ghost" className="w-full gap-3 px-4 py-2.5" key={b.label}>
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: b.tint }}
                >
                  {b.icon}
                </span>
                <span className="flex-1 text-base text-foreground">{b.label}</span>
                {b.count !== undefined && (
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {b.count}
                  </span>
                )}
              </Button>
            ))}
          </Card>

          <Card className="min-w-0 overflow-hidden">
            <p className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Labels
            </p>
            <Separator />
            {labels.map((l, i) => (
              <React.Fragment key={l.label}>
                {i > 0 && <Separator className="ml-4 w-auto" />}
                <div className="flex items-center gap-2.5 px-4 py-2.5">
                  <Tag className="h-3.5 w-3.5" style={{ color: l.color }} />
                  <span className="text-sm text-foreground">{l.label}</span>
                </div>
              </React.Fragment>
            ))}
          </Card>
        </div>

        {/* Message list */}
        <Card className="min-w-0 overflow-hidden">
          <div className="p-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search mailbox" className="rounded-full pl-8" />
              </div>
          </div>
          <Separator />
          <div className="max-h-[640px] overflow-y-auto">
            {mails.map((m, i) => (
              <React.Fragment key={m.id}>
                {i > 0 && <Separator className="ml-4 w-auto" />}
                <Button variant="ghost" onClick={() => setActive(m.id)}
                  className={`flex w-full gap-3 px-4 py-3 text-left transition-colors ${
                    active === m.id
                      ? "bg-primary/10"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <span
                    className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                      m.unread ? "bg-primary" : "bg-transparent"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-base font-semibold text-foreground">
                        {m.from}
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {m.when}
                      </span>
                    </div>
                    <p className="truncate text-sm text-foreground">{m.subject}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-muted-foreground">
                      {m.preview}
                    </p>
                    {(m.attachments || m.starred) && (
                      <p className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                        {m.starred && (
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current text-[#FF9F0A]" />
                          </span>
                        )}
                        {m.attachments && (
                          <span className="flex items-center gap-1">
                            <Paperclip className="h-3 w-3" /> {m.attachments}
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </Button>
              </React.Fragment>
            ))}
          </div>
        </Card>

        {/* Reading pane */}
        <Card className="min-w-0 flex min-h-[640px] flex-col overflow-hidden">
          <div className="flex items-center gap-1 px-4 py-3">
            {[Archive, Trash2, Flag, CornerUpLeft, CornerUpRight].map((Icon, i) => (
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" key={i}>
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
          <Separator />

          <div className="flex-1 overflow-y-auto p-6">
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
              {open.subject}
            </h2>

            <div className="mt-4 flex items-center gap-3">
              <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={`https://i.pravatar.cc/80?img=${open.img}`} alt="" />
                    <AvatarFallback>{initials(open.from)}</AvatarFallback>
                  </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-base font-medium text-foreground">{open.from}</p>
                <p className="text-xs text-muted-foreground">
                  to me · {open.when}
                </p>
              </div>
              <span className="rounded-md bg-[#8E5BF6]/12 px-2 py-0.5 text-xs font-medium text-[#7C3AED] dark:text-[#B99AFB]">
                Design system
              </span>
            </div>

            <Separator className="my-5" />

            <div className="space-y-4 text-base leading-relaxed text-foreground/85">
              <p>Hi Mertcan,</p>
              <p>{open.preview}</p>
              <p>
                The short version: every surface now uses a single radius scale, hairline
                borders replace shadows, and colour is reserved for data. Chrome stays
                neutral so the charts are the only thing competing for attention.
              </p>
              <p>
                I left the funnel spill at 16% opacity — any higher and the capsules stop
                reading against it. Happy to push it if you disagree.
              </p>
              <p className="text-muted-foreground">— {open.from}</p>
            </div>

            {open.attachments && (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {Array.from({ length: open.attachments }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg border border-border p-3"
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: A.blue }}
                    >
                      <FileText className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {i === 0 ? "tokens-v3.pdf" : "ramp-dark.png"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {i === 0 ? "2.4 MB" : "840 KB"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />
          <div className="flex gap-2 p-4">
            <Button className="h-9 gap-2 rounded-full px-4 text-white">
              <CornerUpLeft className="h-3.5 w-3.5" /> Reply
            </Button>
            <Button variant="outline" className="h-9 gap-2 rounded-full px-4">
              <CornerUpRight className="h-3.5 w-3.5" /> Forward
            </Button>
          </div>
        </Card>
      </div>
    </AppleShell>
  );
}
