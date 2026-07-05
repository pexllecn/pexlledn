import { Metadata } from "next";
import Staff from "./staff";

export const metadata: Metadata = {
  title: "Staff",
};

export default function ClinicStaffPage() {
  return <Staff />;
}
