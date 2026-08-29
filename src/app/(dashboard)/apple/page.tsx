import { Metadata } from "next";
import Overview from "./overview";

export const metadata: Metadata = {
  title: "Apple Design",
};

export default function AppleOverviewPage() {
  return <Overview />;
}
