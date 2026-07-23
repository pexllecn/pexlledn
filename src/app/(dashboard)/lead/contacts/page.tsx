import { Metadata } from "next";
import Contacts from "./contacts";

export const metadata: Metadata = { title: "Contacts" };

export default function LeadContactsPage() {
  return <Contacts />;
}
