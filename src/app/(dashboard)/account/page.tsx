import { Metadata } from "next";
import AccountPage from "./Accountpage";

export const metadata: Metadata = {
  title: "Account Settings",
};

export default function Page() {
  return <AccountPage />;
}
