"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Heart, MessageCircle, Share2, Star, ChevronDown } from "lucide-react";

// Simulated data fetching function
const fetchMorePosts = async (page: number) => {
  // In a real app, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return generateMockPosts(page);
};

// Mock data generation
const generateMockPosts = (page: number) => {
  const startId = (page - 1) * 5;
  return Array.from({ length: 5 }, (_, i) => ({
    id: startId + i + 1,
    author: {
      name: `User ${startId + i + 1}`,
      avatar: `https://i.pravatar.cc/150?img=${startId + i + 1}`,
      isVerified: Math.random() > 0.7,
    },
    product: {
      name: `Product ${startId + i + 1}`,
      description: `This is an amazing product that will revolutionize your life. It's perfect for ${
        ["home", "office", "travel"][i % 3]
      } use.`,
      price: Math.floor(Math.random() * 200) + 50,
      rating: (Math.random() * 2 + 3).toFixed(1),
      image: `https://source.unsplash.com/random/400x300?product&sig=${
        startId + i + 1
      }`,
    },
    content: `Just got my hands on the new ${
      ["Eco-Friendly", "Smart", "Portable", "Wireless", "Advanced"][i % 5]
    } ${
      ["Gadget", "Tool", "Device", "Accessory", "Solution"][i % 5]
    }! It's amazing how it ${
      ["simplifies", "enhances", "revolutionizes", "transforms", "optimizes"][
        i % 5
      ]
    } my daily routine. Highly recommended! #ProductReview #Innovation`,
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 50),
    shares: Math.floor(Math.random() * 100),
    timestamp: new Date(
      Date.now() - Math.floor(Math.random() * 10000000000)
    ).toISOString(),
  }));
};

const Comment: React.FC<{
  author: string;
  content: string;
  isAuthor: boolean;
}> = ({ author, content, isAuthor }) => (
  <div
    className={`flex items-start space-x-2 p-2 rounded-lg ${
      isAuthor ? "bg-primary/10" : ""
    }`}
  >
    <Avatar className="w-8 h-8">
      <AvatarImage src={`https://i.pravatar.cc/150?u=${author}`} />
      <AvatarFallback>{author[0]}</AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <p className="text-sm font-semibold">
        {author}{" "}
        {isAuthor && <span className="text-primary text-xs">(Author)</span>}
      </p>
      <p className="text-sm text-gray-500">{content}</p>
    </div>
  </div>
);

const Post: React.FC<{ post: any }> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [newComment, setNewComment] = useState("");
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

  const handleComment = () => {
    if (newComment.trim()) {
      toast({
        title: "Comment posted",
        description: "Your comment has been added to the post",
      });
      setNewComment("");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `Check out this amazing product: ${post.product.name}`
    );
    toast({
      title: "Link copied",
      description: "Product link has been copied to your clipboard",
    });
  };

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={post.author.avatar} alt={post.author.name} />
          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold">
            {post.author.name}{" "}
            {post.author.isVerified && (
              <span className="text-primary text-xs">✓</span>
            )}
          </p>
          <p className="text-sm text-muted-foreground">
            {new Date(post.timestamp).toLocaleString()}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{post.content}</p>
        <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
          <Image
            src={post.product.image}
            alt={post.product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">{post.product.name}</h3>
        <p className="text-muted-foreground mb-2">{post.product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold">
            ${post.product.price.toFixed(2)}
          </span>
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="ml-1">{post.product.rating}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex justify-between items-center w-full mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={liked ? "text-primary" : ""}
          >
            <Heart className={`mr-1 h-4 w-4 ${liked ? "fill-current" : ""}`} />
            <span>{liked ? post.likes + 1 : post.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            <MessageCircle className="mr-1 h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="mr-1 h-4 w-4" />
            <span>{post.shares}</span>
          </Button>
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Separator className="my-4" />
              <ScrollArea className="h-40 w-full rounded-md border p-4">
                <Comment
                  author="John Doe"
                  content="This product looks amazing! How's the battery life?"
                  isAuthor={false}
                />
                <Comment
                  author={post.author.name}
                  content="The battery life is excellent! It lasts for about 2 days with heavy use."
                  isAuthor={true}
                />
                <Comment
                  author="Jane Smith"
                  content="I've been using this for a week now, and I'm impressed with the quality."
                  isAuthor={false}
                />
              </ScrollArea>
              <div className="flex items-center mt-4">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-grow mr-2"
                />
                <Button onClick={handleComment}>Post</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>
    </Card>
  );
};

export default function SocialProductTimeline() {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  useEffect(() => {
    loadMorePosts();
  }, []);

  useEffect(() => {
    if (inView && hasMore) {
      loadMorePosts();
    }
  }, [inView]);

  const loadMorePosts = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const newPosts = await fetchMorePosts(page);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(newPosts.length > 0);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Social Product Timeline
      </h1>
      <div className="max-w-2xl mx-auto">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <Textarea
              placeholder="What's on your mind? Share your product experience!"
              className="mb-4"
            />
            <Button className="w-full">Post</Button>
          </CardContent>
        </Card>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        {loading && <p className="text-center">Loading more posts...</p>}
        <div ref={ref} className="h-10" />
      </div>
    </div>
  );
}
