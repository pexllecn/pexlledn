import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import BottomNav from "@/components/admin-panel/bottomnav";
import { Toaster } from "@/components/ui/toaster";
import { ZoomPreventer } from "@/components/ZoomPreventer";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your dashboard description",
  // Remove the viewport property from here
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminPanelLayout>
      {children}
      <Toaster />
      <ZoomPreventer />
      <BottomNav />
    </AdminPanelLayout>
  );
}
