"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

import { cn } from "@/lib/utils";
import { EASE_OUT, SPRING_PRESS } from "@/lib/apple-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Mail } from "@/app/(dashboard)/mail/data";
import { useMail } from "@/app/(dashboard)/mail/use-mail";

interface MailListProps {
  items: Mail[];
}

export function MailList({ items }: MailListProps) {
  const [mail, setMail] = useMail();

  /* The hovered row, so a second shared-layout chip can follow the pointer the
     same way the selection chip follows the selection. */
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="grid h-full place-items-center p-10 text-center text-sm text-muted-foreground">
        Nothing here.
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <ul className="space-y-0.5 p-2" onMouseLeave={() => setHoveredId(null)}>
        {items.map((item, index) => {
          const active = mail.selected === item.id;

          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: EASE_OUT,
                delay: Math.min(index, 10) * 0.025,
              }}
            >
              <button
                type="button"
                onClick={() => setMail({ ...mail, selected: item.id })}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() =>
                  setHoveredId((current) => (current === item.id ? null : current))
                }
                onFocus={() => setHoveredId(item.id)}
                onBlur={() =>
                  setHoveredId((current) => (current === item.id ? null : current))
                }
                aria-current={active}
                className="relative flex w-full flex-col gap-1.5 rounded-md px-3 py-3 text-left transition-colors"
              >
                {/* Two shared elements rather than per-row background classes:
                    the selection chip slides to the chosen row, a lighter one
                    slides under the pointer. Only one of each is mounted at a
                    time, which is what lets Framer tween them between rows. The
                    hover chip stands down on the selected row so the two never
                    stack into a double highlight. */}
                {!active && hoveredId === item.id && (
                  <motion.span
                    layoutId="mail-hover"
                    transition={SPRING_PRESS}
                    className="absolute inset-0 rounded-md bg-muted/60"
                  />
                )}

                {active && (
                  <motion.span
                    layoutId="mail-selection"
                    transition={SPRING_PRESS}
                    className="absolute inset-0 rounded-md bg-muted"
                  />
                )}

                <span className="relative flex w-full items-center gap-2">
                  {/* Unread is carried by a dot AND by the weight of the name,
                      never by colour alone. */}
                  <span
                    className={cn(
                      "size-2 shrink-0 rounded-full",
                      item.read ? "bg-transparent" : "bg-primary",
                    )}
                    aria-hidden
                  />

                  <Avatar className="size-7 shrink-0">
                    <AvatarFallback className="text-1xs">
                      {item.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <span
                    className={cn(
                      "truncate text-sm",
                      item.read ? "font-medium" : "font-semibold",
                    )}
                  >
                    {item.name}
                  </span>

                  <span className="ml-auto shrink-0 text-1xs tabular-nums text-muted-foreground">
                    {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                  </span>
                </span>

                <span className="relative block truncate pl-4 text-sm">
                  {item.subject}
                </span>

                <span className="relative line-clamp-2 pl-4 text-xs leading-relaxed text-muted-foreground">
                  {item.text.substring(0, 260)}
                </span>

                {item.labels.length > 0 && (
                  <span className="relative flex flex-wrap gap-1 pl-4">
                    {item.labels.map((label) => (
                      <Badge key={label} variant="secondary">{label}</Badge>
                    ))}
                  </span>
                )}
              </button>
            </motion.li>
          );
        })}
      </ul>
    </ScrollArea>
  );
}
