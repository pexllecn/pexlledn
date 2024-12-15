import { Metadata } from "next";
import Logistics from "./logistics";

export const metadata: Metadata = {
  title: "Logistics",
};

export default function SignInPage() {
  return <Logistics />;
}
