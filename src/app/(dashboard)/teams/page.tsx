import { Metadata } from "next";
import Teams from "./teams";

export const metadata: Metadata = {
  title: "Teams",
};

export default function SignInPage() {
  return <Teams />;
}
