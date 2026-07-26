import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

interface Property {
  id: number;
  image: string;
  title: string;
  price: number;
  bedrooms: number;
  baths: number;
  squareFeet: number;
  yearBuilt: number;
  type: string;
}

interface ComparisonDrawerProps {
  open: boolean;
  onClose: () => void;
  properties: Property[];
}

export function ComparisonDrawer({ open, onClose, properties }: ComparisonDrawerProps) {
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);

  const handlePropertySelect = (index: number, propertyId: number) => {
    setSelectedProperties((prev) => {
      const newSelection = [...prev];
      newSelection[index] = propertyId;
      return newSelection;
    });
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] sm:max-w-none">
        <SheetHeader>
          <SheetTitle>Compare Properties</SheetTitle>
        </SheetHeader>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {[0, 1].map((index) => (
            <div key={index} className="space-y-4">
              <Select
                value={selectedProperties[index]?.toString()}
                onValueChange={(value) => handlePropertySelect(index, parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a property" />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((property) => (
                    <SelectItem key={property.id} value={property.id.toString()}>
                      {property.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedProperties[index] && (
                <PropertyComparison
                  property={properties.find((p) => p.id === selectedProperties[index])}
                />
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function PropertyComparison({ property }: { property: Property | undefined }) {
  if (!property) return null;

  return (
    <div className="space-y-4">
      <Image src={property.image} alt={property.title} width={200} height={150} className="rounded-lg" />
      <h3 className="font-semibold">{property.title}</h3>
      <p className="text-lg font-bold">${property.price.toLocaleString()}</p>
      <div className="space-y-2 text-sm">
        <p>Bedrooms: {property.bedrooms}</p>
        <p>Bathrooms: {property.baths}</p>
        <p>Square Feet: {property.squareFeet}</p>
        <p>Year Built: {property.yearBuilt}</p>
        <p>Type: {property.type}</p>
      </div>
    </div>
  );
}

