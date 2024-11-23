"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Moon, Sun } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

const DynamicAuthButtons = dynamic(
  () => import("@/components/google-auth-button"),
  { ssr: false }
);

export default function register() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
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

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement sign-up logic here
    toast({
      title: "Account Created",
      description: "Your account has been successfully created.",
    });
    router.push("/dashboard");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative h-full  items-center justify-center">
      <div className="relative h-full flex items-center justify-center">
        <div
          className={`fixed inset-0 -z-10 h-full w-full transition-all duration-300 
          ${
            resolvedTheme === "dark"
              ? "bg-slate-950 bg-[radial-gradient(#212121_1px,transparent_1px)]"
              : "bg-white bg-[radial-gradient(#c3c5c9_1px,transparent_1px)]"
          } 
          [background-size:16px_16px]`}
        ></div>
        <div
          className={`fixed inset-0 -z-10 h-full w-full transition-all duration-300 
          ${
            resolvedTheme === "dark"
              ? "bg-[radial-gradient(circle_800px_at_50%_-100px,#1e293b,transparent)]"
              : "bg-gradient-to-tr from-white via-gray-300 to-yellow-300 opacity-60"
          }`}
        ></div>
        <div className="relative z-10 w-full max-w-md p-6 sm:p-8 md:p-10 mx-4">
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

          <form onSubmit={handleSignUp}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  className="bg-background"
                />
              </div>
              <div
                className={
                  isDesktop ? "flex justify-between items-center" : "mt-4"
                }
              >
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link href="/signin" passHref>
                <Button
                  variant="link"
                  size="sm"
                  className="text-primary-foreground dark:text-primary font-medium"
                >
                  Log in
                </Button>
              </Link>
            </p>
          </div>

          <div className="flex justify-center mt-4">
            <Suspense fallback={<div>Loading...</div>}>
              <DynamicAuthButtons />
            </Suspense>
          </div>
          <div className="mt-6 flex justify-center">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
