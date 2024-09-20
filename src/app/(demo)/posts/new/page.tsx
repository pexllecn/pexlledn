"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Star, Search, Filter } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogSubtitle,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from "@/components/core/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentLayout } from "@/components/admin-panel/content-layout";

type App = {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  rating: number;
  downloads: string;
  imageUrl: string;
};

const categories = [
  "All",
  "Games",
  "Productivity",
  "Education",
  "Lifestyle",
  "Entertainment",
];

const mockApps: App[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `App ${i + 1}`,
  description: `This is a description for App ${
    i + 1
  }. It's a great app with many features that users will love. Perfect for daily use and enhancing productivity.`,
  price: Math.random() > 0.7 ? `$${(Math.random() * 10).toFixed(2)}` : "Free",
  category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
  rating: Number((Math.random() * 4 + 1).toFixed(1)),
  downloads: `${Math.floor(Math.random() * 1000)}k`,
  imageUrl: `https://picsum.photos/seed/app${i + 1}/300/200`,
}));

const AppCard = ({ app }: { app: App }) => {
  return (
    <Dialog
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <DialogTrigger>
        <Card className="relative w-full h-64 overflow-hidden group cursor-pointer">
          <Image
            src={app.imageUrl}
            alt={app.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-lg font-semibold mb-1 line-clamp-1">
              {app.name}
            </h3>
            <p className="text-sm mb-2 line-clamp-2 text-gray-200">
              {app.description}
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="default">{app.category}</Badge>
              <span className="text-sm font-semibold">{app.price}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(app.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-300">
                {app.downloads} downloads
              </span>
            </div>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContainer>
        <DialogContent
          style={{
            borderRadius: "24px",
          }}
          className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]"
        >
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={app.imageUrl}
              alt={`${app.name} app screenshot`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-6">
            <DialogTitle className="text-2xl text-zinc-950 dark:text-zinc-50">
              {app.name}
            </DialogTitle>
            <DialogSubtitle className="text-zinc-700 dark:text-zinc-400">
              {app.category}
            </DialogSubtitle>
            <DialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 100 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8, y: 100 },
              }}
            >
              <Tabs defaultValue="description" className="w-full mt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="description">
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4 mt-2">
                    <p className="text-zinc-500 dark:text-zinc-500">
                      {app.description}
                    </p>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="reviews">
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4 mt-2">
                    <p className="text-zinc-500 dark:text-zinc-500">
                      User reviews will be displayed here.
                    </p>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(app.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-zinc-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {app.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {app.downloads} downloads
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {app.price}
                </span>
                <Button className="bg-primary hover:bg-primary/90">
                  {app.price === "Free" ? "Get" : "Buy"}
                </Button>
              </div>
            </DialogDescription>
          </div>
          <DialogClose className="absolute right-4 top-4 z-10 text-zinc-50 bg-zinc-900/50 rounded-full p-1 hover:bg-zinc-900/70 transition-colors" />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
};

export default function AppStore() {
  const [currentPage, setCurrentPage] = useState(1);
  const [apps, setApps] = useState<App[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const appsPerPage = 10;
  const totalPages = Math.ceil(mockApps.length / appsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * appsPerPage;
    const endIndex = startIndex + appsPerPage;
    const filteredApps = mockApps
      .filter((app) =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (app) => selectedCategory === "All" || app.category === selectedCategory
      );
    const paginatedApps = filteredApps.slice(startIndex, endIndex);
    setApps(paginatedApps);
  }, [currentPage, searchTerm, selectedCategory]);

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Posts">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants1}
      >
        <div className="container mx-auto p-4 space-y-6">
          <h1 className="text-4xl font-bold text-center mb-8">App Store</h1>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <Input
                placeholder="Search apps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <Button
              variant="outline"
              className="sm:w-auto"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="mr-2" size={20} />
              Filter
            </Button>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-secondary p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold mb-2">Categories</h2>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={
                          selectedCategory === category ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {apps.map((app) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <AppCard app={app} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
