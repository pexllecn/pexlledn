import { Metadata } from "next";
import Investments from "./investments";

export const metadata: Metadata = {
  title: "Investments",
};

export default function BankingInvestmentsPage() {
  return <Investments />;
}
