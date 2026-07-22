import { Metadata } from "next";
import Live from "./live";

export const metadata: Metadata = {
  title: "Live TV",
};

export default function MediaLivePage() {
  return <Live />;
}
