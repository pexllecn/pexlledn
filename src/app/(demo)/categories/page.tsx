"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import {
  LayoutGridIcon,
  ListIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  DollarSignIcon,
  SearchIcon
} from "lucide-react";
import AdCard from "./adcard";
import sampleData from "@/data/sampleData.json";

const variants1 = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 }
};

export default function Component() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isGridView, setIsGridView] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filteredAds, setFilteredAds] = useState(sampleData.ads);
  const [featuredAd, setFeaturedAd] = useState(sampleData.ads[0]);

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
      <Card className="mb-6 sm:mb-12 overflow-hidden shadow-lg rounded-lg">
        <div className="relative h-48 sm:h-60 md:h-80">
          <img
            src={featuredAd.image}
            alt={featuredAd.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 text-white">
            <Badge className="mb-1 sm:mb-2">{featuredAd.category}</Badge>
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold mb-1 sm:mb-2">
              Featured: {featuredAd.title}
            </h2>
            <p className="mb-2 sm:mb-4 text-xs sm:text-sm md:text-base line-clamp-2">
              {featuredAd.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
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
      <div className="w-full sm:w-auto flex space-x-1 bg-background rounded-lg overflow-x-auto px-2 py-1">
        {sampleData.categories.map((category) => (
          <button
            key={category}
            className={`relative px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium outline-none whitespace-nowrap ${
              activeCategory === category
                ? "text-secondary"
                : "text-gray-500 hover:text-foreground"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {activeCategory === category && (
              <motion.div
                className="absolute inset-0 bg-foreground rounded-full z-0"
                layoutId="activeBackground"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30
                }}
              />
            )}
            <span className="relative z-10">{category}</span>
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
        variants={variants1}
      >
        <div className="container mx-auto px-4 py-4 sm:py-8">
          {FeaturedAdCard}

          <div className="mb-6 sm:mb-12">
            <div className="relative max-w-3xl mx-auto">
              <Input
                placeholder="Search for anything..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-none bg-muted shadow-md focus:ring-2 focus:ring-primary rounded-md"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between mb-6 sm:mb-8 gap-4">
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isGridView ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setIsGridView(true)}
                      className="border-gray-300 dark:border-gray-700"
                    >
                      <LayoutGridIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Grid view</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={!isGridView ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setIsGridView(false)}
                      className="border-gray-300 dark:border-gray-700"
                    >
                      <ListIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>List view</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div
            className={`grid gap-4 sm:gap-6 md:gap-8 ${
              isGridView
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            <AnimatePresence>
              {filteredAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} isGridView={isGridView} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
