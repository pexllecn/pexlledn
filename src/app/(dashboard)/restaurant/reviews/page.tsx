import { Metadata } from "next";
import Reviews from "./reviews";

export const metadata: Metadata = {
  title: "Reviews",
};

export default function RestaurantReviewsPage() {
  return <Reviews />;
}
