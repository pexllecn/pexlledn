"use client";
import { useState } from "react";
import { Navigation } from "../components/navigation";
import { FilterSidebar } from "../components/filter-sidebar";
import { PropertyCard } from "../components/property-card";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { motion } from "framer-motion";
import { MapView } from "../components/map-view";
import { Button } from "@/components/ui/button";
import { ComparisonDrawer } from "../components/comparison-drawer";
import { SavedProperties } from "../components/saved-properties";
import { PropertyDetails } from "../components/property-details";
import { MortgageCalculator } from "../components/mortgage-calculator";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const properties = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80",
    title: "Charming Suburban Cottage",
    location: "Sunnybrook Ln.",
    price: 800000,
    bedrooms: 2,
    guests: 2,
    baths: 2,
    squareFeet: 1500,
    yearBuilt: 2015,
    type: "House",
    coordinates: { lat: 40.7128, lng: -74.006 },
    description:
      "This charming suburban cottage offers a perfect blend of comfort and style. With its spacious layout and modern amenities, it's ideal for families or professionals seeking a peaceful retreat.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80",
    title: "The Biltmore Estate",
    location: "Sagaponack, New York",
    price: 310000,
    bedrooms: 2,
    guests: 2,
    baths: 2,
    squareFeet: 2000,
    yearBuilt: 2010,
    type: "Apartment",
    coordinates: { lat: 40.7829, lng: -73.9654 },
    description:
      "Experience luxury living in the heart of Sagaponack. The Biltmore Estate offers stunning views, high-end finishes, and access to exclusive amenities. Perfect for those seeking a sophisticated urban lifestyle.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80",
    title: "The Pinnacle Residences",
    location: "Windermere, Florida",
    price: 250000,
    bedrooms: 2,
    guests: 2,
    baths: 2,
    squareFeet: 1800,
    yearBuilt: 2018,
    type: "Condo",
    coordinates: { lat: 28.4959, lng: -81.5374 },
    description:
      "Discover the epitome of Florida living at The Pinnacle Residences. This modern condo offers a resort-style atmosphere with its sleek design, community amenities, and proximity to local attractions.",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80",
    title: "The Heritage Towers",
    location: "Sunnybrook Ln.",
    price: 300000,
    bedrooms: 2,
    guests: 2,
    baths: 2,
    squareFeet: 1600,
    yearBuilt: 2020,
    type: "Townhouse",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    description:
      "The Heritage Towers combine classic architecture with modern conveniences. This townhouse offers a spacious layout, private outdoor space, and a prime location close to shopping, dining, and entertainment.",
  },
];

const variants1 = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

export default function Home() {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [savedPropertiesOpen, setSavedPropertiesOpen] = useState(false);
  const [propertyDetailsOpen, setPropertyDetailsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);
  const [mortgageCalculatorOpen, setMortgageCalculatorOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const handleViewDetails = (id: number) => {
    const property = properties.find((p) => p.id === id);
    if (property) {
      setSelectedProperty(property);
      setPropertyDetailsOpen(true);
    }
  };

  const paginatedProperties = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        items.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    return items;
  };

  return (
    <ContentLayout title="Property Results">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants1}
      >
        <div className="min-h-screen">
          <main className="px-4 py-4 sm:px-6 lg:px-8">
            <Navigation />
            <div className="mt-4 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-8">
              <FilterSidebar />
              <div className="flex-1">
                <div className="mb-4 sm:mb-6 flex flex-wrap justify-between items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
                    {Math.min(currentPage * itemsPerPage, properties.length)} of{" "}
                    {properties.length} results
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setViewMode(viewMode === "grid" ? "map" : "grid")
                      }
                    >
                      {viewMode === "grid" ? "Map View" : "Grid View"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setComparisonOpen(true)}
                    >
                      Compare
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSavedPropertiesOpen(true)}
                    >
                      Saved
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMortgageCalculatorOpen(true)}
                    >
                      Mortgage Calculator
                    </Button>
                    <Select
                      value={itemsPerPage.toString()}
                      onValueChange={(value) =>
                        setItemsPerPage(parseInt(value))
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Items per page" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4">4 per page</SelectItem>
                        <SelectItem value="8">8 per page</SelectItem>
                        <SelectItem value="12">12 per page</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {paginatedProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        {...property}
                        onViewDetails={() => handleViewDetails(property.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <MapView properties={properties} />
                )}
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                    {renderPaginationItems()}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
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
          </main>
        </div>
      </motion.div>
      <ComparisonDrawer
        open={comparisonOpen}
        onClose={() => setComparisonOpen(false)}
        properties={properties}
      />
      <SavedProperties
        open={savedPropertiesOpen}
        onClose={() => setSavedPropertiesOpen(false)}
        properties={properties}
      />
      <PropertyDetails
        open={propertyDetailsOpen}
        onOpenChange={setPropertyDetailsOpen}
        property={selectedProperty}
      />
      <MortgageCalculator
        open={mortgageCalculatorOpen}
        onClose={() => setMortgageCalculatorOpen(false)}
      />
    </ContentLayout>
  );
}
