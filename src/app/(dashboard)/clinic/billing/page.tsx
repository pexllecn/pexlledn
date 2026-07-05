import { Metadata } from "next";
import Billing from "./billing";

export const metadata: Metadata = {
  title: "Billing",
};

export default function ClinicBillingPage() {
  return <Billing />;
}
