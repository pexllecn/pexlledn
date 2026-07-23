import { Metadata } from "next";
import Drivers from "./drivers";

export const metadata: Metadata = { title: "Drivers" };

export default function LogisticsDriversPage() {
  return <Drivers />;
}
