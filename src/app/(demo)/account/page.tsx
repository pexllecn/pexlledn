"use client";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AccountPage() {
  return (
    <ContentLayout title="Account">
      <PlaceholderContent />
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo")
            }
          })
        }
      >
        Show Toast
      </Button>
    </ContentLayout>
  );
}
