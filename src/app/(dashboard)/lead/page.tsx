import { Metadata } from "next";
import Lead from "./lead";

export const metadata: Metadata = {
  title: "Lead",
};

export default function SignInPage() {
  return <Lead />;
}
