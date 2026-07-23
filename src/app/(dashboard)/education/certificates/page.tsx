import { Metadata } from "next";
import Certificates from "./certificates";

export const metadata: Metadata = { title: "Certificates" };

export default function EducationCertificatesPage() {
  return <Certificates />;
}
