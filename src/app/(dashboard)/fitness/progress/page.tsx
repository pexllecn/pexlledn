import { Metadata } from "next";
import ProgressTracker from "./progress";

export const metadata: Metadata = {
  title: "Progress",
};

export default function ProgressPage() {
  return <ProgressTracker />;
}
