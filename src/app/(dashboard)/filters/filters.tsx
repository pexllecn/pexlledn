"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutGridIcon,
  ListIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  FilterIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentLayout } from "@/components/admin-panel/content-layout";

import { sampleData, Ad } from "@/lib/sample-data";

const AdCard: React.FC<{ ad: Ad; isGridView: boolean }> = React.memo(
  ({ ad, isGridView }) => {
    return (
      <Card
        className={cn(
          "overflow-hidden group relative",
          isGridView
            ? "aspect-[3/4]"
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
            <Badge variant="black" className="absolute top-2 left-2">
              {ad.category}
            </Badge>
            {isGridView && (
              <div className="absolute top-2 right-2">
                <Badge
                  variant="outline"
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
              <h3 className={cn("", isGridView ? "text-base mb-1" : "text-lg")}>
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
              <Button className="mt-4 w-full" variant="outline" size="sm">
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

export default function Filters() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubcategory, setActiveSubcategory] = useState("All");
  const [isGridView, setIsGridView] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [condition, setCondition] = useState<string[]>([]);
  const [sellerType, setSellerType] = useState<string[]>([]);
  const [shipping, setShipping] = useState<string[]>([]);
  const [warranty, setWarranty] = useState<boolean | null>(null);
  const [minRating, setMinRating] = useState(0);
  const [negotiable, setNegotiable] = useState<boolean | null>(null);
  const [paymentOptions, setPaymentOptions] = useState<string[]>([]);
  const [returnPolicy, setReturnPolicy] = useState<string[]>([]);
  const [adType, setAdType] = useState<string[]>([]);
  const [verifiedSeller, setVerifiedSeller] = useState<boolean | null>(null);
  const [filteredAds, setFilteredAds] = useState<Ad[]>(sampleData.ads as Ad[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const adsPerPage = 12;

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const resetFilters = () => {
    setActiveCategory("All");
    setActiveSubcategory("All");
    setSearchTerm("");
    setSortBy("date");
    setPriceRange([0, 10000]);
    setCondition([]);
    setSellerType([]);
    setShipping([]);
    setWarranty(null);
    setMinRating(0);
    setNegotiable(null);
    setPaymentOptions([]);
    setReturnPolicy([]);
    setAdType([]);
    setVerifiedSeller(null);
  };

  const filterAds = useCallback(() => {
    const filtered = sampleData.ads.filter((ad) => {
      const categoryMatch =
        activeCategory === "All" || ad.category === activeCategory;
      const subcategoryMatch =
        activeSubcategory === "All" || ad.subcategory === activeSubcategory;
      const searchMatch =
        ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const priceMatch =
        ad.price !== null &&
        ad.price >= priceRange[0] &&
        ad.price <= priceRange[1];
      const conditionMatch =
        condition.length === 0 || condition.includes(ad.condition as string);
      const sellerTypeMatch =
        sellerType.length === 0 || sellerType.includes(ad.sellerType);
      const shippingMatch =
        shipping.length === 0 || shipping.includes(ad.shipping);
      const warrantyMatch = warranty === null || ad.warranty === warranty;
      const ratingMatch = ad.rating >= minRating;
      const negotiableMatch =
        negotiable === null || ad.negotiable === negotiable;
      const paymentOptionsMatch =
        paymentOptions.length === 0 ||
        paymentOptions.some((option) => ad.paymentOptions.includes(option));
      const returnPolicyMatch =
        returnPolicy.length === 0 || returnPolicy.includes(ad.returnPolicy);
      const adTypeMatch = adType.length === 0 || adType.includes(ad.adType);
      const verifiedSellerMatch =
        verifiedSeller === null || ad.verifiedSeller === verifiedSeller;

      return (
        categoryMatch &&
        subcategoryMatch &&
        searchMatch &&
        priceMatch &&
        conditionMatch &&
        sellerTypeMatch &&
        shippingMatch &&
        warrantyMatch &&
        ratingMatch &&
        negotiableMatch &&
        paymentOptionsMatch &&
        returnPolicyMatch &&
        adTypeMatch &&
        verifiedSellerMatch
      );
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "price":
          return (b.price || 0) - (a.price || 0);
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredAds(filtered as Ad[]);
    setCurrentPage(1);
  }, [
    activeCategory,
    activeSubcategory,
    searchTerm,
    sortBy,
    priceRange,
    condition,
    sellerType,
    shipping,
    warranty,
    minRating,
    negotiable,
    paymentOptions,
    returnPolicy,
    adType,
    verifiedSeller,
  ]);

  useEffect(() => {
    filterAds();
  }, [filterAds]);

  const paginatedAds = useMemo(() => {
    const startIndex = (currentPage - 1) * adsPerPage;
    return filteredAds.slice(startIndex, startIndex + adsPerPage);
  }, [filteredAds, currentPage]);

  const totalPages = Math.ceil(filteredAds.length / adsPerPage);

  interface FilterBoxProps {
    title: string;
    options: string[];
    selectedOptions: string[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  }

  const FilterBox: React.FC<FilterBoxProps> = ({
    title,
    options,
    selectedOptions,
    setSelectedOptions,
  }) => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option: string) => (
          <Button
            key={option}
            variant={selectedOptions.includes(option) ? "outline2" : "outline"}
            size="sm"
            onClick={() => {
              if (selectedOptions.includes(option)) {
                setSelectedOptions(
                  selectedOptions.filter((item) => item !== option)
                );
              } else {
                setSelectedOptions([...selectedOptions, option]);
              }
            }}
            className="px-3 py-1 text-xs"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Category</h3>
        <Select value={activeCategory} onValueChange={setActiveCategory}>
          <SelectTrigger className="w-full bg-background shadow-none border-none">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {sampleData.categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Subcategory</h3>
        <Select value={activeSubcategory} onValueChange={setActiveSubcategory}>
          <SelectTrigger className="w-full bg-background shadow-none border-none">
            <SelectValue placeholder="Select subcategory" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {activeCategory !== "All" &&
              (
                sampleData.subcategories[
                  activeCategory as keyof typeof sampleData.subcategories
                ] || []
              ).map((subcategory: string) => (
                <SelectItem key={subcategory} value={subcategory}>
                  {subcategory}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Price Range</h3>
        <Slider
          min={0}
          max={10000}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex justify-between text-xs">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <FilterBox
        title="Condition"
        options={sampleData.conditions}
        selectedOptions={condition}
        setSelectedOptions={setCondition}
      />
      <FilterBox
        title="Seller Type"
        options={sampleData.sellerTypes}
        selectedOptions={sellerType}
        setSelectedOptions={setSellerType}
      />
      <FilterBox
        title="Shipping"
        options={sampleData.shippingOptions}
        selectedOptions={shipping}
        setSelectedOptions={setShipping}
      />
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Warranty</h3>
        <div className="flex gap-2">
          <Button
            variant={warranty === null ? "outline2" : "outline"}
            size="sm"
            onClick={() => setWarranty(null)}
          >
            All
          </Button>
          <Button
            variant={warranty === true ? "outline2" : "outline"}
            size="sm"
            onClick={() => setWarranty(true)}
          >
            Yes
          </Button>
          <Button
            variant={warranty === false ? "outline2" : "outline"}
            size="sm"
            onClick={() => setWarranty(false)}
          >
            No
          </Button>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Negotiable</h3>
        <div className="flex gap-2">
          <Button
            variant={negotiable === null ? "outline2" : "outline"}
            size="sm"
            onClick={() => setNegotiable(null)}
          >
            All
          </Button>
          <Button
            variant={negotiable === true ? "outline2" : "outline"}
            size="sm"
            onClick={() => setNegotiable(true)}
          >
            Yes
          </Button>
          <Button
            variant={negotiable === false ? "outline2" : "outline"}
            size="sm"
            onClick={() => setNegotiable(false)}
          >
            No
          </Button>
        </div>
      </div>
      <FilterBox
        title="Payment Options"
        options={sampleData.paymentOptions}
        selectedOptions={paymentOptions}
        setSelectedOptions={setPaymentOptions}
      />
      <FilterBox
        title="Return Policy"
        options={sampleData.returnPolicies}
        selectedOptions={returnPolicy}
        setSelectedOptions={setReturnPolicy}
      />
      <FilterBox
        title="Ad Type"
        options={sampleData.adTypes}
        selectedOptions={adType}
        setSelectedOptions={setAdType}
      />
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Verified Seller</h3>
        <div className="flex gap-2">
          <Button
            variant={verifiedSeller === null ? "outline2" : "outline"}
            size="sm"
            onClick={() => setVerifiedSeller(null)}
          >
            All
          </Button>
          <Button
            variant={verifiedSeller === true ? "outline2" : "outline"}
            size="sm"
            onClick={() => setVerifiedSeller(true)}
          >
            Yes
          </Button>
          <Button
            variant={verifiedSeller === false ? "outline2" : "outline"}
            size="sm"
            onClick={() => setVerifiedSeller(false)}
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <ContentLayout title="Search Marketplace">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants1}
      >
        <div className="mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-1/5 space-y-6">
              <Card className="rounded-lg border-none bg-muted">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <Button variant="outline" size="sm" onClick={resetFilters}>
                      Clear Filters
                    </Button>
                  </div>
                  <FilterContent />
                </CardContent>
              </Card>
            </div>

            {/* Mobile Filter Button and Sheet */}
            <div className="lg:hidden w-full mb-4">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <FilterIcon className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Apply filters to refine your search
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-4 space-y-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetFilters}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-4/5">
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Search ads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow bg-muted shadow-none border-none"
                />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-muted shadow-none border-none">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date (Newest first)</SelectItem>
                    <SelectItem value="price">Price (Highest first)</SelectItem>
                    <SelectItem value="rating">
                      Rating (Highest first)
                    </SelectItem>
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
                    variant={!isGridView ? "outline2" : "outline"}
                    size="icon"
                    onClick={() => setIsGridView(false)}
                  >
                    <ListIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <AnimatePresence>
                {paginatedAds.length > 0 ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
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
                ) : (
                  <motion.div
                    key="no-results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8"
                  >
                    <p className="text-lg text-gray-500">
                      No ads found matching your criteria.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
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
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
