"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Calendar,
  ChevronDown,
  Filter,
  Heart,
  MessageSquare,
  Package,
  Search,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data
const chartData = [
  { name: "Mon", views: 40, messages: 24 },
  { name: "Tue", views: 30, messages: 13 },
  { name: "Wed", views: 20, messages: 18 },
  { name: "Thu", views: 27, messages: 30 },
  { name: "Fri", views: 18, messages: 25 },
  { name: "Sat", views: 23, messages: 15 },
  { name: "Sun", views: 34, messages: 20 },
];

const listings = [
  {
    id: 1,
    title: "Vintage Camera",
    price: "$120",
    status: "Active",
    views: 45,
    messages: 3,
    saved: 12,
  },
  {
    id: 2,
    title: "Retro Typewriter",
    price: "$80",
    status: "Sold",
    views: 30,
    messages: 2,
    saved: 8,
  },
  {
    id: 3,
    title: "Antique Pocket Watch",
    price: "$200",
    status: "Active",
    views: 60,
    messages: 5,
    saved: 15,
  },
  {
    id: 4,
    title: "Classic Vinyl Records",
    price: "$50",
    status: "Active",
    views: 25,
    messages: 1,
    saved: 6,
  },
  {
    id: 5,
    title: "Vintage Polaroid Camera",
    price: "$75",
    status: "Active",
    views: 38,
    messages: 4,
    saved: 10,
  },
];

const messages = [
  {
    id: 1,
    from: "Alice",
    avatar: "/placeholder.svg?height=32&width=32",
    preview: "Hi, is the camera still available?",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    from: "Bob",
    avatar: "/placeholder.svg?height=32&width=32",
    preview: "I'm interested in the typewriter. Can you...",
    time: "1 day ago",
    read: true,
  },
  {
    id: 3,
    from: "Charlie",
    avatar: "/placeholder.svg?height=32&width=32",
    preview: "Is the price negotiable for the watch?",
    time: "3 days ago",
    read: true,
  },
  {
    id: 4,
    from: "David",
    avatar: "/placeholder.svg?height=32&width=32",
    preview: "When can I come to see the vinyl records?",
    time: "4 days ago",
    read: false,
  },
  {
    id: 5,
    from: "Eva",
    avatar: "/placeholder.svg?height=32&width=32",
    preview: "I'd like to make an offer on the Polaroid...",
    time: "1 week ago",
    read: true,
  },
];

export default function DashboardPage() {
  const [activeListings, setActiveListings] = useState(4);
  const [totalMessages, setTotalMessages] = useState(15);
  const [savedItems, setSavedItems] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterStatus, setFilterStatus] = useState("all");

  // Simulating real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalMessages((prev) => prev + 1);
    }, 30000); // Increment total messages every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredListings = listings
    .filter((listing) =>
      listing.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (listing) =>
        filterStatus === "all" || listing.status.toLowerCase() === filterStatus
    )
    .sort((a, b) => {
      if (sortBy === "price")
        return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
      if (sortBy === "views") return b.views - a.views;
      return 0; // Default to no sorting
    });

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Listings
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeListings}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Messages
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMessages}</div>
            <p className="text-xs text-muted-foreground">+5 new messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Items</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savedItems}</div>
            <p className="text-xs text-muted-foreground">+3 new saves</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Events
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Scheduled meetups</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Weekly Overview</CardTitle>
          <CardDescription>
            Your listing views and messages received
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#8884d8" />
              <Bar dataKey="messages" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Tabs defaultValue="listings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        <TabsContent value="listings" className="space-y-4">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Input
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[300px]"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("active")}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("sold")}>
                    Sold
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="views">Views</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4">
            {filteredListings.map((listing) => (
              <Card key={listing.id}>
                <CardContent className="flex items-center p-4">
                  <div className="flex-1">
                    <h3 className="font-semibold">{listing.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Price: {listing.price}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-muted-foreground">
                      Views: {listing.views}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Messages: {listing.messages}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Saved: {listing.saved}
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="messages" className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id}>
              <CardContent className="flex items-center p-4">
                <Avatar className="h-9 w-9 mr-4">
                  <AvatarImage src={message.avatar} alt={message.from} />
                  <AvatarFallback>{message.from[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {message.from}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {message.preview}
                  </p>
                </div>
                <div className="ml-4 text-xs text-muted-foreground">
                  {message.time}
                </div>
                {!message.read && (
                  <div className="ml-2 h-2 w-2 rounded-full bg-blue-500" />
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Your scheduled meetups and important dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium">
                    Meet with Alice about the Vintage Camera
                  </span>
                  <span className="ml-auto text-sm text-muted-foreground">
                    Tomorrow, 2:00 PM
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium">
                    Deliver Retro Typewriter to Bob
                  </span>
                  <span className="ml-auto text-sm text-muted-foreground">
                    Friday, 11:00 AM
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
