"use client";
import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";

const DynamicAuthButtons = dynamic(
  () => import("@/components/google-auth-button"),
  {
    ssr: false
  }
);

export default function AuthenticationPage() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpInvalid, setIsOtpInvalid] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  const getAsset = (lightAsset: string, darkAsset: string) => {
    if (!mounted) return lightAsset;
    const effectiveTheme = resolvedTheme || theme;
    return effectiveTheme === "dark" ? darkAsset : lightAsset;
  };

  const logoSrc = getAsset("/pexlle.png", "/pexllelight.png");
  const backgroundImage = getAsset("/login.jpeg", "/darklogin.jpg");

  const handleLogin = () => {
    setIsOtpOpen(true);
    setOtp("");
    setIsOtpInvalid(false);
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (value.length < 6) {
      setIsOtpInvalid(false);
    } else if (value === "111111") {
      setIsOtpOpen(false);
      router.push("/dashboard");
    } else {
      setIsOtpInvalid(true);
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP.",
        variant: "destructive"
      });
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password reset logic here
    console.log("Password reset requested for:", forgotPasswordEmail);
    toast({
      title: "Password Reset Requested",
      description:
        "If an account exists for this email, you will receive reset instructions."
    });
    setIsForgotPasswordOpen(false);
  };

  const ResponsiveOTP = () => {
    const Content = (
      <>
        <div className="flex justify-center py-4">
          <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
            <InputOTPGroup>
              {[0, 1, 2].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className={isOtpInvalid ? "border-red-500" : ""}
                />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              {[3, 4, 5].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className={isOtpInvalid ? "border-red-500" : ""}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
      </>
    );

    if (isDesktop) {
      return (
        <Dialog open={isOtpOpen} onOpenChange={setIsOtpOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter OTP</DialogTitle>
              <DialogDescription>
                Please enter the 6-digit OTP sent to your device.
              </DialogDescription>
            </DialogHeader>
            {Content}
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Drawer open={isOtpOpen} onOpenChange={setIsOtpOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Enter OTP</DrawerTitle>
            <DrawerDescription>
              Please enter the 6-digit OTP sent to your device.
            </DrawerDescription>
          </DrawerHeader>
          {Content}
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };

  const ResponsiveForgotPassword = () => {
    const Content = (
      <form onSubmit={handleForgotPassword}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email">Email</Label>
            <Input
              id="reset-email"
              type="email"
              placeholder="m@example.com"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={isDesktop ? "flex justify-end mt-4" : ""}>
          <Button type="submit">Send Reset Instructions</Button>
        </div>
      </form>
    );

    if (isDesktop) {
      return (
        <Dialog
          open={isForgotPasswordOpen}
          onOpenChange={setIsForgotPasswordOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>
                Enter your email address and we'll send you instructions to
                reset your password.
              </DialogDescription>
            </DialogHeader>
            {Content}
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Drawer
        open={isForgotPasswordOpen}
        onOpenChange={setIsForgotPasswordOpen}
      >
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Reset Password</DrawerTitle>
            <DrawerDescription>
              Enter your email address and we'll send you instructions to reset
              your password.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">{Content}</div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      <div className="relative z-10 w-full max-w-md p-8 backdrop-blur-md bg-white/30 dark:bg-muted/40 rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <div style={{ width: 150, height: 50, position: "relative" }}>
              <Image
                src={logoSrc}
                alt="Pexlle Logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </Link>
        </div>

        <Tabs defaultValue="login" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="bg-background"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  className="bg-background"
                  id="password"
                  type="password"
                />
              </div>
              <div className="text-sm text-right">
                <button
                  onClick={() => setIsForgotPasswordOpen(true)}
                  className="text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <Button className="w-full" onClick={handleLogin}>
                Login
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center"></div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <DynamicAuthButtons />
            </Suspense>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to create your account
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  className="bg-background border-none"
                  id="name"
                  type="text"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="bg-background border-none"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  className="bg-background border-none"
                  id="password"
                  type="password"
                />
              </div>
              <Button className="w-full">Create account</Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center"></div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className=" px-2 text-muted-foreground">
                  Or Register with
                </span>
              </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              {" "}
              <DynamicAuthButtons />
            </Suspense>
          </TabsContent>
        </Tabs>

        <p className="mt-4 px-8 text-center text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>

      <ResponsiveOTP />
      <ResponsiveForgotPassword />
    </div>
  );
}
