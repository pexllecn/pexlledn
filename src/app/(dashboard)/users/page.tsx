import { Metadata } from "next";
import Users from "./users";

export const metadata: Metadata = {
  title: "Users",
};

export default function SignInPage() {
  return <Users />;
}
