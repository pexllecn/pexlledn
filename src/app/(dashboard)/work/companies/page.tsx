import { Metadata } from "next";
import Companies from "./companies";

export const metadata: Metadata = { title: "Companies" };

export default function WorkCompaniesPage() {
  return <Companies />;
}
