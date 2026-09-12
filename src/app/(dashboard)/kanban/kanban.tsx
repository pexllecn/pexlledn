"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  CalendarDays,
  Columns3,
  CheckCircle2,
  Grip,
  Pencil,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { toast } from "sonner";
import {
  Avatar,
  EmptyState,
  IconButton,
  Modal,
  PageHeading,
  SearchField,
  Segments,
  useSavedState,
} from "@/components/workspace/primitives";

type Column = { id: string; title: string };
type Task = {
  id: string;
  title: string;
  description: string;
  column: string;
  tag: string;
  due: string;
  assignee: string;
  progress: number;
};
const initialColumns: Column[] = [
  { id: "todo", title: "To do" },
  { id: "in-progress", title: "In progress" },
  { id: "done", title: "Done" },
];
const initialTasks: Task[] = [
  {
    id: "task1",
    title: "Research project requirements",
    description:
      "Gather the insights and information we need to build something meaningful.",
    column: "todo",
    tag: "Research",
    due: "",
    assignee: "Alice Johnson",
    progress: 0,
  },
  {
    id: "task2",
    title: "Create project timeline",
    description:
      "Bring the milestones, people, and next steps together in one clear plan.",
    column: "in-progress",
    tag: "Planning",
    due: "",
    assignee: "Bob Smith",
    progress: 50,
  },
  {
    id: "task3",
    title: "Set up development environment",
    description:
      "Install and configure the tools that help the team do their best work.",
    column: "done",
    tag: "Development",
    due: "",
    assignee: "Charlie Brown",
    progress: 100,
  },
];
const blankTask = (column: string): Task => ({
  id: "",
  title: "",
  description: "",
  column,
  tag: "",
  due: "",
  assignee: "Khaled Alkurdi",
  progress: 0,
});
export default function Kanban() {
  const [columns, setColumns] = useSavedState<Column[]>(
    "pexlle:project:columns:v1",
    initialColumns,
  );
  const [tasks, setTasks] = useSavedState<Task[]>(
    "pexlle:project:tasks:v1",
    initialTasks,
  );
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"Board" | "List">("Board");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState<Task | null>(null);
  const [columnEditor, setColumnEditor] = useState<Column | null>(null);
  const [dragged, setDragged] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const visible = useMemo(
    () =>
      tasks.filter(
        (t) =>
          `${t.title} ${t.description} ${t.tag} ${t.assignee}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (filter === "all" || t.assignee === filter),
      ),
    [tasks, query, filter],
  );
  function move(id: string, column: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              column,
              progress:
                column === "done" ? 100 : t.column === "done" ? 0 : t.progress,
            }
          : t,
      ),
    );
    toast.success(`Moved to ${columns.find((c) => c.id === column)?.title}`);
  }
  function saveTask(e: React.FormEvent) {
    e.preventDefault();
    if (!editing?.title.trim()) return;
    const next = {
      ...editing,
      title: editing.title.trim(),
      id: editing.id || crypto.randomUUID(),
      progress: editing.column === "done" ? 100 : editing.progress,
    };
    setTasks((prev) =>
      editing.id
        ? prev.map((t) => (t.id === editing.id ? next : t))
        : [...prev, next],
    );
    setEditing(null);
    toast.success(editing.id ? "Task updated" : "Task created");
  }
  function reorderTask(direction: number) {
    if (!editing) return;
    setTasks((prev) => {
      const next = [...prev];
      const index = next.findIndex((t) => t.id === editing.id);
      const peers = next
        .map((t, i) => ({ t, i }))
        .filter(({ t }) => t.column === editing.column);
      const position = peers.findIndex(({ t }) => t.id === editing.id);
      const neighbor = peers[position + direction];
      if (neighbor)
        [next[index], next[neighbor.i]] = [next[neighbor.i], next[index]];
      return next;
    });
  }
  return (
    <div className="ws-page">
      <PageHeading
        eyebrow="Make space for great ideas"
        title="A little more momentum."
        description="From the first spark to the finishing touch. All in one place."
      >
        <button
          className="ws-button primary"
          onClick={() => setEditing(blankTask(columns[0]?.id || "todo"))}
        >
          <Plus size={15} />
          New task
        </button>
      </PageHeading>
      <div className="ws-project-summary">
        <span>
          <strong>{tasks.length}</strong> tasks
        </span>
        <span>
          <strong>
            {tasks.filter((t) => t.column === "in-progress").length}
          </strong>{" "}
          in progress
        </span>
        <span>
          <strong>{tasks.filter((t) => t.column === "done").length}</strong>{" "}
          completed
        </span>
        <div className="ws-team">
          <Avatar name="Alice Johnson" small />
          <Avatar name="Bob Smith" tone={1} small />
          <Avatar name="Charlie Brown" tone={2} small />
          <small>Your team</small>
        </div>
      </div>
      <div className="ws-board-toolbar">
        <div>
          <Segments
            options={["Board", "List"] as const}
            value={view}
            onChange={setView}
            label="Project view"
          />
          <button
            className="ws-button quiet"
            onClick={() => setColumnEditor({ id: "", title: "" })}
          >
            <Plus size={13} />
            New column
          </button>
        </div>
        <div>
          <SearchField
            value={query}
            onChange={setQuery}
            placeholder="Find a task…"
          />
          <select
            className="ws-button"
            aria-label="Filter by assignee"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Everyone</option>
            {Array.from(new Set(tasks.map((t) => t.assignee))).map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>
      {view === "Board" ? (
        <div
          className="ws-board"
          style={{
            gridTemplateColumns: `repeat(${columns.length}, minmax(260px, 1fr))`,
          }}
        >
          {columns.map((column) => (
            <section
              key={column.id}
              className={`ws-column ${over === column.id ? "drag-over" : ""}`}
              aria-label={column.title}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(column.id);
              }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node))
                  setOver(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (dragged) move(dragged, column.id);
                setDragged(null);
                setOver(null);
              }}
            >
              <div className="ws-column-heading">
                <span className={`ws-status-dot ${column.id}`} />
                <h2>{column.title}</h2>
                <span>
                  {visible.filter((t) => t.column === column.id).length}
                </span>
                <IconButton
                  label={`Edit ${column.title} column`}
                  onClick={() => setColumnEditor({ ...column })}
                >
                  <Pencil size={13} />
                </IconButton>
              </div>
              {visible
                .filter((t) => t.column === column.id)
                .map((task, i) => (
                  <article
                    key={task.id}
                    className="ws-task-card"
                    draggable
                    onDragStart={() => setDragged(task.id)}
                    onDragEnd={() => {
                      setDragged(null);
                      setOver(null);
                    }}
                  >
                    <button
                      className="ws-task-open"
                      onClick={() => setEditing({ ...task })}
                      aria-label={`Edit ${task.title}`}
                    >
                      <span className="ws-tag">{task.tag || "Task"}</span>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                    </button>
                    {task.progress > 0 && task.column !== "done" && (
                      <div
                        className="ws-progress"
                        style={{ marginTop: 15 }}
                        role="progressbar"
                        aria-label="Task progress"
                        aria-valuenow={task.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div style={{ width: `${task.progress}%` }} />
                      </div>
                    )}
                    <div className="ws-task-meta">
                      <span title={task.assignee}>
                        <Avatar name={task.assignee} tone={i} small />
                        {task.assignee.split(" ")[0]}
                      </span>
                      <span>
                        {task.column === "done" ? (
                          <>
                            <CheckCircle2 size={12} />
                            Complete
                          </>
                        ) : task.due ? (
                          <>
                            <CalendarDays size={11} />
                            {new Date(
                              task.due + "T12:00:00",
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </>
                        ) : (
                          <>
                            <Grip size={12} />
                            Drag to move
                          </>
                        )}
                      </span>
                    </div>
                  </article>
                ))}
              <button
                className="ws-add-task"
                onClick={() => setEditing(blankTask(column.id))}
              >
                <Plus size={14} />
                Add task
              </button>
            </section>
          ))}
        </div>
      ) : (
        <div className="ws-list-view">
          <table className="ws-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Assignee</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((t) => (
                <tr key={t.id}>
                  <td>
                    <button onClick={() => setEditing({ ...t })}>
                      {t.title}
                    </button>
                  </td>
                  <td>{t.assignee}</td>
                  <td>
                    <select
                      className="ws-select"
                      aria-label={`Status of ${t.title}`}
                      value={t.column}
                      onChange={(e) => move(t.id, e.target.value)}
                    >
                      {columns.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {visible.length === 0 && (
        <EmptyState
          icon={<Columns3 />}
          title="Room for something new."
          detail={
            tasks.length
              ? "No tasks match your search or filter."
              : "Add your first task to get things moving."
          }
        />
      )}
      <p className="ws-board-footer">
        <CheckCircle2 size={12} />
        Saved on this device. Open a task to edit, reorder, or move it with the
        keyboard.
      </p>
      <Modal
        open={!!editing}
        onOpenChange={(open) => {
          if (!open) setEditing(null);
        }}
        title={editing?.id ? "The next little step." : "Start something good."}
        description="Give your task a clear purpose and a place to go."
      >
        {editing && (
          <form className="ws-form" onSubmit={saveTask}>
            <label>
              Task name
              <input
                autoFocus
                required
                maxLength={160}
                value={editing.title}
                onChange={(e) =>
                  setEditing({ ...editing, title: e.target.value })
                }
                placeholder="What would you like to do?"
              />
            </label>
            <label>
              Description
              <textarea
                value={editing.description}
                onChange={(e) =>
                  setEditing({ ...editing, description: e.target.value })
                }
                placeholder="Add a little context…"
              />
            </label>
            <div className="ws-form-row">
              <label>
                Status
                <select
                  value={editing.column}
                  onChange={(e) =>
                    setEditing({ ...editing, column: e.target.value })
                  }
                >
                  {columns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Due date
                <input
                  type="date"
                  value={editing.due}
                  onChange={(e) =>
                    setEditing({ ...editing, due: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="ws-form-row">
              <label>
                Assignee
                <select
                  value={editing.assignee}
                  onChange={(e) =>
                    setEditing({ ...editing, assignee: e.target.value })
                  }
                >
                  {[
                    "Khaled Alkurdi",
                    "Alice Johnson",
                    "Bob Smith",
                    "Charlie Brown",
                  ].map((name) => (
                    <option key={name}>{name}</option>
                  ))}
                </select>
              </label>
              <label>
                Label
                <input
                  maxLength={30}
                  value={editing.tag}
                  onChange={(e) =>
                    setEditing({ ...editing, tag: e.target.value })
                  }
                  placeholder="e.g. Design"
                />
              </label>
            </div>
            <label>
              Progress · {editing.column === "done" ? 100 : editing.progress}%
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                disabled={editing.column === "done"}
                value={editing.column === "done" ? 100 : editing.progress}
                onChange={(e) =>
                  setEditing({ ...editing, progress: Number(e.target.value) })
                }
              />
            </label>
            {editing.id && (
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  className="ws-button"
                  onClick={() => reorderTask(-1)}
                >
                  <ArrowUp size={13} />
                  Move up
                </button>
                <button
                  type="button"
                  className="ws-button"
                  onClick={() => reorderTask(1)}
                >
                  <ArrowDown size={13} />
                  Move down
                </button>
              </div>
            )}
            <div className="ws-form-footer">
              {editing.id && (
                <button
                  type="button"
                  className="ws-button danger"
                  style={{ marginRight: "auto" }}
                  onClick={() => {
                    const removed = editing;
                    setTasks((prev) => prev.filter((t) => t.id !== removed.id));
                    setEditing(null);
                    toast("Task deleted", {
                      action: {
                        label: "Undo",
                        onClick: () => setTasks((prev) => [...prev, removed]),
                      },
                    });
                  }}
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                className="ws-button"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
              <button className="ws-button primary" type="submit">
                {editing.id ? "Save changes" : "Create task"}
              </button>
            </div>
          </form>
        )}
      </Modal>
      <Modal
        open={!!columnEditor}
        onOpenChange={(open) => {
          if (!open) setColumnEditor(null);
        }}
        title={
          columnEditor?.id ? "Make it yours." : "A new place for progress."
        }
        description="Organize your board in a way that works for you."
      >
        {columnEditor && (
          <form
            className="ws-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!columnEditor.title.trim()) return;
              setColumns((prev) =>
                columnEditor.id
                  ? prev.map((c) =>
                      c.id === columnEditor.id
                        ? { ...columnEditor, title: columnEditor.title.trim() }
                        : c,
                    )
                  : [
                      ...prev,
                      {
                        id: crypto.randomUUID(),
                        title: columnEditor.title.trim(),
                      },
                    ],
              );
              setColumnEditor(null);
            }}
          >
            <label>
              Column name
              <input
                autoFocus
                required
                maxLength={40}
                value={columnEditor.title}
                onChange={(e) =>
                  setColumnEditor({ ...columnEditor, title: e.target.value })
                }
              />
            </label>
            <div className="ws-form-footer">
              {columnEditor.id && (
                <button
                  type="button"
                  className="ws-button danger"
                  disabled={
                    tasks.some((t) => t.column === columnEditor.id) ||
                    columns.length < 2
                  }
                  title="Move tasks out of the column before deleting it"
                  onClick={() => {
                    setColumns((prev) =>
                      prev.filter((c) => c.id !== columnEditor.id),
                    );
                    setColumnEditor(null);
                  }}
                >
                  Delete empty column
                </button>
              )}
              <button className="ws-button primary" type="submit">
                Save column
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
