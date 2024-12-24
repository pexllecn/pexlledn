import React from "react";
import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import { BreadcrumbProvider } from "@/components/breadcrumb-context";
import { Toaster } from "sonner";
import { ZoomPreventer } from "@/components/ZoomPreventer";
import { ThemeCustomizerButton } from "@/components/theme-customizer-button";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://pexlle.com"
  ),
  title: {
    template: "%s | Pexlle",
    default: "Pexlle",
  },
  description: "The official Pexlle platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider>
          <BreadcrumbProvider>
            {children}
            <ZoomPreventer />
            <Toaster richColors position="top-center" />
            <ThemeCustomizerButton />
          </BreadcrumbProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
