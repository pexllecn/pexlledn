import { Metadata } from "next";
import Warehouses from "./warehouses";

export const metadata: Metadata = { title: "Warehouses" };

export default function LogisticsWarehousesPage() {
  return <Warehouses />;
}
