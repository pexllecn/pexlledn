"use client";
import Image from "next/image";
import Link from "next/link";
import {
  MoreHorizontal,
  Share2,
  MessageSquare,
  Heart,
  Bookmark,
  MapPin,
  Link as LinkIcon,
  Calendar,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { motion } from "framer-motion";

const posts = [
  {
    id: 1,
    author: {
      name: "Moyo Shiro",
      avatar: "https://i.pravatar.cc/150?img=1",
      username: "@moyo_shiro",
    },
    content:
      "Just launched my new portfolio website! 🚀 Check out these 15 standout examples of creative, sleek, and interactive portfolio designs that inspired me. Which one's your favorite? #WebDesign #PortfolioInspiration",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    timestamp: "2 hours ago",
    likes: 62,
    comments: 23,
    shares: 45,
  },
  {
    id: 2,
    author: {
      name: "Aiko Tanaka",
      avatar: "https://i.pravatar.cc/150?img=2",
      username: "@aiko_tanaka",
    },
    content:
      "Exploring the intersection of AI and UX design. Here's a sneak peek at my latest project. Thoughts? #AIinDesign #UXInnovation",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    timestamp: "5 hours ago",
    likes: 89,
    comments: 31,
    shares: 12,
  },
];

const trendingTopics = [
  {
    title: "Global Climate Summit 2024",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop",
    time: "Trending with 5243 posts",
  },
  {
    title: "AI Breakthrough in Healthcare",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop",
    time: "2890 posts in the last hour",
  },
  {
    title: "SpaceX's Latest Mission",
    image:
      "https://images.unsplash.com/photo-1516849677043-ef67c9557e16?w=100&h=100&fit=crop",
    time: "Live updates with 10k+ viewers",
  },
];

export default function SocialProfile() {
  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  return (
    <ContentLayout title="Social Profile">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants1}
      >
        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-background">
          {/* Main Content */}
          <main className="flex-1 max-w-4xl mx-auto">
            {/* Banner */}
            <div className="relative h-48 md:h-64 w-full">
              <Image
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=400&fit=crop"
                alt="Profile banner"
                className="object-cover"
                fill
                priority
              />
            </div>

            {/* Profile Info */}
            <div className="px-4 py-6 relative">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-end">
                  <Avatar className="w-24 h-24 border-4 border-background -mt-12 mr-4">
                    <AvatarImage
                      src="https://i.pravatar.cc/150?img=3"
                      alt="Kohaku Tora"
                    />
                    <AvatarFallback>KT</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold">Kohaku Tora</h1>
                    <p className="text-muted-foreground">@kohaku_tora</p>
                  </div>
                </div>
                <Button className="mt-4 sm:mt-0" variant="outline">
                  Edit profile
                </Button>
              </div>

              <div className="mt-4 space-y-2">
                <p>
                  🎨 UI/UX Designer | 📍 Crafting seamless digital experiences
                </p>
                <p className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" /> New York City
                  <LinkIcon className="w-4 h-4 ml-4 mr-1" />
                  <Link
                    href="https://pexlledn.vercel.app"
                    className="text-primary-foreground dark:text-primary underline"
                  >
                    pexlledn.vercel.app
                  </Link>
                  <Calendar className="w-4 h-4 ml-4 mr-1" /> Joined September
                  2020
                </p>
                <div className="flex gap-4 text-sm">
                  <span>
                    <strong>1,234</strong>{" "}
                    <span className="text-muted-foreground">Following</span>
                  </span>
                  <span>
                    <strong>5,678</strong>{" "}
                    <span className="text-muted-foreground">Followers</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs and Posts */}
            <Tabs defaultValue="posts" className="w-full px-4">
              <TabsList className="">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="replies">Replies</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="likes">Likes</TabsTrigger>
              </TabsList>
              <TabsContent value="posts" className="mt-0">
                <div className="">
                  {posts.map((post) => (
                    <article key={post.id} className="py-4 bg-background">
                      <div className="flex gap-3 p-4 rounded-lg">
                        <Avatar>
                          <AvatarImage
                            src={post.author.avatar}
                            alt={post.author.name}
                          />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-semibold">
                                {post.author.name}
                              </span>
                              <span className="text-muted-foreground">
                                {" "}
                                {post.author.username} · {post.timestamp}
                              </span>
                            </div>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                          <p>{post.content}</p>
                          <div className="rounded-md overflow-hidden">
                            <Image
                              src={post.image}
                              alt="Post image"
                              width={800}
                              height={400}
                              className="w-full h-[300px] object-cover"
                            />
                          </div>
                          <div className="flex justify-between items-center pt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground"
                            >
                              <Heart className="w-4 h-4 mr-2" />
                              {post.likes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground"
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              {post.comments}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground"
                            >
                              <Share2 className="w-4 h-4 mr-2" />
                              {post.shares}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground"
                            >
                              <Bookmark className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 p-2 space-y-6 rounded-lg">
            <div className="bg-muted/70 rounded-lg p-4">
              <section className="pb-6">
                <h2 className="font-semibold mb-4">Trending topics</h2>
                <div className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Image
                        src={topic.image}
                        alt={topic.title}
                        width={48}
                        height={48}
                        className="rounded-md"
                      />
                      <div>
                        <h3 className="font-medium text-sm">{topic.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {topic.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section className="pb-6">
                <h2 className="font-semibold mb-4">You might like</h2>
                <div className="space-y-4">
                  {[4, 5, 6].map((imgId, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={`https://i.pravatar.cc/150?img=${imgId}`}
                          />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">User Name</p>
                          <p className="text-xs text-muted-foreground">
                            @username
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </aside>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
