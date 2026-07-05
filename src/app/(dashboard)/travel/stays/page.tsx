import { Metadata } from "next";
import Stays from "./stays";

export const metadata: Metadata = {
  title: "Stays",
};

export default function TravelStaysPage() {
  return <Stays />;
}
