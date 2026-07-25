"use client";

import * as React from "react";
import {
  Trash2,
  Link2,
  Ellipsis,
  Users,
  UserCheck,
  Layers,
  MailPlus,
  Search,
  Download,
  Crown,
  ArrowUpRight,
  Send,
  X,
  Clock,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import TeamDialog from "@/components/team-dialog";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  role: string;
  status: "Active" | "Offline";
  teams: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Smith",
    username: "@j.smith",
    email: "johnsmith@dashco.com",
    avatar: "https://i.pravatar.cc/150?u=john.smith",
    role: "Product Lead",
    status: "Active",
    teams: ["Design", "Product"],
  },
  {
    id: "2",
    name: "Ahmed Medi",
    username: "@ahmed.medi",
    email: "ahmedmedi@dashco.com",
    avatar: "https://i.pravatar.cc/150?u=ahmed.medi",
    role: "Senior Engineer",
    status: "Active",
    teams: ["Development", "Product"],
  },
  {
    id: "3",
    name: "Mitchell Luo",
    username: "@mitchell.luo",
    email: "mitchelluo@dashco.com",
    avatar: "https://i.pravatar.cc/150?u=mitchell.luo",
    role: "Growth Marketer",
    status: "Active",
    teams: ["Marketing", "Product"],
  },
  {
    id: "4",
    name: "Olivia Wilson",
    username: "@o.wilson",
    email: "oliviawilson@dashco.com",
    avatar: "https://i.pravatar.cc/150?u=olivia.wilson",
    role: "Design Lead",
    status: "Offline",
    teams: ["Design", "Marketing"],
  },
  {
    id: "5",
    name: "Emma Thompson",
    username: "@e.thompson",
    email: "emmathompson@dashco.com",
    avatar: "https://i.pravatar.cc/150?u=emma.thompson",
    role: "Frontend Engineer",
    status: "Active",
    teams: ["Development", "Product"],
  },
  {
    id: "6",
    name: "Liam Carter",
    username: "@l.carter",
    email: "liamcarter@dashco.com",
    avatar: "https://i.pravatar.cc/150?u=liam.carter",
    role: "UX Researcher",
    status: "Active",
    teams: ["Design"],
  },
  {
    id: "7",
    name: "Sofia Reyes",
    username: "@s.reyes",
    email: "sofiareyes@dashco.com",
    avatar: "https://i.pravatar.cc/150?u=sofia.reyes",
    role: "Content Strategist",
    status: "Offline",
    teams: ["Marketing"],
  },
  {
    id: "8",
    name: "Noah Bennett",
    username: "@n.bennett",
    email: "noahbennett@dashco.com",
    avatar: "https://i.pravatar.cc/150?u=noah.bennett",
    role: "Backend Engineer",
    status: "Active",
    teams: ["Development"],
  },
];

const teamStyles: Record<
  string,
  { dot: string; tint: string; bar: string; ring: string }
> = {
  Design: {
    dot: "bg-rose-500",
    tint: "text-rose-600 dark:text-rose-400",
    bar: "[&>div]:bg-rose-500",
    ring: "bg-rose-500/10",
  },
  Product: {
    dot: "bg-amber-500",
    tint: "text-amber-600 dark:text-amber-400",
    bar: "[&>div]:bg-amber-500",
    ring: "bg-amber-500/10",
  },
  Development: {
    dot: "bg-sky-500",
    tint: "text-sky-600 dark:text-sky-400",
    bar: "[&>div]:bg-sky-500",
    ring: "bg-sky-500/10",
  },
  Marketing: {
    dot: "bg-emerald-500",
    tint: "text-emerald-600 dark:text-emerald-400",
    bar: "[&>div]:bg-emerald-500",
    ring: "bg-emerald-500/10",
  },
};

const teams = [
  { name: "Design", members: 6, lead: "Olivia Wilson", capacity: 82 },
  { name: "Product", members: 8, lead: "John Smith", capacity: 95 },
  { name: "Development", members: 7, lead: "Emma Thompson", capacity: 70 },
  { name: "Marketing", members: 4, lead: "Mitchell Luo", capacity: 58 },
];

const pendingInvites = [
  { email: "grace.kim@dashco.com", role: "Product Designer", sent: "2h ago" },
  { email: "victor.osei@dashco.com", role: "DevOps Engineer", sent: "1d ago" },
  { email: "mira.singh@dashco.com", role: "QA Analyst", sent: "3d ago" },
];

const activity = [
  { who: "John Smith", action: "invited a new member to Product", time: "12m ago" },
  { who: "Emma Thompson", action: "was promoted to Frontend Lead", time: "2h ago" },
  { who: "Sofia Reyes", action: "left the Marketing team", time: "5h ago" },
  { who: "Ahmed Medi", action: "joined the Development team", time: "Yesterday" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

function Stat({
  icon: Icon,
  label,
  value,
  hint,
  tint,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  hint: string;
  tint: string;
}) {
  return (
    <Card className="border-none bg-muted">
      <CardContent className="flex items-start gap-3 p-4">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            tint
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-0.5 text-2xl font-semibold tabular-nums leading-none">
            {value}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TeamMembers() {
  const [selectedMembers, setSelectedMembers] = React.useState<Set<string>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<
    "all" | "Active" | "Offline"
  >("all");

  const filteredMembers = teamMembers.filter((member) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      member.name.toLowerCase().includes(q) ||
      member.email.toLowerCase().includes(q) ||
      member.role.toLowerCase().includes(q);
    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleMember = (memberId: string) => {
    const newSelected = new Set(selectedMembers);
    if (newSelected.has(memberId)) newSelected.delete(memberId);
    else newSelected.add(memberId);
    setSelectedMembers(newSelected);
  };

  const allVisibleSelected =
    filteredMembers.length > 0 &&
    filteredMembers.every((m) => selectedMembers.has(m.id));

  const toggleAll = () => {
    if (allVisibleSelected) {
      setSelectedMembers(new Set());
    } else {
      setSelectedMembers(new Set(filteredMembers.map((member) => member.id)));
    }
  };

  const activeCount = teamMembers.filter((m) => m.status === "Active").length;

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Teams">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants}
      >
        <div className="space-y-6 p-2 sm:p-4">
          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Team Members
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage members, roles and invitations across your workspace.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" className="gap-2 text-sm">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <TeamDialog />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <span className="sr-only">More actions</span>
                    <Ellipsis className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Manage roles</DropdownMenuItem>
                  <DropdownMenuItem>Permission groups</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Team settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Stat
              icon={Users}
              label="Total members"
              value={String(teamMembers.length)}
              hint="+3 this month"
              tint="bg-primary/10 text-primary"
            />
            <Stat
              icon={UserCheck}
              label="Active now"
              value={String(activeCount)}
              hint="online today"
              tint="bg-emerald-500/10 text-emerald-500"
            />
            <Stat
              icon={Layers}
              label="Teams"
              value={String(teams.length)}
              hint="across the org"
              tint="bg-sky-500/10 text-sky-500"
            />
            <Stat
              icon={MailPlus}
              label="Pending invites"
              value={String(pendingInvites.length)}
              hint="awaiting response"
              tint="bg-amber-500/10 text-amber-500"
            />
          </div>

          {/* Teams grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {teams.map((team) => {
              const s = teamStyles[team.name];
              const avatars = teamMembers
                .filter((m) => m.teams.includes(team.name))
                .map((m) => ({ src: m.avatar, fallback: initials(m.name) }));
              return (
                <Card
                  key={team.name}
                  className="group border-none bg-muted transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn("h-2.5 w-2.5 rounded-full", s.dot)} />
                        <h3 className="font-semibold tracking-tight">
                          {team.name}
                        </h3>
                      </div>
                      <Badge variant="secondary" className="tabular-nums">
                        {team.members}
                      </Badge>
                    </div>

                    <div className="mt-4">
                      <AvatarGroup
                        avatars={avatars}
                        max={4}
                        className="[&_.h-10]:h-9 [&_.w-10]:w-9"
                      />
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Crown className={cn("h-3.5 w-3.5", s.tint)} />
                      Lead · <span className="text-foreground">{team.lead}</span>
                    </div>

                    <div className="mt-3">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Capacity</span>
                        <span className="font-medium tabular-nums">
                          {team.capacity}%
                        </span>
                      </div>
                      <Progress value={team.capacity} className={cn("h-1.5", s.bar)} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Members table */}
            <Card className="border-none bg-muted lg:col-span-2">
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold tracking-tight">
                      Members
                    </h2>
                    <Badge variant="secondary" className="tabular-nums">
                      {filteredMembers.length}
                    </Badge>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search members…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-9 border-none bg-background pl-9 shadow-none"
                    />
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <Tabs
                    value={statusFilter}
                    onValueChange={(v) =>
                      setStatusFilter(v as "all" | "Active" | "Offline")
                    }
                  >
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="Active">Active</TabsTrigger>
                      <TabsTrigger value="Offline">Offline</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  {selectedMembers.size > 0 && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="tabular-nums">
                        {selectedMembers.size} selected
                      </span>
                      <Button size="sm" variant="outline" className="h-8 gap-1.5">
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mt-3 overflow-x-auto">
                  <Table className="min-w-[640px] [&_tr]:border-border">
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[40px]">
                          <Checkbox
                            checked={allVisibleSelected}
                            onCheckedChange={toggleAll}
                          />
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Role
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Status
                        </TableHead>
                        <TableHead>Teams</TableHead>
                        <TableHead className="w-[80px] text-right">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMembers.map((member) => (
                        <TableRow key={member.id} className="group">
                          <TableCell>
                            <Checkbox
                              checked={selectedMembers.has(member.id)}
                              onCheckedChange={() => toggleMember(member.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <Avatar className="h-9 w-9">
                                  <AvatarImage
                                    src={member.avatar}
                                    alt={member.name}
                                  />
                                  <AvatarFallback>
                                    {initials(member.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <span
                                  className={cn(
                                    "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-muted",
                                    member.status === "Active"
                                      ? "bg-emerald-500"
                                      : "bg-muted-foreground/40"
                                  )}
                                />
                              </div>
                              <div className="min-w-0">
                                <div className="truncate text-sm font-medium">
                                  {member.name}
                                </div>
                                <div className="truncate text-xs text-muted-foreground">
                                  {member.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                            {member.role}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <span className="inline-flex items-center gap-1.5 text-sm">
                              <span
                                className={cn(
                                  "h-2 w-2 rounded-full",
                                  member.status === "Active"
                                    ? "bg-emerald-500"
                                    : "bg-muted-foreground/40"
                                )}
                              />
                              {member.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {member.teams.map((team) => (
                                <Badge
                                  key={team}
                                  variant="secondary"
                                  className={cn(
                                    "text-xs font-medium",
                                    teamStyles[team]?.tint
                                  )}
                                >
                                  {team}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View profile</DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                  <Link2 className="h-4 w-4" /> Copy link
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                                  <Trash2 className="h-4 w-4" /> Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {filteredMembers.length === 0 && (
                    <div className="py-12 text-center text-sm text-muted-foreground">
                      No members match your filters.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Side column */}
            <div className="space-y-4">
              {/* Pending invites */}
              <Card className="border-none bg-muted">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold tracking-tight">
                      Pending invites
                    </h2>
                    <Badge variant="secondary" className="tabular-nums">
                      {pendingInvites.length}
                    </Badge>
                  </div>
                  <div className="mt-3 space-y-3">
                    {pendingInvites.map((inv) => (
                      <div
                        key={inv.email}
                        className="flex items-center gap-3 rounded-xl bg-background p-3"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                          <MailPlus className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {inv.email}
                          </p>
                          <p className="flex items-center gap-1 text-xs text-muted-foreground">
                            {inv.role}
                            <span className="text-muted-foreground/50">·</span>
                            <Clock className="h-3 w-3" /> {inv.sent}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-muted-foreground"
                            aria-label="Resend invite"
                          >
                            <Send className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-muted-foreground"
                            aria-label="Cancel invite"
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Activity */}
              <Card className="border-none bg-muted">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold tracking-tight">
                      Recent activity
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 gap-1 text-xs text-muted-foreground"
                    >
                      View all
                      <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="mt-4 space-y-4">
                    {activity.map((a, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                          {i < activity.length - 1 && (
                            <span className="mt-1 w-px flex-1 bg-border" />
                          )}
                        </div>
                        <div className="-mt-0.5 pb-1">
                          <p className="text-sm">
                            <span className="font-medium">{a.who}</span>{" "}
                            <span className="text-muted-foreground">
                              {a.action}
                            </span>
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {a.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
