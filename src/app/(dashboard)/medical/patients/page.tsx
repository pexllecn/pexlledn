import { Metadata } from "next";
import Patients from "./patients";

export const metadata: Metadata = { title: "Patients" };

export default function MedicalPatientsPage() {
  return <Patients />;
}
