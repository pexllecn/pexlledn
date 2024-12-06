import { cookies } from "next/headers";
import Image from "next/image";

import { Mail } from "@/app/(dashboard)/mail/components/mail";
import { accounts, mails } from "@/app/(dashboard)/mail/data";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function MailPage() {
  const layout = cookies().get("react-resizable-panels:layout:mail");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <ContentLayout title="Account">
      <div className=" flex-col md:flex">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </ContentLayout>
  );
}
