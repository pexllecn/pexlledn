"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Home, Phone, Mail, Plus } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const agents = [
  { name: "Savannah Nguyen", area: "Downtown & Midtown", listings: 24, sold: 142, rating: 4.9, avatar: "/avatar-40-01.jpg", tag: "Top producer" },
  { name: "Ralph Edwards", area: "Suburban North", listings: 18, sold: 98, rating: 4.7, avatar: "/avatar-40-02.jpg", tag: "Luxury" },
  { name: "Jenny Wilson", area: "Waterfront", listings: 31, sold: 176, rating: 5.0, avatar: "/avatar-40-03.jpg", tag: "Top producer" },
  { name: "Devon Lane", area: "Commercial", listings: 12, sold: 64, rating: 4.6, avatar: "/avatar-40-04.jpg", tag: "Commercial" },
  { name: "Courtney Henry", area: "East Side", listings: 27, sold: 121, rating: 4.8, avatar: "/avatar-40-05.jpg", tag: "Rentals" },
  { name: "Marvin McKinney", area: "Historic District", listings: 15, sold: 87, rating: 4.7, avatar: "/avatar-32-01.jpg", tag: "Luxury" },
];

export default function Agents() {
  return (
    <ContentLayout title="Agents">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Agents</h2>
              <p className="text-muted-foreground mt-1">Your brokerage team · 6 agents</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add agent
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((a) => (
              <Card key={a.name} className="border-none bg-muted">
                <CardContent className="p-6 text-center">
                  <Avatar className="mx-auto h-20 w-20">
                    <AvatarImage src={a.avatar} alt={a.name} />
                    <AvatarFallback>{a.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-lg font-semibold">{a.name}</h3>
                  <p className="text-sm text-muted-foreground">{a.area}</p>
                  <Badge variant="secondary" className="mt-2 font-normal">
                    {a.tag}
                  </Badge>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-lg bg-background/60 py-2">
                      <p className="flex items-center justify-center gap-1 text-sm font-semibold">
                        <Home className="h-3.5 w-3.5" /> {a.listings}
                      </p>
                      <p className="text-1xs text-muted-foreground">Active</p>
                    </div>
                    <div className="rounded-lg bg-background/60 py-2">
                      <p className="text-sm font-semibold tabular-nums">{a.sold}</p>
                      <p className="text-1xs text-muted-foreground">Sold</p>
                    </div>
                    <div className="rounded-lg bg-background/60 py-2">
                      <p className="flex items-center justify-center gap-1 text-sm font-semibold text-amber-500">
                        <Star className="h-3.5 w-3.5 fill-current" /> {a.rating}
                      </p>
                      <p className="text-1xs text-muted-foreground">Rating</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="mr-1.5 h-4 w-4" /> Call
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Mail className="mr-1.5 h-4 w-4" /> Email
                    </Button>
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
