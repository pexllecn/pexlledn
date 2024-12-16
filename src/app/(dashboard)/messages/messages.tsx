"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  MoreHorizontal,
  Send,
  User,
  Search,
  Paperclip,
  Smile,
  Mic,
  Image,
  FileText,
  Calendar,
  Star,
  Archive,
  Trash2,
  Sun,
  Moon,
  ChevronLeft,
  Info,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

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

export default function EnhancedChatApp() {
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setIsUserInfoVisible(!isMobileView);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleUserInfo = () => {
    setIsUserInfoVisible(!isUserInfoVisible);
  };

  const chats: Chat[] = [
    {
      id: 1,
      name: "Alice Johnson",
      lastMessage: "Hey, how are you?",
      time: "10:30 AM",
      unread: 2,
      online: true,
      avatar: `https://i.pravatar.cc/48?img=1`,
    },
    {
      id: 2,
      name: "Bob Smith",
      lastMessage: "Can we meet tomorrow?",
      time: "Yesterday",
      unread: 54,
      online: false,
      avatar: `https://i.pravatar.cc/48?img=2`,
    },
    {
      id: 3,
      name: "Charlie Brown",
      lastMessage: "Thanks for your help!",
      time: "Tuesday",
      unread: 1,
      online: true,
      avatar: `https://i.pravatar.cc/48?img=3`,
    },
    {
      id: 4,
      name: "Diana Prince",
      lastMessage: "The project is done!",
      time: "2 days ago",
      unread: 0,
      online: true,
      avatar: `https://i.pravatar.cc/48?img=4`,
    },
    {
      id: 5,
      name: "Ethan Hunt",
      lastMessage: "Mission accomplished",
      time: "Last week",
      unread: 0,
      online: false,
      avatar: `https://i.pravatar.cc/48?img=5`,
    },
  ];

  const messages: Message[] = [
    {
      id: 1,
      sender: "Alice Johnson",
      content: "Hey there! How's it going?",
      time: "10:30 AM",
      isSent: false,
      avatar: `https://i.pravatar.cc/48?img=1`,
    },
    {
      id: 2,
      sender: "You",
      content: "Hi Alice! I'm doing well, thanks for asking. How about you?",
      time: "10:32 AM",
      isSent: true,
      avatar: `https://i.pravatar.cc/48?img=0`,
    },
    {
      id: 3,
      sender: "Alice Johnson",
      content:
        "I'm great! Just working on some new projects. Have you heard about the latest tech conference?",
      time: "10:35 AM",
      isSent: false,
      avatar: `https://i.pravatar.cc/48?img=1`,
    },
    {
      id: 4,
      sender: "You",
      content: "No, I haven't. Tell me more about it!",
      time: "10:36 AM",
      isSent: true,
      avatar: `https://i.pravatar.cc/48?img=0`,
    },
    {
      id: 5,
      sender: "Alice Johnson",
      content:
        "It's called TechXpo 2023. It's happening next month and features some amazing speakers from top tech companies.",
      time: "10:38 AM",
      isSent: false,
      avatar: `https://i.pravatar.cc/48?img=1`,
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add logic to send message
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Chat">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="lg:p-3">
          <div className="flex h-[calc(100vh-4rem)] bg-background">
            {/* Chat List */}
            <div
              className={`w-full md:w-80  ${
                selectedChat && isMobile ? "hidden" : "block"
              }`}
            >
              <ChatList
                chats={chats}
                onSelectChat={setSelectedChat}
                selectedChat={selectedChat}
              />
            </div>

            {/* Main Chat Area */}
            <div
              className={`bg-muted rounded-t-3xl flex-1 flex flex-col relative ${
                !selectedChat && isMobile ? "hidden" : "block"
              }`}
            >
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 flex items-center justify-between">
                    {isMobile && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedChat(null)}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                    )}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage
                            src={selectedChat.avatar}
                            alt={selectedChat.name}
                          />
                          <AvatarFallback>
                            {selectedChat.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span
                          className={cn(
                            "absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-background",
                            selectedChat.online ? "bg-green-500" : "bg-gray-400"
                          )}
                        />
                      </div>
                      <div>
                        <h2 className="text-lg font-normal">
                          {selectedChat.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {selectedChat.online ? "Active now" : "Offline"}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              setTheme(theme === "light" ? "dark" : "light")
                            }
                            className="cursor-pointer"
                          >
                            {theme === "dark" ? (
                              <Sun className="mr-2 h-4 w-4" />
                            ) : (
                              <Moon className="mr-2 h-4 w-4" />
                            )}
                            <span>
                              {theme === "dark" ? "Light Mode" : "Dark Mode"}
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>View Profile</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Star className="mr-2 h-4 w-4" />
                            <span>Add to Favorites</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="mr-2 h-4 w-4" />
                            <span>Archive Chat</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete Chat</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* Toggle User Info Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleUserInfo}
                        className="relative z-10"
                      >
                        <Info className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.isSent ? "justify-end" : "justify-start"
                        } mb-4`}
                      >
                        <div
                          className={`flex ${
                            msg.isSent ? "flex-row-reverse" : "flex-row"
                          } items-end`}
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={msg.avatar} alt={msg.sender} />
                            <AvatarFallback>
                              {msg.sender
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`flex flex-col ${
                              msg.isSent ? "items-end mr-2" : "items-start ml-2"
                            } max-w-[70%]`}
                          >
                            <div
                              className={cn(
                                "rounded-lg p-3",
                                msg.isSent
                                  ? "bg-blue-600 text-white"
                                  : "bg-background text-foreground"
                              )}
                            >
                              <p className="text-sm">{msg.content}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>

                  {/* Message Input - Only show on desktop */}
                  {!isMobile && (
                    <div className="p-4 sticky bottom-0 bg-background">
                      <MessageInput
                        message={message}
                        setMessage={setMessage}
                        handleSendMessage={handleSendMessage}
                        handleKeyPress={handleKeyPress}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Select a chat to start messaging
                  </p>
                </div>
              )}
            </div>

            {/* Right Sidebar - User Info */}
            <AnimatePresence>
              {!isMobile && selectedChat && isUserInfoVisible && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "20rem", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-80 p-6 overflow-hidden"
                >
                  <UserInfoPanel user={selectedChat} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Mobile Bottom Bar */}
      {isMobile && selectedChat && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm dark:bg-background/80 dark:backdrop-blur-sm dark:shadow-secondary z-[60]">
          <MessageInput
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
          />
        </div>
      )}
    </ContentLayout>
  );
}

function ChatList({
  chats,
  onSelectChat,
  selectedChat,
}: {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  selectedChat: Chat | null;
}) {
  return (
    <div className="p-2 lg:pr-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-normal text-foreground">Messages</h2>
      </div>
      <div className="relative mb-4">
        <Search className="absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search messages..."
          className="pl-10 border-none bg-muted shadow-none"
        />
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={cn(
              "flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition duration-150 ease-in-out",
              selectedChat && selectedChat.id === chat.id
                ? "bg-primary/15 border-primary border text-primary"
                : "hover:bg-accent/50"
            )}
            onClick={() => onSelectChat(chat)}
          >
            <div className="relative">
              <Avatar>
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback>
                  {chat.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span
                className={cn(
                  "absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-background",
                  chat.online ? "bg-green-500" : "bg-gray-400"
                )}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-normal truncate">{chat.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {chat.lastMessage}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-xs text-muted-foreground">{chat.time}</p>
              {chat.unread > 0 && (
                <Badge
                  variant="decline"
                  className="ml-auto px-1.5 min-w-[20px] flex items-center justify-center"
                >
                  {chat.unread}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

function MessageInput({
  message,
  setMessage,
  handleSendMessage,
  handleKeyPress,
}: {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Image className="mr-2 h-4 w-4" />
            <span>Send Image</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Send Document</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Schedule Meeting</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1"
      />

      <Button onClick={handleSendMessage}>
        <Send className="h-4 w-4 mr-2" />
        Send
      </Button>
    </div>
  );
}

interface User {
  name: string;
  avatar: string;
  online: boolean;
}

function UserInfoPanel({ user }: { user: User }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span
            className={cn(
              "absolute bottom-4 right-2 block h-4 w-4 rounded-full border-2 border-background",
              user.online ? "bg-green-500" : "bg-gray-400"
            )}
          />
        </div>
        <h2 className="text-xl font-normal">{user.name}</h2>
        <p className="text-sm text-muted-foreground">
          {user.online ? "Active now" : "Offline"}
        </p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-4">
        <div>
          <h4 className="font-normal text-base text-foreground mb-2">Bio</h4>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div>
          <h4 className="font-normal text-base text-foreground mb-2">Email</h4>
          <p className="text-sm text-muted-foreground">
            {user.name.toLowerCase().replace(" ", "")}@example.com
          </p>
        </div>
        <div>
          <h4 className="font-normal text-base text-foreground mb-2">Phone</h4>
          <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
        </div>
        <div>
          <h4 className="font-normal text-base text-foreground mb-2">
            Location
          </h4>
          <p className="text-sm text-muted-foreground">San Francisco, CA</p>
        </div>
      </div>
      <Separator className="my-4" />
      <div>
        <h4 className="font-normal text-base text-foreground mb-2">
          Shared Files
        </h4>
        <ul className="space-y-2">
          <li className="flex items-center justify-between">
            <span className="text-sm">project_proposal.pdf</span>
            <Button variant="ghost" size="sm">
              Download
            </Button>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm">meeting_notes.docx</span>
            <Button variant="ghost" size="sm">
              Download
            </Button>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm">budget_2023.xlsx</span>
            <Button variant="ghost" size="sm">
              Download
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
