import { Metadata } from "next";
import Fleet from "./fleet";

export const metadata: Metadata = { title: "Fleet" };

export default function LogisticsFleetPage() {
  return <Fleet />;
}
