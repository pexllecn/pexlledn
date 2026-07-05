import { Metadata } from "next";
import Nutrition from "./nutrition";

export const metadata: Metadata = {
  title: "Nutrition",
};

export default function NutritionTrackerPage() {
  return <Nutrition />;
}
