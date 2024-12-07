import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, PenSquare } from "lucide-react";

interface ContactCardProps {
  title: string;
  name: string;
  avatarId: string;
  canEdit?: boolean;
}

export function ContactCard({
  title,
  name,
  avatarId,
  canEdit,
}: ContactCardProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border-none bg-muted">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={`https://i.pravatar.cc/80?img=${avatarId}`}
            alt={name}
          />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm text-muted-foreground">{title}</div>
          <div className="font-medium text-xl">{name}</div>
        </div>
      </div>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
        >
          <Phone className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
