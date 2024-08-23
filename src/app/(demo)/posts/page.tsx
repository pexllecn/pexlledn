"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import {
  MapPin,
  Calendar,
  Monitor,
  Phone,
  Mail,
  Star,
  Flag,
  Share,
  Heart,
  ZoomIn,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function ModernImacListing() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1551645120-d70bfe84c826?auto=format&fit=crop&w=1920&q=80"
  ];

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">iMac 27" (2020)</h1>
          <div className="flex space-x-2">
            <Button
              variant={isFavorite ? "default" : "outline"}
              size="sm"
              onClick={handleFavoriteClick}
              className="rounded-full"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? "fill-current text-red-500" : "text-gray-500"
                }`}
              />
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Share className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <img
                    src={images[selectedImage]}
                    alt={`iMac image ${selectedImage + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-between p-4">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={prevImage}
                      className="rounded-full"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={nextImage}
                      className="rounded-full"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute top-4 right-4 rounded-full"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <img
                        src={images[selectedImage]}
                        alt={`iMac image ${selectedImage + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex justify-center p-4">
                  <Slider
                    value={[selectedImage]}
                    max={images.length - 1}
                    step={1}
                    className="w-1/2"
                    onValueChange={(value) => setSelectedImage(value[0])}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Product Details
                </h2>
                <Tabs defaultValue="description">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="specs">Specifications</TabsTrigger>
                    <TabsTrigger value="condition">Condition</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="text-gray-600">
                    <p>
                      Experience unparalleled performance and stunning visuals
                      with this 27-inch iMac (2020 model). Perfect for creative
                      professionals, home office use, or anyone seeking a
                      powerful and stylish desktop setup. Its 5K Retina display
                      brings your work and entertainment to life with vivid
                      colors and sharp details.
                    </p>
                  </TabsContent>
                  <TabsContent value="specs">
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>
                        27-inch 5K Retina display (5120 x 2880 resolution)
                      </li>
                      <li>
                        3.3GHz 6-core 10th-generation Intel Core i5 processor
                      </li>
                      <li>16GB 2666MHz DDR4 memory (upgradable to 128GB)</li>
                      <li>512GB SSD storage</li>
                      <li>Radeon Pro 5300 with 4GB of GDDR6 memory</li>
                      <li>Two Thunderbolt 3 (USB-C) ports</li>
                      <li>Magic Keyboard and Magic Mouse 2 included</li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="condition" className="text-gray-600">
                    <p>
                      This iMac is in excellent condition, showing minimal signs
                      of use. It has been well-maintained in a smoke-free
                      environment. The screen is pristine with no scratches or
                      dead pixels. All original accessories are included, and
                      the computer has been factory reset, ready for its new
                      owner.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-gray-700">
                      Is the price negotiable?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      While the listed price reflects the item's value, I'm open
                      to reasonable offers. Feel free to reach out to discuss.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-gray-700">
                      Do you offer delivery?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Local pickup is preferred, but I can arrange delivery
                      within a 20-mile radius for an additional fee. We can
                      discuss shipping options for longer distances.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-gray-700">
                      Is the warranty still valid?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      The original manufacturer's warranty has expired, but
                      there's still 6 months left on the AppleCare+ coverage.
                      This extended warranty covers hardware repairs and
                      technical support.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-3xl font-bold text-gray-900">
                    $1,299.99
                  </h2>
                  <Badge
                    variant="secondary"
                    className="text-green-600 bg-green-100"
                  >
                    Negotiable
                  </Badge>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                    <span>Posted on: August 22, 2023</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Monitor className="w-5 h-5 mr-2 text-gray-400" />
                    <span>Condition: Used - Excellent</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <Button className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Seller
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Seller
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=300&q=80" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-800">John Doe</h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4 ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill={i < 4 ? "currentColor" : "none"}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">(4.2)</span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Member since 2019 • 50+ successful sales
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-gray-800">
                  Color Options
                </h3>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-10 h-10 rounded-full p-0 bg-gray-200"
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <img
                        src="https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&w=1920&q=80"
                        alt="Silver iMac"
                        className="w-full rounded-lg"
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-10 h-10 rounded-full p-0 bg-gray-800"
                    disabled
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-white shadow-md mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © 2023 Modern Classifieds. All rights reserved.
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md lg:hidden">
        <Button className="w-full">Contact Seller</Button>
      </div>
    </div>
  );
}
