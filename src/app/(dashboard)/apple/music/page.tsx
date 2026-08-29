import { Metadata } from "next";
import Music from "./music";

export const metadata: Metadata = {
  title: "Music",
};

export default function MusicPage() {
  return <Music />;
}
