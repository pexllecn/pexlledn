"use client";
import { Metadata } from "next";
import Image from "next/image";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AlbumArtwork } from "./components/album-artwork";
import { Menu } from "./components/menu";
import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder";
import { Sidebar } from "./components/sidebar";
import { listenNowAlbums, madeForYouAlbums } from "./data/albums";
import { playlists } from "./data/playlists";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { motion } from "framer-motion";

const variants1 = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

export default function MusicPage() {
  return (
    <ContentLayout title="Music">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants1}
      >
        <div className=" md:block p-2">
          <div className="">
            <div className="bg-background">
              <div className="grid lg:grid-cols-5">
                <Sidebar
                  playlists={playlists}
                  className="hidden lg:block bg-muted rounded-lg"
                />
                <div className="col-span-3 lg:col-span-4 ">
                  <div className="h-full px-4 py-6 lg:px-8">
                    <Tabs defaultValue="music" className="h-full space-y-6">
                      <div className="space-between flex items-center">
                        <TabsList>
                          <TabsTrigger value="music" className="relative">
                            Music
                          </TabsTrigger>
                          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
                          <TabsTrigger value="live" disabled>
                            Live
                          </TabsTrigger>
                        </TabsList>
                        <div className="ml-auto mr-4">
                          <Button>
                            <PlusCircle className="w-4 h-4 mr-1" />
                            Add music
                          </Button>
                        </div>
                      </div>
                      <TabsContent
                        value="music"
                        className="border-none p-0 outline-none"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Listen Now
                            </h2>
                            <p className="text-sm text-muted-foreground pb-2">
                              Top picks for you. Updated daily.
                            </p>
                          </div>
                        </div>
                        <div className="relative">
                          <ScrollArea>
                            <div className="flex space-x-4 pb-4">
                              {listenNowAlbums.map((album) => (
                                <AlbumArtwork
                                  key={album.name}
                                  album={album}
                                  className="w-[250px]"
                                  aspectRatio="portrait"
                                  width={250}
                                  height={330}
                                />
                              ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                        </div>
                        <div className="mt-6 space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Made for You
                          </h2>
                          <p className="text-sm text-muted-foreground pb-2">
                            Your personal playlists. Updated daily.
                          </p>
                        </div>
                        <div className="relative">
                          <ScrollArea>
                            <div className="flex space-x-4 pb-4">
                              {madeForYouAlbums.map((album) => (
                                <AlbumArtwork
                                  key={album.name}
                                  album={album}
                                  className="w-[150px]"
                                  aspectRatio="square"
                                  width={150}
                                  height={150}
                                />
                              ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                        </div>
                      </TabsContent>
                      <TabsContent
                        value="podcasts"
                        className="h-full flex-col border-none p-0 data-[state=active]:flex"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              New Episodes
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              Your favorite podcasts. Updated daily.
                            </p>
                          </div>
                        </div>
                        <PodcastEmptyPlaceholder />
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
