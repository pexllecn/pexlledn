import { Metadata } from "next";
import Fitness from "./fitness";

export const metadata: Metadata = {
  title: "Activity",
};

export default function FitnessPage() {
  return <Fitness />;
}
