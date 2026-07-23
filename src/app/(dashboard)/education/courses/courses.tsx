"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, Clock, Users, Search, Play } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const cats = ["All", "Design", "Development", "Marketing", "Business", "Photography"];

const courses = [
  { title: "3D Character Modeling Masterclass", author: "Diana Prince", cat: "Design", rating: 4.9, students: "12.4k", hours: 18, price: "$89", seed: "edu-c1" },
  { title: "Full-Stack Web Development", author: "Marcus Lee", cat: "Development", rating: 4.8, students: "24.1k", hours: 42, price: "$120", seed: "edu-c2" },
  { title: "Brand Identity & Strategy", author: "Sofia Alvarez", cat: "Marketing", rating: 4.7, students: "8.9k", hours: 12, price: "$69", seed: "edu-c3" },
  { title: "Product Photography Basics", author: "Ken Tanaka", cat: "Photography", rating: 4.9, students: "15.2k", hours: 9, price: "$49", seed: "edu-c4" },
  { title: "UX Research From Scratch", author: "Amara Okafor", cat: "Design", rating: 4.8, students: "6.7k", hours: 15, price: "$79", seed: "edu-c5" },
  { title: "Growth Marketing Playbook", author: "Liam Byrne", cat: "Business", rating: 4.6, students: "5.1k", hours: 11, price: "$99", seed: "edu-c6" },
];

export default function Courses() {
  return (
    <ContentLayout title="Courses">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Explore courses</h2>
              <p className="text-muted-foreground mt-1">
                842 courses across 12 categories
              </p>
            </div>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search courses…" className="pl-9 bg-muted border-none" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {cats.map((c, i) => (
              <button
                key={c}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  i === 0 ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/70"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <Card key={c.seed} className="group border-none bg-muted overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={`https://picsum.photos/seed/${c.seed}/600/360`}
                      alt={c.title}
                      width={600}
                      height={360}
                      className="h-44 w-full object-cover"
                    />
                    <Badge className="absolute left-3 top-3 bg-background/90 text-foreground border-none">
                      {c.cat}
                    </Badge>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black">
                        <Play className="h-5 w-5 fill-current" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium leading-snug line-clamp-2">{c.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{c.author}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1 text-amber-500">
                        <Star className="h-3.5 w-3.5 fill-current" /> {c.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" /> {c.students}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {c.hours}h
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-semibold">{c.price}</span>
                      <Button size="sm">Enroll</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
