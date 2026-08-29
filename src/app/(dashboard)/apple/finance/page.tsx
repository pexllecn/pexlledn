import { Metadata } from "next";
import Finance from "./finance";

export const metadata: Metadata = {
  title: "Wallet",
};

export default function FinancePage() {
  return <Finance />;
}
