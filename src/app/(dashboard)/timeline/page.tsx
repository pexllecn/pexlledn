"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-newer";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Send,
  TrendingUp,
  Zap,
  DollarSign,
  Gift,
} from "lucide-react";
import { sampleData, Ad } from "@/lib/sample-data";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const TimelinePost: React.FC<{ ad: Ad }> = ({ ad }) => {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Post unliked" : "Post liked",
      description: liked
        ? "You've removed your like"
        : "You've liked this post",
    });
  };

  const handleRepost = () => {
    setReposted(!reposted);
    toast({
      title: reposted ? "Post un-reposted" : "Post reposted",
      description: reposted
        ? "You've removed your repost"
        : "You've reposted this content",
    });
  };

  const handleComment = () => {
    if (comment.trim()) {
      toast({
        title: "Comment posted",
        description: "Your comment has been added to the post",
      });
      setComment("");
    }
  };

  return (
    <Card className="mb-6 bg-background hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage
            src={`/placeholder.svg?height=40&width=40`}
            alt={ad.seller}
          />
          <AvatarFallback>{ad.seller[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold">{ad.seller}</p>
          <p className="text-sm text-muted-foreground">{ad.date}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="ml-auto">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Report</DropdownMenuItem>
            <DropdownMenuItem>Mute</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{ad.description}</p>
        <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
          <Image
            src={ad.image}
            alt={ad.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {ad.tags.map((tag, index) => (
            <span
              key={index}
              className="text-sm bg-secondary px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span className="font-semibold">Trending in {ad.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span>{ad.views} views</span>
          </div>
        </div>
        <Progress value={75} className="w-full h-2" />
        <p className="text-sm text-center mt-2">75% of daily goal reached</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`flex items-center gap-1 ${liked ? "text-red-500" : ""}`}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          <span>{liked ? ad.likes + 1 : ad.likes}</span>
          <span className="sr-only">{liked ? "Unlike" : "Like"}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{ad.reviews}</span>
          <span className="sr-only">
            {showComments ? "Hide comments" : "Show comments"}
          </span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRepost}
          className={`flex items-center gap-1 ${
            reposted ? "text-green-500" : ""
          }`}
        >
          <Repeat2 className="h-4 w-4" />
          <span>{reposted ? ad.views + 1 : ad.views}</span>
          <span className="sr-only">{reposted ? "Undo repost" : "Repost"}</span>
        </Button>
      </CardFooter>
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Separator className="my-2" />
            <CardContent>
              <ScrollArea className="h-40 rounded-md">
                <div className="space-y-4">
                  {[...Array(ad.reviews)].map((_, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={`/placeholder.svg?height=32&width=32`}
                          alt="Commenter"
                        />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">User{index + 1}</p>
                        <p className="text-sm">
                          Great product! I'm interested in buying.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="mt-4 flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={`/placeholder.svg?height=32&width=32`}
                    alt="Current user"
                  />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <Input
                  placeholder="Add a comment..."
                  className="flex-1"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  aria-label="Add a comment"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleComment}
                  aria-label="Send comment"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default function EnhancedSocialMarketplace() {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");
  const { toast } = useToast();

  const filteredAds = useMemo(() => {
    let filtered = sampleData.ads.filter(
      (ad) =>
        (category === "All" || ad.category === category) &&
        (ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ad.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    );

    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case "trending":
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        // 'latest' is default, no need to sort as we assume the data is already in chronological order
        break;
    }

    return filtered;
  }, [category, searchTerm, sortBy]);

  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "New posts available!",
        description: "Refresh to see the latest content",
      });
    }, 30000);

    return () => clearTimeout(timer);
  }, [toast]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <ContentLayout title="Enhanced Social Marketplace">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
        className="mx-auto px-4 py-8 max-w-6xl"
      >
        <motion.h1
          variants={variants}
          className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
        >
          Social Marketplace
        </motion.h1>
        <motion.div
          variants={variants}
          className="mb-6 flex flex-col sm:flex-row gap-4"
        >
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {sampleData.categories
                .filter((cat) => cat !== "All")
                .map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Search ads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
            aria-label="Search ads"
          />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">View</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setViewMode("grid")}>
                Grid
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewMode("list")}>
                List
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
        <Tabs defaultValue="feed" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="deals">Hot Deals</TabsTrigger>
          </TabsList>
          <TabsContent value="feed">
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                  : "space-y-6"
              }
            >
              {filteredAds.map((ad) => (
                <motion.div key={ad.id} variants={variants}>
                  <TimelinePost ad={ad} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="marketplace">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredAds.map((ad) => (
                <motion.div
                  key={ad.id}
                  variants={variants}
                  className="bg-card text-card-foreground rounded-lg shadow-md p-4"
                >
                  <Image
                    src={ad.image}
                    alt={ad.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="font-semibold mb-2">{ad.title}</h3>
                  <p className="text-sm mb-2">
                    {ad.description.substring(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">${ad.price}</span>
                    <Button size="sm">
                      <DollarSign className="mr-2 h-4 w-4" /> Buy Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="deals">
            <div className="space-y-4">
              {filteredAds.slice(0, 5).map((ad) => (
                <motion.div
                  key={ad.id}
                  variants={variants}
                  className="bg-card text-card-foreground rounded-lg shadow-md p-4 flex items-center"
                >
                  <Image
                    src={ad.image}
                    alt={ad.title}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold mb-1">{ad.title}</h3>
                    <p className="text-sm mb-2">
                      {ad.description.substring(0, 50)}...
                    </p>
                    <div className="flex items-center">
                      <span className="font-bold text-lg mr-2">
                        ${ad.price}
                      </span>
                      <span className="text-sm line-through text-muted-foreground">
                        ${(ad.price * 1.2).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" className="ml-4">
                    <Gift className="mr-2 h-4 w-4" /> Claim Deal
                  </Button>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </ContentLayout>
  );
}
