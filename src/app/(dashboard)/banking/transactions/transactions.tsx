"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarIcon,
  Copy,
  Download,
  Flag,
  MoreHorizontal,
  Receipt,
  Search,
} from "lucide-react";

type Tx = {
  name: string;
  category: string;
  account: string;
  date: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
};

const data: Tx[] = [
  { name: "Salary — Pexlle Inc.", category: "Income", account: "Checking", date: "Jul 5, 2026", amount: 5400, status: "Completed" },
  { name: "Spotify Premium", category: "Subscriptions", account: "Credit", date: "Jul 5, 2026", amount: -11.99, status: "Completed" },
  { name: "Whole Foods Market", category: "Groceries", account: "Checking", date: "Jul 4, 2026", amount: -86.24, status: "Completed" },
  { name: "Transfer to Savings", category: "Transfer", account: "Checking", date: "Jul 3, 2026", amount: -500, status: "Completed" },
  { name: "Uber", category: "Transport", account: "Credit", date: "Jul 3, 2026", amount: -18.5, status: "Completed" },
  { name: "Refund — Amazon", category: "Shopping", account: "Credit", date: "Jul 2, 2026", amount: 42.1, status: "Completed" },
  { name: "Apartment Rent", category: "Housing", account: "Checking", date: "Jul 1, 2026", amount: -1850, status: "Completed" },
  { name: "Freelance — Acme", category: "Income", account: "Business", date: "Jun 30, 2026", amount: 1200, status: "Pending" },
  { name: "Delta Airlines", category: "Travel", account: "Credit", date: "Jun 29, 2026", amount: -420.3, status: "Completed" },
  { name: "Wire — Overseas", category: "Transfer", account: "Checking", date: "Jun 28, 2026", amount: -900, status: "Failed" },
];

const statusVariant: Record<Tx["status"], "success" | "yellow" | "decline"> = {
  Completed: "success",
  Pending: "yellow",
  Failed: "decline",
};

export default function TransactionsPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [account, setAccount] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>();

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const filtered = data.filter((tx) => {
    const q = tx.name.toLowerCase().includes(query.toLowerCase());
    const t =
      type === "all" ||
      (type === "in" && tx.amount > 0) ||
      (type === "out" && tx.amount < 0);
    const a = account === "all" || tx.account === account;
    return q && t && a;
  });

  const income = data.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const spend = data.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <ContentLayout title="Transactions">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Transactions</h2>
              <p className="text-muted-foreground mt-1">
                {data.length} transactions across all accounts
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() =>
                toast.success("Export started", {
                  description: `${
                    selected.length || data.length
                  } transactions will be emailed as CSV.`,
                })
              }
            >
              <Download className="mr-2 h-4 w-4" />
              Export{selected.length ? ` (${selected.length})` : " CSV"}
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-muted border-none">
              <CardHeader className="pb-2">
                <CardDescription>Total income</CardDescription>
                <CardTitle className="text-2xl tabular-nums text-emerald-500">
                  +${income.toLocaleString()}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Across 3 deposits
              </CardContent>
            </Card>
            <Card className="bg-muted border-none">
              <CardHeader className="pb-2">
                <CardDescription>Total spending</CardDescription>
                <CardTitle className="text-2xl tabular-nums">
                  -${spend.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Across 7 payments
              </CardContent>
            </Card>
            <Card className="bg-muted border-none">
              <CardHeader className="pb-2">
                <CardDescription>Net flow</CardDescription>
                <CardTitle className="text-2xl tabular-nums">
                  +${(income - spend).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                This period
              </CardContent>
            </Card>
          </div>

          <Card className="bg-muted border-none">
            <CardHeader className="gap-3">
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="relative flex-1 md:max-w-xs">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-9"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Kbd className="absolute right-2 top-1/2 -translate-y-1/2">
                    /
                  </Kbd>
                </div>
                <Tabs value={type} onValueChange={setType}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="in">Income</TabsTrigger>
                    <TabsTrigger value="out">Spending</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {date ? date.toLocaleDateString() : "Any date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Select value={account} onValueChange={setAccount}>
                  <SelectTrigger className="w-full md:w-[160px]">
                    <SelectValue placeholder="Account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All accounts</SelectItem>
                    <SelectItem value="Checking">Checking</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Credit">Credit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-8">
                      <Checkbox
                        checked={
                          selected.length === filtered.length &&
                          filtered.length > 0
                        }
                        onCheckedChange={(v) =>
                          setSelected(
                            v ? filtered.map((t) => t.name + t.date) : []
                          )
                        }
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead>Transaction</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Account
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="w-8" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((tx) => {
                    const id = tx.name + tx.date;
                    return (
                    <TableRow key={id} data-state={selected.includes(id) ? "selected" : undefined}>
                      <TableCell>
                        <Checkbox
                          checked={selected.includes(id)}
                          onCheckedChange={(v) =>
                            setSelected((prev) =>
                              v
                                ? [...prev, id]
                                : prev.filter((x) => x !== id)
                            )
                          }
                          aria-label="Select row"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                              tx.amount > 0
                                ? "bg-emerald-500/10 text-emerald-500"
                                : "bg-background text-muted-foreground"
                            }`}
                          >
                            {tx.amount > 0 ? (
                              <ArrowDownLeft className="h-4 w-4" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="leading-none">{tx.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {tx.category}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {tx.account}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {tx.date}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[tx.status]}>
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`text-right tabular-nums ${
                          tx.amount > 0 ? "text-emerald-500" : ""
                        }`}
                      >
                        {tx.amount > 0 ? "+" : "-"}$
                        {Math.abs(tx.amount).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => toast("Receipt opened")}
                            >
                              <Receipt className="mr-2 h-4 w-4" />
                              View receipt
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                toast.success("Transaction ID copied")
                              }
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() =>
                                toast.error("Transaction flagged for review")
                              }
                            >
                              <Flag className="mr-2 h-4 w-4" />
                              Report problem
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    );
                  })}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center text-muted-foreground py-8"
                      >
                        No transactions match your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
