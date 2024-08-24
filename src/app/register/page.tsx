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
      description: "Your account has been successfully created."
    });
    router.push("/dashboard");
  };

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

      <div className="relative z-10 w-full max-w-md p-6 sm:p-8 md:p-10 backdrop-blur-md bg-white/80 dark:bg-muted/60 rounded-lg shadow-lg">
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
              <Input id="name" type="text" placeholder="John Doe" required className="bg-background"
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
              <Button variant="link" size="sm">
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
    </div>
  );
}
