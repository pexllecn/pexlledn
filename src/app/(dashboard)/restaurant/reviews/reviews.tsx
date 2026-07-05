"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, Star, ThumbsUp } from "lucide-react";

const breakdown = [
  { stars: 5, pct: 72 },
  { stars: 4, pct: 18 },
  { stars: 3, pct: 6 },
  { stars: 2, pct: 3 },
  { stars: 1, pct: 1 },
];

const sources = [
  { name: "Google", rating: 4.7, count: 1204 },
  { name: "Yelp", rating: 4.5, count: 682 },
  { name: "TripAdvisor", rating: 4.8, count: 431 },
];

type Review = {
  name: string;
  rating: number;
  source: string;
  time: string;
  text: string;
  dish?: string;
  replied: boolean;
  avatar: string;
  fallback: string;
};

const reviews: Review[] = [
  { name: "Isabella M.", rating: 5, source: "Google", time: "2 hours ago", text: "Absolutely stunning meal. The truffle tagliatelle was the best pasta I've had in years and the service was impeccable.", dish: "Truffle Tagliatelle", replied: false, avatar: "/avatar-80-01.jpg", fallback: "IM" },
  { name: "David K.", rating: 4, source: "Yelp", time: "Yesterday", text: "Great atmosphere and delicious food. Slightly slow on drinks during the rush but the wagyu burger made up for it.", dish: "Wagyu Burger", replied: true, avatar: "/avatar-80-02.jpg", fallback: "DK" },
  { name: "Sophie L.", rating: 5, source: "TripAdvisor", time: "2 days ago", text: "Booked for our anniversary and they went above and beyond. The dessert came with a candle — such a lovely touch.", replied: true, avatar: "/avatar-80-03.jpg", fallback: "SL" },
  { name: "Marcus T.", rating: 3, source: "Google", time: "3 days ago", text: "Food was good but the table was a little cramped. Would come back for the salmon though.", dish: "Miso Salmon", replied: false, avatar: "/avatar-80-04.jpg", fallback: "MT" },
];

export default function ReviewsPage() {
  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Reviews">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div>
            <h2 className="text-3xl font-normal">Reviews</h2>
            <p className="text-muted-foreground mt-1">
              2,317 reviews across 3 platforms
            </p>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 md:col-span-3 bg-muted border-none">
              <CardHeader>
                <CardTitle>Overall rating</CardTitle>
                <CardDescription>Weighted across all sources</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-5xl font-normal tabular-nums">4.7</p>
                  <div className="mt-2 flex justify-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className={`h-4 w-4 ${
                          n <= 4
                            ? "fill-[#f5a623] text-[#f5a623]"
                            : "fill-[#f5a623]/40 text-[#f5a623]/40"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    2,317 reviews
                  </p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {breakdown.map((b) => (
                    <div key={b.stars} className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground w-8">
                        {b.stars}
                        <Star className="h-3 w-3 fill-current text-[#f5a623]" />
                      </span>
                      <Progress value={b.pct} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground w-8 text-right tabular-nums">
                        {b.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-4 bg-muted border-none">
              <CardHeader>
                <CardTitle>By platform</CardTitle>
                <CardDescription>Ratings per source</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-3">
                {sources.map((s) => (
                  <div
                    key={s.name}
                    className="rounded-lg bg-background/60 p-4 text-center"
                  >
                    <p className="text-sm text-muted-foreground">{s.name}</p>
                    <p className="text-3xl font-normal tabular-nums mt-1">
                      {s.rating}
                    </p>
                    <div className="mt-1 flex justify-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          className={`h-3 w-3 ${
                            n <= Math.round(s.rating)
                              ? "fill-[#f5a623] text-[#f5a623]"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-1xs text-muted-foreground mt-2">
                      {s.count} reviews
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-muted border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="space-y-1.5">
                <CardTitle>Recent reviews</CardTitle>
                <CardDescription>2 awaiting a reply</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              {reviews.map((r, i) => (
                <div key={r.name}>
                  <div className="flex gap-3 py-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={r.avatar} />
                      <AvatarFallback>{r.fallback}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm leading-none">{r.name}</p>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <Star
                              key={n}
                              className={`h-3 w-3 ${
                                n <= r.rating
                                  ? "fill-[#f5a623] text-[#f5a623]"
                                  : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <Badge variant="secondary" className="text-1xs">
                          {r.source}
                        </Badge>
                        <span className="text-1xs text-muted-foreground">
                          {r.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{r.text}</p>
                      {r.dish && (
                        <Badge variant="outline" className="text-1xs">
                          {r.dish}
                        </Badge>
                      )}
                      <div className="flex items-center gap-2 pt-1">
                        {r.replied ? (
                          <Badge variant="success" className="text-1xs gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            Replied
                          </Badge>
                        ) : (
                          <Button variant="outline" size="sm">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Reply
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  {i < reviews.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
