import { Metadata } from "next";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { BottomNav } from "@/components/admin-panel/bottomnav";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const pageTitle = params.slug
    ? params.slug[params.slug.length - 1]
    : "Pexlle";

  return {
    title: pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1),
  };
}

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
