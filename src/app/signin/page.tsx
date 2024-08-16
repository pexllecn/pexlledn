"use client";
import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const DynamicUserAuthForm = dynamic(
  () => import("@/components/user-auth-form"),
  {
    ssr: false
  }
);

const DynamicGoogleSignInButton = dynamic(
  () => import("@/components/github-auth-button"),
  {
    ssr: false
  }
);

export default function AuthenticationPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Effect for setting mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine which logo and background to use based on the theme
  const logoSrc =
    !mounted || theme === "system" || theme === "light"
      ? "/pexlle.png"
      : "/pexllelight.png";
  const backgroundImage =
    !mounted || theme === "system" || theme === "light"
      ? "/login.jpeg"
      : "/darklogin.jpg";

  // Render a blank div if the component hasn't mounted yet
  if (!mounted) {
    return <div style={{ height: "100vh" }} />;
  }

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/50 dark:bg-muted/80 rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image src={logoSrc} alt="Pexlle Logo" width={150} height={50} />
          </Link>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <DynamicUserAuthForm />
          </Suspense>

          <p className="px-8 text-center text-sm text-muted-foreground">
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

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
