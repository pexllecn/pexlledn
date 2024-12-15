import React from "react";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import { ThemeCustomizer } from "@/components/theme-customizer";
import { BreadcrumbProvider } from "@/components/breadcrumb-context";
import { Toaster } from "sonner";
import { ZoomPreventer } from "@/components/ZoomPreventer";

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
            <ThemeCustomizer />
          </BreadcrumbProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
