"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Download, FileText, TrendingUp } from "lucide-react";

const revenueConfig = {
  billed: { label: "Billed", color: "hsl(var(--chart-1))" },
  collected: { label: "Collected", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const revenueData = [
  { month: "Jan", billed: 82000, collected: 71000 },
  { month: "Feb", billed: 88000, collected: 79000 },
  { month: "Mar", billed: 91000, collected: 84000 },
  { month: "Apr", billed: 86000, collected: 80000 },
  { month: "May", billed: 97000, collected: 90000 },
  { month: "Jun", billed: 104000, collected: 96000 },
];

type Invoice = {
  id: string;
  patient: string;
  service: string;
  amount: string;
  date: string;
  status: "Paid" | "Pending" | "Overdue";
};

const invoices: Invoice[] = [
  { id: "INV-9042", patient: "Emma Johnson", service: "Annual physical", amount: "$220.00", date: "Jul 5", status: "Paid" },
  { id: "INV-9043", patient: "Liam Chen", service: "Cardiac echo", amount: "$680.00", date: "Jul 5", status: "Pending" },
  { id: "INV-9044", patient: "Sofia Rossi", service: "Blood panel", amount: "$140.00", date: "Jul 4", status: "Paid" },
  { id: "INV-9045", patient: "Noah Patel", service: "Skin biopsy", amount: "$310.00", date: "Jul 3", status: "Overdue" },
  { id: "INV-9046", patient: "Ava Martinez", service: "Ultrasound", amount: "$260.00", date: "Jul 2", status: "Pending" },
  { id: "INV-9047", patient: "Mia Wong", service: "Diabetes review", amount: "$180.00", date: "Jun 30", status: "Paid" },
];

const statusVariant: Record<Invoice["status"], "success" | "yellow" | "decline"> = {
  Paid: "success",
  Pending: "yellow",
  Overdue: "decline",
};

export default function BillingPage() {
  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Billing">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Billing</h2>
              <p className="text-muted-foreground mt-1">
                Revenue, invoices and insurance claims
              </p>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export report
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Billed this month", value: "$104,000", sub: "+7% MoM" },
              { label: "Collected", value: "$96,000", sub: "92% collection rate" },
              { label: "Outstanding", value: "$8,000", sub: "12 open invoices" },
              { label: "Overdue", value: "$310", sub: "1 invoice" },
            ].map((s) => (
              <Card key={s.label} className="bg-muted border-none">
                <CardHeader className="pb-2">
                  <CardDescription>{s.label}</CardDescription>
                  <CardTitle className="text-2xl tabular-nums">
                    {s.value}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  {s.sub}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-muted border-none">
            <CardHeader>
              <CardTitle>Billed vs Collected</CardTitle>
              <CardDescription>Last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={revenueConfig}
                className="aspect-auto h-[240px] w-full"
              >
                <AreaChart
                  accessibilityLayer
                  data={revenueData}
                  margin={{ left: 12, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <defs>
                    <linearGradient id="fillBilled" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-billed)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-billed)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="fillCollected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-collected)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-collected)" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <Area dataKey="billed" type="natural" fill="url(#fillBilled)" fillOpacity={0.4} stroke="var(--color-billed)" stackId="a" />
                  <Area dataKey="collected" type="natural" fill="url(#fillCollected)" fillOpacity={0.4} stroke="var(--color-collected)" stackId="b" />
                </AreaChart>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-2 text-sm">
                Collection rate up to 92% <TrendingUp className="h-4 w-4" />
              </div>
            </CardFooter>
          </Card>

          <Card className="bg-muted border-none">
            <CardHeader>
              <CardTitle>Recent invoices</CardTitle>
              <CardDescription>{invoices.length} of 148 invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Invoice</TableHead>
                    <TableHead className="hidden sm:table-cell">Patient</TableHead>
                    <TableHead className="hidden md:table-cell">Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="leading-none">{inv.id}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {inv.date}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {inv.patient}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {inv.service}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[inv.status]}>
                          {inv.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {inv.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
