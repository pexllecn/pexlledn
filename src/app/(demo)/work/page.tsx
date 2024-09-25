"use client"

import { useState } from "react"
import { Bell, Mail, Search, Bookmark, SlidersHorizontal, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ContentLayout } from "@/components/admin-panel/content-layout"
import { motion } from "framer-motion"

interface Job {
  id: number
  company: string
  role: string
  location: string
  salary: string
  type: string
  level: string
  logo: string
  color: string
  requirements: string
  verified: string
  timeAgo: string
}

export default function JobSearchPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

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
      requirements: "5+ years of experience in UI/UX design, proficiency in Figma, and a strong portfolio.",
      verified: "$100,000+ spent",
      timeAgo: "2d ago"
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
      requirements: "3+ years of product design experience, strong problem-solving skills, and experience with design systems.",
      verified: "$200,000+ spent",
      timeAgo: "1w ago"
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
      requirements: "3+ years of UX research experience, proficiency in qualitative and quantitative research methods.",
      verified: "€150,000+ spent",
      timeAgo: "3d ago"
    },
    
  ]

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Account">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants1}
      >
        <div className="">
          {/* Header for mobile */}
          <div className="lg:hidden flex justify-between items-center p-4 bg-background">
            <h1 className="text-xl font-bold">Job Search</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <UserProfile />
              </SheetContent>
            </Sheet>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Left Column - Job Listings */}
            <div className="w-full lg:w-1/3 p-4 lg:p-6 overflow-y-auto">
              <div className="hidden lg:flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Welcome Back, Let's Find Your Job!🔥</h1>
              </div>

              {/* Search Bar */}
              <div className="flex items-center w-full mb-6 space-x-2">
                <div className="relative flex-grow">
                  <Input 
                    type="text" 
                    placeholder="UI Designer" 
                    className="pl-10 pr-4 py-2 w-full rounded-full border-none bg-muted"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-muted border-none"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </div>

              {/* Search Result Pill */}
              <Badge variant="default" className="mb-4">
                <span className="mr-2 font-medium">Search Result</span>
                <span className="text-sm">29 Jobs Found</span>
              </Badge>

              <div className="space-y-4">
                {jobs.map((job) => (
                  <Card 
                    key={job.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow bg-muted border-none"
                    onClick={() => setSelectedJob(job)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                            <Image src={job.logo} alt={`${job.company} logo`} width={40} height={40} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{job.company}</h3>
                            <p className="text-sm text-muted-foreground">{job.role}</p>
                            <p className="text-xs text-muted-foreground">{job.location}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-background">{job.salary}</Badge>
                        <Badge variant="outline" className="bg-background">{job.type}</Badge>
                        <Badge variant="outline" className="bg-background">{job.level}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{job.requirements}</p>
                      <div className="mt-2 flex justify-between items-center text-xs text-muted-foreground">
                        <span>Payment verified {job.verified}</span>
                        <span>{job.timeAgo}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Middle Column - Job Details */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                {selectedJob && (
                  <Card className="bg-muted border-none">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden">
                            <Image src={selectedJob.logo} alt={`${selectedJob.company} logo`} width={64} height={64} />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">{selectedJob.company}</h2>
                            <p className="text-muted-foreground">{selectedJob.role}</p>
                            <p className="text-sm text-muted-foreground">{selectedJob.location}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="h-6 w-6" />
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-4 mb-6">
                        <Badge variant="success">
                          <span className="font-semibold">Salary</span>
                          <span className="ml-2">{selectedJob.salary}</span>
                        </Badge>
                        <Badge variant="info">
                          <span className="font-semibold">Job Type</span>
                          <span className="ml-2">{selectedJob.type}</span>
                        </Badge>
                        <Badge variant="teal">
                          <span className="font-semibold">Number of Applicants</span>
                          <span className="ml-2">20 /50</span>
                        </Badge>
                        <Badge variant="blue">
                          <span className="font-semibold">Skill</span>
                          <span className="ml-2">{selectedJob.level}</span>
                        </Badge>
                      </div>

                      <div className="mb-6">
                        <div className="flex space-x-4 mb-4">
                          <Button className="flex-1 bg-primary text-primary-foreground">Description</Button>
                          <Button variant="outline" className="flex-1">Company</Button>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>Design and implement user-centered interfaces for web and mobile applications.</li>
                          <li>Collaborate with product managers and engineers to define and implement innovative solutions for the product direction, visuals and experience.</li>
                          <li>Execute all visual design stages from concept to final hand-off to engineering.</li>
                          <li>Conceptualize original ideas that bring simplicity and user friendliness to complex design roadblocks.</li>
                          <li>Create wireframes, storyboards, user flows, process flows and site maps to effectively communicate interaction and design ideas.</li>
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>{selectedJob.requirements}</li>
                          <li>Excellent visual design skills with sensitivity to user-system interaction.</li>
                          <li>Ability to present your designs and sell your solutions to various stakeholders.</li>
                          <li>Ability to solve problems creatively and effectively.</li>
                          <li>Up-to-date with the latest UI/UX trends, techniques, and technologies.</li>
                        </ul>
                      </div>

                      <Button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold">
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="hidden lg:block w-1/6 p-4">
              <UserProfile />
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  )
}

function UserProfile() {
  return (
    <>
      <Card className="mb-4 bg-muted border-none">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Revaldo" />
              <AvatarFallback>RV</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">Revaldo</h3>
              <p className="text-sm text-muted-foreground">UI Designer</p>
              <p className="text-xs text-muted-foreground">Surakarta, Central Java, ID</p>
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
              <CardTitle className="text-sm font-semibold text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex flex-col">
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.unit}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-6 bg-muted border-none">
        <CardHeader className="p-4">
          <CardTitle className="text-sm font-semibold text-muted-foreground">345 Profile View</CardTitle>
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
  )
}