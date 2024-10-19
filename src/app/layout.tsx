import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { BreadcrumbProvider } from "@/components/breadcrumb-context";
import { Toaster } from "sonner";
import { metadata, viewport } from "./metadata";
import { ZoomPreventer } from "@/components/ZoomPreventer";

export { metadata, viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
