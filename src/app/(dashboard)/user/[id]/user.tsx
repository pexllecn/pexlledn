"use client";

import React from "react";
import { notFound } from "next/navigation";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileHeader } from "@/app/(dashboard)/users/components/profileheader";
import { ProfileDetails } from "@/app/(dashboard)/users/components/profiledetails";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import userProfilesData from "@/data/userProfiles.json";
import { UserProfile } from "@/types/user";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogSubtitle,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from "@/components/core/dialog";
import { Star, ShoppingCart, Percent, Award, TrendingUp } from "lucide-react";

interface UserProfilePageProps {
  params: { id: string };
}

const variants1 = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

type ListingItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  category: string;
  rating: number;
  sales: string;
  imageUrl: string;
  badge?: string;
};

const mockListings: ListingItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: [
    "Wireless Earbuds Pro",
    "SmartFit Watch X1",
    "ErgoBoost Laptop Stand",
    "ShieldPro Phone Case",
    "PowerBank 20000mAh",
    "SoundWave Bluetooth Speaker",
    "FitTrack Pro",
    "TravelEase Backpack",
    "SunShield Polarized Glasses",
    "HydroFlow Smart Bottle",
  ][i],
  description: `Experience the next level of [Product] with our cutting-edge design and advanced features. Perfect for enhancing your daily life and staying ahead in today's fast-paced world.`,
  price: `$${(Math.random() * 100 + 20).toFixed(2)}`,
  originalPrice:
    Math.random() > 0.7
      ? `$${(Math.random() * 150 + 50).toFixed(2)}`
      : undefined,
  category: ["Tech", "Wearables", "Accessories", "Lifestyle", "Audio"][
    Math.floor(Math.random() * 5)
  ],
  rating: Number((Math.random() * 1 + 4).toFixed(1)),
  sales: `${Math.floor(Math.random() * 10000)}`,
  imageUrl: `https://picsum.photos/seed/product${i + 1}/400/400`,
  badge:
    Math.random() > 0.7
      ? ["New", "Best Seller", "Limited Edition"][Math.floor(Math.random() * 3)]
      : undefined,
}));

const ListingCard = ({ item }: { item: ListingItem }) => {
  return (
    <Dialog
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <DialogTrigger>
        <Card className="relative w-full h-[400px] overflow-hidden group cursor-pointer rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
          <Image
            src={item.imageUrl}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          {item.badge && (
            <Badge variant="default" className="absolute top-4 left-4 z-20">
              {item.badge}
            </Badge>
          )}
          <div className="absolute inset-x-3 bottom-3 p-4 bg-black/40 backdrop-blur-sm rounded-lg z-20 transition-all duration-300 ">
            <div className="space-y-2">
              <Badge variant="secondary">{item.category}</Badge>
              <h3 className=" text-white line-clamp-1">{item.name}</h3>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="font-bold text-white">{item.price}</p>
                  {item.originalPrice && (
                    <p className=" text-gray-400 line-through">
                      {item.originalPrice}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-medium">{item.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContainer>
        <DialogContent
          style={{
            borderRadius: "24px",
          }}
          className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]"
        >
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={`${item.name} product image`}
              layout="fill"
              objectFit="cover"
            />
            {item.badge && (
              <Badge className="absolute top-4 left-4 z-20 bg-primary text-primary-foreground px-2 py-1">
                {item.badge}
              </Badge>
            )}
          </div>
          <div className="p-6">
            <DialogTitle className="text-2xl text-zinc-950 dark:text-zinc-50">
              {item.name}
            </DialogTitle>
            <DialogSubtitle className="text-zinc-700 dark:text-zinc-400">
              {item.category}
            </DialogSubtitle>
            <DialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 100 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8, y: 100 },
              }}
            >
              <ScrollArea className="h-[100px] w-full rounded-lg border p-4 mt-2">
                <p className="text-zinc-500 dark:text-zinc-500">
                  {item.description}
                </p>
              </ScrollArea>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(item.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-zinc-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {item.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {item.sales} sold
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <span className="text-2xl font-bold text-primary">
                    {item.price}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-zinc-500 line-through ml-2">
                      {item.originalPrice}
                    </span>
                  )}
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </div>
            </DialogDescription>
          </div>
          <DialogClose className="absolute right-4 top-4 z-10 text-zinc-50 bg-zinc-900/50 rounded-full p-1 hover:bg-zinc-900/70 transition-colors" />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
};

const FeaturedListings = ({ items }: { items: ListingItem[] }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold">Featured Products</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <ListingCard key={item.id} item={item} />
      ))}
    </div>
  </div>
);

const ItemFeed = ({ items }: { items: ListingItem[] }) => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold">More Products</h2>
      <Badge variant="decline">
        <Percent className="w-4 h-4 mr-1" /> Special Offers
      </Badge>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ListingCard key={item.id} item={item} />
      ))}
    </div>
  </div>
);

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const { id } = params;
  const user = userProfilesData[id as keyof typeof userProfilesData] as
    | UserProfile
    | undefined;

  if (!user) {
    notFound();
  }

  const featuredListings = mockListings.slice(0, 4);
  const itemFeed = mockListings.slice(4);

  return (
    <ContentLayout title={`Profile: ${user.name}`}>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants1}
      >
        <div className="px-2 py-8 flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <Card className="bg-muted border-none shadow-none h-full">
              <CardContent className="p-10 flex flex-col h-full">
                <ProfileHeader user={user} />
                <ProfileDetails user={user} />
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <div className="bg-background h-full">
              <div className="p-2">
                <FeaturedListings items={featuredListings} />
                <ItemFeed items={itemFeed} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
