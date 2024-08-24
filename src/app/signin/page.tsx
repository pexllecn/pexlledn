"use client";
import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";

const DynamicAuthButtons = dynamic(
  () => import("@/components/google-auth-button"),
  {
    ssr: false
  }
);

export default function AuthenticationPage() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpInvalid, setIsOtpInvalid] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  const getAsset = (lightAsset: string, darkAsset: string) => {
    if (!mounted) return lightAsset;
    const effectiveTheme = resolvedTheme || theme;
    return effectiveTheme === "dark" ? darkAsset : lightAsset;
  };

  const logoSrc = getAsset("/pexlle.png", "/pexllelight.png");
  const backgroundImage = getAsset("/login.jpeg", "/darklogin.jpg");

  const handleLogin = () => {
    setIsOtpOpen(true);
    setOtp("");
    setIsOtpInvalid(false);
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (value.length < 6) {
      setIsOtpInvalid(false);
    } else if (value === "111111") {
      setIsOtpOpen(false);
      router.push("/dashboard");
    } else {
      setIsOtpInvalid(true);
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP.",
        variant: "destructive"
      });
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password reset logic here
    console.log("Password reset requested for:", forgotPasswordEmail);
    toast({
      title: "Password Reset Requested",
      description:
        "If an account exists for this email, you will receive reset instructions."
    });
    setIsForgotPasswordOpen(false);
  };

  const ResponsiveOTP = () => {
    const Content = (
      <>
        <div className="flex justify-center py-4">
          <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
            <InputOTPGroup>
              {[0, 1, 2].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className={isOtpInvalid ? "border-red-500" : ""}
                />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              {[3, 4, 5].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className={isOtpInvalid ? "border-red-500" : ""}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
      </>
    );

    if (isDesktop) {
      return (
        <Dialog open={isOtpOpen} onOpenChange={setIsOtpOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter OTP</DialogTitle>
              <DialogDescription>
                Please enter the 6-digit OTP sent to your device.
              </DialogDescription>
            </DialogHeader>
            {Content}
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Drawer open={isOtpOpen} onOpenChange={setIsOtpOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Enter OTP</DrawerTitle>
            <DrawerDescription>
              Please enter the 6-digit OTP sent to your device.
            </DrawerDescription>
          </DrawerHeader>
          {Content}
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };

  const ResponsiveForgotPassword = () => {
    const Content = (
      <form onSubmit={handleForgotPassword}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email">Email</Label>
            <Input
              id="reset-email"
              type="email"
              placeholder="m@example.com"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={isDesktop ? "flex justify-end mt-4" : ""}>
          <Button type="submit">Send Reset Instructions</Button>
        </div>
      </form>
    );

    if (isDesktop) {
      return (
        <Dialog
          open={isForgotPasswordOpen}
          onOpenChange={setIsForgotPasswordOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>
                Enter your email address and we'll send you instructions to
                reset your password.
              </DialogDescription>
            </DialogHeader>
            {Content}
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Drawer
        open={isForgotPasswordOpen}
        onOpenChange={setIsForgotPasswordOpen}
      >
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Reset Password</DrawerTitle>
            <DrawerDescription>
              Enter your email address and we'll send you instructions to reset
              your password.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">{Content}</div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <ContentLayout title="Categories">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants1}
      >
        <div className="container mx-auto px-4 py-4 sm:py-8">
          {featuredAd && (
            <Card className="mb-6 sm:mb-12 overflow-hidden shadow-lg rounded-lg">
              <div className="relative h-48 sm:h-60 md:h-80">
                <img
                  src={featuredAd.image}
                  alt={featuredAd.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 text-white">
                  <Badge className="mb-1 sm:mb-2">{featuredAd.category}</Badge>
                  <h2 className="text-lg sm:text-xl md:text-3xl font-bold mb-1 sm:mb-2">
                    Featured: {featuredAd.title}
                  </h2>
                  <p className="mb-2 sm:mb-4 text-xs sm:text-sm md:text-base line-clamp-2">
                    {featuredAd.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{featuredAd.location}</span>
                    </div>
                    {featuredAd.price && (
                      <div className="flex items-center gap-1">
                        <DollarSignIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>${featuredAd.price}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          <div className="mb-6 sm:mb-12">
            <div className="relative max-w-3xl mx-auto">
              <Input
                placeholder="Search for anything..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-none bg-muted shadow-md focus:ring-2 focus:ring-primary rounded-md"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between mb-6 sm:mb-8 gap-4">
            <div className="w-full sm:w-auto flex space-x-1 bg-background rounded-lg overflow-x-auto px-2 py-1">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`relative px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 outline-none whitespace-nowrap ${
                    activeCategory === category
                      ? "text-secondary"
                      : "text-gray-500 hover:text-foreground"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {activeCategory === category && (
                    <motion.div
                      className="absolute inset-0 bg-foreground rounded-full z-0"
                      layoutId="activeBackground"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                      }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px] sm:w-[180px] border-none bg-muted shadow-none text-xs sm:text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (Newest first)</SelectItem>
                  <SelectItem value="price">Price (Highest first)</SelectItem>
                </SelectContent>
              </Select>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isGridView ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setIsGridView(true)}
                      className="border-gray-300 dark:border-gray-700"
                    >
                      <LayoutGridIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Grid view</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={!isGridView ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setIsGridView(false)}
                      className="border-gray-300 dark:border-gray-700"
                    >
                      <ListIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>List view</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div
            className={`grid gap-4 sm:gap-6 md:gap-8 ${
              isGridView
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {filteredAds.map((ad) => (
              <Card
                key={ad.id}
                className={`overflow-hidden hover:shadow-xl transition-all duration-300 rounded-lg ${
                  isGridView
                    ? "h-[300px] sm:h-[350px] md:h-[400px]"
                    : "h-auto sm:h-[200px] flex flex-col sm:flex-row"
                }`}
              >
                {isGridView ? (
                  <div className="relative w-full h-full">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <Badge className="bg-black/80 text-white text-xs">
                          {ad.category}
                        </Badge>
                        {ad.price && (
                          <Badge
                            variant="secondary"
                            className="bg-white/60 backdrop-blur-sm text-sm font-bold text-black"
                          >
                            ${ad.price}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-auto">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 line-clamp-2">
                          {ad.title}
                        </h2>
                        <p className="text-white/90 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-4">
                          {ad.description}
                        </p>
                        <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-white/80 mb-2 sm:mb-4">
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="w-3 h-3" />
                            <span>{ad.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            <span>
                              {new Date(ad.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <UserIcon className="w-3 h-3" />
                            <span>{ad.seller}</span>
                          </div>
                        </div>
                        <Button className="w-full bg-white text-black hover:bg-white/90 text-xs sm:text-sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative w-full sm:w-1/3 h-40 sm:h-full">
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 left-2 text-xs">
                        {ad.category}
                      </Badge>
                      {ad.price && (
                        <Badge
                          variant="secondary"
                          className="bg-background/40 backdrop-blur-sm dark:bg-background/40 dark:backdrop-blur-sm text-sm absolute top-2 right-2"
                        >
                          ${ad.price}
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-col flex-grow">
                      <CardContent className="p-3 sm:p-4 flex-grow">
                        <h2 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2 line-clamp-1">
                          {ad.title}
                        </h2>
                        <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-4">
                          {ad.description}
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-auto">
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="w-3 h-3" />
                            <span>{ad.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            <span>
                              {new Date(ad.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <UserIcon className="w-3 h-3" />
                            <span>{ad.seller}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-3 sm:p-4 bg-muted/50 mt-auto">
                        <Button
                          className="w-full text-xs sm:text-sm"
                          variant="secondary"
                        >
                          View Details
                        </Button>
                      </CardFooter>
                    </div>
                  </>
                )}
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
