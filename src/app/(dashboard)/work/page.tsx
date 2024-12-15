import { Metadata } from "next";
import Work from "./work";

export const metadata: Metadata = {
  title: "Work",
};

export default function SignInPage() {
  return <Work />;
}
