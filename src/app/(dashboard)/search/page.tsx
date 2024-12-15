import { Metadata } from "next";
import Search from "./search";

export const metadata: Metadata = {
  title: "Search Results",
};

export default function SignInPage() {
  return <Search />;
}
