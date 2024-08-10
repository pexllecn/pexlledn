import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { BreadcrumbProvider } from "@/components/breadcrumb-context";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  // ... (keep the existing metadata)
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BreadcrumbProvider>
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow">{children}</div>
            </div>
            <Toaster />
          </BreadcrumbProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
