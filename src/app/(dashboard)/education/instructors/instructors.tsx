"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, BookOpen } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const instructors = [
  { name: "Diana Prince", role: "3D Artist & Educator", rating: 4.9, students: "48.2k", courses: 12, seed: "edu-i1", tags: ["Blender", "3D", "Design"] },
  { name: "Marcus Lee", role: "Senior Full-Stack Engineer", rating: 4.8, students: "62.1k", courses: 8, seed: "edu-i2", tags: ["React", "Node", "AWS"] },
  { name: "Sofia Alvarez", role: "Brand Strategist", rating: 4.7, students: "21.9k", courses: 6, seed: "edu-i3", tags: ["Branding", "Marketing"] },
  { name: "Ken Tanaka", role: "Commercial Photographer", rating: 4.9, students: "33.4k", courses: 5, seed: "edu-i4", tags: ["Photography", "Lighting"] },
  { name: "Amara Okafor", role: "UX Research Lead", rating: 4.8, students: "18.7k", courses: 7, seed: "edu-i5", tags: ["UX", "Research"] },
  { name: "Liam Byrne", role: "Growth Marketer", rating: 4.6, students: "12.3k", courses: 4, seed: "edu-i6", tags: ["Growth", "SEO"] },
];

export default function Instructors() {
  return (
    <ContentLayout title="Instructors">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Meet the instructors</h2>
            <p className="text-muted-foreground mt-1">
              Learn from industry experts and top creators
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {instructors.map((it) => (
              <Card key={it.seed} className="border-none bg-muted overflow-hidden">
                <CardContent className="p-6 text-center">
                  <Image
                    src={`https://picsum.photos/seed/${it.seed}/200/200`}
                    alt={it.name}
                    width={200}
                    height={200}
                    className="mx-auto h-24 w-24 rounded-full object-cover"
                  />
                  <h3 className="mt-4 text-lg font-semibold">{it.name}</h3>
                  <p className="text-sm text-muted-foreground">{it.role}</p>
                  <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-current" /> {it.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {it.students}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" /> {it.courses}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                    {it.tags.map((t) => (
                      <Badge key={t} variant="secondary" className="font-normal">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-5 w-full">
                    View profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
