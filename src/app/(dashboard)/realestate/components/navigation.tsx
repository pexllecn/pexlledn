"use client";

import { useState } from "react";
import { Menu, X, Search, Bell } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-muted rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden mr-2 p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-2xl font-semibold text-foreground mr-4">
            Property Results
          </h1>
          <div className="hidden sm:flex items-center space-x-4">
            <Button variant="ghost">Buy</Button>
            <Button variant="ghost">Rent</Button>
            <Button variant="ghost">Sell</Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Input
              type="text"
              placeholder="Search properties..."
              className="pl-10 pr-4 py-2 w-64 bg-background"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground "
              size={18}
            />
          </div>

          <Select defaultValue="default">
            <SelectTrigger className="w-[120px] bg-background">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {isOpen && (
        <div className="sm:hidden mt-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            Buy
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Rent
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Sell
          </Button>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search properties..."
              className="pl-10 pr-4 py-2 w-full"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>
      )}
    </div>
  );
}
