import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { BottomNav } from "@/components/admin-panel/bottomnav";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminPanelLayout>
      {children}
      <BottomNav />
    </AdminPanelLayout>
  );
}
