"use client";

import React, { useState, useMemo } from "react";
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
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Send,
} from "lucide-react";
import { sampleData, Ad } from "@/lib/sample-data";
import { ContentLayout } from "@/components/admin-panel/content-layout";

const TimelinePost: React.FC<{ ad: Ad }> = ({ ad }) => {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <Card className="mb-6 bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
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
              className="text-sm text-primary-foreground bg-primary px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {ad.paymentOptions.map((option, index) => (
            <span
              key={index}
              className="text-sm text-secondary-foreground bg-secondary px-2 py-1 rounded-full"
            >
              {option}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLiked(!liked)}
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
          onClick={() => setReposted(!reposted)}
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
                  aria-label="Add a comment"
                />
                <Button size="icon" variant="ghost" aria-label="Send comment">
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

export default function SocialTimeline() {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAds = useMemo(() => {
    return sampleData.ads.filter(
      (ad) =>
        (category === "All" || ad.category === category) &&
        (ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ad.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    );
  }, [category, searchTerm]);

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="timeline">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants1}
      >
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Social Marketplace
          </h1>
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
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
          </div>
          <div className="space-y-6">
            {filteredAds.map((ad) => (
              <TimelinePost key={ad.id} ad={ad} />
            ))}
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
