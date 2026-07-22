import { Metadata } from "next";
import Videos from "./videos";

export const metadata: Metadata = {
  title: "Videos",
};

export default function MediaVideosPage() {
  return <Videos />;
}
