import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface MobileBackButtonProps {
  className?: string;
}

const MobileBackButton: React.FC<MobileBackButtonProps> = ({
  className = "",
}) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`md:hidden ${className}`}
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Go back</span>
    </Button>
  );
};

export default MobileBackButton;
