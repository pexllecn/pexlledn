import { Metadata } from "next";
import AccountPage from "./AccountPage";

export const metadata: Metadata = {
  title: "Account Settings",
};

export default function Page() {
  return <AccountPage />;
}
