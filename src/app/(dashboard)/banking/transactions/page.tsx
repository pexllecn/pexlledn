import { Metadata } from "next";
import Transactions from "./transactions";

export const metadata: Metadata = {
  title: "Transactions",
};

export default function BankingTransactionsPage() {
  return <Transactions />;
}
