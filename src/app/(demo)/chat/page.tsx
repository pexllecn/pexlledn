"use client";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  MoreHorizontal,
  Send,
  Phone,
  Video,
  User,
  Settings,
  Menu,
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
  ImageIcon,
  File,
  X,
  Sun,
  Moon,
  ChevronRight,
  ChevronLeft,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

export default function EnhancedChatApp() {
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(true);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "";
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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

  const chats = [
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
      unread: 0,
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

  const messages = [
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
    {
      id: 6,
      sender: "You",
      content:
        "That sounds interesting! Do you have more details about the topics they'll be covering?",
      time: "10:40 AM",
      isSent: true,
      avatar: `https://i.pravatar.cc/48?img=0`,
    },
    {
      id: 7,
      sender: "Alice Johnson",
      content:
        "That sounds interesting! Do you have more details about the topics they'll be covering?",
      time: "10:40 AM",
      isSent: false,
      avatar: `https://i.pravatar.cc/48?img=0`,
    },
    {
      id: 8,
      sender: "You",
      content:
        "That sounds interesting! Do you have more details about the topics they'll be covering?",
      time: "10:40 AM",
      isSent: true,
      avatar: `https://i.pravatar.cc/48?img=0`,
    },
    {
      id: 9,
      sender: "Alice Johnson",
      content:
        "That sounds interesting! Do you have more details about the topics they'll be covering?",
      time: "10:40 AM",
      isSent: false,
      avatar: `https://i.pravatar.cc/48?img=0`,
    },
    {
      id: 10,
      sender: "Alice Johnson",
      content:
        "That sounds interesting! Do you have more details about the topics they'll be covering?",
      time: "10:40 AM",
      isSent: false,
      avatar: `https://i.pravatar.cc/48?img=0`,
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add logic to send message
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-5 flex h-screen bg-background">
      {/* Left Sidebar - Chat List */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute top-4 left-4 z-10"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
          <SheetHeader className="p-4">
            <SheetTitle>Chats</SheetTitle>
          </SheetHeader>
          <ChatList
            chats={chats}
            onSelectChat={setSelectedChat}
            selectedChat={selectedChat}
          />
        </SheetContent>
      </Sheet>

      <div className="hidden md:block w-80 ">
        <ChatList
          chats={chats}
          onSelectChat={setSelectedChat}
          selectedChat={selectedChat}
        />
      </div>

      {/* Main Chat Area */}
      <div className="bg-muted rounded-3xl flex-1 flex flex-col relative">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar>
                    <AvatarImage
                      src={selectedChat.avatar}
                      alt={selectedChat.name}
                    />
                    <AvatarFallback className="bg-background/80">
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
                  <h2 className="text-lg font-semibold">{selectedChat.name}</h2>
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
                            ? "bg-foreground text-primary-foreground"
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

            {/* Message Input */}
            <div className="p-4 sticky bottom-0 bg-background">
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
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="w-80 p-6">
              <UserInfoPanel user={selectedChat} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChatList({ chats, onSelectChat, selectedChat }) {
  return (
    <div className="p-2 pr-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
          Chats
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground md:hidden"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      <div className="relative mb-4">
        <Search className="absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search chats..."
          className="pl-10 border-none bg-muted shadow-none"
        />
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={cn(
              "flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition duration-150 ease-in-out",
              selectedChat && selectedChat.id === chat.id
                ? "bg-accent"
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
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{chat.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {chat.lastMessage}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-xs text-muted-foreground">{chat.time}</p>
              {chat.unread > 0 && (
                <div className="flex items-center justify-center bg-foreground text-primary-foreground rounded-full w-5 h-5 text-xs mt-1">
                  {chat.unread}
                </div>
              )}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

function UserInfoPanel({ user }) {
  return (
    <Tabs defaultValue="info" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="info">Info</TabsTrigger>
        <TabsTrigger value="files">Files</TabsTrigger>
      </TabsList>
      <TabsContent value="info">
        <div className="flex flex-col items-center mb-6 mt-4">
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
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {user.online ? "Active now" : "Offline"}
          </p>
        </div>
        <Separator className="my-4" />
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
              {user.name.toLowerCase().replace(" ", "")}@example.com
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
      </TabsContent>
      <TabsContent value="files">
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">
            Shared Files
          </h3>
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
      </TabsContent>
    </Tabs>
  );
}
