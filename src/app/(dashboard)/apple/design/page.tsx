import { Metadata } from "next";
import Design from "./design";

export const metadata: Metadata = {
  title: "Design",
};

export default function DesignPage() {
  return <Design />;
}
