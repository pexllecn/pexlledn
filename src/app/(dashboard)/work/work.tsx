"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Mail,
  Search,
  Bookmark,
  SlidersHorizontal,
  Menu,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { ContentLayout } from "@/components/admin-panel/content-layout";

interface Job {
  id: number;
  company: string;
  role: string;
  location: string;
  salary: string;
  type: string;
  level: string;
  logo: string;
  color: string;
  requirements: string;
  verified: string;
  timeAgo: string;
}

const jobs: Job[] = [
  {
    id: 1,
    company: "Dropbox",
    role: "UI Designer",
    location: "San Francisco, CA - Remote",
    salary: "$120k - $150k",
    type: "Full-Time",
    level: "Senior",
    logo: "https://logo.clearbit.com/dropbox.com",
    color: "bg-blue-500",
    requirements:
      "5+ years of experience in UI/UX design, proficiency in Figma, and a strong portfolio.",
    verified: "$100,000+ spent",
    timeAgo: "2d ago",
  },
  {
    id: 2,
    company: "Airbnb",
    role: "Product Designer",
    location: "New York, NY - Hybrid",
    salary: "$130k - $160k",
    type: "Full-Time",
    level: "Mid-Senior",
    logo: "https://logo.clearbit.com/airbnb.com",
    color: "bg-red-500",
    requirements:
      "3+ years of product design experience, strong problem-solving skills, and experience with design systems.",
    verified: "$200,000+ spent",
    timeAgo: "1w ago",
  },
  {
    id: 3,
    company: "Spotify",
    role: "UX Researcher",
    location: "Stockholm, Sweden - Onsite",
    salary: "€70k - €90k",
    type: "Full-Time",
    level: "Mid-Level",
    logo: "https://logo.clearbit.com/spotify.com",
    color: "bg-green-500",
    requirements:
      "3+ years of UX research experience, proficiency in qualitative and quantitative research methods.",
    verified: "€150,000+ spent",
    timeAgo: "3d ago",
  },
  {
    id: 4,
    company: "Google",
    role: "Interaction Designer",
    location: "Mountain View, CA - Hybrid",
    salary: "$140k - $180k",
    type: "Full-Time",
    level: "Senior",
    logo: "https://logo.clearbit.com/google.com",
    color: "bg-yellow-500",
    requirements:
      "7+ years of experience in interaction design, expertise in prototyping tools, and a history of shipping successful products.",
    verified: "$500,000+ spent",
    timeAgo: "5d ago",
  },
  {
    id: 5,
    company: "Microsoft",
    role: "UX/UI Designer",
    location: "Redmond, WA - Onsite",
    salary: "$125k - $160k",
    type: "Full-Time",
    level: "Mid-Senior",
    logo: "https://logo.clearbit.com/microsoft.com",
    color: "bg-blue-600",
    requirements:
      "5+ years of UX/UI design experience, proficiency in Adobe Creative Suite and Figma, and experience with design systems.",
    verified: "$300,000+ spent",
    timeAgo: "1w ago",
  },
  {
    id: 6,
    company: "Twitter",
    role: "Product Designer",
    location: "San Francisco, CA - Remote",
    salary: "$130k - $170k",
    type: "Full-Time",
    level: "Senior",
    logo: "https://logo.clearbit.com/twitter.com",
    color: "bg-blue-400",
    requirements:
      "6+ years of product design experience, strong portfolio showcasing end-to-end design process, and experience with social media products.",
    verified: "$250,000+ spent",
    timeAgo: "3d ago",
  },
];

export default function JobSearchPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (jobs.length > 0) {
        setSelectedJob(jobs[0]);
      }
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setShowJobDetails(window.innerWidth < 1024);
  };

  return (
    <ContentLayout title="Work">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants1}
      >
        <div className="min-h-screen">
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <header className="lg:hidden flex justify-between items-center p-4 bg-background border-b sticky top-0 z-10">
              {showJobDetails ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowJobDetails(false)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              ) : null}
              <h1 className="text-xl font-bold">
                {showJobDetails
                  ? selectedJob?.role || "Job Details"
                  : "Job Search"}
              </h1>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex lg:flex-row">
              {/* Job Listings */}
              <div
                className={`w-full lg:w-1/3 xl:w-2/5 bg-background ${
                  showJobDetails ? "hidden lg:block" : ""
                }`}
              >
                <div className="py-2 lg:p-6 h-full">
                  {/* Search */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="UI Designer"
                        className="pl-9 bg-muted shadow-none border-none"
                      />
                    </div>
                    <Button variant="outline" size="icon" className="shrink-0">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Results Count */}
                  <div className="flex items-center justify-between mb-6">
                    <Badge variant="black" className="px-3 py-1">
                      Search Result {jobs.length} Jobs Found
                    </Badge>
                  </div>

                  {/* Job List */}
                  <div className="p-2 space-y-4 overflow-auto max-h-[calc(100vh-12rem)]">
                    <AnimatePresence>
                      {isLoading
                        ? // Loading skeletons
                          [...Array(3)].map((_, i) => (
                            <Card
                              key={`skeleton-${i}`}
                              className="overflow-hidden"
                            >
                              <CardContent className="p-4">
                                <div className="flex gap-4">
                                  <Skeleton className="h-12 w-12 rounded-lg" />
                                  <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-32" />
                                    <Skeleton className="h-3 w-48" />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        : jobs.map((job) => (
                            <motion.div
                              key={job.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.1 }}
                            >
                              <Card
                                className={`cursor-pointer shadow-none bg-muted/70 ${
                                  selectedJob?.id === job.id
                                    ? "bg-primary/10 border border-ring ring-ring/20 text-primary"
                                    : "border-none"
                                }`}
                                onClick={() => handleJobSelect(job)}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                                        <Image
                                          src={job.logo}
                                          alt={job.company}
                                          width={40}
                                          height={40}
                                          className="object-cover"
                                        />
                                      </div>
                                      <div>
                                        <h3 className="font-semibold">
                                          {job.company}
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                          {job.role}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {job.location}
                                        </p>
                                      </div>
                                    </div>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="shrink-0"
                                    >
                                      <Bookmark className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <div className="mt-4 flex flex-wrap gap-2">
                                    <Badge
                                      variant="outline"
                                      className="bg-background"
                                    >
                                      {job.salary}
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className="bg-background"
                                    >
                                      {job.type}
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className="bg-background"
                                    >
                                      {job.level}
                                    </Badge>
                                  </div>
                                  <p className="mt-2 text-sm text-muted-foreground">
                                    {job.requirements}
                                  </p>
                                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                    <span>Verified {job.verified}</span>
                                    <span>{job.timeAgo}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div
                className={`w-full lg:w-2/3 xl:w-3/5 bg-background ${
                  showJobDetails ? "block" : "hidden lg:block"
                }`}
              >
                <div className="h-full py-2 overflow-auto">
                  {selectedJob ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="max-w-3xl mx-auto bg-muted p-6 rounded-lg">
                        <div className="flex items-start justify-between mb-8">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center">
                              <Image
                                src={selectedJob.logo}
                                alt={selectedJob.company}
                                width={64}
                                height={64}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h2 className="text-2xl font-bold">
                                {selectedJob.company}
                              </h2>
                              <p className="text-muted-foreground">
                                {selectedJob.role}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {selectedJob.location}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="icon">
                            <Bookmark className="h-5 w-5" />
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-8">
                          <Badge variant="outline" className="px-3 py-1">
                            <span className="font-semibold">Salary:</span>
                            <span className="ml-2">{selectedJob.salary}</span>
                          </Badge>
                          <Badge variant="outline" className="px-3 py-1">
                            <span className="font-semibold">Job Type:</span>
                            <span className="ml-2">{selectedJob.type}</span>
                          </Badge>
                          <Badge variant="outline" className="px-3 py-1">
                            <span className="font-semibold">Applicants:</span>
                            <span className="ml-2">20 / 50</span>
                          </Badge>
                          <Badge variant="outline" className="px-3 py-1">
                            <span className="font-semibold">Experience:</span>
                            <span className="ml-2">{selectedJob.level}</span>
                          </Badge>
                        </div>

                        <div className="space-y-6">
                          <section>
                            <h3 className="text-lg font-semibold mb-4">
                              Job Description
                            </h3>
                            <div className="text-muted-foreground">
                              <p>
                                We are seeking a talented {selectedJob.role} to
                                join our team. This is an exciting opportunity
                                to work on cutting-edge projects and make a
                                significant impact on our product.
                              </p>
                              <ul className="list-disc list-inside mt-4 space-y-2">
                                <li>
                                  Design and implement user-centered interfaces
                                  for web and mobile applications.
                                </li>
                                <li>
                                  Collaborate with product managers and
                                  engineers to define and implement innovative
                                  solutions for the product direction, visuals
                                  and experience.
                                </li>
                                <li>
                                  Execute all visual design stages from concept
                                  to final hand-off to engineering.
                                </li>
                                <li>
                                  Conceptualize original ideas that bring
                                  simplicity and user friendliness to complex
                                  design roadblocks.
                                </li>
                                <li>
                                  Create wireframes, storyboards, user flows,
                                  process flows and site maps to effectively
                                  communicate interaction and design ideas.
                                </li>
                              </ul>
                            </div>
                          </section>

                          <section>
                            <h3 className="text-lg font-semibold mb-4">
                              Requirements
                            </h3>
                            <div className="text-muted-foreground">
                              <ul className="list-disc list-inside space-y-2">
                                <li>{selectedJob.requirements}</li>
                                <li>
                                  Strong portfolio demonstrating user-centered
                                  design process
                                </li>
                                <li>
                                  Excellent communication and collaboration
                                  skills
                                </li>
                                <li>
                                  Experience with modern design tools and
                                  processes
                                </li>
                                <li>
                                  Ability to work effectively in a fast-paced
                                  environment
                                </li>
                              </ul>
                            </div>
                          </section>

                          <div className="pt-4">
                            <Button className="w-full" size="lg">
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-lg font-medium">
                          Select a job to view details
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Choose from the list of available positions
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop Sidebar */}
              <div className="hidden lg:block w-1/4 xl:w-1/4">
                <div className="p-6 rounded-lg">
                  <UserProfile />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}

function UserProfile() {
  return (
    <>
      <Card className="mb-4 bg-muted border-none">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Revaldo"
              />
              <AvatarFallback>RV</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">Revaldo</h3>
              <p className="text-sm text-muted-foreground">UI Designer</p>
              <p className="text-xs text-muted-foreground">
                Surakarta, Central Java, ID
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Edit Profile
          </Button>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        {[
          { title: "Search Result", value: 22, unit: "Views" },
          { title: "Applied Job", value: 12, unit: "Job" },
          { title: "Post Views", value: 268, unit: "Views" },
          { title: "Experience", value: 5, unit: "Month" },
        ].map((stat) => (
          <Card key={stat.title} className="bg-muted border-none">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex flex-col">
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">
                  {stat.unit}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-6 bg-muted border-none">
        <CardHeader className="p-4">
          <CardTitle className="text-sm font-semibold text-muted-foreground">
            345 Profile View
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Profile view chart"
            width={200}
            height={100}
            className="w-full"
          />
        </CardContent>
      </Card>
    </>
  );
}
