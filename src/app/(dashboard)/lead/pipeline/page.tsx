import { Metadata } from "next";
import Pipeline from "./pipeline";

export const metadata: Metadata = { title: "Pipeline" };

export default function LeadPipelinePage() {
  return <Pipeline />;
}
