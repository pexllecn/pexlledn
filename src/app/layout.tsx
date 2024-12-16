import React from "react";
import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import { ThemeCustomizer } from "@/components/theme-customizer";
import { BreadcrumbProvider } from "@/components/breadcrumb-context";
import { Toaster } from "sonner";
import { ZoomPreventer } from "@/components/ZoomPreventer";

export const metadata: Metadata = {
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
            <Toaster />
          </BreadcrumbProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
