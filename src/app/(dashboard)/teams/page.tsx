"use client";

import * as React from "react";
import { Trash2, Link, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

interface TeamMember {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
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
    status: "Active",
    teams: ["Design", "Product"],
  },
  {
    id: "2",
    name: "Ahmed Medi",
    username: "@ahmed.medi",
    email: "ahmedmedi@dashco.com",
    avatar: "https://i.pravatar.cc/150?u=ahmed.medi",
    status: "Active",
    teams: ["Development", "Product"],
  },
  {
    id: "3",
    name: "Mitchell Luo",
    username: "@mitchell.luo",
    email: "mitchelluo@dashco.com",
    avatar: "https://i.pravatar.cc/150?u=mitchell.luo",
    status: "Active",
    teams: ["Marketing", "Product"],
  },
  {
    id: "4",
    name: "Olivia Wilson",
    username: "@o.wilson",
    email: "oliviawilson@dashco.com",
    avatar: "https://i.pravatar.cc/150?u=olivia.wilson",
    status: "Offline",
    teams: ["Design", "Marketing"],
  },
  {
    id: "5",
    name: "Emma Thompson",
    username: "@e.thompson",
    email: "emmathompson@dashco.com",
    avatar: "https://i.pravatar.cc/150?u=emma.thompson",
    status: "Active",
    teams: ["Development", "Product"],
  },
];

export default function TeamMembers() {
  const [selectedMembers, setSelectedMembers] = React.useState<Set<string>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMember = (memberId: string) => {
    const newSelected = new Set(selectedMembers);
    if (newSelected.has(memberId)) {
      newSelected.delete(memberId);
    } else {
      newSelected.add(memberId);
    }
    setSelectedMembers(newSelected);
  };

  const toggleAll = () => {
    if (selectedMembers.size === teamMembers.length) {
      setSelectedMembers(new Set());
    } else {
      setSelectedMembers(new Set(teamMembers.map((member) => member.id)));
    }
  };

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Teams">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants1}
      >
        <div className="space-y-4 p-2 sm:p-4 bg-background">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-normal mb-2 sm:mb-8 text-foreground">
                Team Members
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <Button variant="outline" className="text-sm">
                Download CSV
              </Button>
              <TeamDialog />
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:inline-flex"
              >
                <span className="sr-only">More actions</span>
                <Ellipsis />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Input
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:max-w-sm bg-muted shadow-none border-none"
            />
          </div>
          <div className="overflow-x-auto">
            <Table className="[&_tr]:border-b-0 min-w-[800px]">
              <TableHeader className="bg-muted rounded-md">
                <TableRow>
                  <TableHead className="first:rounded-tl-md last:rounded-tr-md w-[40px]">
                    <Checkbox
                      checked={selectedMembers.size === teamMembers.length}
                      onCheckedChange={toggleAll}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Email address
                  </TableHead>
                  <TableHead>Teams</TableHead>
                  <TableHead className="w-[100px] first:rounded-tl-md last:rounded-tr-md">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedMembers.has(member.id)}
                        onCheckedChange={() => toggleMember(member.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm sm:text-base">
                            {member.name}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground">
                            {member.username}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        variant={
                          member.status === "Active" ? "secondary" : "secondary"
                        }
                        className="items-center gap-2"
                      >
                        <div
                          className={`h-2 w-2 rounded-full ${
                            member.status === "Active"
                              ? "bg-green-400"
                              : "bg-red-400"
                          }`}
                        />
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {member.email}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {member.teams.map((team) => (
                          <Badge
                            key={team}
                            variant="primary"
                            className="text-xs"
                          >
                            {team}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Link className="h-4 w-4" />
                          <span className="sr-only">Copy link</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
