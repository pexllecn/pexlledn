"use client";

import React, { useEffect, useState, useCallback } from "react";
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
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
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
  { ssr: false }
);

interface ResponsiveOTPProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  otp: string;
  onOtpChange: (value: string) => void;
  isOtpInvalid: boolean;
}

const ResponsiveOTP: React.FC<ResponsiveOTPProps> = ({
  isOpen,
  onOpenChange,
  otp,
  onOtpChange,
  isOtpInvalid
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const Content = (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center py-4">
        <InputOTP maxLength={6} value={otp} onChange={onOtpChange} autoFocus>
          <InputOTPGroup>
            {[0, 1, 2].map((index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className={`h-12 w-12 text-center ${
                  isOtpInvalid ? "border-red-500" : ""
                }`}
              />
            ))}
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            {[3, 4, 5].map((index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className={`h-12 w-12 text-center ${
                  isOtpInvalid ? "border-red-500" : ""
                }`}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
    </form>
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Enter OTP</DrawerTitle>
          <DrawerDescription>
            Please enter the 6-digit OTP sent to your device.
          </DrawerDescription>
        </DrawerHeader>
        {Content}
        <DrawerFooter className="pt-4">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

interface ResponsiveForgotPasswordProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ResponsiveForgotPassword: React.FC<ResponsiveForgotPasswordProps> = ({
  isOpen,
  onOpenChange,
  email,
  onEmailChange,
  onSubmit
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const Content = (
    <form onSubmit={onSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reset-email">Email</Label>
          <Input
            id="reset-email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
          />
        </div>
      </div>
      <div className={isDesktop ? "flex justify-end mt-4" : "mt-4"}>
        <Button type="submit" className="w-full">
          Send Reset Instructions
        </Button>
      </div>
    </form>
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you instructions to reset
              your password.
            </DialogDescription>
          </DialogHeader>
          {Content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Reset Password</DrawerTitle>
          <DrawerDescription>
            Enter your email address and we'll send you instructions to reset
            your password.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">{Content}</div>
        <DrawerFooter className="pt-4">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default function AuthenticationPage() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpInvalid, setIsOtpInvalid] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

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

  const handleOtpChange = useCallback(
    (value: string) => {
      setOtp(value);
      if (value.length === 6) {
        if (value === "111111") {
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
      } else {
        setIsOtpInvalid(false);
      }
    },
    [router]
  );

  const handleForgotPassword = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Implement password reset logic here
      console.log("Password reset requested for:", forgotPasswordEmail);
      toast({
        title: "Password Reset Requested",
        description:
          "If an account exists for this email, you will receive reset instructions."
      });
      setIsForgotPasswordOpen(false);
    },
    [forgotPasswordEmail]
  );

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      <div className="relative z-10 w-full max-w-md p-6 sm:p-8 md:p-10 backdrop-blur-md bg-white/30 dark:bg-muted/60 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <Link href="/">
            <div style={{ width: 150, height: 50, position: "relative" }}>
              <Image
                src={logoSrc}
                alt="Logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </Link>
        </div>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="email">Login with Email</TabsTrigger>
            <TabsTrigger value="phone">Login with Phone</TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  className="bg-background"
                />
              </div>
              <div className="flex justify-between items-center">
                <Button onClick={handleLogin} className="w-full">
                  Log in
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="phone">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 234 567 890"
                  className="bg-background"
                />
              </div>
              <Button onClick={handleLogin} className="w-full">
                Send OTP
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-center">
          <Button
            variant="link"
            size="sm"
            onClick={() => setIsForgotPasswordOpen(true)}
          >
            Forgot Password?
          </Button>
        </div>

        <div className="flex justify-center mt-4">
          <Suspense fallback={<div>Loading...</div>}>
            <DynamicAuthButtons />
          </Suspense>
        </div>
        <div className="mt-2 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link href="/register" passHref>
              <Button variant="link" size="sm">
                Create one
              </Button>
            </Link>
          </p>
        </div>
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

      <ResponsiveOTP
        isOpen={isOtpOpen}
        onOpenChange={setIsOtpOpen}
        otp={otp}
        onOtpChange={handleOtpChange}
        isOtpInvalid={isOtpInvalid}
      />

      <ResponsiveForgotPassword
        isOpen={isForgotPasswordOpen}
        onOpenChange={setIsForgotPasswordOpen}
        email={forgotPasswordEmail}
        onEmailChange={setForgotPasswordEmail}
        onSubmit={handleForgotPassword}
      />
    </div>
  );
}
