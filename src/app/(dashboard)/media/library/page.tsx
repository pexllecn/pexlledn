import { Metadata } from "next";
import Library from "./library";

export const metadata: Metadata = {
  title: "Library",
};

export default function MediaLibraryPage() {
  return <Library />;
}
