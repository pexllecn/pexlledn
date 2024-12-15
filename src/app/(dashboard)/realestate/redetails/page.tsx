"use client";

import { useState } from "react";
import { Heart, MapPin, Menu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Home, Building, Store, MapPinIcon } from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { motion } from "framer-motion";

export default function RealEstateSearch() {
  const [priceRange, setPriceRange] = useState([500, 4500]);
  const [rooms, setRooms] = useState(["2"]);
  const [showFilters, setShowFilters] = useState(false);

  const properties = [
    {
      id: 1,
      name: "Summit Crest Residences",
      location: "Beverly Hills, California",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
      bedrooms: 2,
      guests: 2,
      baths: 2,
      area: "4x7 m²",
      price: 13600000,
    },
    {
      id: 2,
      name: "Palm Grove Estates",
      location: "London Docklands, UK",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bedrooms: 2,
      guests: 2,
      baths: 2,
      area: "4x7 m²",
      price: 5435032,
    },
    {
      id: 3,
      name: "Oceanview Retreat",
      location: "Dubai Marina, UAE",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
      bedrooms: 2,
      guests: 2,
      baths: 2,
      area: "4x7 m²",
      price: 25430000,
    },
    {
      id: 4,
      name: "Skyline Peaks",
      location: "South Beach, Miami",
      image:
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bedrooms: 2,
      guests: 2,
      baths: 2,
      area: "4x7 m²",
      price: 456000,
    },
  ];

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants1}
      >
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Mobile menu toggle */}
          <div className="lg:hidden p-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          {/* Filters Sidebar */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-80 bg-muted rounded-lg p-4 lg:p-6 space-y-4 lg:space-y-6 overflow-y-auto max-h-screen`}
          >
            <h2 className="text-xl font-semibold">Filters</h2>

            {/* Location Search */}
            <div>
              <Input
                type="text"
                placeholder="Location"
                className="w-full bg-background"
              />
            </div>

            {/* Property Type */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Property Type</h3>
              <RadioGroup
                className="grid grid-cols-2 gap-2"
                defaultValue="house"
              >
                {/* House */}
                <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center bg-background outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-primary/20 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70">
                  <RadioGroupItem
                    id="radio-house"
                    value="house"
                    className="sr-only after:absolute after:inset-0"
                  />
                  <Home className="opacity-60" size={20} aria-hidden="true" />
                  <p className="text-xs font-medium leading-none text-foreground">
                    House
                  </p>
                </label>
                {/* Apartment */}
                <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center bg-background outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-primary/20 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70">
                  <RadioGroupItem
                    id="radio-apartment"
                    value="apartment"
                    className="sr-only after:absolute after:inset-0"
                  />
                  <Building
                    className="opacity-60"
                    size={20}
                    aria-hidden="true"
                  />
                  <p className="text-xs font-medium leading-none text-foreground">
                    Apartment
                  </p>
                </label>
                {/* Commercial */}
                <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center bg-background outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-primary/10 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70">
                  <RadioGroupItem
                    id="radio-commercial"
                    value="commercial"
                    className="sr-only after:absolute after:inset-0"
                  />
                  <Store className="opacity-60" size={20} aria-hidden="true" />
                  <p className="text-xs font-medium leading-none text-foreground">
                    Commercial
                  </p>
                </label>
                {/* Land Plot */}
                <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center bg-background outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-primary/10 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70">
                  <RadioGroupItem
                    id="radio-land"
                    value="land"
                    className="sr-only after:absolute after:inset-0"
                  />
                  <MapPin className="opacity-60" size={20} aria-hidden="true" />
                  <p className="text-xs font-medium leading-none text-foreground">
                    Land Plot
                  </p>
                </label>
              </RadioGroup>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Price Range</h3>
              <Slider
                defaultValue={[500, 4500]}
                max={5000}
                step={100}
                className="mb-4 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-black [&_[role=slider]]:bg-white"
                onValueChange={setPriceRange}
              />
              <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
                <Input
                  type="number"
                  value={priceRange[0]}
                  className="w-full sm:w-24"
                  onChange={(e) =>
                    setPriceRange([parseInt(e.target.value), priceRange[1]])
                  }
                />
                <Input
                  type="number"
                  value={priceRange[1]}
                  className="w-full sm:w-24"
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                />
              </div>
            </div>

            {/* Number of Rooms */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Number Of Rooms</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["1", "2", "3", "4+"].map((room) => (
                  <label key={room} className="flex items-center space-x-2">
                    <Checkbox
                      checked={rooms.includes(room)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setRooms([...rooms, room]);
                        } else {
                          setRooms(rooms.filter((r) => r !== room));
                        }
                      }}
                    />
                    <span>{room}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Basic Criteria */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Basic Criteria</h3>
              <div className="space-y-2">
                {[
                  "Newly Build",
                  "Parking Space",
                  "Furnished",
                  "Swimming Pool",
                ].map((criteria) => (
                  <label key={criteria} className="flex items-center space-x-2">
                    <Checkbox />
                    <span>{criteria}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button className="w-full" variant="outline">
              All Filters
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto bg-background lg:px-6">
            {/* Hero Section */}
            <div
              className="h-48 sm:h-64 bg-cover bg-center relative rounded-lg mb-6"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                <h1 className="text-2xl sm:text-4xl font-bold text-white text-center px-4">
                  Find Your Dream Apartment
                </h1>
              </div>
            </div>

            {/* Results Section */}
            <div className="py-6">
              <h2 className="text-xl font-semibold mb-4">
                Search Results (248)
              </h2>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2">
                  <div className="grid grid-cols-1 gap-4">
                    {properties.map((property) => (
                      <Card
                        key={property.id}
                        className="overflow-hidden border-none"
                      >
                        <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-1/3 h-48 sm:h-auto">
                            <img
                              src={property.image}
                              alt={property.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-4 w-full sm:w-2/3 bg-muted">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4 mr-1" />
                                {property.location}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                              >
                                <Heart />
                              </Button>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">
                              {property.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-2">
                              <span>{property.bedrooms} Bedrooms</span>
                              <span>{property.guests} Guests</span>
                              <span>{property.baths} Baths</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                {property.area}
                              </span>
                              <span className="text-lg font-semibold ">
                                ${property.price.toLocaleString()}
                              </span>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                  <div className="h-[400px] lg:h-[600px] w-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d26081603.294420466!2d-95.677068!3d37.06250000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1638141766195!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
