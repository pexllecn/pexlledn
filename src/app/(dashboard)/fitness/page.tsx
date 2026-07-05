import { Metadata } from "next";
import Fitness from "./fitness";

export const metadata: Metadata = {
  title: "Fitness",
};

export default function FitnessOverviewPage() {
  return <Fitness />;
}
