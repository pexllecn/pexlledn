import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className="invisible lg:visible absolute top-[35px] -right-[50px] z-20">
      <Button
        onClick={() => setIsOpen?.()}
        className="rounded-md w-8 h-8 ml-6"
        variant="ghost"
        size="icon"
      >
        {isOpen ? (
          <PanelLeftClose
            className={cn(
              "h-4 w-4 transition-transform ease-in-out duration-400 text-gray-500 dark:text-gray-400"
            )}
          />
        ) : (
          <PanelLeftOpen
            className={cn(
              "h-4 w-4 transition-transform ease-in-out duration-400 text-gray-500 dark:text-gray-400"
            )}
          />
        )}
      </Button>
    </div>
  );
}
