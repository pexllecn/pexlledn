"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MoreHorizontal,
  Share2,
  MessageSquare,
  Heart,
  Bookmark,
  MapPin,
  LinkIcon,
  Calendar,
  Check,
  ImagePlus,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useImageUpload } from "@/hooks/use-image-upload";
import { useMediaQuery } from "@/hooks/use-media-query";

// Profile data
const profileData = {
  firstName: "Kohaku",
  lastName: "Tora",
  username: "kohaku_tora",
  website: "pexlledn.vercel.app",
  bio: "Hey, I am Kohaku, a UI/UX Designer who loves crafting seamless digital experiences!",
  avatar: "https://i.pravatar.cc/150?img=3",
  banner:
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=400&fit=crop",
  location: "New York City",
  joinDate: "September 2020",
  following: 1234,
  followers: 5678,
};

// Sample posts data
const posts = [
  {
    id: 1,
    author: {
      name: "Moyo Shiro",
      avatar: "https://i.pravatar.cc/150?img=1",
      username: "@moyo_shiro",
    },
    content:
      "Just launched my new portfolio website! 🚀 Check out these 15 standout examples of creative, sleek, and interactive portfolio designs that inspired me. Which one's your favorite? #WebDesign #PortfolioInspiration",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    timestamp: "2 hours ago",
    likes: 62,
    comments: 23,
    shares: 45,
  },
  {
    id: 2,
    author: {
      name: "Aiko Tanaka",
      avatar: "https://i.pravatar.cc/150?img=2",
      username: "@aiko_tanaka",
    },
    content:
      "Exploring the intersection of AI and UX design. Here's a sneak peek at my latest project. Thoughts? #AIinDesign #UXInnovation",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    timestamp: "5 hours ago",
    likes: 89,
    comments: 31,
    shares: 12,
  },
];

// Trending topics data
const trendingTopics = [
  {
    title: "Global Climate Summit 2024",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop",
    time: "Trending with 5243 posts",
  },
  {
    title: "AI Breakthrough in Healthcare",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop",
    time: "2890 posts in the last hour",
  },
  {
    title: "SpaceX's Latest Mission",
    image:
      "https://images.unsplash.com/photo-1516849677043-ef67c9557e16?w=100&h=100&fit=crop",
    time: "Live updates with 10k+ viewers",
  },
];

interface ImageUploadState {
  previewUrl: string | null;
  file: File | null;
}

function ProfileBg({ defaultImage }: { defaultImage?: string }) {
  const [hideDefault, setHideDefault] = useState(false);
  const {
    previewUrl,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  } = useImageUpload();

  const currentImage = previewUrl || (!hideDefault ? defaultImage : null);

  const handleImageRemove = () => {
    handleRemove();
    setHideDefault(true);
  };

  return (
    <div className="h-32">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted">
        {currentImage && (
          <Image
            className="h-full w-full object-cover"
            src={currentImage}
            alt={
              previewUrl
                ? "Preview of uploaded image"
                : "Default profile background"
            }
            width={512}
            height={96}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <button
            type="button"
            className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
            onClick={handleThumbnailClick}
            aria-label={currentImage ? "Change image" : "Upload image"}
          >
            <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
          </button>
          {currentImage && (
            <button
              type="button"
              className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
              onClick={handleImageRemove}
              aria-label="Remove image"
            >
              <X size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        aria-label="Upload image file"
      />
    </div>
  );
}

export default function SocialProfile() {
  const [profileImage, setProfileImage] = useState<ImageUploadState>({
    previewUrl: profileData.avatar,
    file: null,
  });
  const [bannerImage, setBannerImage] = useState<ImageUploadState>({
    previewUrl: profileData.banner,
    file: null,
  });
  const [bio, setBio] = useState(profileData.bio);
  const maxBioLength = 180;
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<ImageUploadState>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({
          previewUrl: reader.result as string,
          file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = (
    setImage: React.Dispatch<React.SetStateAction<ImageUploadState>>,
    defaultImage: string
  ) => {
    setImage({
      previewUrl: defaultImage,
      file: null,
    });
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (newValue.length <= maxBioLength) {
      setBio(newValue);
    }
  };

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const maxLength = 180;
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({
    maxLength,
    initialValue:
      "Hey, I am Margaret, a web developer who loves turning ideas into amazing websites!",
  });

  const ProfileEditContent = () => (
    <div className="py-4">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="relative">
        <ProfileBg defaultImage={profileData.banner} />
        <div className="absolute left-6 top-6 translate-y-1/2">
          <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm">
            <Image
              src={profileImage.previewUrl || profileData.avatar}
              className="h-full w-full object-cover"
              width={96}
              height={96}
              alt="Profile image"
            />
            <label
              className="absolute flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
              htmlFor="profile-upload"
            >
              <ImagePlus size={16} strokeWidth={2} />
            </label>
            <input
              type="file"
              id="profile-upload"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setProfileImage)}
            />
          </div>
        </div>
        <div className="px-6 pb-6 pt-16">
          <form className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-2">
                <Label htmlFor="edit-first-name">First name</Label>
                <Input
                  id="edit-first-name"
                  defaultValue={profileData.firstName}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="edit-last-name">Last name</Label>
                <Input
                  id="edit-last-name"
                  defaultValue={profileData.lastName}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-username">Username</Label>
              <div className="relative">
                <Input
                  id="edit-username"
                  defaultValue={profileData.username}
                  className="peer pe-9"
                  placeholder="Choose a username"
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80">
                  <Check className="h-4 w-4 text-emerald-500" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-website">Website</Label>
              <div className="flex rounded-lg shadow-sm">
                <span className="inline-flex items-center rounded-l-lg border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                  https://
                </span>
                <Input
                  id="edit-website"
                  defaultValue={profileData.website}
                  className="-ml-px rounded-l-none"
                  placeholder="yourwebsite.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-bio">Biography</Label>
              <Textarea
                id="edit-bio"
                value={value}
                onChange={handleChange}
                placeholder="Write a few sentences about yourself"
                className="resize-none"
                maxLength={limit}
              />
              <p className="text-right text-sm text-muted-foreground">
                {limit - characterCount} characters remaining
              </p>
            </div>
          </form>
        </div>
      </div>
      <DialogFooter className="px-4 flex flex-row gap-x-4">
        <Button className="flex-1">Save changes</Button>
        <Button className="flex-1" variant="outline">
          Cancel
        </Button>
      </DialogFooter>
    </div>
  );

  return (
    <ContentLayout title="Social Profile">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants1}
      >
        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-background">
          <main className="flex-1 max-w-4xl mx-auto">
            <div className="relative h-48 md:h-64 w-full">
              <Image
                src={bannerImage.previewUrl || profileData.banner}
                alt="Profile banner"
                className="object-cover"
                fill
                priority
              />
            </div>
            <div className="px-4 py-6 relative">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-end">
                  <Avatar className="w-24 h-24 border-4 border-background -mt-12 mr-4">
                    <AvatarImage
                      src={profileImage.previewUrl || profileData.avatar}
                      alt={`${profileData.firstName} ${profileData.lastName}`}
                    />
                    <AvatarFallback>
                      {profileData.firstName[0]}
                      {profileData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold">{`${profileData.firstName} ${profileData.lastName}`}</h1>
                    <p className="text-muted-foreground">
                      @{profileData.username}
                    </p>
                  </div>
                </div>
                {isDesktop ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mt-4 sm:mt-0" variant="outline">
                        Edit profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <ProfileEditContent />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button className="mt-4 sm:mt-0" variant="outline">
                        Edit profile
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <ProfileEditContent />
                    </DrawerContent>
                  </Drawer>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <p>{bio}</p>
                <p className="flex items-center text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {profileData.location}
                  <LinkIcon className="ml-4 mr-1 h-4 w-4" />
                  <Link
                    href={`https://${profileData.website}`}
                    className="text-primary-foreground dark:text-primary underline"
                  >
                    {profileData.website}
                  </Link>
                  <Calendar className="ml-4 mr-1 h-4 w-4" />
                  Joined {profileData.joinDate}
                </p>
                <div className="flex gap-4 text-sm">
                  <span>
                    <strong>{profileData.following.toLocaleString()}</strong>{" "}
                    <span className="text-muted-foreground">Following</span>
                  </span>
                  <span>
                    <strong>{profileData.followers.toLocaleString()}</strong>{" "}
                    <span className="text-muted-foreground">Followers</span>
                  </span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="posts" className="w-full px-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="replies">Replies</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="likes">Likes</TabsTrigger>
              </TabsList>
              <TabsContent value="posts" className="mt-0">
                <div className="space-y-4">
                  {posts.map((post) => (
                    <article key={post.id} className=" p-4 border-b">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarImage
                            src={post.author.avatar}
                            alt={post.author.name}
                          />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-semibold">
                                {post.author.name}
                              </span>
                              <span className="text-muted-foreground">
                                {" "}
                                {post.author.username} · {post.timestamp}
                              </span>
                            </div>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                          <p>{post.content}</p>
                          <div className="overflow-hidden rounded-lg">
                            <Image
                              src={post.image}
                              alt="Post image"
                              width={800}
                              height={400}
                              className="h-[300px] w-full object-cover"
                            />
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground"
                            >
                              <Heart className="mr-2 h-4 w-4" />
                              {post.likes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground"
                            >
                              <MessageSquare className="mr-2 h-4 w-4" />
                              {post.comments}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground"
                            >
                              <Share2 className="mr-2 h-4 w-4" />
                              {post.shares}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground"
                            >
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </main>

          <aside className="w-full lg:w-80 p-2 space-y-6">
            <div className="rounded-lg bg-muted/70 p-4">
              <section className="pb-6">
                <h2 className="mb-4 font-semibold">Trending topics</h2>
                <div className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Image
                        src={topic.image}
                        alt={topic.title}
                        width={48}
                        height={48}
                        className="rounded-md"
                      />
                      <div>
                        <h3 className="text-sm font-medium">{topic.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {topic.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section className="pb-6">
                <h2 className="mb-4 font-semibold">You might like</h2>
                <div className="space-y-4">
                  {[4, 5, 6].map((imgId, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={`https://i.pravatar.cc/150?img=${imgId}`}
                          />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">User Name</p>
                          <p className="text-xs text-muted-foreground">
                            @username
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </aside>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
