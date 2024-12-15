"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ChevronRight,
  Clock,
  Users,
  MessageSquare,
  Download,
  Award,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { motion } from "framer-motion";

export default function CoursePage() {
  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  return (
    <ContentLayout title="Account">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants1}
      >
        <div className="py-8">
          <div className="grid lg:grid-cols-[1.75fr,0.75fr] gap-4 lg:gap-8 border-none">
            {/* Left Column */}
            <div className="lg:px-4">
              {/* Course Image */}
              <Card className="mb-8 border-none">
                <CardContent className="p-0 relative">
                  <Image
                    src="https://picsum.photos/1800/800"
                    alt="3D character model"
                    width={600}
                    height={200}
                    className="rounded-lg w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <Star className="w-5 h-5 fill-yellow-400/25 text-yellow-400" />
                    </div>
                    <span className="text-white">1,421 reviews</span>
                  </div>
                </CardContent>
              </Card>

              {/* Instructor */}
              <div className="px-4 lg:px-6">
                <div className="flex items-center space-x-4 mb-8">
                  <Image
                    src="https://i.pravatar.cc/128"
                    alt="Instructor avatar"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm text-muted-foreground">A course by</p>
                    <h2 className="font-semibold">Blend Smith</h2>
                  </div>
                </div>

                {/* Course Description */}
                <div className="space-y-6">
                  <h1 className="text-2xl lg:text-3xl font-bold">
                    Advanced 3D Modelling in Blender
                  </h1>
                  <p className="text-base lg:text-lg text-muted-foreground">
                    Embark on a creative journey and master the art of crafting
                    your unique 3D character using Blender. Dive into the
                    fascinating process of bringing your imaginative ideas to
                    life as you explore the intricate features of Blender.
                  </p>
                  <p className="text-base lg:text-lg text-muted-foreground">
                    Unleash your creativity as you learn to meticulously model,
                    enhance details, and skillfully manipulate light and color.
                    With each step, you&apos;ll unveil the captivating
                    characters residing in your mind and unleash them upon the
                    world, all while enjoying an exhilarating and enjoyable
                    experience.
                  </p>
                </div>

                {/* Course Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Language:</p>
                      <p className="font-semibold">English</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Subtitles:
                      </p>
                      <p className="font-semibold">
                        English, Spanish, French, Italian, Russian, Polish,
                        Dutch, German
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Critique session:
                      </p>
                      <p className="font-semibold">Individual recordings</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Certificate:
                      </p>
                      <p className="font-semibold">
                        Upon completion of the course
                      </p>
                    </div>
                  </div>
                </div>

                {/* Course Contents */}
                <div className="mt-6 lg:mt-8">
                  <h2 className="text-sm font-semibold text-muted-foreground mb-4">
                    COURSE TABLE OF CONTENTS
                  </h2>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm lg:text-base"
                    >
                      <span>Introduction</span>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                    <div className="space-y-2 bg-muted/50 rounded-lg p-4">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm lg:text-base"
                      >
                        <span>Preparing the character</span>
                        <ChevronRight className="ml-auto h-4 w-4 rotate-90" />
                      </Button>
                      <p className="text-sm text-muted-foreground px-4">
                        You will dive deep into the essential techniques and
                        workflows required to effectively prepare a character
                        model for advanced 3D modelling. From optimizing the
                        topology and refining the geometry to setting up UV
                        mapping and creating efficient rigging structures, this
                        part of the course will equip you with the fundamental
                        skills needed for character preparation.
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm lg:text-base"
                    >
                      <span>Modeling the Head</span>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm lg:text-base"
                    >
                      <span>Modeling the Body</span>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm lg:text-base"
                    >
                      <span>Texturing</span>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm lg:text-base"
                    >
                      <span>Rigging</span>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm lg:text-base"
                    >
                      <span>Animation</span>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm lg:text-base"
                    >
                      <span>Rendering</span>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <Card className="border-none lg:sticky lg:top-4">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex justify-between items-start mb-8">
                    <Badge
                      variant="primary"
                      className="text-2xl lg:text-4xl font-bold px-3 py-1.5 lg:px-4 lg:py-2"
                    >
                      49.99 <span className="text-xl">USD</span>
                    </Badge>
                  </div>

                  <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            LESSONS
                          </p>
                          <p className="font-semibold">12</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            DIFFICULTY
                          </p>
                          <p className="font-semibold">Moderate</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Students:
                          </p>
                          <p className="font-semibold">3,215</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Duration:
                          </p>
                          <p className="font-semibold">8h 23m</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Download className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Additional resources:
                          </p>
                          <p className="font-semibold">12 files</p>
                        </div>
                      </div>
                    </div>

                    <div className="gap-2 lg:gap-4 flex flex-row sm:flex-row">
                      <Button className="flex-1" size="lg">
                        Enroll a course
                      </Button>
                      <Button variant="outline" className="flex-1" size="lg">
                        Buy as a gift
                      </Button>
                    </div>

                    <div className="space-y-3 lg:space-y-4">
                      <div>
                        <h3 className="text-sm lg:text-base font-semibold mb-1 lg:mb-2">
                          ASSIGNMENT
                        </h3>
                        <p className="text-xs lg:text-sm text-muted-foreground">
                          Plan to dedicate a minimum of 1-2 hours per day to
                          watch lecture videos, engage in Q&A sessions, and
                          complete assignments.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm lg:text-base font-semibold mb-1 lg:mb-2">
                          PREREQUISITES
                        </h3>
                        <p className="text-xs lg:text-sm text-muted-foreground">
                          Familiarity with Blender&apos;s user interface and
                          navigation, basic manipulation of SOPs (Surface
                          Operators), and understanding of fundamental
                          mathematical concepts related to vectors are
                          recommended.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm lg:text-base font-semibold mb-1 lg:mb-2">
                          MATERIALS
                        </h3>
                        <p className="text-xs lg:text-sm text-muted-foreground">
                          Blender 2.93 (or higher) | Recommended system
                          requirements: 8-core processor and 32GB of RAM. To
                          participate in this workshop, you can download the
                          free educational edition of Blender.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
