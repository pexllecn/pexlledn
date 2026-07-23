import { Metadata } from "next";
import Saved from "./saved";

export const metadata: Metadata = { title: "Saved" };

export default function WorkSavedPage() {
  return <Saved />;
}
