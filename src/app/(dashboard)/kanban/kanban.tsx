"use client";

import React, { useMemo, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { format, isAfter, isToday } from "date-fns";
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  CircleDashed,
  FilePenLine,
  GripVertical,
  LayoutGrid,
  ListChecks,
  MoreHorizontal,
  PlusIcon,
  TrashIcon,
} from "lucide-react";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { EASE_OUT, rise, stagger } from "@/lib/apple-motion";
import { PageHead, Surface } from "../dashboard/_components/primitives";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

/* -------------------------------------------------------------------------- */
/*  Model                                                                     */
/* -------------------------------------------------------------------------- */

type User = { id: string; name: string; avatar: string };

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  image: string | null;
  assignees: User[];
  tags: string[];
  status: "todo" | "in-progress" | "done";
  progress: number;
};

type Board = { id: string; title: string; tasks: Task[] };

const users: User[] = [
  { id: "user1", name: "Alice", avatar: "https://i.pravatar.cc/48?img=1" },
  { id: "user2", name: "Bob", avatar: "https://i.pravatar.cc/48?img=2" },
  { id: "user3", name: "Charlie", avatar: "https://i.pravatar.cc/48?img=3" },
];

const coverImages = [
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1720048171230-c60d162f93a0?w=1200&auto=format&fit=crop&q=60",
];

/**
 * Covers come from a remote host, so they can fail. A broken-image box is worse
 * than no image at all, so a failed load unmounts the element entirely and the
 * card simply renders without a cover.
 */
function Cover({ src, className }: { src: string; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      onError={() => setFailed(true)}
      className={className}
      loading="lazy"
    />
  );
}

const STATUS_META: Record<Task["status"], { label: string; Icon: React.ElementType }> = {
  todo: { label: "To do", Icon: Circle },
  "in-progress": { label: "In progress", Icon: CircleDashed },
  done: { label: "Done", Icon: CheckCircle2 },
};

/* -------------------------------------------------------------------------- */
/*  Responsive dialog                                                         */
/* -------------------------------------------------------------------------- */

const ResponsiveDialog: React.FC<{
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  content: React.ReactNode;
  footer: React.ReactNode;
}> = ({ isOpen, onOpenChange, title, description, content, footer }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          {content}

          <DialogFooter>{footer}</DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>

        <div className="px-4">{content}</div>

        <DrawerFooter className="pt-2">
          {footer}
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

/* -------------------------------------------------------------------------- */
/*  Board                                                                     */
/* -------------------------------------------------------------------------- */

export default function KanbanBoard() {
  const [boards, setBoards] = useState<Board[]>([
    {
      id: "board1",
      title: "To Do",
      tasks: [
        {
          id: "task1",
          title: "Research project requirements",
          description: "Gather all necessary information for the project",
          dueDate: new Date(2023, 5, 30),
          image: coverImages[0],
          assignees: [users[0]],
          tags: ["research"],
          status: "todo",
          progress: 0,
        },
      ],
    },
    {
      id: "board2",
      title: "In Progress",
      tasks: [
        {
          id: "task2",
          title: "Create project timeline",
          description: "Develop a comprehensive timeline for the project",
          dueDate: new Date(2023, 6, 15),
          image: null,
          assignees: [users[1], users[2]],
          tags: ["planning", "timeline"],
          status: "in-progress",
          progress: 50,
        },
      ],
    },
    {
      id: "board3",
      title: "Done",
      tasks: [
        {
          id: "task3",
          title: "Set up development environment",
          description: "Install and configure all necessary tools",
          dueDate: null,
          image: coverImages[1],
          assignees: [users[2]],
          tags: ["setup", "DevOps"],
          status: "done",
          progress: 100,
        },
      ],
    },
  ]);

  const [newTask, setNewTask] = useState<Omit<Task, "id" | "status" | "progress">>({
    title: "",
    description: "",
    dueDate: null,
    image: null,
    assignees: [],
    tags: [],
  });

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingBoard, setEditingBoard] = useState<string | null>(null);
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false);
  const [isTaskDetailDialogOpen, setIsTaskDetailDialogOpen] = useState(false);
  const [newTaskBoardId, setNewTaskBoardId] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newBoardTitle, setNewBoardTitle] = useState("");

  /* ----------------------------- drag and drop ---------------------------- */

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "BOARD") {
      const newBoards = Array.from(boards);
      const [reordered] = newBoards.splice(source.index, 1);
      newBoards.splice(destination.index, 0, reordered);
      setBoards(newBoards);
      return;
    }

    const sourceBoard = boards.find((b) => b.id === source.droppableId);
    const destBoard = boards.find((b) => b.id === destination.droppableId);

    if (!sourceBoard || !destBoard) return;

    setBoards(
      boards.map((board) => {
        if (board.id === sourceBoard.id) {
          const newTasks = Array.from(board.tasks);
          const [moved] = newTasks.splice(source.index, 1);

          if (board.id === destBoard.id) {
            newTasks.splice(destination.index, 0, moved);
          }

          return { ...board, tasks: newTasks };
        }

        if (board.id === destBoard.id && sourceBoard.id !== destBoard.id) {
          const newTasks = Array.from(board.tasks);
          const [moved] = sourceBoard.tasks.slice(source.index, source.index + 1);

          const updated: Task = {
            ...moved,
            status: destBoard.title
              .toLowerCase()
              .replace(" ", "-") as Task["status"],
            progress:
              destBoard.title === "Done" ? 100 : destBoard.title === "In Progress" ? 50 : 0,
          };

          newTasks.splice(destination.index, 0, updated);
          return { ...board, tasks: newTasks };
        }

        return board;
      }),
    );
  };

  /* --------------------------------- CRUD --------------------------------- */

  const addBoard = () => {
    if (newBoardTitle.trim() === "") return;

    setBoards([...boards, { id: Date.now().toString(), title: newBoardTitle, tasks: [] }]);
    setNewBoardTitle("");
  };

  const addTask = () => {
    if (newTask.title.trim() === "" || !newTaskBoardId) return;

    const boardTitle = boards
      .find((b) => b.id === newTaskBoardId)
      ?.title.toLowerCase()
      .replace(" ", "-");

    setBoards(
      boards.map((board) =>
        board.id === newTaskBoardId
          ? {
              ...board,
              tasks: [
                ...board.tasks,
                {
                  id: Date.now().toString(),
                  ...newTask,
                  image: coverImages[Math.floor(Math.random() * coverImages.length)],
                  status: boardTitle as Task["status"],
                  progress: boardTitle === "done" ? 100 : boardTitle === "in-progress" ? 50 : 0,
                },
              ],
            }
          : board,
      ),
    );

    setNewTask({
      title: "",
      description: "",
      dueDate: null,
      image: null,
      assignees: [],
      tags: [],
    });
    setIsNewTaskDialogOpen(false);
  };

  const updateTask = () => {
    if (!editingTask || editingTask.title.trim() === "") return;

    setBoards(
      boards.map((board) => ({
        ...board,
        tasks: board.tasks.map((task) => (task.id === editingTask.id ? editingTask : task)),
      })),
    );

    setEditingTask(null);
    setIsEditTaskDialogOpen(false);
  };

  const deleteTask = (boardId: string, taskId: string) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? { ...board, tasks: board.tasks.filter((t) => t.id !== taskId) }
          : board,
      ),
    );
  };

  const deleteBoard = (boardId: string) =>
    setBoards(boards.filter((b) => b.id !== boardId));

  const updateBoardTitle = (boardId: string, title: string) => {
    if (title.trim() === "") return;

    setBoards(boards.map((b) => (b.id === boardId ? { ...b, title } : b)));
    setEditingBoard(null);
  };

  /* -------------------------------- summary ------------------------------- */

  const stats = useMemo(() => {
    const all = boards.flatMap((b) => b.tasks);

    return [
      { icon: LayoutGrid, label: "Lists", value: boards.length },
      { icon: ListChecks, label: "Cards", value: all.length },
      {
        icon: CircleDashed,
        label: "In progress",
        value: all.filter((t) => t.status === "in-progress").length,
      },
      {
        icon: CheckCircle2,
        label: "Completed",
        value: all.filter((t) => t.status === "done").length,
      },
    ];
  }, [boards]);

  /* --------------------------------- form --------------------------------- */

  const taskFields = (
    value: Omit<Task, "id" | "status" | "progress">,
    onChange: (next: Omit<Task, "id" | "status" | "progress">) => void,
  ) => (
    <div className="grid gap-4 py-2">
      <div className="grid gap-2">
        <Label htmlFor="task-title">Title</Label>
        <Input
          id="task-title"
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
          placeholder="What needs doing?"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="task-description">Description</Label>
        <Textarea
          id="task-description"
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
          placeholder="Add a little more detail"
        />
      </div>

      <div className="grid gap-2">
        <Label>Due date</Label>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !value.dueDate && "text-muted-foreground",
              )}
            >
              <CalendarDays className="mr-2 size-4" />
              {value.dueDate ? format(value.dueDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <CalendarComponent
              mode="single"
              selected={value.dueDate || undefined}
              onSelect={(date) => onChange({ ...value, dueDate: date || null })}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid gap-2">
        <Label>Assignees</Label>

        <div className="flex flex-wrap gap-2">
          {users.map((user) => {
            const on = value.assignees.some((u) => u.id === user.id);

            return (
              <button
                key={user.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...value,
                    assignees: on
                      ? value.assignees.filter((u) => u.id !== user.id)
                      : [...value.assignees, user],
                  })
                }
                className={cn(
                  "flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-sm transition-colors",
                  on ? "border-transparent bg-foreground text-background" : "hover:bg-muted",
                )}
              >
                <Avatar className="size-6">
                  <AvatarImage src={user.avatar} alt="" />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                {user.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="task-tags">Tags</Label>
        <Input
          id="task-tags"
          value={value.tags.join(", ")}
          onChange={(e) =>
            onChange({ ...value, tags: e.target.value.split(",").map((t) => t.trim()) })
          }
          placeholder="Separate tags with commas"
        />
      </div>
    </div>
  );

  return (
    <ContentLayout title="Kanban">
      <div className="mx-auto max-w-[1600px] space-y-8 px-1 pb-16 pt-6">
        <PageHead
          eyebrow="Workspace"
          title="Board"
          actions={
            <div className="flex items-center gap-2">
              <Input
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addBoard()}
                placeholder="New list name"
                className="h-9 w-44 rounded-full"
              />

              <Button onClick={addBoard} className="rounded-full">
                <PlusIcon className="mr-1.5 size-4" />
                Add list
              </Button>
            </div>
          }
        />

        <motion.div
          variants={stagger()}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={rise}>
              <Surface className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                  <stat.icon className="size-5" aria-hidden />
                </span>

                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold leading-none tabular-nums">
                    {stat.value}
                  </p>
                </div>
              </Surface>
            </motion.div>
          ))}
        </motion.div>

        {/*
          Everything below sits inside react-beautiful-dnd, which positions
          draggables by writing inline `transform` on them every frame. Framer
          Motion drives the same property, so the two must never be applied to
          the same element - a motion wrapper on a Draggable makes cards land in
          the wrong place. Entrance animation therefore lives on containers
          OUTSIDE the draggables, and the cards themselves use CSS transitions.
        */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-boards" direction="horizontal" type="BOARD">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex items-start gap-4 overflow-x-auto pb-4"
              >
                {boards.map((board, boardIndex) => (
                  <Draggable key={board.id} draggableId={board.id} index={boardIndex}>
                    {(boardProvided, boardSnapshot) => (
                      <div
                        ref={boardProvided.innerRef}
                        {...boardProvided.draggableProps}
                        className={cn(
                          "w-[310px] shrink-0 rounded-lg bg-muted/50 transition-shadow duration-200",
                          boardSnapshot.isDragging && "shadow-2xl",
                        )}
                      >
                        {/* ------------------------ list header ------------- */}
                        <div className="flex items-center gap-2 px-3 pb-2 pt-3">
                          <span
                            {...boardProvided.dragHandleProps}
                            className="cursor-grab text-muted-foreground/60 transition-colors hover:text-foreground active:cursor-grabbing"
                            aria-label="Reorder list"
                          >
                            <GripVertical className="size-4" />
                          </span>

                          {editingBoard === board.id ? (
                            <Input
                              autoFocus
                              defaultValue={board.title}
                              onBlur={(e) => updateBoardTitle(board.id, e.target.value)}
                              onKeyDown={(e) =>
                                e.key === "Enter" &&
                                updateBoardTitle(board.id, e.currentTarget.value)
                              }
                              className="h-7 flex-1"
                            />
                          ) : (
                            <button
                              type="button"
                              onDoubleClick={() => setEditingBoard(board.id)}
                              className="flex-1 truncate text-left text-sm font-semibold tracking-tight"
                            >
                              {board.title}
                            </button>
                          )}

                          <span className="rounded-full bg-background px-2 py-0.5 text-xs font-medium tabular-nums text-muted-foreground">
                            {board.tasks.length}
                          </span>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="size-7 p-0 text-muted-foreground">
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setEditingBoard(board.id)}>
                                <FilePenLine className="mr-2 size-4" />
                                Rename
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => deleteBoard(board.id)}
                                className="text-destructive focus:text-destructive"
                              >
                                <TrashIcon className="mr-2 size-4" />
                                Delete list
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* --------------------------- cards ---------------- */}
                        <Droppable droppableId={board.id} type="TASK">
                          {(taskProvided, taskSnapshot) => (
                            <div
                              ref={taskProvided.innerRef}
                              {...taskProvided.droppableProps}
                              className={cn(
                                "min-h-[80px] space-y-2 px-2 pb-2 transition-colors duration-200",
                                taskSnapshot.isDraggingOver && "bg-foreground/[0.04]",
                              )}
                            >
                              {board.tasks.map((task, taskIndex) => {
                                const meta = STATUS_META[task.status];
                                const overdue =
                                  task.dueDate &&
                                  task.status !== "done" &&
                                  isAfter(new Date(), task.dueDate);
                                const dueToday = task.dueDate && isToday(task.dueDate);

                                return (
                                  <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                                    {(cardProvided, cardSnapshot) => (
                                      <div
                                        ref={cardProvided.innerRef}
                                        {...cardProvided.draggableProps}
                                        {...cardProvided.dragHandleProps}
                                        onClick={() => {
                                          setSelectedTask(task);
                                          setIsTaskDetailDialogOpen(true);
                                        }}
                                        className={cn(
                                          "group cursor-pointer overflow-hidden rounded-lg border bg-card",
                                          "transition-[box-shadow,border-color] duration-200",
                                          cardSnapshot.isDragging
                                            ? "shadow-2xl ring-1 ring-foreground/10"
                                            : "shadow-sm hover:border-foreground/20 hover:shadow-md",
                                        )}
                                      >
                                        {task.image && (
                                          <Cover
                                            src={task.image}
                                            className="h-24 w-full object-cover"
                                          />
                                        )}

                                        <div className="space-y-2.5 p-3">
                                          <div className="flex items-start gap-2">
                                            <meta.Icon
                                              className={cn(
                                                "mt-0.5 size-4 shrink-0",
                                                task.status === "done"
                                                  ? "text-emerald-500"
                                                  : "text-muted-foreground",
                                              )}
                                              aria-hidden
                                            />

                                            <p className="flex-1 text-sm font-medium leading-snug">
                                              {task.title}
                                            </p>
                                          </div>

                                          {task.tags.filter(Boolean).length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                              {task.tags.filter(Boolean).map((tag) => (
                                                <span
                                                  key={tag}
                                                  className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                                                >
                                                  {tag}
                                                </span>
                                              ))}
                                            </div>
                                          )}

                                          {task.progress > 0 && (
                                            <div className="h-1 overflow-hidden rounded-full bg-muted">
                                              <div
                                                className="h-full rounded-full bg-foreground/70 transition-[width] duration-500"
                                                style={{ width: `${task.progress}%` }}
                                              />
                                            </div>
                                          )}

                                          <div className="flex items-center justify-between gap-2">
                                            <div className="flex -space-x-1.5">
                                              {task.assignees.map((user) => (
                                                <Avatar
                                                  key={user.id}
                                                  className="size-6 ring-2 ring-card"
                                                >
                                                  <AvatarImage src={user.avatar} alt={user.name} />
                                                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                                                </Avatar>
                                              ))}
                                            </div>

                                            {task.dueDate && (
                                              <span
                                                className={cn(
                                                  "flex items-center gap-1 text-[11px] tabular-nums",
                                                  overdue
                                                    ? "text-destructive"
                                                    : dueToday
                                                      ? "text-foreground"
                                                      : "text-muted-foreground",
                                                )}
                                              >
                                                <CalendarDays className="size-3" aria-hidden />
                                                {format(task.dueDate, "MMM d")}
                                                {overdue && " · overdue"}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}

                              {taskProvided.placeholder}
                            </div>
                          )}
                        </Droppable>

                        <div className="px-2 pb-3">
                          <button
                            type="button"
                            onClick={() => {
                              setNewTaskBoardId(board.id);
                              setIsNewTaskDialogOpen(true);
                            }}
                            className="flex w-full items-center gap-1.5 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                          >
                            <PlusIcon className="size-4" />
                            Add a card
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* --------------------------- new task ----------------------------- */}

      <ResponsiveDialog
        isOpen={isNewTaskDialogOpen}
        onOpenChange={setIsNewTaskDialogOpen}
        title="New card"
        description="Add a card to this list."
        content={taskFields(newTask, setNewTask)}
        footer={<Button onClick={addTask}>Add card</Button>}
      />

      {/* --------------------------- edit task ---------------------------- */}

      <ResponsiveDialog
        isOpen={isEditTaskDialogOpen}
        onOpenChange={setIsEditTaskDialogOpen}
        title="Edit card"
        description="Update the details of this card."
        content={
          editingTask
            ? taskFields(editingTask, (next) =>
                setEditingTask({ ...editingTask, ...next }),
              )
            : null
        }
        footer={<Button onClick={updateTask}>Save changes</Button>}
      />

      {/* -------------------------- task detail --------------------------- */}

      <ResponsiveDialog
        isOpen={isTaskDetailDialogOpen}
        onOpenChange={setIsTaskDetailDialogOpen}
        title={selectedTask?.title ?? ""}
        description={selectedTask ? STATUS_META[selectedTask.status].label : ""}
        content={
          selectedTask && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="space-y-4 py-2"
            >
              {selectedTask.image && (
                <Cover
                  src={selectedTask.image}
                  className="h-40 w-full rounded-md object-cover"
                />
              )}

              {selectedTask.description && (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {selectedTask.description}
                </p>
              )}

              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Due</dt>
                  <dd className="mt-0.5 font-medium">
                    {selectedTask.dueDate ? format(selectedTask.dueDate, "PPP") : "No date"}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs text-muted-foreground">Progress</dt>
                  <dd className="mt-0.5 font-medium tabular-nums">
                    {selectedTask.progress}%
                  </dd>
                </div>
              </dl>

              {selectedTask.assignees.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground">Assignees</p>

                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {selectedTask.assignees.map((user) => (
                      <span
                        key={user.id}
                        className="flex items-center gap-2 rounded-full bg-muted py-1 pl-1 pr-3 text-sm"
                      >
                        <Avatar className="size-6">
                          <AvatarImage src={user.avatar} alt="" />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        {user.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )
        }
        footer={
          selectedTask && (
            <div className="flex w-full gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setEditingTask(selectedTask);
                  setIsTaskDetailDialogOpen(false);
                  setIsEditTaskDialogOpen(true);
                }}
              >
                <FilePenLine className="mr-2 size-4" />
                Edit
              </Button>

              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => {
                  const board = boards.find((b) =>
                    b.tasks.some((t) => t.id === selectedTask.id),
                  );

                  if (board) deleteTask(board.id, selectedTask.id);
                  setIsTaskDetailDialogOpen(false);
                }}
              >
                <TrashIcon className="mr-2 size-4" />
                Delete
              </Button>
            </div>
          )
        }
      />
    </ContentLayout>
  );
}
