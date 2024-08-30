import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import BottomNav from "@/components/admin-panel/bottomnav";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminPanelLayout>
      {children}
      <Toaster />
      <BottomNav />
    </AdminPanelLayout>
  );
}
