import { Metadata } from "next";
import Appointments from "./appointments";

export const metadata: Metadata = { title: "Appointments" };

export default function MedicalAppointmentsPage() {
  return <Appointments />;
}
