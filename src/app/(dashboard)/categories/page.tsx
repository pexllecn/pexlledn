import { Metadata } from "next";
import Categories from "./categories";

export const metadata: Metadata = {
  title: "Categories",
};

export default function SignInPage() {
  return <Categories />;
}
