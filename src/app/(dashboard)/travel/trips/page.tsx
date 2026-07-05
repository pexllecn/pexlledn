import { Metadata } from "next";
import Trips from "./trips";

export const metadata: Metadata = {
  title: "Trips",
};

export default function TravelTripsPage() {
  return <Trips />;
}
