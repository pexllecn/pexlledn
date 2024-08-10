"use client";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMemo, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/registry/default/ui/textarea";

export default function AccountPage() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 }
  };

  function TodoForm({ className }: React.ComponentProps<"form">) {
    return (
      <form className={className}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input id="title" placeholder="Todo title..." />
          </div>
          <div className="grid gap-2">
            <Textarea id="description" placeholder="Description..." />
          </div>
        </div>
        <div className={isDesktop ? "flex justify-end" : ""}>
          <Button type="submit">Confirm</Button>
        </div>
      </form>
    );
  }

  const DrawerDialogDemo = () => {
    if (isDesktop) {
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Click here!
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm</DialogTitle>
              <DialogDescription>
                What do you want to get done today?
              </DialogDescription>
            </DialogHeader>
            <TodoForm />
          </DialogContent>
        </Dialog>
      );
    }
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Confirm</DrawerTitle>
            <DrawerDescription>
              What do you want to get done today?
            </DrawerDescription>
          </DrawerHeader>
          <TodoForm className="px-4" />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <ContentLayout title="Account">
      <PlaceholderContent />
      <DrawerDialogDemo />

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
