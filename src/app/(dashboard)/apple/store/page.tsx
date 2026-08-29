import { Metadata } from "next";
import Store from "./store";

export const metadata: Metadata = {
  title: "App Store",
};

export default function StorePage() {
  return <Store />;
}
