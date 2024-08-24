"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPinIcon, ClockIcon, UserIcon } from "lucide-react";

interface AdCardProps {
  ad: {
    id: number;
    title: string;
    price: number | null;
    category: string;
    image: string;
    location: string;
    date: string;
    seller: string;
    description: string;
  };
  isGridView: boolean;
}

const AdCard: React.FC<AdCardProps> = React.memo(({ ad, isGridView }) => {
  return (
    <Card
      className={`overflow-hidden hover:shadow-xl rounded-lg ${
        isGridView
          ? "h-[300px] sm:h-[350px] md:h-[400px]"
          : "h-auto sm:h-[200px] flex flex-col sm:flex-row"
      }`}
    >
      {isGridView ? (
        <div className="relative w-full h-full">
          <img
            src={ad.image}
            alt={ad.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <Badge className="bg-black/80 text-white text-xs">
                {ad.category}
              </Badge>
              {ad.price && (
                <Badge
                  variant="secondary"
                  className="bg-white/60 backdrop-blur-sm text-sm font-bold text-black"
                >
                  ${ad.price}
                </Badge>
              )}
            </div>
            <div className="mt-auto">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 line-clamp-2">
                {ad.title}
              </h2>
              <p className="text-white/90 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-4">
                {ad.description}
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-white/80 mb-2 sm:mb-4">
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
              <Button className="w-full bg-white text-black hover:bg-white/90 text-xs sm:text-sm">
                View Details
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="relative w-full sm:w-1/3 h-40 sm:h-full">
            <img
              src={ad.image}
              alt={ad.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <Badge className="absolute top-2 left-2 text-xs">
              {ad.category}
            </Badge>
            {ad.price && (
              <Badge
                variant="secondary"
                className="bg-background/40 backdrop-blur-sm dark:bg-background/40 dark:backdrop-blur-sm text-sm absolute top-2 right-2"
              >
                ${ad.price}
              </Badge>
            )}
          </div>
          <div className="flex flex-col flex-grow">
            <CardContent className="p-3 sm:p-4 flex-grow">
              <h2 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2 line-clamp-1">
                {ad.title}
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-4">
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
            <CardFooter className="p-3 sm:p-4 bg-muted/50 mt-auto">
              <Button className="w-full text-xs sm:text-sm" variant="secondary">
                View Details
              </Button>
            </CardFooter>
          </div>
        </>
      )}
    </Card>
  );
});

export default AdCard;
