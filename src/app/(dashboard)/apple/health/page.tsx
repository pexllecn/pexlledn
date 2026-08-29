import { Metadata } from "next";
import Health from "./health";

export const metadata: Metadata = {
  title: "Medical Profile",
};

export default function HealthPage() {
  return <Health />;
}
