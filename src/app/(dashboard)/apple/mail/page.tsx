import { Metadata } from "next";
import Mail from "./mail";

export const metadata: Metadata = {
  title: "Mail",
};

export default function MailPage() {
  return <Mail />;
}
