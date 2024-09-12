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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
            <Badge className="absolute top-2 left-2 z-10">{ad.category}</Badge>
            <div className="absolute top-2 right-2 z-10">
              <Badge
                variant="secondary"
                className="bg-background/70 text-sm backdrop-blur-sm"
              >
                {ad.price !== null ? `$${ad.price}` : "Price on request"}
              </Badge>
            </div>
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

export default function Component() {
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
  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const adsPerPage = 12;

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
    setOpenAccordionItems([]);
  };

  const updateOpenAccordionItems = useCallback(() => {
    const openItems: string[] = [];
    if (activeCategory !== "All") openItems.push("category");
    if (activeSubcategory !== "All") openItems.push("subcategory");
    if (priceRange[0] !== 0 || priceRange[1] !== 10000) openItems.push("price");
    if (condition.length > 0) openItems.push("condition");
    if (sellerType.length > 0) openItems.push("seller-type");
    if (shipping.length > 0) openItems.push("shipping");
    if (warranty !== null) openItems.push("warranty");
    if (minRating > 0) openItems.push("rating");
    if (negotiable !== null) openItems.push("negotiable");
    if (paymentOptions.length > 0) openItems.push("payment-options");
    if (returnPolicy.length > 0) openItems.push("return-policy");
    if (adType.length > 0) openItems.push("ad-type");
    if (verifiedSeller !== null) openItems.push("verified-seller");
    setOpenAccordionItems(openItems);
  }, [
    activeCategory,
    activeSubcategory,
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
    updateOpenAccordionItems();
  }, [updateOpenAccordionItems]);

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

  const FilterContent = () => (
    <Accordion
      type="multiple"
      value={openAccordionItems}
      onValueChange={setOpenAccordionItems}
    >
      <AccordionItem value="category">
        <AccordionTrigger>Category</AccordionTrigger>
        <AccordionContent>
          <Select value={activeCategory} onValueChange={setActiveCategory}>
            <SelectTrigger>
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
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="subcategory">
        <AccordionTrigger>Subcategory</AccordionTrigger>
        <AccordionContent>
          <Select
            value={activeSubcategory}
            onValueChange={setActiveSubcategory}
          >
            <SelectTrigger>
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
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="price">
        <AccordionTrigger>Price Range</AccordionTrigger>
        <AccordionContent>
          <Slider
            min={0}
            max={10000}
            step={100}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-2"
          />
          <div className="flex justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="condition">
        <AccordionTrigger>Condition</AccordionTrigger>
        <AccordionContent>
          {sampleData.conditions.map((cond) => (
            <div key={cond} className="flex items-center space-x-2">
              <Checkbox
                id={`condition-${cond}`}
                checked={condition.includes(cond)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setCondition([...condition, cond]);
                  } else {
                    setCondition(condition.filter((c) => c !== cond));
                  }
                }}
              />
              <Label htmlFor={`condition-${cond}`}>{cond}</Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="seller-type">
        <AccordionTrigger>Seller Type</AccordionTrigger>
        <AccordionContent>
          {sampleData.sellerTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`seller-type-${type}`}
                checked={sellerType.includes(type)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSellerType([...sellerType, type]);
                  } else {
                    setSellerType(sellerType.filter((t) => t !== type));
                  }
                }}
              />
              <Label htmlFor={`seller-type-${type}`}>{type}</Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping</AccordionTrigger>
        <AccordionContent>
          {sampleData.shippingOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`shipping-${option}`}
                checked={shipping.includes(option)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setShipping([...shipping, option]);
                  } else {
                    setShipping(shipping.filter((s) => s !== option));
                  }
                }}
              />
              <Label htmlFor={`shipping-${option}`}>{option}</Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="warranty">
        <AccordionTrigger>Warranty</AccordionTrigger>
        <AccordionContent>
          <RadioGroup
            value={warranty === null ? "all" : warranty.toString()}
            onValueChange={(value) =>
              setWarranty(value === "all" ? null : value === "true")
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="warranty-all" />
              <Label htmlFor="warranty-all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="warranty-yes" />
              <Label htmlFor="warranty-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="warranty-no" />
              <Label htmlFor="warranty-no">No</Label>
            </div>
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="rating">
        <AccordionTrigger>Minimum Rating</AccordionTrigger>
        <AccordionContent>
          <div className="flex items-center space-x-2">
            {[0, 1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant={minRating >= star ? "default" : "outline"}
                size="sm"
                onClick={() => setMinRating(star)}
              >
                <StarIcon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="negotiable">
        <AccordionTrigger>Negotiable</AccordionTrigger>
        <AccordionContent>
          <RadioGroup
            value={negotiable === null ? "all" : negotiable.toString()}
            onValueChange={(value) =>
              setNegotiable(value === "all" ? null : value === "true")
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="negotiable-all" />
              <Label htmlFor="negotiable-all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="negotiable-yes" />
              <Label htmlFor="negotiable-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="negotiable-no" />
              <Label htmlFor="negotiable-no">No</Label>
            </div>
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="payment-options">
        <AccordionTrigger>Payment Options</AccordionTrigger>
        <AccordionContent>
          {sampleData.paymentOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`payment-${option}`}
                checked={paymentOptions.includes(option)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setPaymentOptions([...paymentOptions, option]);
                  } else {
                    setPaymentOptions(
                      paymentOptions.filter((o) => o !== option)
                    );
                  }
                }}
              />
              <Label htmlFor={`payment-${option}`}>{option}</Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="return-policy">
        <AccordionTrigger>Return Policy</AccordionTrigger>
        <AccordionContent>
          {sampleData.returnPolicies.map((policy) => (
            <div key={policy} className="flex items-center space-x-2">
              <Checkbox
                id={`return-${policy}`}
                checked={returnPolicy.includes(policy)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setReturnPolicy([...returnPolicy, policy]);
                  } else {
                    setReturnPolicy(returnPolicy.filter((p) => p !== policy));
                  }
                }}
              />
              <Label htmlFor={`return-${policy}`}>{policy}</Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="ad-type">
        <AccordionTrigger>Ad Type</AccordionTrigger>
        <AccordionContent>
          {sampleData.adTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`ad-type-${type}`}
                checked={adType.includes(type)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setAdType([...adType, type]);
                  } else {
                    setAdType(adType.filter((t) => t !== type));
                  }
                }}
              />
              <Label htmlFor={`ad-type-${type}`}>{type}</Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="verified-seller">
        <AccordionTrigger>Verified Seller</AccordionTrigger>
        <AccordionContent>
          <RadioGroup
            value={verifiedSeller === null ? "all" : verifiedSeller.toString()}
            onValueChange={(value) =>
              setVerifiedSeller(value === "all" ? null : value === "true")
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="verified-all" />
              <Label htmlFor="verified-all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="verified-yes" />
              <Label htmlFor="verified-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="verified-no" />
              <Label htmlFor="verified-no">No</Label>
            </div>
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  return (
    <ContentLayout title="Search Marketplace">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-1/4 space-y-6">
            <Card className="rounded-md bg-muted border-none">
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
          <div className="w-full lg:w-3/4">
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Search ads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow bg-muted shadow-none"
              />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (Newest first)</SelectItem>
                  <SelectItem value="price">Price (Highest first)</SelectItem>
                  <SelectItem value="rating">Rating (Highest first)</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button
                  variant={isGridView ? "default" : "outline"}
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
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
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
    </ContentLayout>
  );
}
