import { Metadata } from "next";
import Pricing from "./pricing";

export const metadata: Metadata = {
  title: "Pricing",
};

export default function SignInPage() {
  return <Pricing />;
}
