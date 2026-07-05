import { Metadata } from "next";
import Payments from "./payments";

export const metadata: Metadata = {
  title: "Payments",
};

export default function BankingPaymentsPage() {
  return <Payments />;
}
