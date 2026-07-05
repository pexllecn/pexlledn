import { Metadata } from "next";
import Workouts from "./workouts";

export const metadata: Metadata = {
  title: "Workouts",
};

export default function WorkoutsLibraryPage() {
  return <Workouts />;
}
