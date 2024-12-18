import { Metadata } from "next";
import Reresults from "./reresults";

export const metadata: Metadata = {
  title: "Real Estate Results",
};

export default function Page() {
  return <Reresults />;
}
