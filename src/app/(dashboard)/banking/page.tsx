import { Metadata } from "next";
import Banking from "./banking";

export const metadata: Metadata = {
  title: "Banking",
};

export default function BankingOverviewPage() {
  return <Banking />;
}
