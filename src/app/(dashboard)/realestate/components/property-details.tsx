"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Bed, Users, Bath, Maximize, Calendar } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface PropertyDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: {
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
    description: string;
  };
}

export function PropertyDetails({
  open,
  onOpenChange,
  property,
}: PropertyDetailsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const Content = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Image
          src={property.image}
          alt={property.title}
          width={400}
          height={300}
          className="rounded-lg object-cover w-full h-[300px]"
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">
            ${property.price.toLocaleString()}
          </span>
          <span className="text-muted-foreground">{property.type}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{property.location}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{property.bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{property.guests} Guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{property.squareFeet} sq ft</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Built {property.yearBuilt}</span>
        </div>
        <p className="text-sm">{property.description}</p>
      </div>
    </div>
  );

  if (!isMounted) {
    return null;
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{property.title}</DialogTitle>
          </DialogHeader>
          {Content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{property.title}</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">{Content}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
