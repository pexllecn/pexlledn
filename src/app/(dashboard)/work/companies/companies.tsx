"use client";

import Image from "next/image";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Star, Users, MapPin, Briefcase, ArrowRight } from "lucide-react";

const spotlight = {
  name: "Stripe", logo: "https://logo.clearbit.com/stripe.com", industry: "Fintech",
  rating: 4.8, size: "8,000+", location: "San Francisco", openings: 42, seed: "co-1",
  desc: "Financial infrastructure for the internet. Trusted by millions of businesses worldwide.",
};

const companies = [
  { name: "Airbnb", logo: "https://logo.clearbit.com/airbnb.com", industry: "Travel", rating: 4.6, size: "6,000+", location: "San Francisco", openings: 28, seed: "co-2" },
  { name: "Spotify", logo: "https://logo.clearbit.com/spotify.com", industry: "Music", rating: 4.7, size: "9,000+", location: "Stockholm", openings: 35, seed: "co-3" },
  { name: "Figma", logo: "https://logo.clearbit.com/figma.com", industry: "Design Tools", rating: 4.9, size: "1,200+", location: "San Francisco", openings: 18, seed: "co-4" },
  { name: "Notion", logo: "https://logo.clearbit.com/notion.so", industry: "Productivity", rating: 4.7, size: "600+", location: "San Francisco", openings: 12, seed: "co-5" },
  { name: "Vercel", logo: "https://logo.clearbit.com/vercel.com", industry: "Developer Tools", rating: 4.8, size: "500+", location: "Remote", openings: 21, seed: "co-6" },
  { name: "Linear", logo: "https://logo.clearbit.com/linear.app", industry: "Software", rating: 4.9, size: "80+", location: "Remote", openings: 7, seed: "co-7" },
];

export default function Companies() {
  return (
    <ContentLayout title="Companies">
      <FadeIn>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Companies</h2>
          <p className="mt-1 text-muted-foreground">Discover great places to work</p>
        </div>

        {/* spotlight */}
        <div className={`relative overflow-hidden ${surface}`}>
          <div className="relative h-36">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://picsum.photos/seed/${spotlight.seed}/1200/260`} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          </div>
          <div className="px-6 pb-6">
            <div className="-mt-12 flex flex-wrap items-end gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-card bg-white shadow">
                <Image src={spotlight.logo} alt={spotlight.name} width={44} height={44} className="h-11 w-11 object-contain" />
              </div>
              <div className="min-w-0 flex-1 pb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-semibold tracking-tight">{spotlight.name}</h3>
                  <span className="flex items-center gap-1 text-sm text-amber-500"><Star className="h-4 w-4 fill-current" /> {spotlight.rating}</span>
                </div>
                <p className="text-sm text-muted-foreground">{spotlight.industry}</p>
              </div>
              <Button className="rounded-full">View company</Button>
            </div>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground">{spotlight.desc}</p>
            <div className="mt-4 flex flex-wrap gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {spotlight.size} employees</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {spotlight.location}</span>
              <span className="flex items-center gap-1.5 font-medium text-foreground"><Briefcase className="h-4 w-4" /> {spotlight.openings} open roles</span>
            </div>
          </div>
        </div>

        <SectionTitle title="Browse companies" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((c) => (
            <div key={c.name} className={`group overflow-hidden ${surface}`}>
              <div className="relative h-24">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://picsum.photos/seed/${c.seed}/600/200`} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="px-5 pb-5">
                <div className="-mt-8 flex h-16 w-16 items-center justify-center rounded-xl border-4 border-card bg-white">
                  <Image src={c.logo} alt={c.name} width={36} height={36} className="h-9 w-9 object-contain" />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-lg font-semibold">{c.name}</p>
                  <span className="flex items-center gap-1 text-sm text-amber-500"><Star className="h-4 w-4 fill-current" /> {c.rating}</span>
                </div>
                <span className="mt-1 inline-block rounded-full bg-muted px-2.5 py-0.5 text-1xs text-muted-foreground">{c.industry}</span>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {c.size}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {c.location}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{c.openings} open roles</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
