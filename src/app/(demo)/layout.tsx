import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import BottomNav from "@/components/admin-panel/bottomnav";
import { Toaster } from "@/components/ui/toaster";
import { ZoomPreventer } from "@/components/ZoomPreventer";
import { Metadata } from "next";
export const metadata: Metadata = {
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  // ... other metadata
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
