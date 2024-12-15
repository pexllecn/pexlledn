import { Metadata } from "next";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { BottomNav } from "@/components/admin-panel/bottomnav";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const defaultTitle = "Admin Dashboard";
  const pageTitle =
    params.slug && params.slug.length > 0
      ? params.slug[params.slug.length - 1].replace(/-/g, " ")
      : "";

  const fullTitle = pageTitle
    ? `${
        pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)
      } | ${defaultTitle}`
    : defaultTitle;

  return {
    title: fullTitle,
  };
}

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
