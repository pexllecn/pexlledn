"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  Info,
  Paperclip,
  Phone,
  Search,
  Send,
  Smile,
  Video,
} from "lucide-react";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { EASE_OUT, SPRING_PANEL, SPRING_PRESS } from "@/lib/apple-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

/* -------------------------------------------------------------------------- */
/*  Model                                                                     */
/* -------------------------------------------------------------------------- */

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  avatar: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isSent: boolean;
  avatar: string;
}

const CHATS: Chat[] = [
  { id: 1, name: "Alice Johnson", lastMessage: "Hey, how are you?", time: "10:30 AM", unread: 2, online: true, avatar: "https://i.pravatar.cc/96?img=1" },
  { id: 2, name: "Bob Smith", lastMessage: "Can we meet tomorrow?", time: "Yesterday", unread: 54, online: false, avatar: "https://i.pravatar.cc/96?img=2" },
  { id: 3, name: "Charlie Brown", lastMessage: "Thanks for your help!", time: "Tuesday", unread: 1, online: true, avatar: "https://i.pravatar.cc/96?img=3" },
  { id: 4, name: "Diana Prince", lastMessage: "The project is done!", time: "2 days ago", unread: 0, online: true, avatar: "https://i.pravatar.cc/96?img=4" },
  { id: 5, name: "Ethan Hunt", lastMessage: "Mission accomplished", time: "Last week", unread: 0, online: false, avatar: "https://i.pravatar.cc/96?img=5" },
];

const THREAD: Message[] = [
  { id: 1, sender: "Alice Johnson", content: "Hey there! How's it going?", time: "10:30 AM", isSent: false, avatar: "https://i.pravatar.cc/96?img=1" },
  { id: 2, sender: "You", content: "Hi Alice! I'm doing well, thanks for asking. How about you?", time: "10:32 AM", isSent: true, avatar: "" },
  { id: 3, sender: "Alice Johnson", content: "I'm great! Have you seen the new design system rollout?", time: "10:35 AM", isSent: false, avatar: "https://i.pravatar.cc/96?img=1" },
  { id: 4, sender: "You", content: "No, I haven't. Tell me more about it!", time: "10:36 AM", isSent: true, avatar: "" },
  { id: 5, sender: "Alice Johnson", content: "It lands Friday. Every surface picks up the new tokens automatically, so nothing needs a manual pass.", time: "10:38 AM", isSent: false, avatar: "https://i.pravatar.cc/96?img=1" },
];

/* -------------------------------------------------------------------------- */
/*  Bubble                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Apple's bubble geometry: fully rounded except for the one corner nearest the
 * sender, which is tightened to point back at them. That single squared corner
 * is most of what makes a thread read as a conversation rather than a list.
 */
function Bubble({ message, index }: { message: Message; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.34,
        ease: EASE_OUT,
        delay: Math.min(index, 10) * 0.03,
      }}
      className={cn("flex items-end gap-2", message.isSent && "flex-row-reverse")}
    >
      {!message.isSent && (
        <Avatar className="size-7 shrink-0">
          <AvatarImage src={message.avatar} alt="" />
          <AvatarFallback>{message.sender[0]}</AvatarFallback>
        </Avatar>
      )}

      <div className={cn("flex max-w-[78%] flex-col gap-1", message.isSent && "items-end")}>
        <div
          className={cn(
            "px-3.5 py-2 text-sm leading-relaxed",
            message.isSent
              ? "rounded-lg rounded-br-none bg-primary text-primary-foreground"
              : "rounded-lg rounded-bl-none bg-muted text-foreground",
          )}
        >
          {message.content}
        </div>

        <span className="px-1 text-1xs tabular-nums text-muted-foreground">
          {message.time}
        </span>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function MessagesPage() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [thread, setThread] = useState<Message[]>(THREAD);
  const [showInfo, setShowInfo] = useState(false);

  /* The hovered row, tracked so a second shared-layout chip can follow the
     pointer the same way the selection chip follows the selection. */
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const endRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => CHATS.find((c) => c.id === selectedId) ?? null,
    [selectedId],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return CHATS;

    return CHATS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.lastMessage.toLowerCase().includes(q),
    );
  }, [query]);

  // Follow the conversation as it grows, the way every messenger does.
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [thread.length]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;

    setThread((current) => [
      ...current,
      {
        id: Date.now(),
        sender: "You",
        content: text,
        time: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
        isSent: true,
        avatar: "",
      },
    ]);

    setDraft("");
  };

  /* On a phone the two panes become one: the list slides out as the thread
     slides in, rather than both trying to share the width. */
  const showList = isDesktop || !selected;
  const showThread = isDesktop || !!selected;

  return (
    <ContentLayout title="Messages">
      <div className="mx-auto h-[calc(100vh-9rem)] max-w-[1500px] px-1 pb-4 pt-4">
        <Card className="flex h-full overflow-hidden">
          {/* ------------------------------ list ------------------------- */}

          <AnimatePresence initial={false}>
            {showList && (
              <motion.aside
                key="list"
                initial={isDesktop ? false : { x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={isDesktop ? undefined : { x: -40, opacity: 0 }}
                transition={SPRING_PANEL}
                className={cn(
                  "flex min-h-0 flex-col border-r",
                  isDesktop ? "w-[330px] shrink-0" : "w-full",
                )}
              >
                <div className="space-y-3 p-4">
                  <h1 className="text-2xl font-semibold tracking-tight">Messages</h1>

                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search"
                      className="h-9 pl-9"
                    />
                  </div>
                </div>

                <ScrollArea className="min-h-0 flex-1">
                  <ul
                    className="space-y-0.5 px-2 pb-3"
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {filtered.map((chat, index) => {
                      const active = chat.id === selectedId;

                      return (
                        <motion.li
                          key={chat.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: EASE_OUT,
                            delay: Math.min(index, 8) * 0.03,
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => setSelectedId(chat.id)}
                            onMouseEnter={() => setHoveredId(chat.id)}
                            onMouseLeave={() =>
                              setHoveredId((current) => (current === chat.id ? null : current))
                            }
                            onFocus={() => setHoveredId(chat.id)}
                            onBlur={() =>
                              setHoveredId((current) => (current === chat.id ? null : current))
                            }
                            className={cn(
                              "relative flex w-full items-center gap-3 rounded-md px-2.5 py-2.5 text-left transition-colors",
                              active ? "text-foreground" : "hover:text-foreground",
                            )}
                          >
                            {/* Two shared elements, not a class toggle: the
                                selection chip slides to the chosen row, and a
                                lighter one slides under the pointer. Only one
                                of each is ever mounted, which is what lets
                                Framer tween them between rows. The hover chip
                                stands down on the selected row so the two never
                                stack into a double highlight. */}
                            {!active && hoveredId === chat.id && (
                              <motion.span
                                layoutId="chat-hover"
                                transition={SPRING_PRESS}
                                className="absolute inset-0 rounded-md bg-muted/60"
                              />
                            )}

                            {active && (
                              <motion.span
                                layoutId="chat-selection"
                                transition={SPRING_PRESS}
                                className="absolute inset-0 rounded-md bg-muted"
                              />
                            )}

                            <span className="relative">
                              <Avatar className="size-10">
                                <AvatarImage src={chat.avatar} alt="" />
                                <AvatarFallback>{chat.name.slice(0, 2)}</AvatarFallback>
                              </Avatar>

                              {chat.online && (
                                <span
                                  className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 ring-2 ring-card"
                                  aria-label="Online"
                                />
                              )}
                            </span>

                            <span className="relative min-w-0 flex-1">
                              <span className="flex items-baseline justify-between gap-2">
                                <span className="truncate text-sm font-medium">
                                  {chat.name}
                                </span>

                                <span className="shrink-0 text-1xs text-muted-foreground">
                                  {chat.time}
                                </span>
                              </span>

                              <span className="mt-0.5 flex items-center justify-between gap-2">
                                <span className="truncate text-xs text-muted-foreground">
                                  {chat.lastMessage}
                                </span>

                                {chat.unread > 0 && (
                                  <Badge className="shrink-0 rounded-full tabular-nums">
                                    {chat.unread}
                                  </Badge>
                                )}
                              </span>
                            </span>
                          </button>
                        </motion.li>
                      );
                    })}

                    {filtered.length === 0 && (
                      <li className="px-3 py-10 text-center text-sm text-muted-foreground">
                        No conversations match “{query}”.
                      </li>
                    )}
                  </ul>
                </ScrollArea>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* ----------------------------- thread ------------------------ */}

          {showThread && selected && (
            <motion.section
              key={selected.id}
              initial={isDesktop ? false : { x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={SPRING_PANEL}
              className="flex min-h-0 flex-1 flex-col"
            >
              <header className="flex items-center gap-3 border-b px-4 py-3">
                {!isDesktop && (
                  <Button
                    variant="ghost"
                    className="size-8 shrink-0 p-0"
                    onClick={() => setSelectedId(null)}
                    aria-label="Back to conversations"
                  >
                    <ChevronLeft className="size-5" />
                  </Button>
                )}

                <Avatar className="size-9">
                  <AvatarImage src={selected.avatar} alt="" />
                  <AvatarFallback>{selected.name.slice(0, 2)}</AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{selected.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selected.online ? "Online" : "Offline"}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <Button variant="ghost" className="size-9 p-0" aria-label="Voice call">
                    <Phone className="size-4" />
                  </Button>

                  <Button variant="ghost" className="size-9 p-0" aria-label="Video call">
                    <Video className="size-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    className={cn("size-9 p-0", showInfo && "text-foreground")}
                    onClick={() => setShowInfo((v) => !v)}
                    aria-label="Conversation details"
                    aria-pressed={showInfo}
                  >
                    <Info className="size-4" />
                  </Button>
                </div>
              </header>

              <div className="flex min-h-0 flex-1">
                <ScrollArea className="min-h-0 flex-1">
                  <div className="space-y-3 p-4">
                    {thread.map((message, index) => (
                      <Bubble key={message.id} message={message} index={index} />
                    ))}

                    <div ref={endRef} />
                  </div>
                </ScrollArea>

                {/* Details slide in beside the thread rather than over it, so
                    the conversation never loses its place. */}
                <AnimatePresence initial={false}>
                  {showInfo && isDesktop && (
                    <motion.aside
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 260, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={SPRING_PANEL}
                      className="shrink-0 overflow-hidden border-l"
                    >
                      <div className="w-[260px] p-5 text-center">
                        <Avatar className="mx-auto size-20">
                          <AvatarImage src={selected.avatar} alt="" />
                          <AvatarFallback>{selected.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>

                        <p className="mt-3 font-semibold tracking-tight">
                          {selected.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {selected.online ? "Online now" : "Last seen recently"}
                        </p>

                        <dl className="mt-6 space-y-3 text-left text-sm">
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Messages</dt>
                            <dd className="font-medium tabular-nums">{thread.length}</dd>
                          </div>

                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Unread</dt>
                            <dd className="font-medium tabular-nums">{selected.unread}</dd>
                          </div>
                        </dl>
                      </div>
                    </motion.aside>
                  )}
                </AnimatePresence>
              </div>

              {/* ---------------------------- composer -------------------- */}

              <div className="border-t p-3">
                <div className="flex items-end gap-2">
                  <Button variant="ghost" className="size-9 shrink-0 p-0" aria-label="Attach">
                    <Paperclip className="size-4" />
                  </Button>

                  <div className="relative flex-1">
                    <Input
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          send();
                        }
                      }}
                      placeholder={`Message ${selected.name.split(" ")[0]}`}
                      className="h-10 pl-4 pr-10"
                    />

                    <Smile className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  </div>

                  {/* The send button only exists once there is something to
                      send - an always-present disabled control is noise. */}
                  <AnimatePresence initial={false}>
                    {draft.trim() && (
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        whileTap={{ scale: 0.9 }}
                        transition={SPRING_PRESS}
                        className="shrink-0"
                      >
                        <Button
                          onClick={send}
                          aria-label="Send message"
                          className="size-10 p-0"
                        >
                          <Send className="size-4" />
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.section>
          )}

          {isDesktop && !selected && (
            <div className="grid flex-1 place-items-center text-sm text-muted-foreground">
              Select a conversation to start reading.
            </div>
          )}
        </Card>
      </div>
    </ContentLayout>
  );
}
