import { Metadata } from "next";
import LearningProgress from "./progress";

export const metadata: Metadata = { title: "Progress" };

export default function EducationProgressPage() {
  return <LearningProgress />;
}
