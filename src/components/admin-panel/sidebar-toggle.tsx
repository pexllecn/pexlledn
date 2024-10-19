import { PanelRightOpen } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className="flex invisible lg:visible absolute left-[-30px] z-20 mr-4 ">
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsOpen?.()}
              className="rounded-md w-8 h-8 ml-6"
              variant="ghost"
              size="icon"
            >
              <PanelRightOpen
                className={cn(
                  "h-4 w-4 transition-transform ease-in-out duration-400 text-gray-500 dark:text-gray-400",
                  isOpen === false ? "rotate-180" : "rotate-0"
                )}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Toggle Sidebar</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
