"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Phone, Mail, Star, Building2, MessageSquare } from "lucide-react";

const featured = {
  name: "Jerome Bell", role: "CTO · Acme Co.", email: "jerome@acme.co", phone: "+1 202 555 0134",
  avatar: "/avatar-40-01.jpg", deals: 3, value: "$41k", status: "Hot",
};

const contacts = [
  { name: "Dianne Russell", role: "Head of Ops · Globex", email: "dianne@globex.io", phone: "+1 202 555 0178", status: "Warm", avatar: "/avatar-40-02.jpg", tint: "text-amber-600 bg-amber-500/10" },
  { name: "Cody Fisher", role: "Founder · Initech", email: "cody@initech.com", phone: "+1 202 555 0199", status: "New", avatar: "/avatar-40-03.jpg", tint: "text-sky-600 bg-sky-500/10" },
  { name: "Kristin Watson", role: "VP Sales · Umbrella", email: "kristin@umbrella.co", phone: "+1 202 555 0155", status: "Hot", avatar: "/avatar-40-04.jpg", tint: "text-rose-600 bg-rose-500/10" },
  { name: "Guy Hawkins", role: "PM · Soylent", email: "guy@soylent.com", phone: "+1 202 555 0102", status: "Cold", avatar: "/avatar-40-05.jpg", tint: "bg-muted text-muted-foreground" },
  { name: "Robert Fox", role: "CEO · Hooli", email: "robert@hooli.com", phone: "+1 202 555 0186", status: "Warm", avatar: "/avatar-32-01.jpg", tint: "text-amber-600 bg-amber-500/10" },
];

export default function Contacts() {
  return (
    <ContentLayout title="Contacts">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Contacts</h2>
            <p className="mt-1 text-muted-foreground">1,204 contacts</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search contacts…" className="border-none bg-muted pl-9" />
            </div>
            <Button><Plus className="mr-2 h-4 w-4" /> Add</Button>
          </div>
        </div>

        {/* featured contact */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white sm:p-8 dark:from-slate-900 dark:to-black">
          <div className="pointer-events-none absolute -right-8 top-0 h-40 w-40 rounded-full bg-rose-500/20 blur-3xl" />
          <div className="relative flex flex-wrap items-center gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featured.avatar} alt={featured.name} className="h-20 w-20 rounded-2xl object-cover ring-2 ring-white/20" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold tracking-tight">{featured.name}</h3>
                <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-1xs text-rose-200">{featured.status}</span>
              </div>
              <p className="flex items-center gap-1 text-sm text-white/70"><Building2 className="h-3.5 w-3.5" /> {featured.role}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> {featured.email}</span>
                <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> {featured.phone}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center"><p className="text-xl font-semibold tabular-nums">{featured.deals}</p><p className="text-1xs text-white/60">deals</p></div>
              <div className="text-center"><p className="text-xl font-semibold tabular-nums">{featured.value}</p><p className="text-1xs text-white/60">value</p></div>
              <Button className="rounded-full bg-white text-slate-900 hover:bg-white/90"><MessageSquare className="mr-2 h-4 w-4" /> Message</Button>
            </div>
          </div>
        </div>

        <SectionTitle title="All contacts" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((c) => (
            <div key={c.name} className={`${surface} p-5`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.avatar} alt={c.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.role}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-1xs ${c.tint}`}>{c.status}</span>
              </div>
              <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                <p className="flex items-center gap-2 truncate"><Mail className="h-4 w-4 shrink-0" /> {c.email}</p>
                <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> {c.phone}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 rounded-full"><Mail className="mr-1.5 h-4 w-4" /> Email</Button>
                <Button size="sm" variant="outline" className="flex-1 rounded-full"><Phone className="mr-1.5 h-4 w-4" /> Call</Button>
                <Button size="icon" variant="ghost" className="h-9 w-9"><Star className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
