import { Metadata } from "next";
import Courses from "./courses";

export const metadata: Metadata = { title: "Courses" };

export default function EducationCoursesPage() {
  return <Courses />;
}
