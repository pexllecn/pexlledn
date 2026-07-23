"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Phone, Mail, Star } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const contacts = [
  { name: "Jerome Bell", role: "CTO · Acme Co.", email: "jerome@acme.co", phone: "+1 202 555 0134", status: "Hot", avatar: "/avatar-40-01.jpg", tint: "bg-rose-500/10 text-rose-600" },
  { name: "Dianne Russell", role: "Head of Ops · Globex", email: "dianne@globex.io", phone: "+1 202 555 0178", status: "Warm", avatar: "/avatar-40-02.jpg", tint: "bg-amber-500/10 text-amber-600" },
  { name: "Cody Fisher", role: "Founder · Initech", email: "cody@initech.com", phone: "+1 202 555 0199", status: "New", avatar: "/avatar-40-03.jpg", tint: "bg-sky-500/10 text-sky-600" },
  { name: "Kristin Watson", role: "VP Sales · Umbrella", email: "kristin@umbrella.co", phone: "+1 202 555 0155", status: "Hot", avatar: "/avatar-40-04.jpg", tint: "bg-rose-500/10 text-rose-600" },
  { name: "Guy Hawkins", role: "PM · Soylent", email: "guy@soylent.com", phone: "+1 202 555 0102", status: "Cold", avatar: "/avatar-40-05.jpg", tint: "bg-muted text-muted-foreground" },
  { name: "Robert Fox", role: "CEO · Hooli", email: "robert@hooli.com", phone: "+1 202 555 0186", status: "Warm", avatar: "/avatar-32-01.jpg", tint: "bg-amber-500/10 text-amber-600" },
];

export default function Contacts() {
  return (
    <ContentLayout title="Contacts">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Contacts</h2>
              <p className="text-muted-foreground mt-1">1,204 contacts</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search contacts…" className="pl-9 bg-muted border-none" />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contacts.map((c) => (
              <Card key={c.name} className="border-none bg-muted">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={c.avatar} alt={c.name} />
                        <AvatarFallback>{c.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.role}</p>
                      </div>
                    </div>
                    <Badge className={`${c.tint} border-none`}>{c.status}</Badge>
                  </div>
                  <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2 truncate">
                      <Mail className="h-4 w-4 shrink-0" /> {c.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0" /> {c.phone}
                    </p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Mail className="mr-1.5 h-4 w-4" /> Email
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="mr-1.5 h-4 w-4" /> Call
                    </Button>
                    <Button size="icon" variant="ghost" className="h-9 w-9">
                      <Star className="h-4 w-4" />
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
