"use client";
import React from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import VerifiedBadge from "/Verified_Badge.svg";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  TagIcon,
  ShoppingBagIcon,
  UsersIcon,
  BadgeCheckIcon,
  Star,
  CheckIcon
} from "lucide-react";

// This would typically come from an API or database
const user = {
  id: 1,
  name: "Karry Woodson",
  email: "karry@example.com",
  role: "Professional Seller",
  avatarUrl: "https://i.pravatar.cc/150?img=5",
  location: "New York, USA",
  joinDate: "2020-01-15",
  phone: "+1 (555) 987-6543",
  bio: "Passionate about finding unique items and connecting buyers with sellers. Let's make every transaction a story worth telling!",
  items: 899,
  followers: "16k",
  favoriteTags: [
    "vintage",
    "electronics",
    "handmade",
    "collectibles",
    "fashion",
    "home",
    "garden",
    "sports"
  ],
  featuredListings: [
    { name: "Rare Finds", image: "https://picsum.photos/seed/rare/300/200" },
    { name: "Tech Deals", image: "https://picsum.photos/seed/tech/300/200" },
    { name: "Local Pickup", image: "https://picsum.photos/seed/local/300/200" },
    { name: "Best Sellers", image: "https://picsum.photos/seed/best/300/200" }
  ],
  itemFeed: [
    {
      name: "Antique Clock",
      image: "https://picsum.photos/seed/clock/300/300",
      price: "$250"
    },
    {
      name: "Vintage Camera",
      image: "https://picsum.photos/seed/camera/300/300",
      price: "$180"
    },
    {
      name: "Retro Console",
      image: "https://picsum.photos/seed/console/300/300",
      price: "$120"
    },
    {
      name: "Leather Jacket",
      image: "https://picsum.photos/seed/jacket/300/300",
      price: "$90"
    },
    {
      name: "Vinyl Records",
      image: "https://picsum.photos/seed/vinyl/300/300",
      price: "$45"
    },
    {
      name: "Handmade Pottery",
      image: "https://picsum.photos/seed/pottery/300/300",
      price: "$75"
    }
  ]
};

export default function MarketplaceProfilePage() {
  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 }
  };

  return (
    <ContentLayout title={`Profile: ${user.name}`}>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants1}
      >
        <div className="container py-8 flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <Card className="bg-muted border-none shadow-none h-full">
              <CardContent className="p-4 flex flex-col h-full">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0">
                      <img
                        src="/Verified_Badge.svg"
                        alt="Verified"
                        className="w-6 h-6"
                      />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{user.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {user.email}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <Badge variant="outline">{user.items} items</Badge>
                    <Badge variant="outline">{user.followers} followers</Badge>
                  </div>
                  <div className="w-full space-y-2">
                    <Button className="w-full bg-black text-white">
                      Follow
                    </Button>
                    <Button className="w-full" variant="outline">
                      Message
                    </Button>
                  </div>
                </div>
                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Joined {user.joinDate}</span>
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{user.location}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {user.bio}
                  </p>
                  <h4 className="font-semibold mb-2">Seller Stats</h4>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-background p-2 rounded-lg flex items-center">
                      <ShoppingBagIcon className="h-6 w-6 mr-2 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Items Sold
                        </p>
                        <p className="text-sm font-bold">1,234</p>
                      </div>
                    </div>
                    <div className="bg-background p-2 rounded-lg flex items-center">
                      <Star
                        className="text-yellow-400 mr-2"
                        fill={"currentColor"}
                      />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Avg Rating
                        </p>
                        <p className="text-sm font-bold">4.8/5</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2 text-sm">Favorite Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    {user.favoriteTags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-background text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <div className="bg-background h-full">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">
                  Featured Listings
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {user.featuredListings.map((listing, index) => (
                    <div
                      key={index}
                      className=" border rounded-lg overflow-hidden"
                    >
                      <img
                        src={listing.image}
                        alt={listing.name}
                        className="w-full min-h-60 object-cover"
                      />
                      <div className="p-2">
                        <p className="text-sm font-medium">{listing.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <h3 className="text-lg font-semibold mb-4">Item Feed</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {user.itemFeed.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-2">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
