"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Archive,
  ArchiveX,
  Forward,
  Reply,
  ReplyAll,
  Star,
  Trash2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/apple-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Mail } from "@/app/(dashboard)/mail/data";

interface MailDisplayProps {
  mail: Mail | null;
}

/** Toolbar affordance. Icon-only, with a tooltip carrying the real name. */
function Action({
  icon: Icon,
  label,
  disabled,
}: {
  icon: React.ElementType;
  label: string;
  disabled?: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className="size-9 p-0 text-muted-foreground"
          disabled={disabled}
          aria-label={label}
        >
          <Icon className="size-4" />
        </Button>
      </TooltipTrigger>

      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function MailDisplay({ mail }: MailDisplayProps) {
  if (!mail) {
    return (
      <div className="grid h-full place-items-center p-8 text-center text-sm text-muted-foreground">
        Select a message to read it.
      </div>
    );
  }

  const initials = mail.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-1 p-2">
        <Action icon={Archive} label="Archive" />
        <Action icon={ArchiveX} label="Move to junk" />
        <Action icon={Trash2} label="Move to trash" />

        <Separator orientation="vertical" className="mx-1 h-6" />

        <Action icon={Star} label="Star" />

        <div className="ml-auto flex items-center gap-1">
          <Action icon={Reply} label="Reply" />
          <Action icon={ReplyAll} label="Reply all" />
          <Action icon={Forward} label="Forward" />
        </div>
      </div>

      <Separator />

      {/* Keyed on the message id so switching messages replays the entrance
          rather than swapping text inside a static frame. */}
      <motion.div
        key={mail.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: EASE_OUT }}
        className="flex min-h-0 flex-1 flex-col"
      >
        <header className="flex items-start gap-4 p-5">
          <Avatar className="size-10">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold leading-tight tracking-tight">
              {mail.subject}
            </h2>

            <p className="mt-1 truncate text-sm">
              <span className="font-medium">{mail.name}</span>{" "}
              <span className="text-muted-foreground">{mail.email}</span>
            </p>
          </div>

          <time
            dateTime={mail.date}
            className="shrink-0 text-xs tabular-nums text-muted-foreground"
          >
            {format(new Date(mail.date), "PPp")}
          </time>
        </header>

        <Separator />

        <ScrollArea className="min-h-0 flex-1">
          <div className="whitespace-pre-wrap p-5 text-sm leading-relaxed">
            {mail.text}
          </div>
        </ScrollArea>

        <Separator />

        <div className="p-4">
          <Textarea
            placeholder={`Reply to ${mail.name.split(" ")[0]}…`}
            className="min-h-[80px] resize-none rounded-md"
          />

          <div className="mt-3 flex items-center justify-end">
            <Button size="sm" className="rounded-full">
              Send
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
