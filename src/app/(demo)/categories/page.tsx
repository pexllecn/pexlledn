"use client";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ContentLayout } from "@/components/admin-panel/content-layout";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  LayoutGridIcon,
  ListIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  DollarSignIcon,
  TagIcon,
  SearchIcon
} from "lucide-react";

const categories = [
  "All",
  "For Sale",
  "Housing",
  "Jobs",
  "Services",
  "Community",
  "Events"
];

const ads = [
  {
    id: 1,
    title: "Vintage Record Player",
    price: 150,
    category: "For Sale",
    image:
      "https://plus.unsplash.com/premium_photo-1682125853703-896a05629709?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Downtown",
    date: "2023-06-15",
    seller: "VinylEnthusiast",
    description:
      "Beautiful vintage record player from the 60s. Perfect working condition."
  },
  {
    id: 2,
    title: "Cozy Studio Apartment",
    price: 1200,
    category: "Housing",
    image:
      "https://plus.unsplash.com/premium_photo-1664304552814-51e8a869e556?q=80&w=3473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Westside",
    date: "2023-06-14",
    seller: "CityLiving",
    description:
      "Modern studio apartment with great amenities. Available for immediate move-in."
  },
  {
    id: 3,
    title: "Web Developer Needed",
    price: null,
    category: "Jobs",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Remote",
    date: "2023-06-13",
    seller: "TechStartup",
    description:
      "Looking for an experienced web developer. Full-time position with competitive salary."
  },
  {
    id: 4,
    title: "Professional Photography",
    price: 200,
    category: "Services",
    image:
      "https://images.unsplash.com/photo-1711289469553-d14537c6b636?q=80&w=3448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Citywide",
    date: "2023-06-12",
    seller: "SnapMaster",
    description:
      "Offering professional photography services for events, portraits, and more."
  },
  {
    id: 5,
    title: "Community Gardening Event",
    price: null,
    category: "Community",
    image:
      "https://plus.unsplash.com/premium_photo-1663100129347-d7bd2de42c32?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Central Park",
    date: "2023-06-20",
    seller: "GreenThumb",
    description: "Join us for a community gardening event. All ages welcome!"
  },
  {
    id: 6,
    title: "Vintage Guitar",
    price: 500,
    category: "For Sale",
    image:
      "https://images.unsplash.com/photo-1565829577241-474d81bf757c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Eastside",
    date: "2023-06-11",
    seller: "MusicLover",
    description:
      "1970s Fender Stratocaster in excellent condition. A true collector's item."
  }
];
export default function Component() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isGridView, setIsGridView] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filteredAds, setFilteredAds] = useState(ads);
  const [featuredAd, setFeaturedAd] = useState(ads[0]);
  const scrollPositionRef = useRef(0);

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 }
  };

  useEffect(() => {
    const filtered = ads
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
    const interval = setInterval(() => {
      setFeaturedAd(ads[Math.floor(Math.random() * ads.length)]);
    }, 10000); // Change featured ad every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Save scroll position when component unmounts or active category changes
  useEffect(() => {
    return () => {
      scrollPositionRef.current = window.pageYOffset;
    };
  }, [activeCategory]);

  // Restore scroll position when component mounts or filtered ads update
  useLayoutEffect(() => {
    window.scrollTo(0, scrollPositionRef.current);
  }, [filteredAds]);

  return (
    <ContentLayout title="Categories">
      <div className="container mx-auto px-4 py-8">
        {featuredAd && (
          <Card className="mb-12 overflow-hidden shadow-lg rounded-lg">
            <div className="relative h-60 sm:h-80">
              <img
                src={featuredAd.image}
                alt={featuredAd.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <Badge className="mb-2">{featuredAd.category}</Badge>
                <h2 className="text-xl sm:text-3xl font-bold mb-2">
                  Featured: {featuredAd.title}
                </h2>
                <p className="mb-4 text-sm sm:text-lg line-clamp-2 sm:line-clamp-none">
                  {featuredAd.description}
                </p>
                <div className="flex items-center gap-4 text-xs sm:text-sm">
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
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="relative w-full sm:w-auto">
            <Input
              placeholder="Search ads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-80 border-none bg-muted shadow-none focus:ring-2 focus:ring-primary"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px] border-none bg-muted shadow-none">
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
                    <LayoutGridIcon className="h-5 w-5" />
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
                    <ListIcon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>List view</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="overflow-x-auto mb-4">
          <div className="flex space-x-1 bg-background p-2 rounded-lg min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 outline-none rounded-full ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`grid gap-4 sm:gap-8 ${
            isGridView
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {filteredAds.map((ad) => (
            <Card
              key={ad.id}
              className={`overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:border-ring rounded-lg flex flex-col ${
                isGridView ? "h-[400px]" : "h-[200px] flex-row"
              }`}
            >
              <div
                className={`relative ${isGridView ? "h-48" : "w-1/3 h-full"}`}
              >
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 left-2">{ad.category}</Badge>
                {ad.price && (
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    ${ad.price}
                  </Badge>
                )}
              </div>
              <div className="flex flex-col flex-grow">
                <CardContent className="p-4 flex-grow">
                  <h2 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
                    {ad.title}
                  </h2>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {ad.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-auto">
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-3 h-3" />
                      <span>{ad.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />
                      <span>{new Date(ad.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UserIcon className="w-3 h-3" />
                      <span>{ad.seller}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 bg-muted/50 mt-auto">
                  <Button className="w-full" variant="secondary">
                    View Details
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ContentLayout>
  );
}
