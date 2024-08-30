"use client";
import React from "react";
import { notFound } from "next/navigation";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileHeader } from "@/app/(demo)/user/profileheader";
import { ProfileDetails } from "@/app/(demo)/user/profiledetails";
import { FeaturedListings } from "@/app/(demo)/user/featuredlistings";
import { ItemFeed } from "@/app/(demo)/user/itemfeed";
import userProfilesData from "@/data/userProfiles.json";
import { UserProfile } from "@/types/user";
import { motion } from "framer-motion";

interface UserProfilePageProps {
  params: { id: string };
}
const variants1 = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const { id } = params;
  const user = userProfilesData[id as keyof typeof userProfilesData] as
    | UserProfile
    | undefined;

  if (!user) {
    notFound();
  }

  return (
    <ContentLayout title={`Profile: ${user.name}`}>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants1}
      >
        <div className="lg:container py-8 flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <Card className="bg-muted border-none shadow-none h-full">
              <CardContent className="p-4 flex flex-col h-full">
                <ProfileHeader user={user} />
                <ProfileDetails user={user} />
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <div className="bg-background h-full">
              <div className="p-2">
                <FeaturedListings listings={user.featuredListings} />
                <ItemFeed items={user.itemFeed} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
