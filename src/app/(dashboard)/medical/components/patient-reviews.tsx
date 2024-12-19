import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Leslie Alexander",
    date: "5/30/14",
    rating: 3.6,
    avatar: "https://i.pravatar.cc/150?img=1",
    comment:
      "Dr. Insburry is incredibly thorough and caring. He took the time to explain everything clearly.",
  },
  {
    id: 2,
    name: "Bessie Cooper",
    date: "5/7/16",
    rating: 5.0,
    avatar: "https://i.pravatar.cc/150?img=2",
    comment:
      "Great experience overall. The wait time was a bit long, but the care was excellent.",
  },
  {
    id: 3,
    name: "Darlen Robertson",
    date: "9/18/16",
    rating: 4.3,
    avatar: "https://i.pravatar.cc/150?img=3",
    comment:
      "I've been seeing Dr. Insburry for years. He's always professional and up-to-date on the latest treatments.",
  },
];

export function PatientReviews() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Review List</h2>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-muted border-none">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <Avatar className="h-12 w-12">
                <AvatarImage src={review.avatar} />
                <AvatarFallback>{review.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-base">
                  {review.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {review.date}
                </CardDescription>
              </div>
              <Badge
                variant="secondary"
                className="bg-yellow-400/10 text-yellow-400"
              >
                {review.rating.toFixed(1)}{" "}
                <Star className="ml-1 h-3 w-3 fill-current" />
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground">
                {review.comment}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

