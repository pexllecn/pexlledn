import { Metadata } from "next";
import Deals from "./deals";

export const metadata: Metadata = { title: "Deals" };

export default function LeadDealsPage() {
  return <Deals />;
}
