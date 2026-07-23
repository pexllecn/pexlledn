import { Metadata } from "next";
import Records from "./records";

export const metadata: Metadata = { title: "Records" };

export default function MedicalRecordsPage() {
  return <Records />;
}
