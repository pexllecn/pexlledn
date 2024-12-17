"use client";

import * as React from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  MessageSquare,
  Heart,
  Repeat,
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
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SocialFeed() {
  const [postContent, setPostContent] = React.useState("");
  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Users, label: "Communities", href: "/communities" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: Mail, label: "Messages", href: "/messages" },
    { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <ContentLayout title="Social">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants1}
      >
        <div className="min-h-screen bg-background">
          <div className="lg:container mx-auto flex gap-6 py-4">
            {/* Left Sidebar */}
            <div className="hidden lg:block w-64 h-[calc(100vh-2rem)] overflow-y-auto sticky top-4">
              <div className="space-y-6 px-2">
                {menuItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-normal h-11"
                    >
                      <item.icon className="mr-4 h-5 w-5" />
                      {item.label}
                    </Button>
                  </Link>
                ))}
                <Button className="w-full mt-4" size="lg">
                  Create Post
                </Button>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Your Communities</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    🎨 Design Community
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    💻 Tech Enthusiasts
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    🌱 Sustainability
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-2xl mx-auto">
              {/* Post Creation */}
              <div className="rounded-lg p-4 mt-4">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/100?img=1" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="What's happening?"
                      className="min-h-[100px] p-4 resize-none shadow-none"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost">
                          <ImageIcon className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Smile className="h-4 w-4 text-yellow-500" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Calendar className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <MapPin className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                      <Button disabled={!postContent.trim()}>Post</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts */}
              <div className="space-y-4 mt-4">
                <Post
                  avatar="https://i.pravatar.cc/100?img=2"
                  name="Moyo Shiro"
                  username="moyo"
                  time="09:00 AM"
                  content="Just launched my new portfolio website! 🚀 Check out these 15 standout examples of creative, sleek, and interactive portfolio designs that inspired me. Which one's your favorite? #WebDesign #PortfolioInspiration"
                  likes="62"
                  replies="23"
                  comments="45"
                />
                <Post
                  avatar="https://i.pravatar.cc/100?img=3"
                  name="Sophia"
                  username="sophia"
                  time="10:12 AM"
                  content="Dreaming of distant worlds... 🖼️ This AI-generated image captures the essence of exploration. What stories does it spark in your imagination?"
                  image="https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                  likes="59"
                  replies="16"
                  comments="24"
                />
                <Post
                  avatar="https://i.pravatar.cc/100?img=4"
                  name="Alex Chen"
                  username="alexc"
                  time="11:30 AM"
                  content="Just finished a 10k run! 🏃‍♂️💨 Personal best time. Remember, every step forward is a step towards your goals. #Fitness #RunningCommunity"
                  likes="88"
                  replies="12"
                  comments="36"
                />
                <Post
                  avatar="https://i.pravatar.cc/100?img=5"
                  name="Emma Watson"
                  username="emmaw"
                  time="1:45 PM"
                  content="Excited to announce my new book 'Tech for Good' is now available for pre-order! 📚 It explores how we can harness technology to create positive change in the world. #TechForGood #NewBook"
                  image="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                  likes="1.2K"
                  replies="234"
                  comments="567"
                />
                <Post
                  avatar="https://i.pravatar.cc/100?img=6"
                  name="Carlos Rodriguez"
                  username="carlosr"
                  time="3:20 PM"
                  content="Just tried the new VR experience at the tech expo. Mind. Blown. 🤯 The future is here, and it's immersive! Can't wait to see how this technology evolves. #VR #TechExpo"
                  likes="45"
                  replies="8"
                  comments="17"
                />
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-80 hidden lg:block space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h2 className="font-semibold mb-4">Who to follow</h2>
                <div className="space-y-4">
                  <UserSuggestion
                    avatar="https://i.pravatar.cc/100?img=7"
                    name="George"
                    username="georgeSZ"
                    bio="I design digital products and ventures."
                  />
                  <UserSuggestion
                    avatar="https://i.pravatar.cc/100?img=8"
                    name="Nettie Schuster"
                    username="Precious3"
                    bio="The No Code SaaS Guy. Building a portfolio of software companies."
                  />
                  <UserSuggestion
                    avatar="https://i.pravatar.cc/100?img=9"
                    name="Mrs. Lola Rohan"
                    username="collin_marks"
                    bio="I design digital products and ventures."
                  />
                </div>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h2 className="font-semibold mb-4">Trending Topics</h2>
                <div className="space-y-2">
                  <TrendingTopic topic="#TechInnovation" posts="5.2K" />
                  <TrendingTopic topic="#ArtificialIntelligence" posts="12K" />
                  <TrendingTopic topic="#ClimateAction" posts="8.7K" />
                  <TrendingTopic topic="#SpaceExploration" posts="3.9K" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}

function Post({
  avatar,
  name,
  username,
  time,
  content,
  image,
  likes,
  replies,
  comments,
}: {
  avatar: string;
  name: string;
  username: string;
  time: string;
  content: string;
  image?: string;
  likes: string;
  replies: string;
  comments: string;
}) {
  return (
    <div className="bg-background p-2 border-t">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold">{name}</span>
            <span className="text-muted-foreground">@{username}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{time}</span>
            <Button size="icon" variant="ghost" className="ml-auto">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 break-words">{content}</p>
          {image && (
            <div className="mt-3 rounded-lg overflow-hidden">
              <img src={image} alt="Post image" className="w-full h-auto" />
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 mt-3">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors p-0 lg:p-2"
              >
                <Heart className="h-4 w-4 mr-1" />
                {likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors p-0 lg:p-2"
              >
                <Repeat className="h-4 w-4 mr-1" />
                {replies}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors p-0 lg:p-2"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                {comments}
              </Button>
            </div>
            <div className="flex gap-2 sm:gap-4 ml-auto">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors p-0 lg:p-2"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors p-0 lg:p-2"
              >
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="truncate">
            <div className="font-semibold truncate">{name}</div>
            <div className="text-muted-foreground text-sm truncate">
              @{username}
            </div>
          </div>
          <Button size="sm" variant="outline" className="shrink-0">
            Follow
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{bio}</p>
      </div>
    </div>
  );
}

function TrendingTopic({ topic, posts }: { topic: string; posts: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-medium">{topic}</span>
      <span className="text-sm text-muted-foreground">{posts} posts</span>
    </div>
  );
}
