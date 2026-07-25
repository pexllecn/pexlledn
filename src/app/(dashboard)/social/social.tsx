"use client";

import * as React from "react";
import {
  Plus,
  MoreHorizontal,
  MessageSquare,
  Heart,
  Repeat2,
  Bookmark,
  Share,
  Smile,
  ImageIcon,
  Calendar,
  MapPin,
  Home,
  Users,
  Bell,
  Mail,
  User,
  Settings,
  BadgeCheck,
  Eye,
  TrendingUp,
  Radio,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Home", href: "/social", active: true },
  { icon: Users, label: "Communities", href: "/social" },
  { icon: Bell, label: "Notifications", href: "/social", badge: "9" },
  { icon: Mail, label: "Messages", href: "/messages", badge: "3" },
  { icon: Bookmark, label: "Bookmarks", href: "/social" },
  { icon: User, label: "Profile", href: "/social/profile" },
  { icon: Settings, label: "Settings", href: "/account" },
];

const stories = [
  { name: "You", avatar: "https://i.pravatar.cc/100?img=1", me: true },
  { name: "Moyo", avatar: "https://i.pravatar.cc/100?img=2" },
  { name: "Sophia", avatar: "https://i.pravatar.cc/100?img=3" },
  { name: "Alex", avatar: "https://i.pravatar.cc/100?img=4" },
  { name: "Emma", avatar: "https://i.pravatar.cc/100?img=5" },
  { name: "Carlos", avatar: "https://i.pravatar.cc/100?img=6" },
  { name: "George", avatar: "https://i.pravatar.cc/100?img=7" },
  { name: "Nettie", avatar: "https://i.pravatar.cc/100?img=8" },
];

interface PostData {
  avatar: string;
  name: string;
  username: string;
  verified?: boolean;
  time: string;
  content: string;
  image?: string;
  likes: string;
  reposts: string;
  comments: string;
  views: string;
  tag?: string;
}

const posts: PostData[] = [
  {
    avatar: "https://i.pravatar.cc/100?img=2",
    name: "Moyo Shiro",
    username: "moyo",
    verified: true,
    time: "9:00 AM",
    content:
      "Just launched my new portfolio website! 🚀 Check out these 15 standout examples of creative, sleek, and interactive portfolio designs that inspired me. Which one's your favorite?",
    likes: "62",
    reposts: "23",
    comments: "45",
    views: "12.4K",
    tag: "Design",
  },
  {
    avatar: "https://i.pravatar.cc/100?img=3",
    name: "Sophia",
    username: "sophia",
    time: "10:12 AM",
    content:
      "Dreaming of distant worlds... 🖼️ This AI-generated image captures the essence of exploration. What stories does it spark in your imagination?",
    image:
      "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&w=1074&q=80",
    likes: "59",
    reposts: "16",
    comments: "24",
    views: "8.1K",
    tag: "AI Art",
  },
  {
    avatar: "https://i.pravatar.cc/100?img=4",
    name: "Alex Chen",
    username: "alexc",
    verified: true,
    time: "11:30 AM",
    content:
      "Just finished a 10k run! 🏃‍♂️💨 Personal best time. Remember, every step forward is a step towards your goals.",
    likes: "88",
    reposts: "12",
    comments: "36",
    views: "5.7K",
    tag: "Fitness",
  },
  {
    avatar: "https://i.pravatar.cc/100?img=5",
    name: "Emma Watson",
    username: "emmaw",
    verified: true,
    time: "1:45 PM",
    content:
      "Excited to announce my new book 'Tech for Good' is now available for pre-order! 📚 It explores how we can harness technology to create positive change in the world.",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1074&q=80",
    likes: "1.2K",
    reposts: "234",
    comments: "567",
    views: "104K",
    tag: "Tech",
  },
  {
    avatar: "https://i.pravatar.cc/100?img=6",
    name: "Carlos Rodriguez",
    username: "carlosr",
    time: "3:20 PM",
    content:
      "Just tried the new VR experience at the tech expo. Mind. Blown. 🤯 The future is here, and it's immersive! Can't wait to see how this technology evolves.",
    likes: "45",
    reposts: "8",
    comments: "17",
    views: "3.2K",
    tag: "VR",
  },
];

const suggestions = [
  {
    avatar: "https://i.pravatar.cc/100?img=7",
    name: "George",
    username: "georgeSZ",
    bio: "I design digital products and ventures.",
  },
  {
    avatar: "https://i.pravatar.cc/100?img=8",
    name: "Nettie Schuster",
    username: "Precious3",
    bio: "The No-Code SaaS guy. Building a portfolio of software companies.",
  },
  {
    avatar: "https://i.pravatar.cc/100?img=9",
    name: "Lola Rohan",
    username: "collin_marks",
    bio: "I design digital products and ventures.",
  },
];

const trending = [
  { topic: "#TechInnovation", posts: "5.2K", cat: "Technology" },
  { topic: "#ArtificialIntelligence", posts: "12K", cat: "Trending" },
  { topic: "#ClimateAction", posts: "8.7K", cat: "World" },
  { topic: "#SpaceExploration", posts: "3.9K", cat: "Science" },
];

const liveAvatars = [
  { src: "https://i.pravatar.cc/100?img=11", fallback: "A" },
  { src: "https://i.pravatar.cc/100?img=12", fallback: "B" },
  { src: "https://i.pravatar.cc/100?img=13", fallback: "C" },
  { src: "https://i.pravatar.cc/100?img=14", fallback: "D" },
  { src: "https://i.pravatar.cc/100?img=15", fallback: "E" },
];

const feedTabs = ["For you", "Following", "Media"];

export default function SocialFeed() {
  const [postContent, setPostContent] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("For you");

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Social">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants}
      >
        <div className="lg:container mx-auto flex gap-6 py-4">
          {/* Left Sidebar */}
          <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-60 shrink-0 flex-col lg:flex">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  <span
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors",
                      item.active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-1xs font-semibold text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </nav>

            <Button className="mt-4 w-full gap-2" size="lg">
              <Plus className="h-4 w-4" />
              Create Post
            </Button>

            <div className="mt-5 rounded-2xl border border-border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold">Your communities</h3>
              <div className="space-y-1">
                {[
                  { e: "🎨", n: "Design Community" },
                  { e: "💻", n: "Tech Enthusiasts" },
                  { e: "🌱", n: "Sustainability" },
                ].map((c) => (
                  <button
                    key={c.n}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <span>{c.e}</span> {c.n}
                  </button>
                ))}
              </div>
            </div>

            {/* mini profile */}
            <div className="mt-auto flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://i.pravatar.cc/100?img=1" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">Alex Rivera</p>
                <p className="truncate text-xs text-muted-foreground">
                  @alexrivera
                </p>
              </div>
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
          </aside>

          {/* Main Content */}
          <div className="mx-auto min-w-0 max-w-2xl flex-1">
            {/* Stories */}
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="no-scrollbar flex gap-4 overflow-x-auto">
                {stories.map((s) => (
                  <button
                    key={s.name}
                    className="flex w-16 shrink-0 flex-col items-center gap-1.5"
                  >
                    <span className="relative">
                      <span
                        className={cn(
                          "block rounded-full p-[2px]",
                          s.me
                            ? "bg-border"
                            : "bg-gradient-to-tr from-amber-400 via-rose-500 to-fuchsia-500"
                        )}
                      >
                        <span className="block rounded-full border-2 border-card">
                          <Avatar className="h-14 w-14">
                            <AvatarImage src={s.avatar} />
                            <AvatarFallback>{s.name[0]}</AvatarFallback>
                          </Avatar>
                        </span>
                      </span>
                      {s.me && (
                        <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground">
                          <Plus className="h-3 w-3" />
                        </span>
                      )}
                    </span>
                    <span className="max-w-full truncate text-1xs text-muted-foreground">
                      {s.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Composer */}
            <div className="mt-4 rounded-2xl border border-border bg-card p-4">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/100?img=1" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="What's happening?"
                    className="min-h-[76px] resize-none border-none bg-transparent p-2 text-base shadow-none focus-visible:ring-0"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                  <div className="mt-1 flex items-center justify-between border-t border-border pt-2">
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <ImageIcon className="h-4 w-4 text-primary" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Smile className="h-4 w-4 text-amber-500" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Calendar className="h-4 w-4 text-emerald-500" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <MapPin className="h-4 w-4 text-rose-500" />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      className="rounded-full px-5"
                      disabled={!postContent.trim()}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-4 flex items-center gap-1 rounded-2xl border border-border bg-card p-1">
              {feedTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    activeTab === tab
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="mt-4 space-y-4">
              {posts.map((post) => (
                <Post key={post.username} {...post} />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="hidden w-80 shrink-0 space-y-4 lg:block">
            {/* profile summary */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="h-20 bg-gradient-to-r from-primary/30 via-fuchsia-500/20 to-sky-500/25" />
              <div className="px-4 pb-4">
                <Avatar className="-mt-8 h-16 w-16 border-4 border-card">
                  <AvatarImage src="https://i.pravatar.cc/100?img=1" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div className="mt-2 flex items-center gap-1">
                  <p className="font-semibold">Alex Rivera</p>
                  <BadgeCheck className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">@alexrivera</p>
                <div className="mt-3 flex gap-4 text-sm">
                  <span>
                    <span className="font-semibold tabular-nums">1,204</span>{" "}
                    <span className="text-muted-foreground">Following</span>
                  </span>
                  <span>
                    <span className="font-semibold tabular-nums">8,392</span>{" "}
                    <span className="text-muted-foreground">Followers</span>
                  </span>
                </div>
              </div>
            </div>

            {/* live now */}
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
                  </span>
                  Live now
                </h2>
                <Radio className="h-4 w-4 text-rose-500" />
              </div>
              <div className="mt-3 flex items-center gap-3">
                <AvatarGroup avatars={liveAvatars} max={4} />
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">312</span>{" "}
                  watching a design AMA
                </p>
              </div>
            </div>

            {/* who to follow */}
            <div className="rounded-2xl border border-border bg-card p-4">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4 text-primary" /> Who to follow
              </h2>
              <div className="space-y-4">
                {suggestions.map((u) => (
                  <UserSuggestion key={u.username} {...u} />
                ))}
              </div>
            </div>

            {/* trending */}
            <div className="rounded-2xl border border-border bg-card p-4">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <TrendingUp className="h-4 w-4 text-emerald-500" /> Trending
                topics
              </h2>
              <div className="space-y-1">
                {trending.map((t) => (
                  <button
                    key={t.topic}
                    className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-muted"
                  >
                    <div>
                      <p className="text-1xs text-muted-foreground">{t.cat}</p>
                      <p className="text-sm font-medium">{t.topic}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {t.posts}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </ContentLayout>
  );
}

function Post(post: PostData) {
  const [liked, setLiked] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  return (
    <article className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-border/80">
      <div className="flex gap-3">
        <Avatar className="h-11 w-11">
          <AvatarImage src={post.avatar} />
          <AvatarFallback>{post.name[0]}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
            <span className="font-semibold">{post.name}</span>
            {post.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
            <span className="text-sm text-muted-foreground">
              @{post.username}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">{post.time}</span>
            {post.tag && (
              <Badge variant="secondary" className="ml-1 text-1xs font-medium">
                {post.tag}
              </Badge>
            )}
            <Button size="icon" variant="ghost" className="ml-auto h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <p className="mt-1.5 whitespace-pre-line break-words text-[15px] leading-relaxed">
            {post.content}
          </p>

          {post.image && (
            <div className="mt-3 overflow-hidden rounded-xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt="Post"
                className="h-auto max-h-96 w-full object-cover"
              />
            </div>
          )}

          <div className="mt-3 flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-1 sm:gap-3">
              <button
                onClick={() => setLiked((v) => !v)}
                className={cn(
                  "group flex items-center gap-1.5 rounded-full px-2 py-1 text-sm transition-colors hover:bg-rose-500/10 hover:text-rose-500",
                  liked && "text-rose-500"
                )}
              >
                <Heart
                  className={cn("h-4 w-4", liked && "fill-current")}
                />
                {post.likes}
              </button>
              <button className="flex items-center gap-1.5 rounded-full px-2 py-1 text-sm transition-colors hover:bg-emerald-500/10 hover:text-emerald-500">
                <Repeat2 className="h-4 w-4" />
                {post.reposts}
              </button>
              <button className="flex items-center gap-1.5 rounded-full px-2 py-1 text-sm transition-colors hover:bg-sky-500/10 hover:text-sky-500">
                <MessageSquare className="h-4 w-4" />
                {post.comments}
              </button>
              <span className="flex items-center gap-1.5 px-2 py-1 text-sm">
                <Eye className="h-4 w-4" />
                {post.views}
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setSaved((v) => !v)}
                className={cn(
                  "rounded-full p-2 transition-colors hover:bg-primary/10 hover:text-primary",
                  saved && "text-primary"
                )}
              >
                <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
              </button>
              <button className="rounded-full p-2 transition-colors hover:bg-primary/10 hover:text-primary">
                <Share className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function UserSuggestion({
  avatar,
  name,
  username,
  bio,
}: {
  avatar: string;
  name: string;
  username: string;
  bio: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Avatar>
        <AvatarImage src={avatar} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{name}</div>
            <div className="truncate text-xs text-muted-foreground">
              @{username}
            </div>
          </div>
          <Button size="sm" variant="outline" className="h-8 shrink-0 rounded-full">
            Follow
          </Button>
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{bio}</p>
      </div>
    </div>
  );
}
