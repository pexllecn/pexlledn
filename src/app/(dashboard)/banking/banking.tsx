"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  Eye,
  FileText,
  Landmark,
  MoreHorizontal,
  Plus,
  PiggyBank,
  Send,
  Snowflake,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";

const balanceConfig = {
  in: { label: "Money in", color: "hsl(var(--chart-2))" },
  out: { label: "Money out", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

const cashflowData = [
  { month: "Jan", in: 6200, out: 4100 },
  { month: "Feb", in: 5800, out: 4500 },
  { month: "Mar", in: 7100, out: 3900 },
  { month: "Apr", in: 6400, out: 5200 },
  { month: "May", in: 7600, out: 4300 },
  { month: "Jun", in: 8200, out: 4800 },
];

const balanceTrend = [
  { day: "W1", balance: 18200 },
  { day: "W2", balance: 19100 },
  { day: "W3", balance: 18700 },
  { day: "W4", balance: 20400 },
  { day: "W5", balance: 21850 },
  { day: "W6", balance: 24680 },
];

const accounts = [
  {
    name: "Everyday Checking",
    number: "•• 4821",
    balance: "$12,480.55",
    icon: Wallet,
    tint: "text-blue-500 bg-blue-500/10",
  },
  {
    name: "Savings Vault",
    number: "•• 9930",
    balance: "$9,200.00",
    icon: PiggyBank,
    tint: "text-emerald-500 bg-emerald-500/10",
  },
  {
    name: "Business Account",
    number: "•• 1177",
    balance: "$3,000.00",
    icon: Landmark,
    tint: "text-purple-500 bg-purple-500/10",
  },
];

const transactions = [
  {
    name: "Spotify Premium",
    category: "Subscriptions",
    amount: "-$11.99",
    date: "Today",
    incoming: false,
  },
  {
    name: "Salary — Pexlle Inc.",
    category: "Income",
    amount: "+$5,400.00",
    date: "Yesterday",
    incoming: true,
  },
  {
    name: "Whole Foods Market",
    category: "Groceries",
    amount: "-$86.24",
    date: "Yesterday",
    incoming: false,
  },
  {
    name: "Transfer to Savings",
    category: "Transfer",
    amount: "-$500.00",
    date: "2 days ago",
    incoming: false,
  },
  {
    name: "Refund — Amazon",
    category: "Shopping",
    amount: "+$42.10",
    date: "3 days ago",
    incoming: true,
  },
];

export default function BankingPage() {
  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Banking">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Welcome back, Khaled 👋</h2>
              <p className="text-muted-foreground mt-1">
                Your net balance grew{" "}
                <span className="text-foreground">$2,830</span> this month.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  toast.success("Add money", {
                    description: "Choose an account to top up.",
                  })
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add money
              </Button>
              <Button asChild>
                <Link href="/banking/payments">
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </Link>
              </Button>
            </div>
          </div>

          <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertTitle>You could save $180/mo</AlertTitle>
            <AlertDescription>
              3 subscriptions look unused. Review them to trim recurring spend.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 md:col-span-3 bg-primary text-primary-foreground border-none overflow-hidden relative">
              <CardHeader className="pb-2">
                <CardDescription className="text-primary-foreground/70 flex items-center gap-2">
                  Total balance
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button aria-label="Balance visibility">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent showArrow>
                        Only visible to you
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardDescription>
                <CardTitle className="text-4xl tabular-nums">
                  $24,680.55
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                  <TrendingUp className="h-4 w-4" />
                  +12.9% vs last month
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <div className="flex-1 rounded-lg bg-background/15 px-3 py-2">
                  <p className="text-1xs text-primary-foreground/70">Income</p>
                  <p className="text-base tabular-nums">$8,200</p>
                </div>
                <div className="flex-1 rounded-lg bg-background/15 px-3 py-2">
                  <p className="text-1xs text-primary-foreground/70">
                    Spending
                  </p>
                  <p className="text-base tabular-nums">$4,800</p>
                </div>
              </CardFooter>
            </Card>

            <Card className="col-span-4 bg-muted border-none">
              <CardHeader>
                <CardTitle>Balance Trend</CardTitle>
                <CardDescription>Last 6 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    balance: {
                      label: "Balance",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="aspect-auto h-[160px] w-full"
                >
                  <AreaChart
                    accessibilityLayer
                    data={balanceTrend}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <defs>
                      <linearGradient id="fillBal" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="var(--color-balance)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-balance)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      dataKey="balance"
                      type="natural"
                      fill="url(#fillBal)"
                      fillOpacity={0.4}
                      stroke="var(--color-balance)"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {accounts.map((account) => (
              <Card key={account.name} className="bg-muted border-none">
                <CardContent className="flex items-center gap-3 p-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${account.tint}`}
                  >
                    <account.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-none">{account.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {account.number}
                    </p>
                  </div>
                  <p className="text-lg tabular-nums">{account.balance}</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{account.name}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => toast("Opening account details…")}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => toast("Statement downloaded")}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Download statement
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => toast.error(`${account.name} frozen`)}
                      >
                        <Snowflake className="mr-2 h-4 w-4" />
                        Freeze account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-muted border-none">
              <CardHeader>
                <CardTitle>Cashflow</CardTitle>
                <CardDescription>Money in vs money out</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={balanceConfig}
                  className="aspect-auto h-[240px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    data={cashflowData}
                    margin={{ left: -4, right: -4 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="in" fill="var(--color-in)" radius={4} />
                    <Bar dataKey="out" fill="var(--color-out)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="col-span-4 md:col-span-3 bg-muted border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="space-y-1.5">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest transactions</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/banking/transactions">
                    All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-1">
                {transactions.map((tx, i) => (
                  <div key={tx.name}>
                    <div className="flex items-center gap-3 py-2.5">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                          tx.incoming
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-background text-muted-foreground"
                        }`}
                      >
                        {tx.incoming ? (
                          <ArrowDownLeft className="h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-none truncate">
                          {tx.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {tx.category} · {tx.date}
                        </p>
                      </div>
                      <p
                        className={`text-sm tabular-nums ${
                          tx.incoming ? "text-emerald-500" : ""
                        }`}
                      >
                        {tx.amount}
                      </p>
                    </div>
                    {i < transactions.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
