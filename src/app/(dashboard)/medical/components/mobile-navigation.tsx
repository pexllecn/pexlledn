import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon, User, Mail, FileText, Settings, LogOut } from 'lucide-react';

interface MobileNavigationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function MobileNavigation({ open, setOpen }: MobileNavigationProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <ScrollArea className="h-full py-6">
          <div className="flex flex-col space-y-4">
            <Button variant="ghost" className="justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button variant="ghost" className="justify-start">
              <User className="mr-2 h-4 w-4" />
              Patients
            </Button>
            <Button variant="ghost" className="justify-start">
              <Mail className="mr-2 h-4 w-4" />
              Messages
            </Button>
            <Button variant="ghost" className="justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </Button>
            <Button variant="ghost" className="justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="justify-start text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

