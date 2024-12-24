import Image from "next/image";
import {
  MapPin,
  Bed,
  Users,
  Bath,
  Maximize,
  Calendar,
  Heart,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PropertyCardProps {
  id: number;
  image: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  guests: number;
  baths: number;
  squareFeet: number;
  yearBuilt: number;
  type: string;
  onViewDetails: (id: number) => void;
}

export function PropertyCard({
  id,
  image,
  title,
  location,
  price,
  bedrooms,
  guests,
  baths,
  squareFeet,
  yearBuilt,
  type,
  onViewDetails,
}: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg sm:rounded-2xl bg-background shadow-sm border transition-shadow hover:shadow-md">
      <div className="relative h-[200px] sm:h-[240px] w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="rounded-lg p-4 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="w-8 h-8 rounded-full"
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isSaved ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent showArrow={true}>
                <p>{isSaved ? "Remove from favorites" : "Add to favorites"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="w-8 h-8 rounded-full"
                  onClick={() => onViewDetails(id)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent showArrow={true}>
                <p>View details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Badge className="absolute bottom-2 left-2" variant="default">
          {type}
        </Badge>
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-base sm:text-lg font-medium text-foreground">
            {title}
          </h3>
          <p className="text-lg sm:text-xl font-semibold text-foreground">
            ${price.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="mt-2 sm:mt-4 grid grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{guests} Guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{baths} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{squareFeet} sq ft</span>
          </div>
        </div>
        <div className="mt-2 flex justify-between items-center text-xs text-muted-foreground">
          <span>{type}</span>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Built {yearBuilt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
