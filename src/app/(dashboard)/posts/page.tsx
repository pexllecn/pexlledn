import { Metadata } from "next";
import Posts from "./posts";

export const metadata: Metadata = {
  title: "Posts",
};

export default function SignInPage() {
  return <Posts />;
}
