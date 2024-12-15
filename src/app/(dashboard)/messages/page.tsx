import { Metadata } from "next";
import Messages from "./messages";

export const metadata: Metadata = {
  title: "Messages",
};

export default function SignInPage() {
  return <Messages />;
}
