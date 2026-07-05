import { Metadata } from "next";
import Cards from "./cards";

export const metadata: Metadata = {
  title: "Cards",
};

export default function BankingCardsPage() {
  return <Cards />;
}
