import { Metadata } from "next";
import Social from "./social";

export const metadata: Metadata = {
  title: "Social",
};

export default function SignInPage() {
  return <Social />;
}
