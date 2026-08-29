import { Metadata } from "next";
import Analytics from "./analytics";

export const metadata: Metadata = {
  title: "Marketing",
};

export default function AnalyticsPage() {
  return <Analytics />;
}
