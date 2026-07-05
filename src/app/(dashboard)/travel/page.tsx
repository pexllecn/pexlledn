import { Metadata } from "next";
import Travel from "./travel";

export const metadata: Metadata = {
  title: "Travel",
};

export default function TravelOverviewPage() {
  return <Travel />;
}
