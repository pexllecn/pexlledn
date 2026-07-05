import { Metadata } from "next";
import Clinic from "./clinic";

export const metadata: Metadata = {
  title: "Clinic",
};

export default function ClinicOverviewPage() {
  return <Clinic />;
}
