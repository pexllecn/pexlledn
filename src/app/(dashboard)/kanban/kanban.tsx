"use client";
import React, { useState, useCallback } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  PlusIcon,
  MoreHorizontal,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  GripHorizontal,
  TrashIcon,
  FilePenLine,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, isAfter, isBefore, isToday } from "date-fns";
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
import { Progress } from "@/components/ui/progress";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { motion } from "framer-motion";

type User = {
  id: string;
  name: string;
  avatar: string;
};

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

type Board = {
  id: string;
  title: string;
  tasks: Task[];
};

const variants1 = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const users: User[] = [
  { id: "user1", name: "Alice", avatar: "https://i.pravatar.cc/48?img=1" },
  { id: "user2", name: "Bob", avatar: "https://i.pravatar.cc/48?img=2" },
  { id: "user3", name: "Charlie", avatar: "https://i.pravatar.cc/48?img=3" },
];

const unsplashImages = [
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1720048171230-c60d162f93a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1720048171230-c60d162f93a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

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
        <DialogContent>
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
          image: unsplashImages[0],
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
          image: unsplashImages[1],
          assignees: [users[2]],
          tags: ["setup", "DevOps"],
          status: "done",
          progress: 100,
        },
      ],
    },
  ]);

  const [newTask, setNewTask] = useState<
    Omit<Task, "id" | "status" | "progress">
  >({
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
      const [reorderedBoard] = newBoards.splice(source.index, 1);
      newBoards.splice(destination.index, 0, reorderedBoard);
      setBoards(newBoards);
    } else if (type === "TASK") {
      const sourceBoard = boards.find(
        (board) => board.id === source.droppableId
      );
      const destBoard = boards.find(
        (board) => board.id === destination.droppableId
      );

      if (!sourceBoard || !destBoard) return;

      const newBoards = boards.map((board) => {
        if (board.id === sourceBoard.id) {
          const newTasks = Array.from(board.tasks);
          const [movedTask] = newTasks.splice(source.index, 1);
          if (board.id === destBoard.id) {
            newTasks.splice(destination.index, 0, movedTask);
          }
          return { ...board, tasks: newTasks };
        }
        if (board.id === destBoard.id && sourceBoard.id !== destBoard.id) {
          const newTasks = Array.from(board.tasks);
          const [movedTask] = sourceBoard.tasks.slice(
            source.index,
            source.index + 1
          );
          const updatedTask = {
            ...movedTask,
            status: destBoard.title
              .toLowerCase()
              .replace(" ", "-") as Task["status"],
            progress:
              destBoard.title === "Done"
                ? 100
                : destBoard.title === "In Progress"
                ? 50
                : 0,
          };
          newTasks.splice(destination.index, 0, updatedTask);
          return { ...board, tasks: newTasks };
        }
        return board;
      });

      setBoards(newBoards);
    }
  };

  const addBoard = () => {
    if (newBoardTitle.trim() !== "") {
      setBoards([
        ...boards,
        { id: Date.now().toString(), title: newBoardTitle, tasks: [] },
      ]);
      setNewBoardTitle("");
    }
  };

  const addTask = () => {
    if (newTask.title.trim() !== "" && newTaskBoardId) {
      const boardTitle = boards
        .find((board) => board.id === newTaskBoardId)
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
                    image:
                      unsplashImages[
                        Math.floor(Math.random() * unsplashImages.length)
                      ],
                    status: boardTitle as Task["status"],
                    progress:
                      boardTitle === "done"
                        ? 100
                        : boardTitle === "in-progress"
                        ? 50
                        : 0,
                  },
                ],
              }
            : board
        )
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
    }
  };

  const updateTask = () => {
    if (editingTask && editingTask.title.trim() !== "") {
      setBoards(
        boards.map((board) => ({
          ...board,
          tasks: board.tasks.map((task) =>
            task.id === editingTask.id ? editingTask : task
          ),
        }))
      );
      setEditingTask(null);
      setIsEditTaskDialogOpen(false);
    }
  };

  const deleteTask = (boardId: string, taskId: string) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks.filter((task) => task.id !== taskId),
            }
          : board
      )
    );
  };

  const deleteBoard = (boardId: string) => {
    setBoards(boards.filter((board) => board.id !== boardId));
  };

  const updateBoardTitle = (boardId: string, newTitle: string) => {
    if (newTitle.trim() !== "") {
      setBoards(
        boards.map((board) =>
          board.id === boardId ? { ...board, title: newTitle } : board
        )
      );
      setEditingBoard(null);
    }
  };

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "todo":
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case "in-progress":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "done":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    }
  };

  const getDueDateStatus = (dueDate: Date | null) => {
    if (!dueDate) return null;
    if (isAfter(new Date(), dueDate)) return "overdue";
    if (isToday(dueDate)) return "due-today";
    if (isBefore(new Date(), dueDate)) return "upcoming";
    return null;
  };

  return (
    <ContentLayout title="Kanban">
      <div className="p-6 bg-background min-h-screen">
        <div className="max-w-9xl mx-auto">
          <h1 className="text-3xl font-normal mb-8 text-foreground">
            Kanban Board
          </h1>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="boards" type="BOARD" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex gap-6 overflow-x-auto pb-6"
                >
                  {boards.map((board, boardIndex) => (
                    <Draggable
                      key={board.id}
                      draggableId={board.id}
                      index={boardIndex}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-muted rounded-lg p-4 min-w-[300px] max-w-[300px] transition-shadow duration-200 ${
                            snapshot.isDragging ? "shadow-lg" : ""
                          }`}
                        >
                          <div className="flex justify-between items-center mb-4 cursor-move">
                            {editingBoard === board.id ? (
                              <Input
                                value={board.title}
                                onChange={(e) =>
                                  updateBoardTitle(board.id, e.target.value)
                                }
                                onBlur={() => setEditingBoard(null)}
                                autoFocus
                                className="font-semibold text-lg"
                              />
                            ) : (
                              <h2 className="font-semibold text-lg text-card-foreground flex items-center">
                                <GripHorizontal className="h-5 w-5 mr-2 text-muted-foreground" />
                                {board.title}
                              </h2>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => setEditingBoard(board.id)}
                                >
                                  <FilePenLine className="mr-2 h-4 w-4" /> Edit
                                  Title
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => deleteBoard(board.id)}
                                >
                                  <TrashIcon className="mr-2 h-4 w-4" /> Delete
                                  Board
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <Droppable droppableId={board.id} type="TASK">
                            {(provided, snapshot) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={`min-h-[200px] transition-colors duration-200 ${
                                  snapshot.isDraggingOver ? "bg-accent" : ""
                                }`}
                              >
                                {board.tasks.map((task, index) => (
                                  <Draggable
                                    key={task.id}
                                    draggableId={task.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`mb-3 bg-background hover:bg-accent transition-all duration-200 cursor-move overflow-hidden rounded-md ${
                                          snapshot.isDragging
                                            ? "shadow-lg transform scale-105"
                                            : ""
                                        }`}
                                        onClick={() => {
                                          setSelectedTask(task);
                                          setIsTaskDetailDialogOpen(true);
                                        }}
                                      >
                                        <Card>
                                          <CardContent className="p-3">
                                            <h3 className="font-semibold text-sm text-card-foreground mb-2 flex items-center">
                                              <GripHorizontal className="h-4 w-4 mr-2 text-muted-foreground" />
                                              {task.title}
                                            </h3>
                                            {task.image && (
                                              <img
                                                src={task.image}
                                                alt="Task"
                                                className="w-full h-32 object-cover rounded-md mb-2"
                                              />
                                            )}
                                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                              {task.description}
                                            </p>
                                            <div className="flex flex-wrap gap-1 mb-2">
                                              {task.tags.map((tag, index) => (
                                                <Badge
                                                  key={index}
                                                  variant="secondary"
                                                >
                                                  {tag}
                                                </Badge>
                                              ))}
                                            </div>
                                            <Progress
                                              value={task.progress}
                                              className="h-1 mb-2"
                                            />
                                            <div className="flex justify-between items-center">
                                              <div className="flex -space-x-2">
                                                {task.assignees.map(
                                                  (user, index) => (
                                                    <Avatar
                                                      key={index}
                                                      className="border-2 border-background w-8 h-8"
                                                    >
                                                      <AvatarImage
                                                        src={user.avatar}
                                                        alt={user.name}
                                                      />
                                                      <AvatarFallback>
                                                        {user.name.charAt(0)}
                                                      </AvatarFallback>
                                                    </Avatar>
                                                  )
                                                )}
                                              </div>
                                              <div className="flex items-center gap-2">
                                                {getStatusIcon(task.status)}
                                                {task.dueDate && (
                                                  <span
                                                    className={`text-xs ${
                                                      getDueDateStatus(
                                                        task.dueDate
                                                      ) === "overdue"
                                                        ? "text-red-500"
                                                        : getDueDateStatus(
                                                            task.dueDate
                                                          ) === "due-today"
                                                        ? "text-yellow-500"
                                                        : "text-muted-foreground"
                                                    }`}
                                                  >
                                                    {format(
                                                      task.dueDate,
                                                      "MMM d"
                                                    )}
                                                  </span>
                                                )}
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                          <Button
                            className="w-full mt-3"
                            variant="outline"
                            onClick={() => {
                              setNewTaskBoardId(board.id);
                              setIsNewTaskDialogOpen(true);
                            }}
                          >
                            <PlusIcon className="h-4 w-4 mr-2" /> Add Task
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <div className="bg-muted rounded-lg p-4 min-w-[300px] max-w-[300px] flex flex-col items-center justify-center">
                    <Input
                      placeholder="New board title"
                      value={newBoardTitle}
                      onChange={(e) => setNewBoardTitle(e.target.value)}
                      className="mb-2 bg-background shadow-none"
                    />
                    <Button onClick={addBoard} disabled={!newBoardTitle.trim()}>
                      <PlusIcon className="h-4 w-4 mr-2" /> Add Board
                    </Button>
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <ResponsiveDialog
          isOpen={isNewTaskDialogOpen}
          onOpenChange={setIsNewTaskDialogOpen}
          title="Add New Task"
          description="Create a new task for your Kanban board."
          content={
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="taskTitle" className="text-right">
                  Title
                </Label>
                <Input
                  id="taskTitle"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="taskDescription" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="taskDescription"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`col-span-3 justify-start text-left font-normal ${
                        !newTask.dueDate && "text-muted-foreground"
                      }`}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {newTask.dueDate ? (
                        format(newTask.dueDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={newTask.dueDate || undefined}
                      onSelect={(date) =>
                        setNewTask({ ...newTask, dueDate: date || null })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Assignees</Label>
                <div className="col-span-3">
                  {users.map((user) => (
                    <Button
                      key={user.id}
                      variant={
                        newTask.assignees.includes(user)
                          ? "outline2"
                          : "outline"
                      }
                      className="mr-2 mb-2"
                      onClick={() => {
                        const updatedAssignees = newTask.assignees.includes(
                          user
                        )
                          ? newTask.assignees.filter((u) => u.id !== user.id)
                          : [...newTask.assignees, user];
                        setNewTask({
                          ...newTask,
                          assignees: updatedAssignees,
                        });
                      }}
                    >
                      {user.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="taskTags" className="text-right">
                  Tags
                </Label>
                <Input
                  id="taskTags"
                  value={newTask.tags.join(", ")}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      tags: e.target.value.split(",").map((tag) => tag.trim()),
                    })
                  }
                  className="col-span-3"
                  placeholder="Enter tags separated by commas"
                />
              </div>
            </div>
          }
          footer={<Button onClick={addTask}>Add Task</Button>}
        />

        <ResponsiveDialog
          isOpen={isEditTaskDialogOpen}
          onOpenChange={setIsEditTaskDialogOpen}
          title="Edit Task"
          description="Update the task details."
          content={
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editTaskTitle" className="text-right">
                  Title
                </Label>
                <Input
                  id="editTaskTitle"
                  value={editingTask?.title || ""}
                  onChange={(e) =>
                    setEditingTask(
                      editingTask
                        ? { ...editingTask, title: e.target.value }
                        : null
                    )
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editTaskDescription" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="editTaskDescription"
                  value={editingTask?.description || ""}
                  onChange={(e) =>
                    setEditingTask(
                      editingTask
                        ? { ...editingTask, description: e.target.value }
                        : null
                    )
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`col-span-3 justify-start text-left font-normal ${
                        !editingTask?.dueDate && "text-muted-foreground"
                      }`}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {editingTask?.dueDate ? (
                        format(editingTask.dueDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={editingTask?.dueDate || undefined}
                      onSelect={(date) =>
                        setEditingTask(
                          editingTask
                            ? { ...editingTask, dueDate: date || null }
                            : null
                        )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Assignees</Label>
                <div className="col-span-3">
                  {users.map((user) => (
                    <Button
                      key={user.id}
                      variant={
                        editingTask?.assignees.includes(user)
                          ? "outline2"
                          : "outline"
                      }
                      className="mr-2 mb-2"
                      onClick={() => {
                        if (editingTask) {
                          const updatedAssignees =
                            editingTask.assignees.includes(user)
                              ? editingTask.assignees.filter(
                                  (u) => u.id !== user.id
                                )
                              : [...editingTask.assignees, user];
                          setEditingTask({
                            ...editingTask,
                            assignees: updatedAssignees,
                          });
                        }
                      }}
                    >
                      {user.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editTaskTags" className="text-right">
                  Tags
                </Label>
                <Input
                  id="editTaskTags"
                  value={editingTask?.tags.join(", ") || ""}
                  onChange={(e) =>
                    setEditingTask(
                      editingTask
                        ? {
                            ...editingTask,
                            tags: e.target.value
                              .split(",")
                              .map((tag) => tag.trim()),
                          }
                        : null
                    )
                  }
                  className="col-span-3"
                  placeholder="Enter tags separated by commas"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editTaskProgress" className="text-right">
                  Progress
                </Label>
                <Input
                  id="editTaskProgress"
                  type="number"
                  min="0"
                  max="100"
                  value={editingTask?.progress || 0}
                  onChange={(e) =>
                    setEditingTask(
                      editingTask
                        ? {
                            ...editingTask,
                            progress: parseInt(e.target.value),
                          }
                        : null
                    )
                  }
                  className="col-span-3"
                />
              </div>
            </div>
          }
          footer={<Button onClick={updateTask}>Update Task</Button>}
        />

        <ResponsiveDialog
          isOpen={isTaskDetailDialogOpen}
          onOpenChange={setIsTaskDetailDialogOpen}
          title={selectedTask?.title || "Task Details"}
          description=""
          content={
            <div className="grid gap-4 py-4">
              {selectedTask?.image && (
                <img
                  src={selectedTask.image}
                  alt="Task"
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <p className="text-sm text-muted-foreground">
                {selectedTask?.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedTask?.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Progress value={selectedTask?.progress} className="h-2" />
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  {selectedTask?.assignees.map((user, index) => (
                    <Avatar key={index} className="border-2 border-background">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                {selectedTask?.dueDate && (
                  <span className="text-sm text-muted-foreground">
                    Due: {format(selectedTask.dueDate, "PPP")}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(selectedTask?.status || "todo")}
                <span className="text-sm font-medium">
                  {selectedTask?.status}
                </span>
              </div>
            </div>
          }
          footer={
            <Button
              onClick={() => {
                setEditingTask(selectedTask);
                setIsTaskDetailDialogOpen(false);
                setIsEditTaskDialogOpen(true);
              }}
            >
              Edit Task
            </Button>
          }
        />
      </div>
    </ContentLayout>
  );
}
