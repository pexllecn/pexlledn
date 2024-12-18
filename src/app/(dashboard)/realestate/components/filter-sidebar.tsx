"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";

export function FilterSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([5200, 206000]);

  return (
    <div className="w-full sm:w-72 rounded-lg bg-muted p-6">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center sm:hidden mb-4"
        variant="outline"
      >
        Filters
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </Button>
      <div className={`${isOpen ? "block" : "hidden"} sm:block space-y-6`}>
        <div>
          <h3 className="mb-4 text-lg font-medium">Real Estate Type</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="apartments" />
              <Label htmlFor="apartments">Apartments</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="houses" />
              <Label htmlFor="houses">Houses</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="rooms" />
              <Label htmlFor="rooms">Rooms</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="townhouses" />
              <Label htmlFor="townhouses">Townhouses</Label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Price Range</h3>
          <div className="flex justify-between mb-2">
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([parseInt(e.target.value), priceRange[1]])
              }
              className="w-[45%] bg-background"
            />
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-[45%] bg-background"
            />
          </div>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={1000000}
            step={1000}
            className="w-full"
          />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Rooms</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="bedroom" className="mb-2 block">
                Bedroom
              </Label>
              <div className="flex gap-4">
                <Select>
                  <SelectTrigger className="w-full bg-background shadow-none border-none">
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full bg-background shadow-none border-none">
                    <SelectValue placeholder="Max" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="bathroom" className="mb-2 block">
                Bathroom
              </Label>
              <div className="flex gap-4">
                <Select>
                  <SelectTrigger className="w-full bg-background shadow-none border-none">
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full bg-background shadow-none border-none">
                    <SelectValue placeholder="Max" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Rental Period</h3>
          <RadioGroup defaultValue="any">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="any" id="any" />
              <Label htmlFor="any">Any</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1-12" id="1-12" />
              <Label htmlFor="1-12">1 - 12 Months</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="13-24" id="13-24" />
              <Label htmlFor="13-24">13 - 24 Months</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="24+" id="24+" />
              <Label htmlFor="24+">24+ Months</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Additional Features</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="parking" />
              <Label htmlFor="parking">Parking</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="pool" />
              <Label htmlFor="pool">Pool</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="gym" />
              <Label htmlFor="gym">Gym</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="pets" />
              <Label htmlFor="pets">Pet-friendly</Label>
            </div>
          </div>
        </div>

        <Button className="w-full">Apply Filters</Button>
      </div>
    </div>
  );
}
