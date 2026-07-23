import { Metadata } from "next";
import Activities from "./activities";

export const metadata: Metadata = { title: "Activities" };

export default function LeadActivitiesPage() {
  return <Activities />;
}
