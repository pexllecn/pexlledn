"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, MapPin, DollarSign } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const jobs = [
  { company: "Linear", role: "Product Engineer", logo: "https://logo.clearbit.com/linear.app", location: "Remote", salary: "$140k–$180k", type: "Full-time", level: "Senior" },
  { company: "Vercel", role: "Design Engineer", logo: "https://logo.clearbit.com/vercel.com", location: "Remote", salary: "$150k–$200k", type: "Full-time", level: "Senior" },
  { company: "Stripe", role: "Frontend Engineer", logo: "https://logo.clearbit.com/stripe.com", location: "Dublin · Hybrid", salary: "$120k–$160k", type: "Full-time", level: "Mid" },
  { company: "GitHub", role: "UX Designer", logo: "https://logo.clearbit.com/github.com", location: "Remote", salary: "$110k–$150k", type: "Contract", level: "Mid" },
  { company: "Loom", role: "Brand Designer", logo: "https://logo.clearbit.com/loom.com", location: "San Francisco", salary: "$100k–$130k", type: "Full-time", level: "Mid" },
  { company: "Webflow", role: "Motion Designer", logo: "https://logo.clearbit.com/webflow.com", location: "Remote", salary: "$95k–$125k", type: "Full-time", level: "Junior" },
];

export default function Saved() {
  return (
    <ContentLayout title="Saved">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Saved jobs</h2>
            <p className="text-muted-foreground mt-1">6 roles you bookmarked</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((j) => (
              <Card key={j.company + j.role} className="border-none bg-muted">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-background">
                      <Image
                        src={j.logo}
                        alt={j.company}
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-primary">
                      <Bookmark className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                  <p className="mt-4 font-semibold leading-snug">{j.role}</p>
                  <p className="text-sm text-muted-foreground">{j.company}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Badge variant="secondary">{j.type}</Badge>
                    <Badge variant="secondary">{j.level}</Badge>
                  </div>
                  <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" /> {j.location}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <DollarSign className="h-4 w-4" /> {j.salary}
                    </p>
                  </div>
                  <Button className="mt-4 w-full">Apply now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
