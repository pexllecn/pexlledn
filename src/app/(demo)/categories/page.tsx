"use client";
import AdCard from "./adcard";
import { motion } from "framer-motion";
import sampleData from "./sampleData.json";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  LayoutGridIcon,
  ListIcon,
  MapPinIcon,
  DollarSignIcon,
  SearchIcon,
} from "lucide-react";
import MobileBackButton from "@/components/MobileBackButton";

export default function Component() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isGridView, setIsGridView] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filteredAds, setFilteredAds] = useState(sampleData.ads);
  const [featuredAd, setFeaturedAd] = useState(sampleData.ads[0]);

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const filterAds = useCallback(() => {
    const filtered = sampleData.ads
      .filter(
        (ad) => activeCategory === "All" || ad.category === activeCategory
      )
      .filter(
        (ad) =>
          ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ad.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "date")
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (sortBy === "price") return (b.price || 0) - (a.price || 0);
        return 0;
      });
    setFilteredAds(filtered);
  }, [activeCategory, searchTerm, sortBy]);

  useEffect(() => {
    filterAds();
  }, [filterAds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedAd(
        sampleData.ads[Math.floor(Math.random() * sampleData.ads.length)]
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const FeaturedAdCard = useMemo(
    () => (
      <Card className="mb-4 sm:mb-6 overflow-hidden shadow-lg rounded-lg">
        <div className="relative h-48 sm:h-60">
          <Image
            src={featuredAd.image}
            alt={featuredAd.title}
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
            <Badge className="mb-1 sm:mb-2">{featuredAd.category}</Badge>
            <h2 className="text-lg sm:text-xl font-normal mb-1 sm:mb-2">
              Featured: {featuredAd.title}
            </h2>
            <p className="mb-2 text-xs sm:text-sm line-clamp-2">
              {featuredAd.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <div className="flex items-center gap-1">
                <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{featuredAd.location}</span>
              </div>
              {featuredAd.price && (
                <div className="flex items-center gap-1">
                  <DollarSignIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>${featuredAd.price}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    ),
    [featuredAd]
  );

  const CategoryButtons = useMemo(
    () => (
      <div className="w-full sm:w-auto flex flex-wrap gap-2 bg-background rounded-lg overflow-x-auto p-2">
        {sampleData.categories.map((category) => (
          <button
            key={category}
            className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-normal rounded-full ${
              activeCategory === category
                ? "bg-foreground text-background"
                : "bg-muted text-foreground hover:bg-muted-foreground hover:text-background"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    ),
    [activeCategory]
  );

  return (
    <ContentLayout title="Categories">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants}
        className="w-full max-w-7xl mx-auto"
      >
        <div className="container mx-auto px-4 pt-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <MobileBackButton className="mr-2" />
              <h1 className="text-3xl font-normal text-gray-900 dark:text-white">
                Categories
              </h1>
            </div>
          </div>
          <div className="lg:container mx-auto px-1 py-4 sm:py-6">
            {FeaturedAdCard}

            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between mb-4 sm:mb-6 gap-4">
              {CategoryButtons}
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px] sm:w-[180px] border-none bg-muted shadow-none text-xs sm:text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date (Newest first)</SelectItem>
                    <SelectItem value="price">Price (Highest first)</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant={isGridView ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setIsGridView(true)}
                  className="border-gray-300 dark:border-gray-700"
                >
                  <LayoutGridIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  variant={!isGridView ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setIsGridView(false)}
                  className="border-gray-300 dark:border-gray-700"
                >
                  <ListIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>

            <div
              className={`grid gap-4 sm:gap-6 ${
                isGridView
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} isGridView={isGridView} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
