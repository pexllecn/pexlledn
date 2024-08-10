import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function UsersPage() {
  return (
    <ContentLayout title="Users">
      <PlaceholderContent />
    </ContentLayout>
  );
}
