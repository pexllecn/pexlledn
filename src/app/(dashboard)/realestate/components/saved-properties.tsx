import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { PropertyCard } from "./property-card";

interface Property {
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
}

interface SavedPropertiesProps {
  open: boolean;
  onClose: () => void;
  properties: Property[];
}

export function SavedProperties({ open, onClose, properties }: SavedPropertiesProps) {
  const [savedProperties, setSavedProperties] = useState<number[]>([1, 3]); // Example: Properties 1 and 3 are saved

  const handleRemoveSaved = (propertyId: number) => {
    setSavedProperties((prev) => prev.filter((id) => id !== propertyId));
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[600px] sm:max-w-none">
        <SheetHeader>
          <SheetTitle>Saved Properties</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {properties
            .filter((property) => savedProperties.includes(property.id))
            .map((property) => (
              <div key={property.id} className="relative">
                <PropertyCard {...property} />
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => handleRemoveSaved(property.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          {savedProperties.length === 0 && (
            <p className="text-center text-muted-foreground">No saved properties yet.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

