import { Metadata } from "next";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { BottomNav } from "@/components/admin-panel/bottomnav";

export const metadata: Metadata = {
  title: {
    template: "%s | Pexlle",
    default: "Pexlle",
  },
  description: "The official Pexlle platform",
};

export default function AdminLayout({
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
