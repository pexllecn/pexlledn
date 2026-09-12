"use client";
import { useMemo, useState } from "react";
import {
  Archive,
  ArrowUpLeft,
  ChevronLeft,
  FileText,
  Inbox,
  Mail,
  MailOpen,
  SquarePen,
  Star,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { mails } from "./data";
import {
  Avatar,
  EmptyState,
  IconButton,
  Modal,
  SearchField,
  Segments,
  useSavedState,
} from "@/components/workspace/primitives";

type Folder = "Inbox" | "Starred" | "Drafts" | "Archive" | "Trash";
type MailState = {
  read: boolean;
  starred: boolean;
  folder: "Inbox" | "Archive" | "Trash";
};
type Draft = { id: string; to: string; subject: string; text: string };
const folders = [
  { name: "Inbox", icon: Inbox },
  { name: "Starred", icon: Star },
  { name: "Drafts", icon: FileText },
  { name: "Archive", icon: Archive },
  { name: "Trash", icon: Trash2 },
] as const;
export default function WorkspaceMail() {
  const [state, setState] = useSavedState<Record<string, MailState>>(
    "pexlle:mail:state:v1",
    Object.fromEntries(
      mails.map((m) => [
        m.id,
        { read: m.read, starred: false, folder: "Inbox" },
      ]),
    ),
  );
  const [drafts, setDrafts] = useSavedState<Draft[]>(
    "pexlle:mail:drafts:v1",
    [],
  );
  const [replies, setReplies] = useSavedState<Record<string, string>>(
    "pexlle:mail:replies:v1",
    {},
  );
  const [folder, setFolder] = useState<Folder>("Inbox");
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All mail" | "Unread">("All mail");
  const [compose, setCompose] = useState<Draft | null>(null);
  const active = mails.find((m) => m.id === selected);
  const getState = (id: string): MailState =>
    state[id] || { read: true, starred: false, folder: "Inbox" };
  const visible = useMemo(
    () =>
      mails.filter((m) => {
        const s = state[m.id] || {
          read: m.read,
          starred: false,
          folder: "Inbox",
        };
        return (
          (folder === "Starred"
            ? s.starred && s.folder !== "Trash"
            : s.folder === folder) &&
          (filter === "All mail" || !s.read) &&
          `${m.name} ${m.subject} ${m.text}`
            .toLowerCase()
            .includes(query.toLowerCase())
        );
      }),
    [folder, filter, query, state],
  );
  const visibleDrafts = drafts.filter((d) =>
    `${d.to} ${d.subject} ${d.text}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  function patch(id: string, update: Partial<MailState>) {
    setState((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || { read: true, starred: false, folder: "Inbox" }),
        ...update,
      },
    }));
  }
  function move(target: "Inbox" | "Archive" | "Trash") {
    if (!active) return;
    const id = active.id;
    const previous = getState(id).folder;
    patch(id, { folder: target });
    setSelected(null);
    toast(target === "Trash" ? "Moved to Trash" : `Moved to ${target}`, {
      action: { label: "Undo", onClick: () => patch(id, { folder: previous }) },
    });
  }
  function saveDraft(draft: Draft) {
    if (!draft.to.trim() && !draft.subject.trim() && !draft.text.trim()) return;
    const next = { ...draft, id: draft.id || crypto.randomUUID() };
    setDrafts((prev) =>
      prev.some((d) => d.id === next.id)
        ? prev.map((d) => (d.id === next.id ? next : d))
        : [next, ...prev],
    );
    setCompose(null);
    toast.success("Draft saved on this device");
  }
  const selectFolder = (next: Folder) => {
    setFolder(next);
    setSelected(null);
    setFilter("All mail");
  };
  return (
    <div className="ws-inbox-page">
      <header className="ws-inbox-title">
        <div>
          <h1>A calmer kind of inbox.</h1>
          <p>A little less noise. A little more headspace.</p>
        </div>
        <button
          className="ws-button primary"
          onClick={() => setCompose({ id: "", to: "", subject: "", text: "" })}
        >
          <SquarePen size={15} />
          Compose
        </button>
      </header>
      <nav className="ws-mail-folder-bar" aria-label="Mailboxes">
        {folders.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => selectFolder(name)}
            aria-pressed={folder === name}
          >
            <Icon size={14} />
            {name}
            {name === "Drafts" && drafts.length > 0 && (
              <span>{drafts.length}</span>
            )}
          </button>
        ))}
      </nav>
      <div className={`ws-inbox-layout ${active ? "has-selection" : ""}`}>
        <aside
          className="ws-conversation-list ws-mail-list"
          aria-label={`${folder} messages`}
        >
          <div className="ws-list-controls">
            <SearchField
              value={query}
              onChange={setQuery}
              placeholder={`Search ${folder.toLowerCase()}…`}
            />
            {folder !== "Drafts" && (
              <Segments
                options={["All mail", "Unread"] as const}
                value={filter}
                onChange={setFilter}
                label="Mail filter"
              />
            )}
          </div>
          <div className="ws-list-scroll">
            {folder === "Drafts"
              ? visibleDrafts.map((draft) => (
                  <button
                    className="ws-conversation"
                    key={draft.id}
                    onClick={() => setCompose({ ...draft })}
                  >
                    <span className="ws-conversation-text">
                      <span className="ws-conversation-top">
                        <strong>{draft.to || "No recipient"}</strong>
                        <time>Draft</time>
                      </span>
                      <span className="ws-mail-subject">
                        {draft.subject || "No subject"}
                      </span>
                      <p>{draft.text}</p>
                    </span>
                  </button>
                ))
              : visible.map((mail) => (
                  <button
                    key={mail.id}
                    className={`ws-conversation ${selected === mail.id ? "selected" : ""}`}
                    onClick={() => {
                      setSelected(mail.id);
                      patch(mail.id, { read: true });
                    }}
                    aria-current={selected === mail.id ? "true" : undefined}
                  >
                    <span className="ws-conversation-text">
                      <span className="ws-conversation-top">
                        <strong>
                          {mail.name}
                          {!getState(mail.id).read && (
                            <span className="ws-unread" aria-label="Unread" />
                          )}
                        </strong>
                        <time>
                          {new Date(mail.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      </span>
                      <span className="ws-mail-subject">
                        {mail.subject}
                        {getState(mail.id).starred && " ★"}
                      </span>
                      <p>{mail.text}</p>
                    </span>
                  </button>
                ))}
            {(folder === "Drafts"
              ? !visibleDrafts.length
              : !visible.length) && (
              <EmptyState
                icon={<Inbox />}
                title="A little breathing room."
                detail={`No ${folder.toLowerCase()} messages match this view.`}
              />
            )}
          </div>
        </aside>
        <section className="ws-thread" aria-label="Mail reading pane">
          {active ? (
            <>
              <div className="ws-mail-actions">
                <div>
                  <button
                    className="ws-icon-button ws-back"
                    aria-label="Back to mail list"
                    onClick={() => setSelected(null)}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <IconButton
                    label={
                      getState(active.id).folder === "Archive"
                        ? "Move to Inbox"
                        : "Archive message"
                    }
                    onClick={() =>
                      move(
                        getState(active.id).folder === "Archive"
                          ? "Inbox"
                          : "Archive",
                      )
                    }
                  >
                    <Archive size={17} />
                  </IconButton>
                  <IconButton
                    label={
                      getState(active.id).folder === "Trash"
                        ? "Restore to Inbox"
                        : "Move to Trash"
                    }
                    onClick={() =>
                      move(
                        getState(active.id).folder === "Trash"
                          ? "Inbox"
                          : "Trash",
                      )
                    }
                  >
                    {getState(active.id).folder === "Trash" ? (
                      <Inbox size={17} />
                    ) : (
                      <Trash2 size={17} />
                    )}
                  </IconButton>
                  <IconButton
                    label={
                      getState(active.id).read ? "Mark unread" : "Mark read"
                    }
                    onClick={() =>
                      patch(active.id, { read: !getState(active.id).read })
                    }
                  >
                    {getState(active.id).read ? (
                      <Mail size={17} />
                    ) : (
                      <MailOpen size={17} />
                    )}
                  </IconButton>
                </div>
                <div>
                  <IconButton
                    label={
                      getState(active.id).starred
                        ? "Unstar message"
                        : "Star message"
                    }
                    onClick={() =>
                      patch(active.id, {
                        starred: !getState(active.id).starred,
                      })
                    }
                  >
                    <Star
                      size={17}
                      fill={
                        getState(active.id).starred ? "var(--ws-blue)" : "none"
                      }
                      color={
                        getState(active.id).starred
                          ? "var(--ws-blue)"
                          : undefined
                      }
                    />
                  </IconButton>
                  <IconButton
                    label="Draft a reply"
                    onClick={() =>
                      setCompose({
                        id: "",
                        to: active.email,
                        subject: `Re: ${active.subject.replace(/^Re: /, "")}`,
                        text: replies[active.id] || "",
                      })
                    }
                  >
                    <ArrowUpLeft size={19} />
                  </IconButton>
                </div>
              </div>
              <article className="ws-mail-body">
                <h2>{active.subject}</h2>
                <div className="ws-mail-sender">
                  <Avatar name={active.name} tone={mails.indexOf(active) % 5} />
                  <div>
                    <strong>{active.name}</strong>
                    <small>
                      {active.email}
                      <br />
                      {new Date(active.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      · Sample mail
                    </small>
                  </div>
                </div>
                <div className="ws-mail-text">{active.text}</div>
                <div className="ws-mail-labels">
                  {active.labels.map((label) => (
                    <span className="ws-tag" key={label}>
                      {label}
                    </span>
                  ))}
                </div>
                {getState(active.id).folder !== "Trash" && (
                  <form
                    className="ws-reply"
                    onSubmit={(e) => {
                      e.preventDefault();
                      saveDraft({
                        id: `reply-${active.id}`,
                        to: active.email,
                        subject: `Re: ${active.subject.replace(/^Re: /, "")}`,
                        text: replies[active.id] || "",
                      });
                      setReplies((prev) => ({ ...prev, [active.id]: "" }));
                    }}
                  >
                    <textarea
                      aria-label={`Reply to ${active.name}`}
                      placeholder={`Reply to ${active.name.split(" ")[0]}…`}
                      value={replies[active.id] || ""}
                      onChange={(e) =>
                        setReplies((prev) => ({
                          ...prev,
                          [active.id]: e.target.value,
                        }))
                      }
                    />
                    <div>
                      <small>Sample mailbox · No mail will be sent</small>
                      <button
                        type="submit"
                        className="ws-button primary"
                        disabled={!replies[active.id]?.trim()}
                      >
                        Save reply draft
                      </button>
                    </div>
                  </form>
                )}
              </article>
            </>
          ) : (
            <EmptyState
              icon={<Mail />}
              title={
                folder === "Drafts"
                  ? "Good words take a little time."
                  : "A moment of clarity."
              }
              detail={
                folder === "Drafts"
                  ? "Choose a draft to pick up where you left off."
                  : "Select a message to read it here. Your inbox, with room to breathe."
              }
            />
          )}
        </section>
      </div>
      <Modal
        open={!!compose}
        onOpenChange={(open) => {
          if (!open && compose) {
            saveDraft(compose);
            setCompose(null);
          }
        }}
        title="A few thoughtful words."
        description="Your draft stays on this device. This sample mailbox does not send email."
      >
        {compose && (
          <form
            className="ws-form"
            onSubmit={(e) => {
              e.preventDefault();
              saveDraft(compose);
            }}
          >
            <label>
              To
              <input
                autoFocus
                value={compose.to}
                onChange={(e) => setCompose({ ...compose, to: e.target.value })}
                placeholder="Email address"
              />
            </label>
            <label>
              Subject
              <input
                value={compose.subject}
                onChange={(e) =>
                  setCompose({ ...compose, subject: e.target.value })
                }
                placeholder="What’s on your mind?"
              />
            </label>
            <label>
              Message
              <textarea
                value={compose.text}
                onChange={(e) =>
                  setCompose({ ...compose, text: e.target.value })
                }
                rows={6}
                placeholder="Start writing…"
              />
            </label>
            <div className="ws-form-footer">
              {compose.id && (
                <button
                  type="button"
                  className="ws-button danger"
                  style={{ marginRight: "auto" }}
                  onClick={() => {
                    const removed = compose;
                    setDrafts((prev) =>
                      prev.filter((d) => d.id !== removed.id),
                    );
                    setCompose(null);
                    toast("Draft deleted", {
                      action: {
                        label: "Undo",
                        onClick: () => setDrafts((prev) => [removed, ...prev]),
                      },
                    });
                  }}
                >
                  Delete draft
                </button>
              )}
              <button
                type="submit"
                className="ws-button primary"
                disabled={
                  !compose.to.trim() &&
                  !compose.subject.trim() &&
                  !compose.text.trim()
                }
              >
                Save draft
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
