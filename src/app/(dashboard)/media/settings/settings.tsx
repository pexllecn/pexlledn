"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bell,
  Download,
  HardDrive,
  Monitor,
  Palette,
  Play,
  Sparkles,
  Wifi,
} from "lucide-react";

const qualities = ["Auto", "480p", "720p", "1080p", "4K"];

function Row({
  title,
  desc,
  defaultChecked,
}: {
  title: string;
  desc: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}

const accents = [
  { name: "Violet", cls: "from-violet-500 to-fuchsia-500" },
  { name: "Rose", cls: "from-rose-500 to-orange-400" },
  { name: "Sky", cls: "from-sky-500 to-cyan-400" },
  { name: "Emerald", cls: "from-emerald-500 to-teal-400" },
  { name: "Amber", cls: "from-amber-500 to-yellow-400" },
];

export default function Settings() {
  const [quality, setQuality] = useState("1080p");
  const [accent, setAccent] = useState("Violet");
  const [storage, setStorage] = useState([12]);

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Settings">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6 max-w-4xl">
          <div>
            <h2 className="text-3xl font-normal">Media settings</h2>
            <p className="text-muted-foreground mt-1">
              Tune playback, appearance and storage to taste
            </p>
          </div>

          {/* Profile */}
          <Card className="border-none overflow-hidden">
            <div className="relative h-24 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500" />
            <CardContent className="p-6 pt-0">
              <div className="flex items-end gap-4 -mt-10">
                <Avatar className="h-20 w-20 border-4 border-background">
                  <AvatarImage src="/avatar-80-01.jpg" alt="Profile" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <div className="flex-1 pb-1">
                  <p className="text-lg font-medium">Alex Rivera</p>
                  <p className="text-sm text-muted-foreground">
                    alex@media.app
                  </p>
                </div>
                <Badge className="mb-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-none gap-1">
                  <Sparkles className="h-3 w-3" /> Premium
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Playback */}
          <Card className="bg-muted border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Play className="h-4 w-4" /> Playback
              </CardTitle>
              <CardDescription>How your media plays by default</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Streaming quality</p>
                <div className="flex flex-wrap gap-2">
                  {qualities.map((q) => (
                    <button
                      key={q}
                      onClick={() => setQuality(q)}
                      className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                        quality === q
                          ? "bg-foreground text-background"
                          : "bg-background hover:bg-background/70"
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
              <Separator />
              <Row
                title="Autoplay next"
                desc="Automatically play the next item in a queue"
                defaultChecked
              />
              <Separator />
              <Row
                title="Continuous playback"
                desc="Pick up where you left off across devices"
                defaultChecked
              />
              <Separator />
              <Row
                title="Gapless audio"
                desc="Remove silence between tracks"
              />
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="bg-muted border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Palette className="h-4 w-4" /> Appearance
              </CardTitle>
              <CardDescription>Personalize how Media looks</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium mb-3">Accent color</p>
              <div className="flex flex-wrap gap-3">
                {accents.map((a) => (
                  <button
                    key={a.name}
                    onClick={() => setAccent(a.name)}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <span
                      className={`h-10 w-10 rounded-full bg-gradient-to-br ${a.cls} transition-transform ${
                        accent === a.name
                          ? "ring-2 ring-offset-2 ring-offset-muted ring-foreground scale-105"
                          : ""
                      }`}
                    />
                    <span className="text-1xs text-muted-foreground">
                      {a.name}
                    </span>
                  </button>
                ))}
              </div>
              <Separator className="my-4" />
              <Row
                title="Reduce motion"
                desc="Minimize animations across the app"
              />
              <Separator />
              <Row
                title="Cinematic mode"
                desc="Dim the interface while watching videos"
                defaultChecked
              />
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-muted border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="h-4 w-4" /> Notifications
              </CardTitle>
              <CardDescription>Choose what you hear about</CardDescription>
            </CardHeader>
            <CardContent>
              <Row
                title="New from your channels"
                desc="When a followed creator goes live or posts"
                defaultChecked
              />
              <Separator />
              <Row
                title="Recommendations"
                desc="Weekly picks based on your taste"
                defaultChecked
              />
              <Separator />
              <Row title="Product updates" desc="News about new features" />
            </CardContent>
          </Card>

          {/* Storage & data */}
          <Card className="bg-muted border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <HardDrive className="h-4 w-4" /> Storage &amp; data
              </CardTitle>
              <CardDescription>Manage downloads and network use</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  Download cache limit
                </span>
                <span className="tabular-nums font-medium">
                  {storage[0]} GB
                </span>
              </div>
              <Slider
                value={storage}
                onValueChange={setStorage}
                max={50}
                step={1}
              />
              <div className="mt-1 flex justify-between text-1xs text-muted-foreground">
                <span>0 GB</span>
                <span>50 GB</span>
              </div>
              <Separator className="my-4" />
              <Row
                title="Download over Wi-Fi only"
                desc="Avoid using mobile data for downloads"
                defaultChecked
              />
              <Separator />
              <Row
                title="Stream in high quality on cellular"
                desc="May use significantly more data"
              />
              <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-background p-3">
                <Wifi className="h-4 w-4 text-emerald-600" />
                <span className="text-sm">Connected · downloading over Wi-Fi</span>
                <Button variant="outline" size="sm" className="ml-auto">
                  Clear cache
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between gap-3 rounded-xl border border-dashed p-4">
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Connected devices</p>
                <p className="text-xs text-muted-foreground">
                  3 devices signed in
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>

          <div className="flex justify-end gap-2 pb-2">
            <Button variant="ghost">Reset</Button>
            <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-none hover:opacity-90">
              Save changes
            </Button>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
