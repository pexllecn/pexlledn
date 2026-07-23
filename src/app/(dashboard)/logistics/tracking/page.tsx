import { Metadata } from "next";
import Tracking from "./tracking";

export const metadata: Metadata = { title: "Tracking" };

export default function LogisticsTrackingPage() {
  return <Tracking />;
}
