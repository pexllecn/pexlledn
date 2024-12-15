import { Metadata } from "next";
import Filters from "./filters";

export const metadata: Metadata = {
  title: "Filters",
};

export default function SignInPage() {
  return <Filters />;
}
