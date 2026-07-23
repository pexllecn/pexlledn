import { Metadata } from "next";
import Applications from "./applications";

export const metadata: Metadata = { title: "Applications" };

export default function WorkApplicationsPage() {
  return <Applications />;
}
