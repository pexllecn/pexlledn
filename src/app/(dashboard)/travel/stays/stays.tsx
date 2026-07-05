"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bath,
  BedDouble,
  Coffee,
  MapPin,
  Search,
  Star,
  Waves,
  Wifi,
} from "lucide-react";

type Stay = {
  name: string;
  area: string;
  type: "Hotel" | "Ryokan" | "Apartment";
  price: number;
  rating: number;
  reviews: number;
  cover: string;
  amenities: { icon: any; label: string }[];
};

const stays: Stay[] = [
  { name: "Gion Riverside Ryokan", area: "Higashiyama", type: "Ryokan", price: 240, rating: 4.9, reviews: 428, cover: "from-rose-400 to-orange-300", amenities: [{ icon: Bath, label: "Onsen" }, { icon: Coffee, label: "Breakfast" }, { icon: Wifi, label: "Wi-Fi" }] },
  { name: "Kyoto Central Hotel", area: "Downtown", type: "Hotel", price: 180, rating: 4.6, reviews: 1204, cover: "from-sky-400 to-cyan-300", amenities: [{ icon: Waves, label: "Pool" }, { icon: Coffee, label: "Café" }, { icon: Wifi, label: "Wi-Fi" }] },
  { name: "Arashiyama Garden Suite", area: "Arashiyama", type: "Apartment", price: 155, rating: 4.8, reviews: 312, cover: "from-emerald-400 to-teal-300", amenities: [{ icon: BedDouble, label: "2 beds" }, { icon: Coffee, label: "Kitchen" }, { icon: Wifi, label: "Wi-Fi" }] },
  { name: "Pontocho Machiya", area: "Nakagyo", type: "Apartment", price: 210, rating: 4.9, reviews: 189, cover: "from-indigo-400 to-violet-300", amenities: [{ icon: Bath, label: "Soaking tub" }, { icon: BedDouble, label: "3 beds" }, { icon: Wifi, label: "Wi-Fi" }] },
  { name: "Nanzenji Boutique", area: "Sakyo", type: "Hotel", price: 265, rating: 4.7, reviews: 640, cover: "from-amber-400 to-yellow-300", amenities: [{ icon: Coffee, label: "Bar" }, { icon: Waves, label: "Spa" }, { icon: Wifi, label: "Wi-Fi" }] },
  { name: "Kamogawa Loft", area: "Riverside", type: "Apartment", price: 140, rating: 4.5, reviews: 96, cover: "from-fuchsia-400 to-pink-300", amenities: [{ icon: BedDouble, label: "1 bed" }, { icon: Coffee, label: "Kitchen" }, { icon: Wifi, label: "Wi-Fi" }] },
];

export default function StaysPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const filtered = stays.filter((s) => {
    const q = s.name.toLowerCase().includes(query.toLowerCase());
    const t = type === "all" || s.type === type;
    return q && t;
  });

  return (
    <ContentLayout title="Stays">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div>
            <h2 className="text-3xl font-normal">Stays in Kyoto</h2>
            <p className="text-muted-foreground mt-1">
              {stays.length} places · Aug 12 – 20 · 2 guests
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search stays..."
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Tabs value={type} onValueChange={setType}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="Hotel">Hotels</TabsTrigger>
                <TabsTrigger value="Ryokan">Ryokan</TabsTrigger>
                <TabsTrigger value="Apartment">Apartments</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <Card key={s.name} className="bg-muted border-none overflow-hidden flex flex-col">
                <div className={`relative h-36 bg-gradient-to-br ${s.cover} p-3 flex items-start justify-between`}>
                  <Badge className="bg-background/80 text-foreground border-none">
                    {s.type}
                  </Badge>
                  <Badge className="bg-background/80 text-foreground border-none gap-1">
                    <Star className="h-3 w-3 fill-current text-[#f5a623]" />
                    {s.rating}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{s.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {s.area} · {s.reviews} reviews
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2 pb-3">
                  {s.amenities.map((a) => (
                    <span
                      key={a.label}
                      className="flex items-center gap-1 rounded-full bg-background/60 px-2 py-1 text-1xs text-muted-foreground"
                    >
                      <a.icon className="h-3 w-3" />
                      {a.label}
                    </span>
                  ))}
                </CardContent>
                <CardFooter className="mt-auto justify-between">
                  <p className="text-sm">
                    <span className="text-lg tabular-nums">${s.price}</span>
                    <span className="text-muted-foreground"> / night</span>
                  </p>
                  <Button size="sm">Reserve</Button>
                </CardFooter>
              </Card>
            ))}
            {filtered.length === 0 && (
              <Card className="bg-muted border-none md:col-span-2 lg:col-span-3">
                <CardContent className="py-12 text-center text-muted-foreground">
                  No stays match your search.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
