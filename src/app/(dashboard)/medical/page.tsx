import { Metadata } from "next";
import Medical from "./medical";

export const metadata: Metadata = {
  title: "Medical",
};

export default function SignInPage() {
  return <Medical />;
}
