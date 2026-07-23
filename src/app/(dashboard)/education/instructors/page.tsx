import { Metadata } from "next";
import Instructors from "./instructors";

export const metadata: Metadata = { title: "Instructors" };

export default function EducationInstructorsPage() {
  return <Instructors />;
}
