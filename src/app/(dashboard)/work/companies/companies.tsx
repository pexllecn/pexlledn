"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, MapPin } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const companies = [
  { name: "Stripe", logo: "https://logo.clearbit.com/stripe.com", industry: "Fintech", rating: 4.8, size: "8,000+", location: "San Francisco", openings: 42, seed: "co-1" },
  { name: "Airbnb", logo: "https://logo.clearbit.com/airbnb.com", industry: "Travel", rating: 4.6, size: "6,000+", location: "San Francisco", openings: 28, seed: "co-2" },
  { name: "Spotify", logo: "https://logo.clearbit.com/spotify.com", industry: "Music", rating: 4.7, size: "9,000+", location: "Stockholm", openings: 35, seed: "co-3" },
  { name: "Figma", logo: "https://logo.clearbit.com/figma.com", industry: "Design Tools", rating: 4.9, size: "1,200+", location: "San Francisco", openings: 18, seed: "co-4" },
  { name: "Notion", logo: "https://logo.clearbit.com/notion.so", industry: "Productivity", rating: 4.7, size: "600+", location: "San Francisco", openings: 12, seed: "co-5" },
  { name: "Vercel", logo: "https://logo.clearbit.com/vercel.com", industry: "Developer Tools", rating: 4.8, size: "500+", location: "Remote", openings: 21, seed: "co-6" },
];

export default function Companies() {
  return (
    <ContentLayout title="Companies">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Companies</h2>
            <p className="text-muted-foreground mt-1">Discover great places to work</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((c) => (
              <Card key={c.name} className="border-none bg-muted overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-24">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${c.seed}/600/200`}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="px-5 pb-5">
                    <div className="-mt-8 flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border-4 border-muted bg-background">
                      <Image
                        src={c.logo}
                        alt={c.name}
                        width={36}
                        height={36}
                        className="h-9 w-9 object-contain"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-lg font-semibold">{c.name}</p>
                      <span className="flex items-center gap-1 text-sm text-amber-500">
                        <Star className="h-4 w-4 fill-current" /> {c.rating}
                      </span>
                    </div>
                    <Badge variant="secondary" className="mt-1 font-normal">
                      {c.industry}
                    </Badge>
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" /> {c.size}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {c.location}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">
                        {c.openings} open roles
                      </span>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
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
