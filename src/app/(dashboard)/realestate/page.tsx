import { Metadata } from "next";
import Realestate from "./realestate";

export const metadata: Metadata = {
  title: "Real Estate",
};

export default function SignInPage() {
  return <Realestate />;
}
