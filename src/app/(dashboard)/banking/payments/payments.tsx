"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/components/ui/responsive-dialog";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarClock,
  Clock,
  Plus,
  Repeat,
  Send,
  ShieldCheck,
  Zap,
} from "lucide-react";

const payees = [
  { name: "Sarah Lin", handle: "@sarahlin", avatar: "/avatar-40-01.jpg", fallback: "SL" },
  { name: "Marco Diaz", handle: "@marcod", avatar: "/avatar-40-02.jpg", fallback: "MD" },
  { name: "Priya Nair", handle: "@priyan", avatar: "/avatar-40-03.jpg", fallback: "PN" },
  { name: "Tom Weber", handle: "@tomw", avatar: "/avatar-40-04.jpg", fallback: "TW" },
  { name: "Landlord", handle: "@rent", avatar: "/avatar-40-05.jpg", fallback: "LL" },
];

const scheduled = [
  { name: "Apartment Rent", next: "Aug 1", amount: "$1,850.00", cadence: "Monthly", icon: Repeat },
  { name: "Electric — ConEd", next: "Jul 12", amount: "$94.20", cadence: "Monthly", icon: Zap },
  { name: "Gym Membership", next: "Jul 15", amount: "$39.00", cadence: "Monthly", icon: Repeat },
  { name: "Car Insurance", next: "Jul 20", amount: "$142.00", cadence: "Monthly", icon: CalendarClock },
];

export default function PaymentsPage() {
  const [amount, setAmount] = useState("");
  const [selected, setSelected] = useState(0);
  const [speed, setSpeed] = useState("instant");
  const [otp, setOtp] = useState("");
  const [open, setOpen] = useState(false);

  const recipient = payees[selected];
  const confirm = () => {
    setOpen(false);
    setOtp("");
    toast.success(`$${amount} sent to ${recipient.name}`, {
      description:
        speed === "instant"
          ? "Arriving instantly."
          : "Arriving in 1–3 business days.",
    });
  };

  const triggerButton = (
    <Button className="w-full" disabled={!amount}>
      <Send className="mr-2 h-4 w-4" />
      Send {amount ? `$${amount}` : "money"} to {recipient.name.split(" ")[0]}
    </Button>
  );

  const otpField = (
    <div className="flex justify-center py-2">
      <InputOTP
        maxLength={6}
        value={otp}
        onChange={setOtp}
        render={({ slots }) => (
          <InputOTPGroup>
            {slots.map((slot, i) => (
              <InputOTPSlot key={i} {...slot} />
            ))}
          </InputOTPGroup>
        )}
      />
    </div>
  );

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Payments">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div>
            <h2 className="text-3xl font-normal">Payments</h2>
            <p className="text-muted-foreground mt-1">
              Send money, pay bills and manage recurring transfers
            </p>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 md:col-span-3 bg-muted border-none">
              <CardHeader>
                <CardTitle>Send money</CardTitle>
                <CardDescription>Instant transfer to a payee</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Recipient</Label>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {payees.map((p, i) => (
                      <button
                        key={p.handle}
                        onClick={() => setSelected(i)}
                        className={`flex shrink-0 flex-col items-center gap-1.5 rounded-lg border p-2 w-20 transition-colors ${
                          selected === i
                            ? "border-primary/50 bg-primary/10"
                            : "border-transparent bg-background/60"
                        }`}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={p.avatar} />
                          <AvatarFallback>{p.fallback}</AvatarFallback>
                        </Avatar>
                        <span className="text-1xs truncate w-full text-center">
                          {p.name.split(" ")[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="amount"
                      inputMode="decimal"
                      placeholder="0.00"
                      className="pl-7 text-lg tabular-nums"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>From account</Label>
                  <Select defaultValue="checking">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">
                        Everyday Checking · $12,480.55
                      </SelectItem>
                      <SelectItem value="savings">
                        Savings Vault · $9,200.00
                      </SelectItem>
                      <SelectItem value="business">
                        Business Account · $3,000.00
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Transfer speed</Label>
                  <RadioGroup
                    value={speed}
                    onValueChange={setSpeed}
                    className="grid grid-cols-2 gap-2"
                  >
                    <Label
                      htmlFor="instant"
                      className="flex items-center gap-2 rounded-lg border p-3 cursor-pointer has-[:checked]:border-primary/50 has-[:checked]:bg-primary/5"
                    >
                      <RadioGroupItem value="instant" id="instant" />
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Instant · $0.50</span>
                    </Label>
                    <Label
                      htmlFor="standard"
                      className="flex items-center gap-2 rounded-lg border p-3 cursor-pointer has-[:checked]:border-primary/50 has-[:checked]:bg-primary/5"
                    >
                      <RadioGroupItem value="standard" id="standard" />
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">1–3 days · Free</span>
                    </Label>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note">Note (optional)</Label>
                  <Textarea id="note" placeholder="What's it for?" rows={2} />
                </div>
              </CardContent>
              <CardFooter>
                <ResponsiveDialog
                  open={open}
                  onOpenChange={(o) => {
                    setOpen(o);
                    if (!o) setOtp("");
                  }}
                >
                  <ResponsiveDialogTrigger asChild>
                    {triggerButton}
                  </ResponsiveDialogTrigger>
                  <ResponsiveDialogContent className="sm:max-w-[400px]">
                    <ResponsiveDialogHeader>
                      <ResponsiveDialogTitle className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        Confirm transfer
                      </ResponsiveDialogTitle>
                      <ResponsiveDialogDescription>
                        Sending{" "}
                        <span className="text-foreground">
                          ${amount || "0.00"}
                        </span>{" "}
                        to {recipient.name}. Enter the 6-digit code sent to your
                        phone.
                      </ResponsiveDialogDescription>
                    </ResponsiveDialogHeader>
                    {otpField}
                    <ResponsiveDialogFooter className="flex-col-reverse sm:flex-row sm:justify-end gap-2">
                      <ResponsiveDialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </ResponsiveDialogClose>
                      <Button disabled={otp.length < 6} onClick={confirm}>
                        Confirm &amp; send
                      </Button>
                    </ResponsiveDialogFooter>
                  </ResponsiveDialogContent>
                </ResponsiveDialog>
              </CardFooter>
            </Card>

            <Card className="col-span-4 bg-muted border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="space-y-1.5">
                  <CardTitle>Scheduled payments</CardTitle>
                  <CardDescription>
                    {scheduled.length} upcoming this month
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New
                </Button>
              </CardHeader>
              <CardContent className="space-y-1">
                {scheduled.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex items-center gap-3 py-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <s.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-none">{s.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Next: {s.next}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm tabular-nums leading-none">
                          {s.amount}
                        </p>
                        <Badge variant="secondary" className="mt-1 text-1xs">
                          {s.cadence}
                        </Badge>
                      </div>
                    </div>
                    {i < scheduled.length - 1 && <Separator />}
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
