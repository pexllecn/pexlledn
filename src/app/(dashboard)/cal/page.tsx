import { Metadata } from "next";
import Filters from "./cal";

export const metadata: Metadata = {
  title: "Calculator",
};

export default function SignInPage() {
  return <Filters />;
}
