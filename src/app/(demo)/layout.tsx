import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { BottomNav } from "@/components/admin-panel/bottomnav";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminPanelLayout>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow overflow-y-auto pb-16">{children}</div>
        <BottomNav />
      </div>
    </AdminPanelLayout>
  );
}
