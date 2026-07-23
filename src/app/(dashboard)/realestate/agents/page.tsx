import { Metadata } from "next";
import Agents from "./agents";

export const metadata: Metadata = { title: "Agents" };

export default function RealEstateAgentsPage() {
  return <Agents />;
}
