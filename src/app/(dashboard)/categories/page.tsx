"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  LayoutGridIcon,
  ListIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentLayout } from "@/components/admin-panel/content-layout";

const sampleData = {
  banner: {
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Welcome to Our Marketplace",
    subtitle: "Discover amazing deals on unique items",
  },
  categories: [
    "All",
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Toys",
    "Vehicles",
    "Other",
  ],
  ads: [
    {
      id: 1,
      title: "Vintage Camera Collection",
      price: 1200,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
      location: "Downtown",
      date: "2023-06-15",
      seller: "RetroCollector",
      description:
        "A set of beautifully preserved vintage cameras from various eras.",
    },
    {
      id: 2,
      title: "Designer Handbag",
      price: 850,
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Fashion District",
      date: "2023-06-14",
      seller: "LuxuryFinds",
      description:
        "Authentic designer handbag, gently used and in excellent condition.",
    },
    {
      id: 3,
      title: "Smart Home Starter Kit",
      price: 299,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjBob21lfGVufDB8fDB8fHww",
      location: "Tech Hub",
      date: "2023-06-13",
      seller: "SmartLiving",
      description:
        "Complete smart home starter kit with voice assistant, smart bulbs, and more.",
    },
    {
      id: 4,
      title: "Vintage Bicycle",
      price: 350,
      category: "Sports",
      image:
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Old Town",
      date: "2023-06-12",
      seller: "RetroRides",
      description:
        "Beautifully restored vintage bicycle, perfect for city cruising.",
    },
    {
      id: 5,
      title: "Colorful LEGO Set",
      price: 79,
      category: "Toys",
      image:
        "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      location: "Toy Store",
      date: "2023-06-11",
      seller: "BrickMaster",
      description: "Large LEGO set with vibrant colors, suitable for all ages.",
    },
    {
      id: 6,
      title: "Vintage Volkswagen Beetle",
      price: 8500,
      category: "Vehicles",
      image:
        "https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80",
      location: "Classic Car Lot",
      date: "2023-06-10",
      seller: "VintageWheels",
      description: "Fully restored 1960s Volkswagen Beetle in mint condition.",
    },
    {
      id: 7,
      title: "Artistic Pottery Set",
      price: 120,
      category: "Home & Garden",
      image:
        "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      location: "Artisan Market",
      date: "2023-06-09",
      seller: "CeramicArtist",
      description: "Handcrafted pottery set including bowls, plates, and cups.",
    },
    {
      id: 8,
      title: "Neon Light Installation",
      price: 450,
      category: "Other",
      image:
        "https://images.unsplash.com/photo-1519608425089-7f3bfa6f6bb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Art District",
      date: "2023-06-08",
      seller: "NeonArtist",
      description:
        "Custom-made neon light installation, perfect for home or business.",
    },
    {
      id: 9,
      title: "Antique Wooden Desk",
      price: 600,
      category: "Home & Garden",
      image:
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Antique Shop",
      date: "2023-06-07",
      seller: "VintageFinds",
      description: "Beautiful antique wooden desk with intricate carvings.",
    },
    {
      id: 10,
      title: "Professional DJ Equipment",
      price: 1500,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Music Store",
      date: "2023-06-06",
      seller: "AudioPro",
      description: "Complete set of professional DJ equipment, barely used.",
    },
    {
      id: 11,
      title: "Luxury Watch Collection",
      price: 5000,
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Jewelry District",
      date: "2023-06-05",
      seller: "LuxuryTimepieces",
      description: "Set of high-end luxury watches from renowned brands.",
    },
    {
      id: 12,
      title: "Vintage Vinyl Records",
      price: 200,
      category: "Other",
      image:
        "https://images.unsplash.com/photo-1603048588665-791ca8aea617?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Record Store",
      date: "2023-06-04",
      seller: "VinylEnthusiast",
      description:
        "Collection of rare and classic vinyl records in mint condition.",
    },
    {
      id: 13,
      title: "Mountain Bike",
      price: 800,
      category: "Sports",
      image:
        "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80",
      location: "Bike Shop",
      date: "2023-06-03",
      seller: "CyclingPro",
      description:
        "High-performance mountain bike, perfect for trails and rough terrain.",
    },
    {
      id: 14,
      title: "Handmade Quilt",
      price: 250,
      category: "Home & Garden",
      image:
        "https://images.unsplash.com/photo-1570362685387-3cf5499c3fdc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGFuZG1hZGUlMjBRdWlsdHxlbnwwfHwwfHx8MA%3D%3D",
      location: "Craft Fair",
      date: "2023-06-02",
      seller: "QuiltMaster",
      description:
        "Beautiful handmade quilt with intricate patterns and vibrant colors.",
    },
    {
      id: 15,
      title: "Drone with 4K Camera",
      price: 699,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Tech Store",
      date: "2023-06-01",
      seller: "DroneEnthusiast",
      description:
        "High-quality drone with 4K camera for stunning aerial photography.",
    },
    {
      id: 16,
      title: "Antique Pocket Watch",
      price: 300,
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Antique Market",
      date: "2023-05-31",
      seller: "VintageTimekeeper",
      description:
        "Beautifully preserved antique pocket watch from the early 1900s.",
    },
    {
      id: 17,
      title: "Electric Skateboard",
      price: 450,
      category: "Sports",
      image:
        "https://images.unsplash.com/photo-1626248801379-51a0748a5f96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Skate Shop",
      date: "2023-05-30",
      seller: "UrbanRider",
      description:
        "High-performance electric skateboard for easy urban commuting.",
    },
    {
      id: 18,
      title: "Vintage Typewriter",
      price: 150,
      category: "Other",
      image:
        "https://images.unsplash.com/photo-1558522195-e1201b090344?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Antique Store",
      date: "2023-05-29",
      seller: "RetroWriter",
      description:
        "Fully functional vintage typewriter, perfect for collectors or writers.",
    },
    {
      id: 19,
      title: "Gaming PC Setup",
      price: 2000,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2042&q=80",
      location: "Gaming Store",
      date: "2023-05-28",
      seller: "GamingGuru",
      description:
        "High-end gaming PC setup with top-of-the-line components and accessories.",
    },
    {
      id: 20,
      title: "Handcrafted Leather Boots",
      price: 280,
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2048&q=80",
      location: "Artisan Market",
      date: "2023-05-27",
      seller: "LeatherCrafter",
      description:
        "Handmade leather boots crafted with premium materials and expert craftsmanship.",
    },
  ],
};

interface Ad {
  id: number;
  title: string;
  price: number | null;
  category: string;
  image: string;
  location: string;
  date: string;
  seller: string;
  description: string;
}

const AdCard: React.FC<{ ad: Ad; isGridView: boolean }> = React.memo(
  ({ ad, isGridView }) => {
    return (
      <Card
        className={cn(
          "overflow-hidden group relative",
          isGridView
            ? "aspect-[4/5]"
            : "hover:shadow-md transition-shadow duration-300"
        )}
      >
        <div className={cn("relative", isGridView ? "h-full" : "flex")}>
          <div
            className={cn(
              isGridView ? "absolute inset-0" : "w-1/4 relative h-48"
            )}
          >
            <Image
              src={ad.image}
              alt={ad.title}
              layout="fill"
              objectFit="cover"
              className={
                isGridView
                  ? "transition-all duration-300 group-hover:scale-105"
                  : ""
              }
            />
            <Badge variant="black" className="absolute top-2 left-2 z-10">
              {ad.category}
            </Badge>
            {isGridView && (
              <div className="absolute top-2 right-2 z-10">
                <Badge
                  variant="secondary"
                  className="bg-background/70 text-sm backdrop-blur-sm"
                >
                  {ad.price !== null ? `$${ad.price}` : "Price on request"}
                </Badge>
              </div>
            )}
          </div>
          <CardContent
            className={cn(
              isGridView
                ? "absolute inset-0 flex flex-col justify-end p-4 text-white bg-black bg-opacity-30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                : "w-3/4 p-4 flex flex-col justify-between"
            )}
          >
            <div>
              <h3 className={cn("", isGridView ? "text-lg mb-1" : "text-lg")}>
                {ad.title}
              </h3>
              <p
                className={cn(
                  "text-sm mb-2 line-clamp-2",
                  !isGridView && "text-muted-foreground"
                )}
              >
                {ad.description}
              </p>
            </div>
            <div
              className={cn(
                "flex justify-between items-center",
                isGridView ? "mt-2" : ""
              )}
            >
              <div className="flex items-center gap-2 text-sm">
                <MapPinIcon className="w-4 h-4" />
                <span>{ad.location}</span>
              </div>
              {!isGridView && (
                <div className="text-lg text-primary">
                  {ad.price !== null ? `$${ad.price}` : "Price on request"}
                </div>
              )}
            </div>
            <div
              className={cn(
                "flex justify-between items-center mt-2 text-xs",
                !isGridView && "text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-1">
                <ClockIcon className="w-3 h-3" />
                <span>{new Date(ad.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <UserIcon className="w-3 h-3" />
                <span>{ad.seller}</span>
              </div>
            </div>
            {isGridView ? (
              <Button className="mt-4 w-full" variant="secondary">
                View Details
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="self-end mt-2">
                View Details
              </Button>
            )}
          </CardContent>
        </div>
      </Card>
    );
  }
);

const Banner: React.FC = () => {
  return (
    <div className="relative w-full h-[200px] mb-8 overflow-hidden rounded-lg">
      <Image
        src={sampleData.banner.image}
        alt="Colorful marketplace banner"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 mix-blend-multiply backdrop-blur-sm" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center px-4">
          {sampleData.banner.title}
        </h1>
        <p className="text-lg md:text-xl text-center px-4">
          {sampleData.banner.subtitle}
        </p>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isGridView, setIsGridView] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filteredAds, setFilteredAds] = useState(sampleData.ads);
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 10;

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
    setCurrentPage(1);
  }, [activeCategory, searchTerm, sortBy]);

  useEffect(() => {
    filterAds();
  }, [filterAds]);

  const CategoryButtons = useMemo(
    () => (
      <div className="flex flex-wrap gap-2 mb-4">
        {sampleData.categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "secondary"}
            onClick={() => setActiveCategory(category)}
            className="rounded-lg text-xs py-1.5 px-3 h-auto"
          >
            {category}
          </Button>
        ))}
      </div>
    ),
    [activeCategory]
  );

  const paginatedAds = useMemo(() => {
    const startIndex = (currentPage - 1) * adsPerPage;
    return filteredAds.slice(startIndex, startIndex + adsPerPage);
  }, [filteredAds, currentPage]);

  const totalPages = Math.ceil(filteredAds.length / adsPerPage);

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Account">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants1}
      >
        <div className="container mx-auto px-4 py-8">
          <Banner />

          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search ads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow border-none shadow-none bg-muted"
            />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date (Newest first)</SelectItem>
                <SelectItem value="price">Price (Highest first)</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={isGridView ? "outline2" : "outline"}
                size="icon"
                onClick={() => setIsGridView(true)}
              >
                <LayoutGridIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={!isGridView ? "default" : "outline"}
                size="icon"
                onClick={() => setIsGridView(false)}
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {CategoryButtons}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "grid gap-4",
              isGridView
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            )}
          >
            {paginatedAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} isGridView={isGridView} />
            ))}
          </motion.div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </ContentLayout>
  );
}
