import { Metadata } from "next";
import Analytics from "./analytics";

export const metadata: Metadata = { title: "Analytics" };

export default function RealEstateAnalyticsPage() {
  return <Analytics />;
}
