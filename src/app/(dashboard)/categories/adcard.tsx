import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPinIcon, ClockIcon, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Ad } from "@/lib/sample-data";

interface AdCardProps {
  ad: Ad;
  isGridView: boolean;
}

export const AdCard: React.FC<AdCardProps> = React.memo(
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
            {!isGridView && (
              <Badge className="absolute top-2 left-2 z-10">
                {ad.category}
              </Badge>
            )}
          </div>
          <CardContent
            className={cn(
              isGridView
                ? "absolute inset-0 flex flex-col justify-end p-4 text-white bg-black bg-opacity-30 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                : "w-3/4 p-4 flex flex-col justify-between"
            )}
          >
            {isGridView && (
              <Badge className="self-start mb-2">{ad.category}</Badge>
            )}
            <div>
              <h3 className={cn(" ", isGridView ? "text-lg mb-1" : "text-lg")}>
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
              <div className={cn("  text-lg", !isGridView && "text-primary")}>
                {ad.price !== null ? `$${ad.price}` : "Price on request"}
              </div>
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
