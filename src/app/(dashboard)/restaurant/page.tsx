import { Metadata } from "next";
import Restaurant from "./restaurant";

export const metadata: Metadata = {
  title: "Restaurant",
};

export default function RestaurantOverviewPage() {
  return <Restaurant />;
}
