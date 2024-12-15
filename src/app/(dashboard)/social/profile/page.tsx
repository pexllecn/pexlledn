import { Metadata } from "next";
import Profiles from "./profiles";

export const metadata: Metadata = {
  title: "Profile",
};

export default function SignInPage() {
  return <Profiles />;
}
