"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Star, Search, Filter, ShoppingCart } from "lucide-react";
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
import { ContentLayout } from "@/components/admin-panel/content-layout";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  category: string;
  rating: number;
  sales: string;
  imageUrl: string;
};

const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Home",
  "Beauty",
  "Sports",
];

const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: [
    "Wireless Earbuds",
    "Smart Watch",
    "Fitness Tracker",
    "Bluetooth Speaker",
    "Portable Charger",
    "Laptop Stand",
    "Phone Case",
    "Wireless Mouse",
    "Backpack",
    "Water Bottle",
  ][i % 10],
  description: `Create amazing ${
    [
      "audio experiences",
      "fitness routines",
      "workout plans",
      "sound environments",
      "power solutions",
      "workspaces",
      "phone protection",
      "computer setups",
      "travel gear",
      "hydration habits",
    ][i % 10]
  } in seconds.`,
  price: `$${(Math.random() * 100 + 9.99).toFixed(2)}`,
  originalPrice:
    Math.random() > 0.7
      ? `$${(Math.random() * 150 + 29.99).toFixed(2)}`
      : undefined,
  category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
  rating: Number((Math.random() * 1 + 4).toFixed(1)),
  sales: `${Math.floor(Math.random() * 10000)}`,
  imageUrl: `https://picsum.photos/seed/product${i + 1}/800/1000`,
}));

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Dialog
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <DialogTrigger>
        <Card className="relative w-full h-[400px] overflow-hidden group cursor-pointer rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
          <div className="absolute inset-x-3 bottom-3 p-5 bg-black/40 backdrop-blur-sm rounded-2xl">
            <div className="space-y-2">
              <Badge variant="default" className="mb-1">
                {product.category}
              </Badge>
              <h3 className="text-xl font-bold text-white line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-white line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-white">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-white">
                    ({product.sales} sold)
                  </span>
                </div>
                <div>
                  <span className="text-lg font-bold text-white">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="ml-2 text-sm line-through text-white">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
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
              src={product.imageUrl}
              alt={`${product.name} product image`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-6">
            <DialogTitle className="text-2xl text-zinc-950 dark:text-zinc-50">
              {product.name}
            </DialogTitle>
            <DialogSubtitle className="text-zinc-700 dark:text-zinc-400">
              {product.category}
            </DialogSubtitle>
            <DialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 100 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8, y: 100 },
              }}
            >
              <ScrollArea className="h-[100px] w-full rounded-md border p-4 mt-2">
                <p className="text-zinc-500 dark:text-zinc-500">
                  {product.description}
                </p>
              </ScrollArea>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-zinc-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {product.sales} sold
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <span className="text-2xl font-bold text-primary">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-zinc-500 line-through ml-2">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
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
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const productsPerPage = 8;
  const [totalPages, setTotalPages] = useState(
    Math.ceil(mockProducts.length / productsPerPage)
  );

  useEffect(() => {
    const filteredProducts = mockProducts
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (product) =>
          selectedCategory === "All" || product.category === selectedCategory
      );

    setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    setProducts(paginatedProducts);
  }, [currentPage, searchTerm, selectedCategory]);

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="E-commerce Store">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants1}
        className="min-h-screen"
      >
        <div className="container mx-auto p-4 space-y-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
            E-commerce Store
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full sm:w-auto">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-md focus:border-ring bg-muted border-none shadow-none w-full"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <Button
              variant="outline"
              className="w-full sm:w-auto rounded-md"
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
                <div className="bg-secondary p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Categories</h2>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={
                          selectedCategory === category ? "default" : "outline"
                        }
                        size="sm"
                        className="rounded-md"
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="flex justify-center mt-8">
            <Pagination>
              <PaginationContent className="flex-wrap justify-center">
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
        </div>
      </motion.div>
    </ContentLayout>
  );
}
