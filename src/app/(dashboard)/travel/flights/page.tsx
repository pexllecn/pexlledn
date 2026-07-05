import { Metadata } from "next";
import Flights from "./flights";

export const metadata: Metadata = {
  title: "Flights",
};

export default function TravelFlightsPage() {
  return <Flights />;
}
