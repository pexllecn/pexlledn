import { Metadata } from "next";
import Explore from "./explore";

export const metadata: Metadata = {
  title: "Explore",
};

export default function TravelExplorePage() {
  return <Explore />;
}
