import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { BreadcrumbProvider } from "@/components/breadcrumb-context";
import { Toaster } from "sonner";
import { metadata } from "./metadata";
import { ZoomDisabler } from "./ZoomDisabler";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={`${GeistSans.className} font-light text-sm`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BreadcrumbProvider>
            <ZoomDisabler />
            <div id="root" className="h-full overflow-auto">
              {children}
            </div>
            <Toaster />
          </BreadcrumbProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
