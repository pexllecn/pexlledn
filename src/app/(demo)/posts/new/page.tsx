"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Star } from "lucide-react";
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
  category: categories[Math.floor(Math.random() * categories.length)],
  rating: Number((Math.random() * 4 + 1).toFixed(1)),
  downloads: `${Math.floor(Math.random() * 1000)}k`,
  imageUrl: `https://picsum.photos/seed/app${i + 1}/300/200`,
}));

const AppCard = ({ app }: { app: App }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <DialogTrigger>
        <Card
          ref={cardRef}
          className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
        >
          <CardHeader className="p-0">
            <Image
              src={app.imageUrl}
              alt={app.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-lg mb-2 line-clamp-1">
              {app.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {app.description}
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{app.category}</Badge>
              <span className="text-sm font-semibold">{app.price}</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(app.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {app.downloads} downloads
            </span>
          </CardFooter>
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
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={app.imageUrl}
                    alt={`${app.name} app screenshot`}
                    layout="fill"
                    objectFit="cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
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
              <ScrollArea className="h-[200px] w-full rounded-md border p-4 mt-2">
                <p className="text-zinc-500 dark:text-zinc-500">
                  {app.description}
                </p>
              </ScrollArea>
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
                <Button>{app.price === "Free" ? "Get" : "Buy"}</Button>
              </div>
            </DialogDescription>
          </div>
          <DialogClose className="absolute right-4 top-4 z-10 text-zinc-50 bg-zinc-900/50 rounded-full p-1" />
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

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-4xl font-bold text-center mb-8">App Store</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search apps..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
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
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={currentPage === 1 ? "disabled" : ""}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => setCurrentPage(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={currentPage === totalPages ? "disabled" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
