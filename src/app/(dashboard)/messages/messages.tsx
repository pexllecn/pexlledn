"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  ChevronLeft,
  Info,
  MessageCircle,
  SquarePen,
} from "lucide-react";
import {
  Avatar,
  EmptyState,
  IconButton,
  Modal,
  SearchField,
  Segments,
  useSavedState,
} from "@/components/workspace/primitives";

type Chat = {
  id: string;
  name: string;
  preview: string;
  time: string;
  online: boolean;
  unread: boolean;
  tone: number;
};
type Message = { id: string; text: string; sent: boolean; time: string };
const initialChats: Chat[] = [
  {
    id: "alice",
    name: "Alice Johnson",
    preview: "Hey, how are you?",
    time: "10:38",
    online: true,
    unread: true,
    tone: 1,
  },
  {
    id: "bob",
    name: "Bob Smith",
    preview: "Can we meet tomorrow?",
    time: "Yesterday",
    online: false,
    unread: true,
    tone: 0,
  },
  {
    id: "charlie",
    name: "Charlie Brown",
    preview: "Thanks for your help!",
    time: "Tuesday",
    online: true,
    unread: false,
    tone: 3,
  },
  {
    id: "diana",
    name: "Diana Prince",
    preview: "The project is looking great.",
    time: "Monday",
    online: false,
    unread: false,
    tone: 2,
  },
  {
    id: "eve",
    name: "Eve Wilson",
    preview: "Let’s catch up soon.",
    time: "Monday",
    online: false,
    unread: false,
    tone: 4,
  },
];
const initialMessages: Record<string, Message[]> = {
  alice: [
    {
      id: "a1",
      text: "Hey there! How’s it going?",
      sent: false,
      time: "10:30",
    },
    {
      id: "a2",
      text: "Hi Alice! I’m doing well, thanks for asking. How about you?",
      sent: true,
      time: "10:32",
    },
    {
      id: "a3",
      text: "I’m great! Just working on some new projects. Have you heard about the latest tech conference?",
      sent: false,
      time: "10:35",
    },
    {
      id: "a4",
      text: "No, I haven’t. Tell me more about it!",
      sent: true,
      time: "10:36",
    },
    {
      id: "a5",
      text: "There are some amazing speakers lined up. I’ll share the details when we catch up!",
      sent: false,
      time: "10:38",
    },
  ],
  bob: [
    { id: "b1", text: "Can we meet tomorrow?", sent: false, time: "Yesterday" },
  ],
  charlie: [
    { id: "c1", text: "Thanks for your help!", sent: false, time: "Tuesday" },
  ],
  diana: [
    {
      id: "d1",
      text: "The project is looking great.",
      sent: false,
      time: "Monday",
    },
  ],
  eve: [
    { id: "e1", text: "Let’s catch up soon.", sent: false, time: "Monday" },
  ],
};
export default function Messages() {
  const [chats, setChats] = useSavedState<Chat[]>(
    "pexlle:messages:chats:v1",
    initialChats,
  );
  const [messages, setMessages] = useSavedState<Record<string, Message[]>>(
    "pexlle:messages:threads:v1",
    initialMessages,
  );
  const [drafts, setDrafts] = useSavedState<Record<string, string>>(
    "pexlle:messages:drafts:v1",
    {},
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | "Unread">("All");
  const [info, setInfo] = useState(false);
  const [compose, setCompose] = useState(false);
  const [recipient, setRecipient] = useState("");
  const bottom = useRef<HTMLDivElement>(null);
  const active = chats.find((c) => c.id === selected);
  const thread = selected ? messages[selected] || [] : [];
  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "instant" });
  }, [selected, thread.length]);
  function select(chat: Chat) {
    setSelected(chat.id);
    setInfo(false);
    setChats((prev) =>
      prev.map((c) => (c.id === chat.id ? { ...c, unread: false } : c)),
    );
  }
  function send() {
    if (!selected || !drafts[selected]?.trim()) return;
    const text = drafts[selected].trim();
    const time = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    setMessages((prev) => ({
      ...prev,
      [selected]: [
        ...(prev[selected] || []),
        { id: crypto.randomUUID(), text, sent: true, time },
      ],
    }));
    setChats((prev) =>
      prev.map((c) =>
        c.id === selected ? { ...c, preview: text, time: "Now" } : c,
      ),
    );
    setDrafts((prev) => ({ ...prev, [selected]: "" }));
  }
  const filtered = chats.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) &&
      (filter === "All" || c.unread),
  );
  return (
    <div className="ws-inbox-page">
      <header className="ws-inbox-title">
        <div>
          <h1>Conversations, connected.</h1>
          <p>A familiar place to keep in touch.</p>
        </div>
        <IconButton label="New conversation" onClick={() => setCompose(true)}>
          <SquarePen size={20} />
        </IconButton>
      </header>
      <div className={`ws-inbox-layout ${active ? "has-selection" : ""}`}>
        <aside className="ws-conversation-list" aria-label="Conversations">
          <div className="ws-list-controls">
            <SearchField
              value={query}
              onChange={setQuery}
              placeholder="Search conversations…"
            />
            <Segments
              options={["All", "Unread"] as const}
              value={filter}
              onChange={setFilter}
              label="Conversation filter"
            />
          </div>
          <div className="ws-list-scroll">
            {filtered.map((chat) => (
              <button
                key={chat.id}
                className={`ws-conversation ${selected === chat.id ? "selected" : ""}`}
                onClick={() => select(chat)}
                aria-current={selected === chat.id ? "true" : undefined}
              >
                <Avatar name={chat.name} tone={chat.tone} />
                <span className="ws-conversation-text">
                  <span className="ws-conversation-top">
                    <strong>{chat.name}</strong>
                    <time>{chat.time}</time>
                  </span>
                  <p>{chat.preview}</p>
                  {chat.unread && (
                    <span className="ws-unread" aria-label="Unread" />
                  )}
                </span>
              </button>
            ))}
            {!filtered.length && (
              <EmptyState
                icon={<MessageCircle />}
                title="All clear."
                detail="No conversations match this view."
              />
            )}
          </div>
        </aside>
        <section
          className="ws-thread"
          aria-label={
            active ? `Conversation with ${active.name}` : "Conversation"
          }
        >
          {active ? (
            <>
              <header className="ws-thread-header">
                <button
                  className="ws-icon-button ws-back"
                  aria-label="Back to conversations"
                  onClick={() => setSelected(null)}
                >
                  <ChevronLeft size={21} />
                </button>
                <Avatar name={active.name} tone={active.tone} />
                <div>
                  <strong>{active.name}</strong>
                  <small>
                    {active.online && <i className="ws-online" />}
                    {active.online
                      ? "Available in sample workspace"
                      : "Sample contact"}
                  </small>
                </div>
                <IconButton
                  label="Conversation information"
                  onClick={() => setInfo((v) => !v)}
                >
                  <Info size={19} />
                </IconButton>
              </header>
              {info && (
                <div className="ws-thread-info">
                  <strong>{active.name}</strong>
                  <p>
                    This is a local sample conversation. Messages and drafts
                    stay in this browser and are not delivered to a recipient.
                  </p>
                </div>
              )}
              <div className="ws-message-history">
                <p className="ws-day-label">Sample conversation</p>
                {thread.map((message) => (
                  <div
                    key={message.id}
                    className={`ws-message ${message.sent ? "sent" : ""}`}
                  >
                    <div className="ws-bubble">{message.text}</div>
                    <small>
                      {message.time}
                      {message.sent ? " · Saved locally" : ""}
                    </small>
                  </div>
                ))}
                <div ref={bottom} />
              </div>
              <div className="ws-composer-wrap">
                <form
                  className="ws-composer"
                  onSubmit={(e) => {
                    e.preventDefault();
                    send();
                  }}
                >
                  <textarea
                    rows={1}
                    aria-label={`Message ${active.name}`}
                    placeholder="Write a message…"
                    value={drafts[active.id] || ""}
                    onChange={(e) =>
                      setDrafts((prev) => ({
                        ...prev,
                        [active.id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        !e.shiftKey &&
                        !e.nativeEvent.isComposing
                      ) {
                        e.preventDefault();
                        send();
                      }
                    }}
                  />
                  <button
                    className="ws-send"
                    type="submit"
                    disabled={!drafts[active.id]?.trim()}
                    aria-label="Save message to conversation"
                  >
                    <ArrowUp size={18} />
                  </button>
                </form>
                <p className="ws-local-note">
                  Sample conversation · Messages are saved on this device
                </p>
              </div>
            </>
          ) : (
            <EmptyState
              icon={<MessageCircle />}
              title="Good conversations start here."
              detail="Choose a conversation, or start a new one. A little connection goes a long way."
            />
          )}
        </section>
      </div>
      <Modal
        open={compose}
        onOpenChange={setCompose}
        title="Say a little hello."
        description="Start a sample conversation, saved on this device."
      >
        <form
          className="ws-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!recipient.trim()) return;
            const existing = chats.find(
              (c) => c.name.toLowerCase() === recipient.trim().toLowerCase(),
            );
            if (existing) {
              select(existing);
            } else {
              const chat = {
                id: crypto.randomUUID(),
                name: recipient.trim(),
                preview: "Start the conversation",
                time: "Now",
                online: false,
                unread: false,
                tone: chats.length % 5,
              };
              setChats((prev) => [chat, ...prev]);
              setSelected(chat.id);
            }
            setRecipient("");
            setCompose(false);
          }}
        >
          <label>
            Contact name
            <input
              autoFocus
              required
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              maxLength={80}
              placeholder="Who’s on your mind?"
            />
          </label>
          <div className="ws-form-footer">
            <button
              type="button"
              className="ws-button"
              onClick={() => setCompose(false)}
            >
              Cancel
            </button>
            <button type="submit" className="ws-button primary">
              Start conversation
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
