"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ContentLayout } from "@/components/admin-panel/content-layout";

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
  Share,
  Heart,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Info,
  Check
} from "lucide-react";

const MapComponent = () => (
  <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
    <iframe
      width="100%"
      height="100%"
      frameBorder="0"
      style={{ border: 0 }}
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.507640204439!3d37.757814996609724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1652813109969!5m2!1sen!2sus"
      allowFullScreen
      loading="lazy"
      className="rounded-lg"
    ></iframe>
  </div>
);

export default function DarkModeCompatibleProductListing() {
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

  // New function to handle keydown events
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      prevImage();
    } else if (event.key === "ArrowRight") {
      nextImage();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 }
  };

  return (
    <ContentLayout title="Categories">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants1}
      >
        <div className="min-h-screen">
          <header className="">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                iMac 27" (2020)
              </h1>
              <div className="flex space-x-2">
                <Button
                  variant={isFavorite ? "default" : "outline"}
                  size="sm"
                  onClick={handleFavoriteClick}
                  className="rounded-full"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite
                        ? "fill-current text-red-500"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Share className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </Button>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8 pb-24 lg:pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="overflow-hidden border-none">
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
                          className="rounded-full opacity-75 hover:opacity-100 transition-opacity"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={nextImage}
                          className="rounded-full opacity-75 hover:opacity-100 transition-opacity"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </Button>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="absolute top-4 right-4 rounded-full opacity-75 hover:opacity-100 transition-opacity"
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
                      <div className="flex space-x-2">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`w-2 h-2 rounded-full ${
                              index === selectedImage
                                ? "bg-primary"
                                : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Product Details */}
                <Card className="border-none">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                      Product Details
                    </h2>
                    <Tabs defaultValue="description">
                      <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="description">
                          Description
                        </TabsTrigger>
                        <TabsTrigger value="specs">Specifications</TabsTrigger>
                        <TabsTrigger value="condition">Condition</TabsTrigger>
                      </TabsList>
                      <TabsContent
                        value="description"
                        className="text-gray-600 dark:text-gray-300"
                      >
                        <p>
                          Experience unparalleled performance and stunning
                          visuals with this 27-inch iMac (2020 model). Perfect
                          for creative professionals, home office use, or anyone
                          seeking a powerful and stylish desktop setup. Its 5K
                          Retina display brings your work and entertainment to
                          life with vivid colors and sharp details.
                        </p>
                      </TabsContent>
                      <TabsContent value="specs">
                        <ul className="grid grid-cols-2 gap-4">
                          {[
                            "27-inch 5K Retina display",
                            "3.3GHz 6-core 10th-gen Intel Core i5",
                            "16GB 2666MHz DDR4 memory",
                            "512GB SSD storage",
                            "Radeon Pro 5300 (4GB GDDR6)",
                            "Two Thunderbolt 3 ports",
                            "Magic Keyboard included",
                            "Magic Mouse 2 included"
                          ].map((spec, index) => (
                            <li
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                {spec}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                      <TabsContent
                        value="condition"
                        className="text-gray-600 dark:text-gray-300"
                      >
                        <p className="mb-4">
                          This iMac is in excellent condition, showing minimal
                          signs of use. It has been well-maintained in a
                          smoke-free environment. The screen is pristine with no
                          scratches or dead pixels. All original accessories are
                          included, and the computer has been factory reset,
                          ready for its new owner.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            "No visible scratches",
                            "Original packaging",
                            "Factory reset",
                            "All accessories included"
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Frequently Asked Questions */}
                <Card className="border-none">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                      Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="text-gray-700 dark:text-gray-300">
                          Is the price negotiable?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-400">
                          While the listed price reflects the item's value, I'm
                          open to reasonable offers. Feel free to reach out to
                          discuss.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger className="text-gray-700 dark:text-gray-300">
                          Do you offer delivery?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-400">
                          Local pickup is preferred, but I can arrange delivery
                          within a 20-mile radius for an additional fee. We can
                          discuss shipping options for longer distances.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger className="text-gray-700 dark:text-gray-300">
                          Is the warranty still valid?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-400">
                          The original manufacturer's warranty has expired, but
                          there's still 6 months left on the AppleCare+
                          coverage. This extended warranty covers hardware
                          repairs and technical support.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="top-24 bg-muted border-none">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        $1,299.99
                      </h2>
                      <Badge
                        variant="secondary"
                        className="text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-100"
                      >
                        Negotiable
                      </Badge>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <MapPin className="w-5 h-5 mr-2 text-gray-400 dark:text-gray-500" />
                        <span>San Francisco, CA</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Calendar className="w-5 h-5 mr-2 text-gray-400 dark:text-gray-500" />
                        <span>Posted on: August 22, 2023</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Monitor className="w-5 h-5 mr-2 text-gray-400 dark:text-gray-500" />
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

                    {/* Seller Information */}
                    <div className="mt-8">
                      <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">
                        Seller Information
                      </h3>
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=300&q=80" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                            John Doe
                          </h3>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < 4
                                    ? "text-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                                fill={i < 4 ? "currentColor" : "none"}
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                              (4.2)
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Member since 2019 • 50+ successful sales
                      </p>
                      <Button variant="outline" className="w-full mt-4">
                        View Seller Profile
                      </Button>
                    </div>

                    {/* Location */}
                    <div className="mt-8">
                      <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">
                        Map
                      </h3>
                      <MapComponent />
                      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Approximate location: San Francisco, CA 94105
                      </p>
                    </div>

                    {/* Safety Tips */}
                    <div className="mt-8">
                      <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">
                        Safety Tips
                      </h3>
                      <ul className="space-y-2">
                        {[
                          "Meet in a public place",
                          "Don't pay in advance",
                          "Check the item before buying",
                          "Bring a friend if possible"
                        ].map((tip, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <Info className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {tip}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="mt-8 bg-muted border-none">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  Similar Listings
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <Card key={item} className="overflow-hidden">
                      <img
                        src={`https://picsum.photos/seed/${item}/300/200`}
                        alt={`Similar item ${item}`}
                        className="w-full h-40 object-cover"
                      />
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                          iMac 21.5" (2019)
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Excellent condition, barely used
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-900 dark:text-gray-100">
                            $999
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            Used
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm dark:bg-background/80 dark:backdrop-blur-sm dark:shadow-secondary lg:hidden z-[60]">
            <div className="flex space-x-2">
              <Button className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" className="flex-1">
                <Mail className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
