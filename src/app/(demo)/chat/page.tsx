"use client";
import React, { useRef, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bell,
  File,
  Image as ImageIcon,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  MoreHorizontal,
  Paperclip,
  Search,
  Send,
  Settings,
  Sun,
  Users,
  X,
} from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";

const generateRandomMessages = (count: number) => {
  const senders = ["You", "Them"];
  const contents = [
    "Hey, how's it going?",
    "Not bad, just working on some projects. How about you?",
    "Same here. Been busy with work lately.",
    "Did you see the latest tech news?",
    "Yeah, it's pretty exciting!",
    "What do you think about the new AI developments?",
    "It's amazing how fast technology is advancing.",
    "Have you tried any new programming languages recently?",
    "I've been learning Rust. It's challenging but fun!",
    "That's cool! I've heard good things about Rust.",
    "How's your weekend looking?",
    "Planning to catch up on some reading. You?",
    "Thinking of going hiking. The weather looks great!",
    "That sounds fun! Enjoy the outdoors!",
    "Thanks! Don't forget to share some photos.",
    "Will do! Have a great weekend yourself!",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    sender: senders[i % 2],
    content: contents[i % contents.length],
    time: new Date(Date.now() - (count - i) * 5 * 60000).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    ),
  }));
};
const variants1 = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

export default function Component() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState(generateRandomMessages(50));
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "";
  }, [isDarkMode]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 3000);
  };

  const sendMessage = (content: string) => {
    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      content,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <TooltipProvider>
      <div className="flex w-full h-screen bg-background">
        {/* Sidebar */}
        <aside
          className={`w-full md:w-80 lg:w-96 flex-shrink-0 transform transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed md:relative z-20 h-full bg-background/95 backdrop-blur-sm md:translate-x-0 border-r border-border/40`}
        >
          <div className="px-6 pb-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                Chats
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground md:hidden"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <Tabs defaultValue="chats" className="w-full">
              <TabsList className="w-full mb-4 bg-muted/50">
                <TabsTrigger value="chats" className="w-full">
                  Chats
                </TabsTrigger>
                <TabsTrigger value="groups" className="w-full">
                  Groups
                </TabsTrigger>
              </TabsList>
              <TabsContent value="chats">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search chats"
                    className="pl-10 bg-muted border-none"
                  />
                </div>
                <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
                  <div className="pt-4 space-y-2">
                    {[...Array(15)].map((_, i) => (
                      <Button
                        key={i}
                        variant="ghost"
                        className="w-full justify-start p-3 hover:bg-muted/50 transition-all duration-200 ease-in-out rounded-lg"
                      >
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={`https://i.pravatar.cc/48?img=${i + 1}`}
                              alt="Avatar"
                            />
                            <AvatarFallback>U{i + 1}</AvatarFallback>
                          </Avatar>
                          <span
                            className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ${
                              i % 2 === 0 ? "bg-green-500" : "bg-gray-300"
                            } ring-2 ring-background`}
                          />
                        </div>
                        <div className="flex-1 text-left ml-3">
                          <div className="font-medium text-base text-foreground">
                            User {i + 1}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {i % 2 === 0
                              ? "Hey, how's it going? I was wondering if..."
                              : "Sure, I can help with that. Let me know..."}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="groups">
                {/* Group content (similar structure to chats) */}
              </TabsContent>
            </Tabs>
          </div>
        </aside>

        {/* Main Content */}
        <div className="w-full flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-background/95 backdrop-blur-sm p-4 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden mr-2 text-muted-foreground hover:text-foreground"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="https://i.pravatar.cc/40"
                    alt="Current chat"
                  />
                  <AvatarFallback>CC</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
              </div>
              <div className="ml-3">
                <h2 className="font-semibold text-lg text-foreground">
                  Current Chat
                </h2>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Users className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Group members</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Bell className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={toggleDarkMode}
                    className="cursor-pointer"
                  >
                    {isDarkMode ? (
                      <Sun className="mr-2 h-4 w-4" />
                    ) : (
                      <Moon className="mr-2 h-4 w-4" />
                    )}
                    <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Chat Area */}
          <ScrollArea className="flex-1 p-4 md:p-6" ref={chatContainerRef}>
            <div className="space-y-4 md:space-y-6 max-w-3xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "You" ? "justify-end" : "justify-start"
                  } items-end`}
                >
                  {message.sender !== "You" && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src="https://i.pravatar.cc/32"
                        alt="User Avatar"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[75%] md:max-w-[70%] ${
                      message.sender === "You"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    } rounded-[var(--radius)] py-2 px-3`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className="text-xs opacity-70 flex justify-between items-center">
                      <span>{message.time}</span>
                      {message.sender === "You"}
                    </div>
                  </div>
                  {message.sender === "You" && (
                    <Avatar className="h-8 w-8 ml-2">
                      <AvatarImage
                        src="https://i.pravatar.cc/32?img=70"
                        alt="Your Avatar"
                      />
                      <AvatarFallback>Y</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
            {isTyping && (
              <div className="flex justify-start mt-4 md:mt-6 items-end max-w-3xl mx-auto">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage
                    src="https://i.pravatar.cc/32"
                    alt="User Avatar"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="bg-muted text-muted-foreground rounded-2xl p-3 ">
                  <p className="text-sm">Typing...</p>
                </div>
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 bg-background/95 backdrop-blur-sm ">
            <div className="max-w-3xl mx-auto">
              <form
                className="flex space-x-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const input = form.elements.namedItem(
                    "messageInput"
                  ) as HTMLInputElement;
                  if (input && input.value.trim()) {
                    sendMessage(input.value);
                    input.value = "";
                  }
                  simulateTyping();
                }}
              >
                <Input
                  className="flex-1 bg-muted border-none"
                  placeholder="Type your message..."
                  name="messageInput"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Paperclip className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Attach File</DialogTitle>
                          <DialogDescription>
                            Choose a file to attach to your message.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <Button>
                            <ImageIcon className="mr-2 h-4 w-4" /> Attach Image
                          </Button>
                          <Button>
                            <File className="mr-2 h-4 w-4" /> Attach Document
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Attach file</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="submit"
                      size="icon"
                      className="text-primary-foreground bg-primary hover:bg-primary/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send message</p>
                  </TooltipContent>
                </Tooltip>
              </form>
            </div>
          </div>
        </div>

        {/* User Info Panel */}
        <aside className="hidden lg:block w-80 border-l border-border/40 p-6 overflow-y-auto bg-background/50 backdrop-blur-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src="https://i.pravatar.cc/96"
                  alt="Current chat user"
                />
                <AvatarFallback>CU</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-green-500 ring-2 ring-background" />
            </div>
            <h3 className="font-semibold text-xl text-foreground">
              Current User
            </h3>
            <p className="text-sm text-muted-foreground">@currentuser</p>
            <p className="text-xs text-muted-foreground mt-2">
              Last seen: 5 minutes ago
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-base text-foreground mb-2">
                Bio
              </h4>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-base text-foreground mb-2">
                Email
              </h4>
              <p className="text-sm text-muted-foreground">
                currentuser@example.com
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-base text-foreground mb-2">
                Phone
              </h4>
              <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
            </div>
            <div>
              <h4 className="font-semibold text-base text-foreground mb-2">
                Location
              </h4>
              <p className="text-sm text-muted-foreground">San Francisco, CA</p>
            </div>
            <div>
              <h4 className="font-semibold text-base text-foreground mb-2">
                Shared Files
              </h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center">
                  <File className="h-4 w-4 mr-2" />
                  document.pdf
                </li>
                <li className="flex items-center">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  image.jpg
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </TooltipProvider>
  );
}
