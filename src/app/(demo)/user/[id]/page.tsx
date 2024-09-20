"use client";

import React from "react";
import { notFound } from "next/navigation";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileHeader } from "@/app/(demo)/user/profileheader";
import { ProfileDetails } from "@/app/(demo)/user/profiledetails";
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
import { Star } from "lucide-react";

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
  category: string;
  rating: number;
  downloads: string;
  imageUrl: string;
};

const mockListings: ListingItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Listing ${i + 1}`,
  description: `This is a description for Listing ${
    i + 1
  }. It's a great item with many features that users will love. Perfect for daily use and enhancing productivity.`,
  price: Math.random() > 0.7 ? `$${(Math.random() * 100).toFixed(2)}` : "Free",
  category: ["Electronics", "Clothing", "Home", "Sports", "Books"][
    Math.floor(Math.random() * 5)
  ],
  rating: Number((Math.random() * 4 + 1).toFixed(1)),
  downloads: `${Math.floor(Math.random() * 1000)}k`,
  imageUrl: `https://picsum.photos/seed/listing${i + 1}/300/200`,
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
        <Card className="relative w-full h-64 overflow-hidden group cursor-pointer">
          <Image
            src={item.imageUrl}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-lg font-semibold mb-1 line-clamp-1">
              {item.name}
            </h3>
            <p className="text-sm mb-2 line-clamp-2 text-gray-200">
              {item.description}
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-white/20 text-white">
                {item.category}
              </Badge>
              <span className="text-sm font-semibold">{item.price}</span>
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
              alt={`${item.name} screenshot`}
              layout="fill"
              objectFit="cover"
            />
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
              <ScrollArea className="h-[200px] w-full rounded-md border p-4 mt-2">
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
                  {item.downloads} downloads
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {item.price}
                </span>
                <Button className="bg-primary hover:bg-primary/90">
                  {item.price === "Free" ? "Get" : "Buy"}
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
    <h2 className="text-2xl font-bold mb-4">Featured Listings</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {items.map((item) => (
        <ListingCard key={item.id} item={item} />
      ))}
    </div>
  </div>
);

const ItemFeed = ({ items }: { items: ListingItem[] }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Item Feed</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

  const featuredListings = mockListings.slice(0, 5);
  const itemFeed = mockListings.slice(5);

  return (
    <ContentLayout title={`Profile: ${user.name}`}>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants1}
      >
        <div className="lg:container px-2 py-8 flex flex-col lg:flex-row gap-6">
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
