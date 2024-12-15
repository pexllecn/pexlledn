import { Metadata } from "next";
import Redetails from "./redetails";

export const metadata: Metadata = {
  title: "Real Estate Details",
};

export default function SignInPage() {
  return <Redetails />;
}
