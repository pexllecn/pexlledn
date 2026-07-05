"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, UserRound } from "lucide-react";

type Patient = {
  name: string;
  id: string;
  age: number;
  gender: "M" | "F";
  condition: string;
  lastVisit: string;
  risk: "Low" | "Medium" | "High";
  avatar: string;
  fallback: string;
};

const patients: Patient[] = [
  { name: "Emma Johnson", id: "PT-1042", age: 34, gender: "F", condition: "Hypertension", lastVisit: "Jul 5, 2026", risk: "Medium", avatar: "/avatar-80-01.jpg", fallback: "EJ" },
  { name: "Liam Chen", id: "PT-1043", age: 58, gender: "M", condition: "Coronary artery disease", lastVisit: "Jul 5, 2026", risk: "High", avatar: "/avatar-80-02.jpg", fallback: "LC" },
  { name: "Sofia Rossi", id: "PT-1044", age: 27, gender: "F", condition: "Anemia", lastVisit: "Jul 4, 2026", risk: "Low", avatar: "/avatar-80-03.jpg", fallback: "SR" },
  { name: "Noah Patel", id: "PT-1045", age: 41, gender: "M", condition: "Eczema", lastVisit: "Jul 3, 2026", risk: "Low", avatar: "/avatar-80-04.jpg", fallback: "NP" },
  { name: "Ava Martinez", id: "PT-1046", age: 31, gender: "F", condition: "Pregnancy · 2nd trimester", lastVisit: "Jul 2, 2026", risk: "Medium", avatar: "/avatar-80-05.jpg", fallback: "AM" },
  { name: "Ethan Brooks", id: "PT-1047", age: 46, gender: "M", condition: "Lower back injury", lastVisit: "Jun 30, 2026", risk: "Low", avatar: "/avatar-80-06.jpg", fallback: "EB" },
  { name: "Mia Wong", id: "PT-1048", age: 52, gender: "F", condition: "Type 2 diabetes", lastVisit: "Jun 28, 2026", risk: "High", avatar: "/avatar-80-07.jpg", fallback: "MW" },
];

const riskVariant: Record<Patient["risk"], "success" | "yellow" | "decline"> = {
  Low: "success",
  Medium: "yellow",
  High: "decline",
};

export default function PatientsPage() {
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState("all");

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const filtered = patients.filter((p) => {
    const q =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.id.toLowerCase().includes(query.toLowerCase());
    const r = risk === "all" || p.risk === risk;
    return q && r;
  });

  return (
    <ContentLayout title="Patients">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Patients</h2>
              <p className="text-muted-foreground mt-1">
                {patients.length} active patient records
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add patient
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "Total patients", value: "1,284" },
              { label: "New this month", value: "62" },
              { label: "High-risk", value: "48" },
            ].map((s) => (
              <Card key={s.label} className="bg-muted border-none">
                <CardHeader className="pb-2">
                  <CardDescription>{s.label}</CardDescription>
                  <CardTitle className="text-2xl tabular-nums">
                    {s.value}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="bg-muted border-none">
            <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 md:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search name or ID..."
                  className="pl-9"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Tabs value={risk} onValueChange={setRisk}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="Low">Low</TabsTrigger>
                  <TabsTrigger value="Medium">Medium</TabsTrigger>
                  <TabsTrigger value="High">High</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Patient</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Condition
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Last visit
                    </TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={p.avatar} />
                            <AvatarFallback>{p.fallback}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="leading-none">{p.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {p.id} · {p.age}
                              {p.gender}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {p.condition}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {p.lastVisit}
                      </TableCell>
                      <TableCell>
                        <Badge variant={riskVariant[p.risk]}>{p.risk}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Open
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-muted-foreground py-8"
                      >
                        No patients match your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
